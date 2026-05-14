# Auditoria y recomendaciones LLM/SEO

## Arquitectura detectada

- Tipo de proyecto: sitio estatico/PHP con archivos HTML, `enviar.php`, assets en `Content/` y scripts en `Scripts/`.
- No se detecto `package.json`, por lo que no hay flujo `npm run lint` ni `npm run build`.
- Rutas publicas canonicas definidas en `.htaccess`.
- Scripts globales: Google Tag Manager y scripts compartidos como `/Scripts/carsa-tracking.js`, `/Scripts/ai-traffic-detection.js` y `/Scripts/carsa-schema.js`.
- Metadatos SEO: la mayoria de paginas publicas tienen `title`, `description`, `canonical`, Open Graph y Twitter tags.
- `robots.txt`: existe y fue actualizado para crawlers de IA.
- `sitemap.xml`: existe y apunta a `https://carsaseguros.mx`.
- Schema.org: existe en varias paginas; se agrego helper progresivo para cubrir Organization, InsuranceAgency, WebSite, BreadcrumbList y FAQPage cuando falten.

## Rutas publicas principales

- `/`
- `/contacto`
- `/plan-personal-de-retiro`
- `/seguro-de-vida`
- `/gastos-medicos-mayores`
- `/seguro-de-hogar`
- `/seguro-de-auto`
- `/seguro-empresarial`
- `/fianzas`
- `/carsa-fianzas`
- `/fianza-de-cumplimiento`
- `/fianza-de-anticipo`
- `/fianza-de-vicios-ocultos`
- `/fianza-de-credito`
- `/fianza-de-fidelidad`
- `/recursos`
- `/unete`
- `/seguro-ahorro-precios-mexico`
- `/seguro-ahorro-en-merida-yucatan`
- `/cotizar-seguro-ahorro-merida`
- `/cotizador-publico-webapp`
- `/blog-seguro-ahorro`
- `/blog-guia-seguro-ahorro`

## Recomendaciones de contenido futuro para LLM/SEO

- Preguntas frecuentes por producto: auto, vida, gastos medicos, hogar, empresarial, retiro y fianzas.
- Comparativas: seguro de vida vs plan de retiro, GMM individual vs familiar, fianza de cumplimiento vs anticipo.
- Guias de decision: como elegir deducible, suma asegurada, coaseguro, beneficiarios y plazo de ahorro.
- Definiciones simples: prima, deducible, coaseguro, suma asegurada, exclusiones, periodo de espera, beneficiario, fianza.
- Costos aproximados: rangos orientativos por perfil, edad, cobertura y tipo de producto.
- Deducciones fiscales: contenidos sobre plan personal de retiro y beneficios fiscales aplicables en Mexico.
- Casos de uso: seguros para familias, independientes, PyMEs, contratistas, arrendadores y profesionistas.
- Paginas comparativas de ciudad/estado cuando haya atencion local real, por ejemplo Merida y Yucatan.

## Notas LLM-friendly

- Mantener un H1 unico y descriptivo por pagina.
- Usar H2 con preguntas reales cuando el contenido resuelva dudas concretas.
- No agregar texto oculto solo para SEO.
- Priorizar respuestas directas, visibles y utiles para usuarios humanos.
- Mantener schema FAQPage alineado con preguntas visibles en la pagina.
