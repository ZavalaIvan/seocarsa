# Memoria del proyecto SEOCARSA

## Estado general

Proyecto de sitio web estatico/PHP para CARSA Seguros y Fianzas. El repositorio contiene paginas HTML publicas, formularios que envian a `enviar.php`, assets locales en `Content/`, scripts en `Scripts/`, PHPMailer incluido en `phpmailer/`, un CMS ligero en `jocms/` y documentacion SEO/medicion en `docs/`.

No hay `package.json`, `composer.json` raiz, flujo de build, lint o tests automatizados del proyecto principal. Cualquier verificacion debe hacerse con scripts locales, revision de HTML/PHP/JS y, cuando exista PHP instalado, lint de archivos PHP.

## Rutas y SEO

- Las rutas canonicas publicas viven en `.htaccess` y `sitemap.xml`.
- Al agregar o renombrar una pagina publica, actualizar ambos archivos.
- Mantener un H1 unico por pagina, `title`, `meta description`, `canonical`, Open Graph/Twitter cuando aplique y schema via JSON-LD o `/Scripts/carsa-schema.js`.
- Mantener `robots.txt` alineado con las rutas publicas y bloquear areas internas como `jocms/`, `phpmailer/`, logs y pruebas.

## Tracking y conversiones

- El tracking principal esta en `/Scripts/carsa-tracking.js`.
- La deteccion de trafico desde herramientas de IA esta en `/Scripts/ai-traffic-detection.js`.
- La documentacion de eventos GA4/GTM esta en `docs/ga4-conversion-measurement.md` y `docs/gtm-ai-traffic.md`.
- Al cambiar formularios, CTAs de WhatsApp/telefono o paginas de agradecimiento, validar que se sigan enviando `form_start`, `form_submit`, `form_error`, `form_success`, `click_whatsapp`, `click_call` y `select_product` cuando corresponda.

## Seguridad y operacion

- No agregar nuevas credenciales al repositorio. Mover configuraciones sensibles a variables de entorno o archivos fuera de versionado antes de preparar despliegues.
- Revisar y retirar de produccion archivos de prueba o diagnostico como `info.php`, `test-mail.php`, `test-phpmailer.php`, `error_log` y `smtp-debug.log`.
- `enviar.php` actualmente maneja formularios y usa PHPMailer; cualquier cambio debe probar validaciones, destinatarios, CC y respuesta AJAX.
- Para produccion, `display_errors` debe estar desactivado.

## Verificacion recomendada

- Revisar estado Git antes de editar: `git status --short --branch`.
- Inventariar paginas y assets con `rg --files`.
- Ejecutar `python Scripts/check-mojibake.py` si Python esta disponible.
- Si PHP esta instalado: ejecutar lint sobre archivos PHP antes de desplegar cambios.
- Verificar que las rutas de `sitemap.xml` tengan rewrite interno en `.htaccess`.
- Revisar enlaces/assets locales, especialmente imagenes con espacios o caracteres codificados en la URL.

## Deudas conocidas

- Hay credenciales/configuracion sensible versionada en archivos PHP de configuracion; deben rotarse y sacarse del repositorio antes de considerar el proyecto listo para produccion madura.
- Existen logs y archivos de prueba versionados aunque `.gitignore` ya ignora logs nuevos.
- El entorno local actual no tiene PHP disponible, por lo que no se pudo lint-ear ni ejecutar `enviar.php`.
- Existe al menos un asset referenciado con `%20` que no coincide con el nombre real del archivo con espacio en `blog-guia-seguro-ahorro.html`.
- Los reportes existentes de Unlighthouse son utiles como referencia, pero no sustituyen una auditoria fresca despues de cambios.
