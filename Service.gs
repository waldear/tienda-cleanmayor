/**
 * @file Service.gs
 * @description Business logic layer.
 */

const Service = {
  /**
   * Validates an order and calculates totals on server-side.
   */
  processOrder: function(payload) {
    const products = Repository.getProducts();
    let totalCalculado = 0;
    
    // Sanitize and process products
    const processedProducts = payload.productos.map(item => {
      const p = products.find(prod => prod.name === item.product);
      if (!p) throw new Error(`Product not found: ${item.product}`);
      
      const price = payload.modo.toLowerCase() === 'mayorista' ? p.priceMayorista : p.priceMinorista;
      totalCalculado += price * item.quantity;
      
      return {
        product: Security.sanitize(item.product),
        quantity: parseInt(item.quantity)
      };
    });

    const orderData = {
      numeroPedido: "ORD-" + Math.floor(Date.now() / 1000),
      clienteNombre: Security.sanitize(payload.clienteNombre),
      clienteTelefono: Security.sanitize(payload.clienteTelefono),
      productos: processedProducts,
      productSummary: processedProducts.map(p => `${p.product} (x${p.quantity})`).join(", "),
      modo: payload.modo.toUpperCase(),
      totalItems: processedProducts.reduce((acc, curr) => acc + curr.quantity, 0),
      tipoEntrega: payload.tipoEntrega,
      direccion: Security.sanitize(payload.direccion || "Retiro"),
      notas: Security.sanitize(payload.notas || ""),
      invoiceMethod: "WhatsApp",
      totalCalculado: totalCalculado
    };

    // Save to DB
    Repository.saveOrder(orderData);

    // Generate PDF (Refactor existing logic here if needed)
    // For now, let's keep it simple or call existing PDF generator
    const pdfUrl = "PDF_GENERATION_PENDING"; // Placeholder for Phase 2 integration
    
    return {
      status: "success",
      orderId: orderData.numeroPedido,
      total: totalCalculado
    };
  }
};
