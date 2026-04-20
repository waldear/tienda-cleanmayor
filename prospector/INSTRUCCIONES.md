# Prospector de Negocios · Ituzaingó, Corrientes

## Modo 1 — Mock Data (ya funciona)

Abrí el prospector con un servidor local:

```bash
# Desde la carpeta raíz del proyecto:
npx serve .
# Luego abrí: http://localhost:3000/prospector/prospector.html
```

O con Python:
```bash
python3 -m http.server 8080
# Luego abrí: http://localhost:8080/prospector/prospector.html
```

---

## Modo 2 — Google Maps Real (MCP)

### Paso 1 — Obtener la API Key

1. Ir a [console.cloud.google.com](https://console.cloud.google.com)
2. Crear un proyecto nuevo o usar uno existente
3. Ir a **APIs y Servicios → Biblioteca**
4. Activar **Places API (New)**
5. Ir a **APIs y Servicios → Credenciales → Crear credencial → Clave de API**
6. Copiar la clave generada

### Paso 2 — Configurar el MCP

Editar `.claude/settings.json` (en la raíz del proyecto) y reemplazar:

```
"GOOGLE_MAPS_API_KEY": "REEMPLAZAR_CON_TU_API_KEY"
```

con tu clave real.

### Paso 3 — Reiniciar Claude Code

Cerrar y volver a abrir Claude Code. El MCP `google-maps` aparecerá disponible.

### Paso 4 — Prompt de ejemplo

Una vez con el MCP activo, pedile a Claude:

```
Usá el MCP de Google Maps para buscar los siguientes tipos de negocio
en Ituzaingó, Corrientes, Argentina:
- almacenes y minimercados
- distribuidoras mayoristas
- restaurantes y rotiserías
- ferreterías

Para cada negocio encontrado:
1. Verificá si tiene website
2. Clasificalo como: sin_web / web_basica / web_ok
3. Generá un mensaje de WhatsApp personalizado ofreciendo una tienda online
4. Guardá los resultados en prospector/negocios-reales.json con el mismo
   formato que negocios-mock.json
```

Después reemplazá la línea en `prospector.html`:
```js
const res = await fetch('negocios-mock.json');
```
por:
```js
const res = await fetch('negocios-reales.json');
```

---

## Estructura del JSON de negocios

```json
{
  "id": 1,
  "nombre": "Nombre del negocio",
  "categoria": "almacen|kiosco|mayorista|gastronomia|ferreteria",
  "direccion": "Dirección completa",
  "telefono": "3786XXXXXX",
  "rating": 4.2,
  "resenas": 18,
  "tiene_web": false,
  "estado_web": null,
  "lat": -27.5968,
  "lng": -56.6932,
  "google_maps_url": "https://maps.google.com/?q=..."
}
```

`estado_web` puede ser: `null` (sin web), `"basica"`, `"desactualizada"`, o `null` cuando `tiene_web: true` y está OK.

---

## Exportar a Google Sheets

1. Hacer click en **Exportar CSV** en la herramienta
2. Abrir [sheets.google.com](https://sheets.google.com)
3. Crear nueva hoja → Archivo → Importar → subir el CSV descargado
4. Usar la columna **Mensaje WhatsApp** para el seguimiento de contactos
