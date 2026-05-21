/**
 * @file Controller.gs (google-apps-script.gs)
 * @description Main entry point. Routes requests to appropriate services.
 */

function doGet(e) {
  try {
    const action = e.parameter.action || "products";

    switch(action) {
      case "products":
        return createResponse(Repository.getProducts());
      
      case "orders":
        if (!Security.verifySession(e.parameter.token)) {
          throw new Error("Unauthorized session");
        }
        return createResponse(Repository.getOrders());
        
      case "stats":
        if (!Security.verifySession(e.parameter.token)) {
          throw new Error("Unauthorized session");
        }
        return createResponse(calculateStats(Repository.getOrders()));

      default:
        throw new Error("Invalid action");
    }
  } catch (error) {
    return createError(error.message);
  }
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action || "placeOrder";

    switch(action) {
      case "placeOrder":
        return createResponse(Service.processOrder(payload));
        
      case "login":
        const token = Security.createSession(payload.pin);
        return createResponse({ token: token });

      default:
        throw new Error("Invalid post action");
    }
  } catch (error) {
    return createError(error.message);
  }
}

/**
 * Helper to calculate stats safely
 */
function calculateStats(orders) {
  const totalOrders = orders.length;
  const totalItems = orders.reduce((acc, curr) => acc + (parseInt(curr.total_items) || 0), 0);
  const today = new Date().toDateString();
  const salesToday = orders.filter(o => new Date(o.timestamp).toDateString() === today).length;
  
  return {
    totalOrders,
    totalItems,
    salesToday
  };
}

/**
 * Utility to wrap responses
 */
function createResponse(data) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    timestamp: new Date().toISOString(),
    data: data
  })).setMimeType(ContentService.MimeType.JSON);
}

function createError(message) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "error",
    message: message
  })).setMimeType(ContentService.MimeType.JSON);
}
