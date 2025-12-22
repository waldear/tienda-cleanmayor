# 🚀 GUÍA DEFINITIVA: Desplegar Google Apps Script Correctamente

## ❌ PROBLEMA: Error 401 al conectar
**Causa:** La implementación no está configurada como "Aplicación web" o no tiene permisos públicos.

---

## ✅ SOLUCIÓN PASO A PASO (MUY IMPORTANTE SEGUIR EXACTAMENTE)

### PASO 1️⃣: Abrir Google Apps Script
- Ve a https://script.google.com
- Abre tu proyecto "tienda-cleanmayor" (o el que tengas)

### PASO 2️⃣: Limpiar implementaciones antiguas
- En la parte superior, busca el botón **"Implementar"** (o ⚙️ Configuración)
- Haz clic en **"Ver todas las implementaciones"**
- **ELIMINA TODAS las implementaciones antiguas** (haz clic en el ícono 🗑️ papelera en cada una)
- Si no hay ninguna, perfecto, continúa

### PASO 3️⃣: Crear NUEVA implementación (esto es crítico)
- Haz clic en el botón **"Nueva implementación"** (ícono de + arriba a la derecha)
- Se abrirá un formulario con estos campos:

#### En el formulario verás:
```
┌─────────────────────────────────────┐
│ Tipo de implementación:             │
│ [▼ Aplicación web]  ← SELECCIONA   │
│                                     │
│ Descripción (opcional):             │
│ [Facturación tienda CleanMayor]     │
│                                     │
│ Ejecutar el script como:            │
│ [▼ ramirez.waldemar@gmail.com] ← OK│
│                                     │
│ Quién tiene acceso a la app:        │
│ [▼ Cualquiera]  ← ESTO ES CRÍTICO  │
│                                     │
│ [Cancelar] [Implementar]            │
└─────────────────────────────────────┘
```

**⚠️ VERIFICACIONES IMPORTANTES:**
- ✅ Tipo: **"Aplicación web"** (NO "API" ni otra cosa)
- ✅ Ejecutar como: Tu email de Google
- ✅ Quién tiene acceso: **"Cualquiera"** (esta es la clave)

### PASO 4️⃣: Hacer clic en "Implementar"
- Se abrirá una ventana pidiendo permiso
- Haz clic en tu cuenta de Google
- Haz clic en "Permitir" a todos los permisos

### PASO 5️⃣: COPIAR LA URL NUEVA
- Después de implementar, verás un cuadro que dice:
```
Implementación creada con éxito

Nuevo ID de implementación:
xxxxxxxxxxxxx

URL de la aplicación web:
https://script.google.com/macros/s/XXXXXXXXXX/exec
```

**📋 COPIA EXACTAMENTE LA URL (debe terminar en `/exec`)**

---

## 📌 VERIFICACIÓN RÁPIDA DE LA URL

Una vez que tengas la URL nueva, puedes probar que funciona:
1. Abre la consola de tu navegador (F12)
2. Pega esto:
```javascript
fetch("TU_URL_AQUI", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({test: "ok"})
})
.then(r => r.json())
.then(d => console.log("✅ Funciona:", d))
.catch(e => console.log("❌ Error:", e));
```
3. Si ves `✅ Funciona` → La URL es correcta

---

## 🐛 SI SIGUE FALLANDO

Si aún después de todo sigue con error 401, prueba esto:

### Opción A: Crear nueva implementación desde cero
1. Elimina TODAS las implementaciones
2. Espera 2-3 minutos
3. Crea una nueva siguiendo los pasos arriba

### Opción B: Verificar que el código está bien
En Google Apps Script, asegúrate que la primera línea sea:
```javascript
function doPost(e) {
```

No debe tener nada antes de `function doPost`.

---

## 🔄 UNA VEZ TENGAS LA URL FUNCIONANDO

1. Copia la URL nueva
2. Abre el archivo `index.html` en VS Code
3. Ve a la línea ~127
4. Busca: `const GOOGLE_SCRIPT_URL = "..."`
5. Reemplaza con tu URL:
```javascript
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/TU_URL_NUEVA/exec";
```
6. Guarda (Ctrl+S)
7. ¡Listo! Ya debería funcionar

---

## ❓ PREGUNTAS FRECUENTES

**P: ¿Qué es `/dev` vs `/exec`?**
R: `/dev` = testing (requiere login), `/exec` = producción (para cualquiera)

**P: ¿Por qué sigue fallando?**
R: Probablemente "Quién tiene acceso" no está en "Cualquiera"

**P: ¿Puedo usar la misma URL varias veces?**
R: Sí, una vez creada, la URL funciona para siempre

**P: ¿Qué hago si no veo el botón "Nueva implementación"?**
R: Busca en la barra superior: Implementar → Nueva implementación

---

## 📞 RESUMEN

Si sigues EXACTAMENTE estos pasos, debe funcionar. Lo más crítico es:
1. ✅ Tipo = **"Aplicación web"**
2. ✅ Quién tiene acceso = **"Cualquiera"**
3. ✅ Copiar la URL que termina en **`/exec`**
4. ✅ Pegarla en `index.html`

¿Necesitas ayuda? Cuéntame en qué paso te quedas atascado.
