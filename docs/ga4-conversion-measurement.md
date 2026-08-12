# Medicion fina de conversiones en GA4/GTM

## Eventos implementados

- `click_whatsapp`
- `click_call`
- `form_start`
- `form_submit`
- `form_error`
- `form_success`
- `select_product`

### Embudo de la landing de ahorro y retiro

Las rutas `/seguro-de-ahorro`, `/plan-para-el-retiro` y `/ppr` agregan estos eventos para medir el diagnóstico paso a paso:

- `landing_view`
- `quote_start`
- `quote_step_1`
- `quote_step_2`
- `quote_step_3`
- `lead_form_submit`
- `whatsapp_click`
- `phone_click`

`whatsapp_click` y `phone_click` son alias específicos de la landing. Los eventos globales `click_whatsapp` y `click_call` se conservan para no romper reportes ni conversiones existentes.

Parámetros adicionales de la landing:

- `landing_variant`
- `step_number`
- `step_value`
- `objective`
- `contribution_range`
- `age_range`

## Parametros relevantes

- `page_path`
- `location`
- `button_location`
- `insurance_type`
- `product_name`
- `phone_number`
- `form_name`
- `field_name`
- `error_type`
- `error_message`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

## Casos cubiertos

- Clic en WhatsApp separado por pagina, producto y ubicacion del boton.
- Clic en llamada separado por telefono y producto.
- Inicio de formulario.
- Envio de formulario.
- Error de formulario por validacion nativa.
- Error de formulario por fallo de request AJAX a `/enviar.php`.
- Exito de formulario en flujos AJAX a `/enviar.php`.
- Exito de formulario en la pagina `/agradecimiento` con lectura de `?producto=`.
- Seleccion de producto en `/contacto`.

## Eventos clave en GA4

Marcar como eventos clave:

- `click_whatsapp`
- `click_call`
- `form_success`

Opcional segun el modelo comercial:

- `form_submit`

## Configuracion sugerida en GTM

1. Crear variables de Data Layer para:
   - `page_path`
   - `location`
   - `button_location`
   - `insurance_type`
   - `product_name`
   - `phone_number`
   - `form_name`
   - `field_name`
   - `error_type`
   - `error_message`
   - `utm_source`
   - `utm_medium`
   - `utm_campaign`
   - `utm_content`
   - `utm_term`

2. Crear triggers de tipo `Custom Event` para:
   - `click_whatsapp`
   - `click_call`
   - `form_start`
   - `form_submit`
   - `form_error`
   - `form_success`
   - `select_product`

3. Crear etiquetas GA4 Event con el mismo nombre del evento.

## Nota sobre WhatsApp

Los enlaces de WhatsApp ahora agregan una linea de atribucion al mensaje con:

- `source`
- `medium`
- `campaign`
- `producto`
- `ubicacion`
- `pagina`

Esto ayuda a que el equipo comercial vea el origen del lead incluso cuando la conversacion continua fuera del sitio.
