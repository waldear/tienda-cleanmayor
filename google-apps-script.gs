// ================= CONFIGURACIÓN - TUS IDs REALES DETECTADOS =================
const CONFIG = {
  PRODUCTOS_SS_ID: "1dOOsiDPYdMUrxOevef4GYfD4EPrbFeDrrvwDEXhtMh8",
  PEDIDOS_SS_ID: "1TqvsXWTIaCsyL1383EsNGTLoYsmeA5hO-i8Hadot-go",
  DOC_TEMPLATE_ID: "1xq9cNo13P3oO3noINnckOpQezL6XYMRZiR73kZWCpQU",
  PDF_FOLDER_ID: "1-YBWiDJAnN1qs_dLRvE0cnFB1x4WA0eh",
  WHATSAPP_NUMBER: "5493525550761"
};
// ====================================================================

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    // CASO: Verificar PIN de Admin desde hoja Config
    if (action === "verificarPin") {
      const pinIngresado = e.parameter.pin;
      const ssPedidos = SpreadsheetApp.openById(CONFIG.PEDIDOS_SS_ID);
      const sheetConfig = ssPedidos.getSheetByName("Config");
      let pinCorrecto = "349893"; // valor por defecto si no existe la hoja Config
      if (sheetConfig) {
        const filas = sheetConfig.getDataRange().getValues();
        for (let i = 0; i < filas.length; i++) {
          if (filas[i][0].toString() === "PIN_ADMIN") {
            pinCorrecto = filas[i][1].toString();
            break;
          }
        }
      }
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        valid: pinIngresado === pinCorrecto
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // CASO: Obtener Pedidos para el Panel de Control
    if (action === "pedidos") {
      const ssPedidos = SpreadsheetApp.openById(CONFIG.PEDIDOS_SS_ID);
      const sheetPedidos = ssPedidos.getSheets()[0];
      const values = sheetPedidos.getDataRange().getValues();
      const headers = values.shift();
      
      const pedidos = values.map(row => {
        let obj = {};
        headers.forEach((h, i) => {
          obj[h.toString().toLowerCase().replace(/ /g, "_")] = row[i];
        });
        return obj;
      }).reverse(); // Los más recientes primero
      
      return ContentService.createTextOutput(JSON.stringify({status: "success", data: pedidos}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // CASO POR DEFECTO: Obtener Productos
    const ss = SpreadsheetApp.openById(CONFIG.PRODUCTOS_SS_ID);
    const sheet = ss.getSheets()[0];
    const values = sheet.getDataRange().getValues();
    const headers = values.shift();
    
    const productos = values.map(row => {
      let obj = {};
      headers.forEach((h, i) => {
        const key = h.toString().toLowerCase().replace(/_/g, " ").trim();
        if (key === 'nombre') obj.name = row[i];
        if (key === 'precio minorista' || key.includes('minorista')) obj.priceMinorista = row[i];
        if (key === 'precio mayorista' || key.includes('mayorista')) obj.priceMayorista = row[i];
        if (key === 'imagen' || key === 'foto' || key.includes('imagen')) obj.image = row[i];
        if (key === 'descripcion' || key.includes('descrip')) obj.description = row[i];
        if (key === 'categoria' || key === 'category' || key.includes('categ')) obj.category = row[i];
        if (key === 'stock') obj.stock = (row[i] === '' || row[i] === null || row[i] === undefined) ? null : Number(row[i]);
      });
      return obj;
    }).filter(p => p.name);
    
    return ContentService.createTextOutput(JSON.stringify({status: "success", data: productos}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: "error", message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter && e.parameter.payload) {
      data = JSON.parse(e.parameter.payload);
    } else {
      throw new Error("No se recibieron datos");
    }
    
    // Routing: MercadoPago
    if (data.paymentMethod === 'mercadopago') {
      return crearPreferenciaMercadoPago(data);
    }

    // 1. Guardar en Hoja de Pedidos
    const ssPedidos = SpreadsheetApp.openById(CONFIG.PEDIDOS_SS_ID);
    const sheetPedidos = ssPedidos.getSheets()[0];
    
    sheetPedidos.appendRow([
      new Date(),
      data.numeroPedido,
      data.productos.map(p => `${p.product} (x${p.quantity})`).join(", "),
      data.modo,
      data.totalItems,
      data.totalPrice || 0,
      data.tipoEntrega,
      data.direccion || "Retiro",
      data.referencias || "",
      data.notas || "",
      data.invoiceMethod,
      data.invoiceEmail || "",
      data.clienteNombre || "",
      data.clienteTelefono || ""
    ]);
    
    // 2. Descontar stock
    descontarStock(data.productos);

    // 3. Generar Factura PDF
    const pdfUrl = generarFacturaPDF(data);

    // 4. Respuesta
    const whatsappPedidoUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(generarMensajeWhatsApp(data, pdfUrl))}`;

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      pdfUrl: pdfUrl,
      whatsappPedidoUrl: whatsappPedidoUrl
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({status: "error", message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function generarFacturaPDF(data) {
  const template = DriveApp.getFileById(CONFIG.DOC_TEMPLATE_ID);
  const folder = DriveApp.getFolderById(CONFIG.PDF_FOLDER_ID);
  const copia = template.makeCopy(`Factura_${data.numeroPedido}`, folder);
  const doc = DocumentApp.openById(copia.getId());
  const body = doc.getBody();
  
  body.replaceText("{{NUMERO_PEDIDO}}", data.numeroPedido);
  body.replaceText("{{FECHA}}", new Date().toLocaleDateString("es-AR"));
  body.replaceText("{{CLIENTE}}", data.clienteNombre || "Cliente Web");
  const detalle = data.productos.map(p => {
    const sub = p.subtotal ? ` — $${Number(p.subtotal).toLocaleString("es-AR")}` : "";
    return `• ${p.product} (x${p.quantity})${sub}`;
  }).join("\n");
  body.replaceText("{{PRODUCTOS}}", detalle);
  body.replaceText("{{MODO}}", data.modo);
  body.replaceText("{{ENTREGA}}", data.tipoEntrega);
  body.replaceText("{{DIRECCION}}", data.direccion || "Retiro en local");
  body.replaceText("{{TOTAL_ITEMS}}", data.totalItems.toString());
  body.replaceText("{{TOTAL_PRECIO}}", data.totalPrice ? `$${Number(data.totalPrice).toLocaleString("es-AR")}` : "—");
  
  doc.saveAndClose();
  const pdfBlob = DriveApp.getFileById(copia.getId()).getAs(MimeType.PDF);
  const pdfFile = folder.createFile(pdfBlob).setName(`Factura_${data.numeroPedido}.pdf`);
  DriveApp.getFileById(copia.getId()).setTrashed(true);
  
  return pdfFile.getUrl();
}

function generarMensajeWhatsApp(data, pdfUrl) {
  let message = `🛒 *NUEVO PEDIDO #${data.numeroPedido}* 🛒\n\n`;
  message += `👤 *Cliente:* ${data.clienteNombre}\n`;
  message += `📞 *Tel:* ${data.clienteTelefono}\n\n`;
  message += `*Productos:*\n`;
  data.productos.forEach(item => {
    const sub = item.subtotal ? ` — $${Number(item.subtotal).toLocaleString("es-AR")}` : "";
    message += `• ${item.product} (x${item.quantity})${sub}\n`;
  });
  if (data.totalPrice) message += `\n💰 *Total: $${Number(data.totalPrice).toLocaleString("es-AR")}*\n`;
  message += `\n*Modo:* ${data.modo}\n`;
  message += `*Entrega:* ${data.tipoEntrega}\n`;
  if(data.direccion) message += `*Dirección:* ${data.direccion}\n`;
  message += `\n*📄 Factura:* ${pdfUrl}`;
  return message;
}

function descontarStock(productos) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.PRODUCTOS_SS_ID);
    const sheet = ss.getSheets()[0];
    const values = sheet.getDataRange().getValues();
    const headers = values[0];

    let nombreCol = -1, stockCol = -1;
    headers.forEach((h, i) => {
      const key = h.toString().toLowerCase().trim();
      if (key === 'nombre') nombreCol = i;
      if (key === 'stock') stockCol = i;
    });

    if (nombreCol === -1 || stockCol === -1) return;

    productos.forEach(item => {
      for (let r = 1; r < values.length; r++) {
        if (values[r][nombreCol] === item.product) {
          const currentStock = Number(values[r][stockCol]);
          if (!isNaN(currentStock)) {
            const newStock = Math.max(0, currentStock - item.quantity);
            sheet.getRange(r + 1, stockCol + 1).setValue(newStock);
          }
          break;
        }
      }
    });
  } catch(e) { /* stock column may not exist yet */ }
}

function crearPreferenciaMercadoPago(data) {
  const ssPedidos = SpreadsheetApp.openById(CONFIG.PEDIDOS_SS_ID);
  const sheetConfig = ssPedidos.getSheetByName("Config");
  let accessToken = '';
  if (sheetConfig) {
    const filas = sheetConfig.getDataRange().getValues();
    for (let i = 0; i < filas.length; i++) {
      if (filas[i][0].toString() === "MP_ACCESS_TOKEN") {
        accessToken = filas[i][1].toString();
        break;
      }
    }
  }

  if (!accessToken) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "MercadoPago no configurado. Agrega MP_ACCESS_TOKEN en la hoja Config."
    })).setMimeType(ContentService.MimeType.JSON);
  }

  const mpItems = data.productos.map(p => ({
    title: p.product,
    quantity: p.quantity,
    unit_price: Number(p.price),
    currency_id: "ARS"
  }));

  const preference = {
    items: mpItems,
    external_reference: data.numeroPedido,
    payer: { name: data.clienteNombre || "", phone: { number: data.clienteTelefono || "" } },
    back_urls: {
      success: (data.siteUrl || "") + "?pago=ok",
      failure: (data.siteUrl || "") + "?pago=error"
    },
    auto_return: "approved"
  };

  const response = UrlFetchApp.fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    contentType: "application/json",
    headers: { "Authorization": "Bearer " + accessToken },
    payload: JSON.stringify(preference)
  });

  const result = JSON.parse(response.getContentText());

  // Guardar pedido
  const sheetPedidos = ssPedidos.getSheets()[0];
  sheetPedidos.appendRow([
    new Date(), data.numeroPedido,
    data.productos.map(p => `${p.product} (x${p.quantity})`).join(", "),
    data.modo, data.totalItems, data.totalPrice || 0,
    data.tipoEntrega, data.direccion || "Retiro",
    "", data.notas || "",
    "MercadoPago", "", data.clienteNombre || "", data.clienteTelefono || ""
  ]);

  // Descontar stock
  descontarStock(data.productos);

  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    init_point: result.init_point
  })).setMimeType(ContentService.MimeType.JSON);
}
