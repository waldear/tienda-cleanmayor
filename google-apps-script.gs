// ================= CONFIGURACIÓN - TUS IDs REALES =================
const CONFIG = {
  SHEET_NAME: "Pedidos",
  DOC_TEMPLATE_ID: "1xq9cNo13P3oO3noINnckOpQezL6XYMRZiR73kZWCpQU",
  PDF_FOLDER_ID: "1-YBWiDJAnN1qs_dLRvE0cnFB1x4WA0eh",
  WHATSAPP_NUMBER: "5493525550761",
  EMAIL_FROM: "ramirez.waldemar@gmail.com"
};
// ====================================================================

function doPost(e) {
  try {
    // Aceptar JSON directo o formulario con campo 'payload' (para evitar problemas CORS desde el navegador)
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter && e.parameter.payload) {
      data = JSON.parse(e.parameter.payload);
    } else {
      data = {};
    }
    
    // 1. Guardar en Sheets
    guardarEnSheets(data);
    
    // 2. Generar PDF
    const pdfUrl = generarFacturaPDF(data);
    
    // 3. Enviar email con factura si eligió esa opción
    if(data.invoiceMethod === 'email' && data.invoiceEmail) {
      enviarEmailConFactura(data, pdfUrl);
    }
    
    // 4. Generar URL de WhatsApp para TI (el pedido siempre va a tu número)
    const whatsappPedidoUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(generarMensajeWhatsApp(data, pdfUrl))}`;
    
    // 5. Respuesta exitosa
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        pdfUrl: pdfUrl,
        whatsappPedidoUrl: whatsappPedidoUrl,
        message: data.invoiceMethod === 'email' 
          ? 'Pedido por WhatsApp, factura enviada por email' 
          : 'Pedido y factura por WhatsApp'
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(
      JSON.stringify({status: "error", message: error.toString()})
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function guardarEnSheets(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
  
  sheet.appendRow([
    new Date(),
    data.numeroPedido,
    data.productos.map(p => `${p.product} (x${p.quantity})`).join(", "),
    data.modo,
    data.totalItems,
    data.tipoEntrega,
    data.direccion || "Retiro en local",
    data.referencias || "",
    data.notas || "",
    data.invoiceMethod === 'whatsapp' ? 'WhatsApp' : 'Email',
    data.invoiceEmail || ""
  ]);
}

function generarFacturaPDF(data) {
  const template = DriveApp.getFileById(CONFIG.DOC_TEMPLATE_ID);
  const folder = DriveApp.getFolderById(CONFIG.PDF_FOLDER_ID);
  
  const copia = template.makeCopy(`Factura_${data.numeroPedido}`, folder);
  const doc = DocumentApp.openById(copia.getId());
  const body = doc.getBody();
  
  // Reemplazar marcadores
  body.replaceText("{{NUMERO_PEDIDO}}", data.numeroPedido);
  body.replaceText("{{FECHA}}", new Date().toLocaleDateString("es-AR"));
  body.replaceText("{{CLIENTE}}", data.invoiceEmail || "Cliente Web");
  body.replaceText("{{PRODUCTOS}}", data.productos.map(p => `• ${p.product} (x${p.quantity})`).join("\n"));
  body.replaceText("{{MODO}}", data.modo);
  body.replaceText("{{ENTREGA}}", data.tipoEntrega);
  body.replaceText("{{DIRECCION}}", data.direccion || "Retiro en local");
  body.replaceText("{{TOTAL_ITEMS}}", data.totalItems);
  
  doc.saveAndClose();
  const pdfBlob = DriveApp.getFileById(copia.getId()).getAs(MimeType.PDF);
  const pdfFile = folder.createFile(pdfBlob).setName(`Factura_${data.numeroPedido}.pdf`);
  DriveApp.getFileById(copia.getId()).setTrashed(true);
  
  return pdfFile.getUrl();
}

function enviarEmailConFactura(data, pdfUrl) {
  const pdfFile = DriveApp.getFilesByName(`Factura_${data.numeroPedido}.pdf`).next();
  
  MailApp.sendEmail({
    to: data.invoiceEmail,
    subject: `Factura de Pedido #${data.numeroPedido} - CleanMayor`,
    htmlBody: `
      <h2>🛒 Factura de tu Pedido - CleanMayor</h2>
      <p><strong>Número de Pedido:</strong> ${data.numeroPedido}</p>
      <p><strong>Fecha:</strong> ${new Date().toLocaleString("es-AR")}</p>
      <p><strong>Total de ítems:</strong> ${data.totalItems}</p>
      <p><strong>Tipo de entrega:</strong> ${data.tipoEntrega}</p>
      ${data.direccion ? `<p><strong>Dirección:</strong> ${data.direccion}</p>` : ''}
      
      <h3>Productos:</h3>
      <ul>
        ${data.productos.map(p => `<li>${p.product} (x${p.quantity}) - ${data.modo}</li>`).join('')}
      </ul>
      
      <p><a href="${pdfUrl}" style="background: #1e3c72; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">📄 Descargar Factura PDF</a></p>
      
      <hr>
      <p style="color: #666; font-size: 12px;">Gracias por tu compra en CleanMayor<br>WhatsApp: ${CONFIG.WHATSAPP_NUMBER}</p>
      <p style="color: #666; font-size: 12px;">¿Consultas? Escríbenos por WhatsApp</p>
    `,
    attachments: [pdfFile]
  });
}

function generarMensajeWhatsApp(data, pdfUrl) {
  let message = `🛒 *NUEVO PEDIDO #${data.numeroPedido}* 🛒\n\n`;
  message += `*Productos:*\n`;
  data.productos.forEach(item => {
    message += `• ${item.product} (x${item.quantity})\n`;
  });
  message += `\n*Modo:* ${data.modo}\n`;
  message += `*Entrega:* ${data.tipoEntrega}\n`;
  
  if(data.direccion) {
    message += `*Dirección:* ${data.direccion}\n`;
    if(data.referencias) message += `*Referencias:* ${data.referencias}\n`;
  }
  
  message += `\n*📄 Factura:* ${pdfUrl}\n`;
  message += `*Cliente quiere factura por:* ${data.invoiceMethod === 'email' ? 'Email (' + data.invoiceEmail + ')' : 'WhatsApp'}\n`;
  message += `\n*Total de ítems:* ${data.totalItems}`;
  
  return message;
}
