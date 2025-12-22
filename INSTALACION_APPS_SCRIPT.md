# 📚 Instalación de Google Apps Script

## ¿Qué necesitas?
1. Una **Hoja de cálculo de Google** con una pestaña llamada "Pedidos"
2. Una **Plantilla de Google Docs** para generar facturas
3. Una **Carpeta de Google Drive** donde guardar los PDFs

## Pasos de Instalación

### 1️⃣ Crear la Hoja de Cálculo (Pedidos)
- Ve a [Google Sheets](https://sheets.google.com)
- Crea una nueva hoja o usa una existente
- **Crea una pestaña llamada "Pedidos"** con estas columnas:
  - Fecha
  - Número Pedido
  - Productos
  - Modo (Minorista/Mayorista)
  - Total Items
  - Tipo Entrega
  - Dirección
  - Referencias
  - Notas
  - Método Factura
  - Email Cliente

### 2️⃣ Crear la Plantilla de Factura
- Ve a [Google Docs](https://docs.google.com)
- Crea un nuevo documento (tu plantilla de factura)
- Copia y pega en ella:
```
FACTURA #{{NUMERO_PEDIDO}}

Fecha: {{FECHA}}
Cliente: {{CLIENTE}}

PRODUCTOS:
{{PRODUCTOS}}

Modo de Compra: {{MODO}}
Tipo de Entrega: {{ENTREGA}}
Dirección: {{DIRECCION}}
Total de Items: {{TOTAL_ITEMS}}
```
- **Copia el ID del documento** (está en la URL: `/document/d/AQUI_ESTA_EL_ID/`)

### 3️⃣ Crear Carpeta para PDFs
- Ve a [Google Drive](https://drive.google.com)
- Crea una carpeta llamada "Facturas CleanMayor"
- **Copia el ID de la carpeta** (está en la URL: `/folders/AQUI_ESTA_EL_ID`)

### 4️⃣ Crear el Apps Script
- Ve a [Google Apps Script](https://script.google.com)
- Crea un **nuevo proyecto**
- **Elimina el código por defecto** (function myFunction...)
- **Copia TODO el código** de `google-apps-script.gs` de este repositorio
- **Pega el código** en el editor

### 5️⃣ Actualizar IDs en el Código
En el apartado `CONFIG` del código, reemplaza:
```javascript
const CONFIG = {
  SHEET_NAME: "Pedidos",  // ← Nombre de tu pestaña (si es distinto)
  DOC_TEMPLATE_ID: "AQUI_VA_EL_ID_DE_TU_PLANTILLA_DE_DOCS",
  PDF_FOLDER_ID: "AQUI_VA_EL_ID_DE_TU_CARPETA_DE_DRIVE",
  WHATSAPP_NUMBER: "5493525550761",  // ← Tu número de WhatsApp (con código país)
  EMAIL_FROM: "ramirez.waldemar@gmail.com"  // ← Tu email de Google
};
```

### 6️⃣ Autorizar el Script
- Haz clic en el botón **"Ejecutar"** (aunque falle, es para autorizar)
- Se abrirá una ventana pidiendo permisos
- **Permite todos los permisos** que pide

### 7️⃣ Desplegar como Aplicación Web
- Ve a **"Implementar"** → **"Nueva implementación"**
- Tipo: **"Aplicación web"**
- Ejecutar como: **Tu cuenta de Google**
- Quién tiene acceso: **"Cualquiera"**
- Haz clic en **"Implementar"**
- **Copia la URL que aparece** (es larga y comienza con `https://script.google.com/macros/s/...`)

### 8️⃣ Actualizar el HTML
En `index.html`, busca esta línea (alrededor de la línea 127):
```javascript
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/TU_URL_AQUI/exec";
```

Reemplázala con tu URL:
```javascript
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz...TU_URL_COMPLETA.../exec";
```

### 9️⃣ ¡Probar!
- Abre tu tienda (`index.html`)
- Agrega un producto
- Haz clic en "Finalizar Pedido"
- Completa los datos
- ¡Debería abrir WhatsApp con tu pedido y enviar el email!

## 🐛 Solución de Problemas

### ❌ Error 401 (Unauthorized)
- La URL del Apps Script no está correctamente desplegada
- Verifica que esté publicada como "Aplicación web"
- Vuelve a copiar la URL exacta del paso 7️⃣

### ❌ Error al generar PDF
- Verifica que el `DOC_TEMPLATE_ID` sea correcto
- Asegúrate de que el documento existe en tu Google Drive
- Que tengas permisos de lectura/escritura

### ❌ No guarda en Sheets
- Verifica que la pestaña se llama exactamente "Pedidos"
- O cambia `SHEET_NAME` en el código con el nombre correcto

### ❌ No envía email
- Activa la API de Gmail en Google Apps Script
- Verifica que el email sea correcto en `EMAIL_FROM`

## 📞 Contacto
Si necesitas ayuda, contáctame por WhatsApp: 5493525550761
