/**
 * @file Repository.gs
 * @description Data access layer for Google Sheets.
 */

const Repository = {
  /**
   * Fetches all products from the spreadsheet.
   */
  getProducts: function() {
    const cache = CacheService.getScriptCache();
    const cached = cache.get("products_list");
    if (cached) return JSON.parse(cached);

    const ss = SpreadsheetApp.openById(CONFIG.PRODUCTOS_SS_ID);
    const sheet = ss.getSheets()[0];
    const values = sheet.getDataRange().getValues();
    const headers = values.shift();
    
    const products = values.map(row => {
      let obj = {};
      headers.forEach((h, i) => {
        const key = h.toString().toLowerCase().replace(/_/g, " ").trim();
        const value = row[i];
        if (key === 'nombre') obj.name = value;
        if (key.includes('minorista')) obj.priceMinorista = value;
        if (key.includes('mayorista')) obj.priceMayorista = value;
        if (key.includes('imagen') || key === 'foto') obj.image = value;
        if (key.includes('descrip')) obj.description = value;
        if (key === 'categoria' || key === 'categoría') obj.category = value;
      });
      return obj;
    }).filter(p => p.name);

    cache.put("products_list", JSON.stringify(products), 21600); // Cache for 6 hours
    return products;
  },

  /**
   * Fetches all orders.
   */
  getOrders: function() {
    const ss = SpreadsheetApp.openById(CONFIG.PEDIDOS_SS_ID);
    const sheet = ss.getSheets()[0];
    const values = sheet.getDataRange().getValues();
    const headers = values.shift();
    
    return values.map(row => {
      let obj = {};
      headers.forEach((h, i) => {
        obj[h.toString().toLowerCase().replace(/ /g, "_")] = row[i];
      });
      return obj;
    }).reverse();
  },

  /**
   * Saves a new order with atomic lock.
   */
  saveOrder: function(orderData) {
    const lock = LockService.getScriptLock();
    try {
      lock.waitLock(30000); // Wait up to 30s
      const ss = SpreadsheetApp.openById(CONFIG.PEDIDOS_SS_ID);
      const sheet = ss.getSheets()[0];
      
      sheet.appendRow([
        new Date(),
        orderData.numeroPedido,
        orderData.productSummary,
        orderData.modo,
        orderData.totalItems,
        orderData.tipoEntrega,
        orderData.direccion,
        "", // referencias
        orderData.notas,
        orderData.invoiceMethod,
        "", // email
        orderData.clienteNombre,
        orderData.clienteTelefono,
        orderData.totalCalculado // Added field for security
      ]);
    } finally {
      lock.releaseLock();
    }
  }
};
