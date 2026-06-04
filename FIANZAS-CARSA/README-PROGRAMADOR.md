# CARSA Fianzas — Landing de Fianzas

Landing page del calculador de fianzas (cumplimiento, anticipo, vicios ocultos).
URL pública actual: https://carsaseguros.mx/carsa-fianzas

---

## 📦 Estructura de archivos

```
carsa-fianzas/
├── index.html         (165 KB) Estructura HTML + schemas JSON-LD para SEO
├── styles.css         (56 KB)  Todos los estilos
├── script.js          (59 KB)  Calculadora, captura de leads, PDFs
├── README-PROGRAMADOR.md       Este archivo
└── og-fianzas-carsa.jpg        ← FALTA crearla (1200x630 px)
```

---

## 🔗 Dependencias externas (CDN, no requieren archivos locales)

1. **Google Fonts** (Bricolage Grotesque, Fraunces, JetBrains Mono)
2. **jsPDF** (para generar los PDFs de cotización y requisitos)
3. **Sin frameworks ni build steps.** Vanilla HTML/CSS/JS puro.

---

## 🎯 Funcionalidades principales

### 1. Calculadora de fianzas
- `calcularFianza(montoAfianzado, primeraVez)` calcula prima, derechos, IVA, total
- **Prima neta mínima de $2,700** cuando el monto afianzado es < $250,000
- **Ratificación de firmas** se cobra UNA sola vez por contrato (aunque haya varias fianzas)
- Constantes en `CONFIG` al inicio del JS

### 2. CTA inteligente post-cotización
- Bloque oculto que aparece SOLO cuando el usuario ingresó un monto válido
- Rellena dinámicamente total y monto del contrato
- Link de WhatsApp pre-armado con los datos

### 3. Captura de leads (NUEVO)
Cuando un usuario descarga un PDF:

1. Aparece modal pidiendo **nombre, correo y teléfono** (obligatorios)
2. Al enviar:
   - El PDF se descarga automáticamente
   - Los datos se envían a **Netlify Forms** (formulario `lead-pdf-download`)
   - Si es cotización, incluye detalle del cálculo
   - Los datos se guardan en `sessionStorage` (smart memory)
3. **En descargas posteriores** en la misma sesión, NO se vuelven a pedir los datos
   (pero igual se registra cada descarga en Netlify)

⚠️ **CONFIGURAR EN NETLIFY después del deploy:**
1. Netlify Dashboard → Sitio → **Forms**
2. Buscar formulario `lead-pdf-download`
3. Settings & usage → Form notifications
4. Agregar email: katycanul@segurosfianzas.com
5. Plan gratuito: 100 envíos/mes. Después: $19 USD/mes hasta 1,000

### 4. Generación de PDFs (jsPDF)
- PDF de Cotización: desglose por fianza, con datos del cliente embebidos
- PDF de Requisitos: requisitos PFAE y Persona Moral
- Ambos con logo CARSA embebido (base64)

---

## 🎨 Sistema de diseño

### Variables CSS principales
```css
--navy-deep: #0d2c5a   /* Navy principal */
--navy: #163d76        /* Navy secundario */
--gold: #b8923d        /* Dorado oscuro */
--gold-bright: #d4af55 /* Dorado claro / acentos */
--cta: #1e5fb4         /* Azul botones */
--whatsapp: #25d366    /* Verde WhatsApp */
```

### Fuentes
- **Fraunces** (serif) → Titulares
- **Bricolage Grotesque** → Texto general
- **JetBrains Mono** → Etiquetas, números

### Breakpoints
- 980px → Tablet
- 720px → Móvil
- 540px → Móviles pequeños

---

## 🔍 SEO incluido

- Title (58 chars, óptimo)
- Description (122 chars, óptimo)
- Canonical → https://carsaseguros.mx/carsa-fianzas
- Open Graph completo
- Twitter Cards
- Geo meta tags
- 3 Schemas JSON-LD: FinancialService, FAQPage, BreadcrumbList

⚠️ Los schemas JSON-LD deben permanecer EN EL HTML, no moverse al JS externo.

---

## 🚀 Cómo subir

### Opción A (RECOMENDADA) — Subcarpeta del sitio principal

URL final: `https://carsaseguros.mx/carsa-fianzas`

1. Subir los 3 archivos a la subcarpeta correspondiente
2. Los 3 archivos deben estar en la MISMA carpeta (rutas relativas)
3. Configurar notificaciones de Netlify Forms

### Opción B — Subdominio independiente

URL final: `https://fianzas.carsaseguros.mx`

1. Crear sitio nuevo en Netlify
2. Configurar dominio personalizado al subdominio
3. Cambiar en HTML las referencias a la URL nueva:
   - canonical, og:url, og:image
   - URLs en los 3 schemas JSON-LD
4. Subir y configurar Forms

---

## 🔧 Datos hardcoded

### Constantes CONFIG (en script.js)
```javascript
const CONFIG = {
  cuota:              0.012,    // 1.20% sobre afianzado
  primaMinima:        2700,
  umbralPrimaMinima:  250000,
  derechosIV:         0.035,
  expedicion:         3000,
  ratificacion:       3500,
  buro:               200,
  iva:                0.16
};
```

### Contactos (en HTML y JS)
- Tel fijo: 999 944 4999
- WhatsApp: 999 265 3187
- Email cotizaciones: katycanul@segurosfianzas.com
- Email Ricardo: rcastilla@segurosfianzas.com
- Email general: contacto@segurosfianzas.com
- Dirección: Calle 10 #326, Col. Gonzalo Guerrero, 97115, Mérida, Yucatán

---

## ⚠️ Pendiente: imagen Open Graph

**og-fianzas-carsa.jpg** todavía NO existe.

- Tamaño: 1200 x 630 px (exacto)
- Formato: JPG
- Peso: < 200 KB
- Ubicación: misma carpeta que index.html

---

## 🧪 Cómo probar

1. **Calculadora:** ingresar monto, verificar que aparece el CTA dorado
2. **Captura de leads:**
   - Click "Descargar cotización" → modal pide datos
   - Llenar y enviar → PDF se descarga
   - Verificar en Netlify Dashboard → Forms que llegó el lead
3. **Smart memory:**
   - Segunda descarga en misma sesión → NO pide datos
   - Cerrar navegador → vuelve a pedir datos
4. **Open Graph:** probar en opengraph.xyz cuando exista la imagen

---

## 🐛 Troubleshooting

**CSS no carga** → verificar que styles.css esté en la misma carpeta que index.html

**JS no funciona** → verificar script.js en misma carpeta + jsPDF cargando

**PDFs en blanco** → revisar conexión al CDN de jsPDF

**Leads NO llegan a Katy** → verificar que `lead-pdf-download` aparece en Netlify Forms y que las notificaciones por email están configuradas

---

## 📞 Contacto

- Sitio: https://carsaseguros.mx
- Despacho: 999 944 4999
- WhatsApp: 999 265 3187
- Email: contacto@segurosfianzas.com
