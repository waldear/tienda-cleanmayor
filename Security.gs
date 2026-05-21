/**
 * @file Security.gs
 * @description Security and utility functions.
 */

const Security = {
  /**
   * Validates the request API Key.
   */
  validateRequest: function(e) {
    const key = e.parameter.key || (e.postData && JSON.parse(e.postData.contents).key);
    if (!key || key !== CONFIG.API_KEY) {
      throw new Error("Unauthorized: Invalid API Key");
    }
    return true;
  },

  /**
   * Sanitizes string inputs to prevent XSS.
   */
  sanitize: function(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[m];
    });
  },

  /**
   * Simple JWT-like Session Token (Stateless for Admin Panel).
   * Note: For professional SaaS, consider a more robust HMAC implementation.
   */
  createSession: function(pin) {
    if (pin !== CONFIG.ADMIN_PIN) throw new Error("Invalid PIN");
    const expiry = new Date().getTime() + (24 * 60 * 60 * 1000); // 24h
    const data = `admin:${expiry}`;
    const hash = Utilities.computeHmacSha256Signature(data, CONFIG.API_KEY);
    const token = Utilities.base64EncodeWebSafe(JSON.stringify({
      data: data,
      hash: Utilities.base64EncodeWebSafe(hash)
    }));
    return token;
  },

  verifySession: function(token) {
    try {
      const decoded = JSON.parse(Utilities.newBlob(Utilities.base64DecodeWebSafe(token)).getDataAsString());
      const expectedHash = Utilities.base64EncodeWebSafe(
        Utilities.computeHmacSha256Signature(decoded.data, CONFIG.API_KEY)
      );
      if (decoded.hash !== expectedHash) return false;
      
      const [user, expiry] = decoded.data.split(':');
      if (new Date().getTime() > parseInt(expiry)) return false;
      
      return true;
    } catch (e) {
      return false;
    }
  }
};
