# Tracking de trafico desde herramientas de IA

Este sitio envia un evento a `window.dataLayer` cuando detecta que la visita viene desde una herramienta de IA conocida.

Evento esperado:

```js
window.dataLayer.push({
  event: "ai_traffic_detected",
  ai_source: "<fuente_detectada>",
  ai_referrer: document.referrer,
  page_path: window.location.pathname
});
```

Fuentes detectadas:

- `chatgpt`
- `openai`
- `perplexity`
- `claude`
- `anthropic`
- `gemini`
- `copilot`
- `bing_chat`
- `poe`
- `you`
- `phind`

El script usa `sessionStorage` para evitar duplicar el mismo evento por fuente y ruta durante la misma sesion.

## Configuracion en Google Tag Manager

1. Crear variable **Data Layer Variable** con nombre `ai_source`.
2. Crear variable **Data Layer Variable** con nombre `ai_referrer`.
3. Crear variable **Data Layer Variable** con nombre `page_path`.
4. Crear trigger **Custom Event**:
   - Event name: `ai_traffic_detected`
5. Crear tag **GA4 Event**:
   - Event name: `ai_traffic_detected`
   - Trigger: `ai_traffic_detected`
6. Enviar estos parametros en el tag GA4:
   - `ai_source`: `{{ai_source}}`
   - `ai_referrer`: `{{ai_referrer}}`
   - `page_path`: `{{page_path}}`

## Prueba manual

En la consola del navegador se puede simular el push esperado:

```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "ai_traffic_detected",
  ai_source: "chatgpt",
  ai_referrer: "https://chatgpt.com/",
  page_path: window.location.pathname
});
```

Despues valida el evento en Tag Assistant, Preview Mode de GTM y DebugView de GA4.
