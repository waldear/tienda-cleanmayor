/**
 * @file Config.gs
 * @description Centralized configuration provider.
 */

const CONFIG = {
  // Use PropertiesService to avoid hardcoding IDs in the script.
  // These should be set in Project Settings > Script Properties.
  get PRODUCTOS_SS_ID() {
    return PropertiesService.getScriptProperties().getProperty('PRODUCTOS_SS_ID') || "1dOOsiDPYdMUrxOevef4GYfD4EPrbFeDrrvwDEXhtMh8";
  },
  get PEDIDOS_SS_ID() {
    return PropertiesService.getScriptProperties().getProperty('PEDIDOS_SS_ID') || "1TqvsXWTIaCsyL1383EsNGTLoYsmeA5hO-i8Hadot-go";
  },
  get DOC_TEMPLATE_ID() {
    return PropertiesService.getScriptProperties().getProperty('DOC_TEMPLATE_ID') || "1xq9cNo13P3oO3noINnckOpQezL6XYMRZiR73kZWCpQU";
  },
  get PDF_FOLDER_ID() {
    return PropertiesService.getScriptProperties().getProperty('PDF_FOLDER_ID') || "1-YBWiDJAnN1qs_dLRvE0cnFB1x4WA0eh";
  },
  get WHATSAPP_NUMBER() {
    return PropertiesService.getScriptProperties().getProperty('WHATSAPP_NUMBER') || "5493525550761";
  },
  get API_KEY() {
    const value = PropertiesService.getScriptProperties().getProperty('API_KEY');
    if (!value) throw new Error("Missing required script property: API_KEY");
    return value;
  },
  get ADMIN_PIN() {
    const value = PropertiesService.getScriptProperties().getProperty('ADMIN_PIN');
    if (!value) throw new Error("Missing required script property: ADMIN_PIN");
    return value;
  }
};
