(function () {
  'use strict';

  var INSURANCE_ROUTES = [
    { pattern: /seguro-de-auto|autos?/, type: 'auto' },
    { pattern: /gastos-medicos-mayores|seguro-medico|gmm|salud/, type: 'gastos_medicos_mayores' },
    { pattern: /seguro-de-vida|vida/, type: 'vida' },
    { pattern: /seguro-de-hogar|hogar/, type: 'hogar' },
    { pattern: /seguro-empresarial|empresarial/, type: 'empresarial' },
    { pattern: /fianza|fianzas/, type: 'fianzas' },
    { pattern: /seguro-ahorro|cotizar-seguro-ahorro|blog-seguro-ahorro|blog-guia-seguro-ahorro|cotizador-publico-webapp/, type: 'ahorro' },
    { pattern: /plan-personal-de-retiro|retiro|planes-de-ahorro/, type: 'retiro' },
    { pattern: /responsabilidad-civil/, type: 'responsabilidad_civil' },
    { pattern: /flotillas/, type: 'flotillas' },
    { pattern: /transporte/, type: 'transporte' }
  ];

  var PRODUCT_LABELS = {
    ahorro: 'Ahorro',
    vida: 'Vida',
    gastos_medicos_mayores: 'Salud',
    hogar: 'Hogar',
    auto: 'Automovil',
    empresarial: 'Empresarial',
    fianzas: 'Fianzas',
    retiro: 'Retiro',
    otro: 'Otro',
    general: 'General'
  };

  var CTA_WORDS = [
    'cotizar',
    'contactar',
    'contacto',
    'asesoria',
    'asesoria',
    'agendar',
    'ver mas',
    'conocer mas',
    'hablar',
    'solicitar',
    'whatsapp'
  ];

  var trackedForms = {};
  var trackedScroll = {};
  var trackedTime = {};
  var trackingState = window.__carsaTrackingState = window.__carsaTrackingState || {
    initialized: false,
    submittedForms: typeof WeakMap === 'function' ? new WeakMap() : null,
    formSubmitKeys: {},
    formErrorKeys: {},
    formSuccessKeys: {},
    lastFormSubmitAt: 0,
    lastSubmittedForm: null,
    lastSelectedProduct: null
  };
  var SUBMIT_DEDUP_WINDOW_MS = 5000;
  var FORM_ERROR_DEDUP_WINDOW_MS = 4000;
  var FORM_SUCCESS_DEDUP_WINDOW_MS = 15000;
  var WHATSAPP_AFTER_SUBMIT_SUPPRESS_MS = 3000;
  var LEAD_REQUEST_WINDOW_MS = 20000;

  window.trackEvent = function (eventName, params) {
    var eventParams = params || {};
    var now;
    var dedupKey;
    var lastPushAt;

    if (!eventName) {
      return;
    }

    if (eventName === 'form_submit') {
      now = Date.now();
      dedupKey = [
        eventParams.form_name || '',
        eventParams.page_path || '',
        eventParams.location || '',
        eventParams.insurance_type || ''
      ].join('|');
      lastPushAt = trackingState.formSubmitKeys[dedupKey] || 0;

      if (now - lastPushAt < SUBMIT_DEDUP_WINDOW_MS) {
        if (window.CARSA_TRACKING_DEBUG === true && window.console && window.console.debug) {
          window.console.debug('[CARSA Tracking] Duplicate form_submit blocked', dedupKey);
        }

        return;
      }

      trackingState.formSubmitKeys[dedupKey] = now;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, eventParams));
  };

  function cleanText(value) {
    return (value || '').replace(/\s+/g, ' ').trim();
  }

  function normalize(value) {
    return cleanText(value).toLowerCase();
  }

  function getPagePath() {
    return window.location.pathname || '/';
  }

  function getUrlPath(url) {
    var parsed;

    try {
      parsed = new URL(url, window.location.href);
      return parsed.pathname || '/';
    } catch (error) {
      return url || '';
    }
  }

  function getQueryParams() {
    var params = new URLSearchParams(window.location.search || '');

    return {
      utm_source: cleanText(params.get('utm_source')),
      utm_medium: cleanText(params.get('utm_medium')),
      utm_campaign: cleanText(params.get('utm_campaign')),
      utm_content: cleanText(params.get('utm_content')),
      utm_term: cleanText(params.get('utm_term'))
    };
  }

  function getInsuranceType(value) {
    var source = normalize(value || getPagePath() + ' ' + document.title);
    var match = INSURANCE_ROUTES.find(function (route) {
      return route.pattern.test(source);
    });

    return match ? match.type : null;
  }

  function getInsuranceTypeFromLabel(value) {
    var source = normalize(value);

    if (!source || source === 'null') {
      return null;
    }

    if (/ahorro|educacion/.test(source)) {
      return 'ahorro';
    }

    if (/vida/.test(source)) {
      return 'vida';
    }

    if (/salud|gmm|gastos/.test(source)) {
      return 'gastos_medicos_mayores';
    }

    if (/hogar/.test(source)) {
      return 'hogar';
    }

    if (/auto|automovil/.test(source)) {
      return 'auto';
    }

    if (/empresarial/.test(source)) {
      return 'empresarial';
    }

    if (/fianza/.test(source)) {
      return 'fianzas';
    }

    if (/retiro/.test(source)) {
      return 'retiro';
    }

    if (/otro|general/.test(source)) {
      return 'otro';
    }

    return null;
  }

  function getProductLabel(type) {
    return PRODUCT_LABELS[type] || null;
  }

  function getContactProductSelection() {
    var select = document.getElementById('select-producto');
    var selectedValue;
    var normalizedType;

    if (!select || !select.value || select.value === 'null') {
      return null;
    }

    selectedValue = cleanText(select.value);
    normalizedType = getInsuranceTypeFromLabel(selectedValue);

    return {
      raw: selectedValue,
      type: normalizedType,
      label: selectedValue
    };
  }

  function getLocation(element) {
    if (!element) {
      return 'unknown';
    }

    if (element.id === 'btn-whatsapp') {
      return 'contact_whatsapp';
    }

    if (element.id === 'btn-calendly') {
      return 'contact_call';
    }

    if (element.id === 'btn-chat') {
      return 'contact_chat';
    }

    if (element.dataset && element.dataset.trackLocation) {
      return element.dataset.trackLocation;
    }

    var section = element.closest('[data-track-location], header, nav, footer, main, section, form, article');

    if (section && section.dataset && section.dataset.trackLocation) {
      return section.dataset.trackLocation;
    }

    if (element.closest('header, nav, .navbar')) {
      return 'header';
    }

    if (element.closest('footer, .footer')) {
      return 'footer';
    }

    if (element.closest('form')) {
      return 'form';
    }

    if (element.closest('#hero, .hero, .planes-seguros')) {
      return 'hero';
    }

    if (element.closest('.wa-float, .carsa-whatsapp-float, .carsa-whatsapp-bubble')) {
      return 'floating_button';
    }

    return 'content';
  }

  function getFormName(form) {
    if (!form) {
      return 'unknown_form';
    }

    if (form.dataset.trackFormName || form.getAttribute('name') || form.id) {
      return form.dataset.trackFormName || form.getAttribute('name') || form.id;
    }

    if (form.classList && form.classList.length) {
      return form.classList[0].replace(/[^a-z0-9_-]/gi, '_').toLowerCase() + '_form';
    }

    return 'unknown_form';
  }

  function isDownloadUrl(href) {
    return /\.(pdf|doc|docx|xls|xlsx)(?:[?#].*)?$/i.test(href || '');
  }

  function getFileName(href) {
    var path = getUrlPath(href);
    var parts = path.split('/');
    return parts.pop() || path;
  }

  function isWhatsappUrl(href) {
    return /wa\.me|api\.whatsapp\.com|whatsapp/i.test(href || '');
  }

  function getPhoneNumberFromHref(href) {
    var matches;

    if (!href) {
      return null;
    }

    if (/^tel:/i.test(href)) {
      return href.replace(/^tel:/i, '').replace(/[^\d+]/g, '');
    }

    if (isWhatsappUrl(href)) {
      matches = href.match(/(?:phone=|wa\.me\/)(\+?\d+)/i);
      return matches && matches[1] ? matches[1].replace(/[^\d+]/g, '') : null;
    }

    return null;
  }

  function isInternalUrl(href) {
    if (!href || href.charAt(0) === '#') {
      return false;
    }

    try {
      var url = new URL(href, window.location.href);
      return url.hostname === window.location.hostname;
    } catch (error) {
      return href.charAt(0) === '/';
    }
  }

  function isInsuranceInternalLink(href) {
    return isInternalUrl(href) && !!getInsuranceType(getUrlPath(href));
  }

  function getInsuranceContext(element, href, fallback) {
    var selectedProduct = getContactProductSelection();
    var insuranceType = null;

    if (element && element.dataset && element.dataset.trackInsuranceType) {
      insuranceType = element.dataset.trackInsuranceType;
    }

    if (!insuranceType && selectedProduct && (/\/contacto(?:\.html)?$/i.test(getPagePath()))) {
      insuranceType = selectedProduct.type || getInsuranceTypeFromLabel(selectedProduct.raw);
    }

    if (!insuranceType) {
      insuranceType = getInsuranceType(href || fallback || getPagePath());
    }

    return {
      insuranceType: insuranceType,
      productName: selectedProduct ? selectedProduct.label : getProductLabel(insuranceType),
      selectedProduct: selectedProduct ? selectedProduct.raw : null
    };
  }

  function getAttributionPayload(context) {
    var utms = getQueryParams();
    var fallbackCampaign = normalize((context && context.insuranceType) || '').replace(/[^a-z0-9]+/g, '_') || 'site';
    var payload = {
      utm_source: utms.utm_source || 'website',
      utm_medium: utms.utm_medium || 'internal_cta',
      utm_campaign: utms.utm_campaign || fallbackCampaign
    };

    if (utms.utm_content) {
      payload.utm_content = utms.utm_content;
    }

    if (utms.utm_term) {
      payload.utm_term = utms.utm_term;
    }

    return payload;
  }

  function appendWhatsappAttribution(href, context) {
    var parsed;
    var text;
    var attribution;
    var parts = [];

    if (!isWhatsappUrl(href || '')) {
      return href;
    }

    try {
      parsed = new URL(href, window.location.href);
    } catch (error) {
      return href;
    }

    text = parsed.searchParams.get('text') || '';

    if (/origen web:/i.test(text)) {
      return parsed.toString();
    }

    attribution = getAttributionPayload(context);
    parts.push('Origen web:');
    parts.push('source=' + attribution.utm_source);
    parts.push('medium=' + attribution.utm_medium);
    parts.push('campaign=' + attribution.utm_campaign);

    if (context && context.insuranceType) {
      parts.push('producto=' + context.insuranceType);
    }

    if (context && context.location) {
      parts.push('ubicacion=' + context.location);
    }

    parts.push('pagina=' + getPagePath());

    parsed.searchParams.set('text', cleanText(text) + '\n\n' + parts.join(' | '));
    return parsed.toString();
  }

  function isCtaElement(element, href, text) {
    if (!element) {
      return false;
    }

    if (element.dataset && (element.dataset.trackCtaType || element.dataset.trackEvent === 'click_cta')) {
      return true;
    }

    if (element.matches('.btn, .button, .nav-cta, [class*="cta"], [class*="btn"]')) {
      return true;
    }

    if (href && /#(?:cotizar|form|formulario|contacto)|\/contacto|\/cotizar|\/cotizador/i.test(href)) {
      return true;
    }

    var normalizedText = normalize(text);
    return CTA_WORDS.some(function (word) {
      return normalizedText.indexOf(word) !== -1;
    });
  }

  function getCtaType(element, href) {
    if (element.dataset && element.dataset.trackCtaType) {
      return element.dataset.trackCtaType;
    }

    if (isWhatsappUrl(href)) {
      return 'whatsapp';
    }

    if (/^tel:/i.test(href || '')) {
      return 'call';
    }

    if (/^mailto:/i.test(href || '')) {
      return 'email';
    }

    if ((href || '').charAt(0) === '#') {
      return 'anchor';
    }

    return isInternalUrl(href) ? 'internal_navigation' : 'external_navigation';
  }

  function buildClickPayload(element, href, text, location, insuranceContext, extra) {
    var attribution = getAttributionPayload(insuranceContext);
    var payload = {
      location: location,
      button_location: location,
      page_path: getPagePath(),
      cta_text: text,
      insurance_type: insuranceContext.insuranceType,
      product_name: insuranceContext.productName,
      destination_url: href || null,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign
    };

    if (attribution.utm_content) {
      payload.utm_content = attribution.utm_content;
    }

    if (attribution.utm_term) {
      payload.utm_term = attribution.utm_term;
    }

    if (extra) {
      Object.keys(extra).forEach(function (key) {
        payload[key] = extra[key];
      });
    }

    return payload;
  }

  function trackExplicitEvent(element, href, text) {
    var eventName = element.dataset && element.dataset.trackEvent;
    var location = getLocation(element);
    var insuranceContext = getInsuranceContext(element, href, getPagePath());
    var trackedHref = href;

    if (!eventName) {
      return false;
    }

    if (eventName === 'click_whatsapp') {
      trackedHref = appendWhatsappAttribution(href, {
        insuranceType: insuranceContext.insuranceType,
        location: location
      });
      element.setAttribute('href', trackedHref);
      window.trackEvent(eventName, buildClickPayload(element, trackedHref, text, location, insuranceContext, {
        phone_number: getPhoneNumberFromHref(trackedHref)
      }));
      return true;
    }

    if (eventName === 'click_call') {
      window.trackEvent(eventName, buildClickPayload(element, href, text, location, insuranceContext, {
        phone_number: getPhoneNumberFromHref(href)
      }));
      return true;
    }

    if (eventName === 'click_email') {
      window.trackEvent(eventName, {
        location: location,
        page_path: getPagePath(),
        email: href.replace(/^mailto:/i, '').split('?')[0],
        cta_text: text
      });
      return true;
    }

    if (eventName === 'file_download') {
      window.trackEvent(eventName, {
        file_url: href,
        file_name: getFileName(href),
        page_path: getPagePath(),
        link_text: text
      });
      return true;
    }

    if (eventName === 'click_internal_link') {
      window.trackEvent(eventName, {
        source_page: getPagePath(),
        destination_page: getUrlPath(href),
        link_text: text,
        insurance_type: insuranceContext.insuranceType,
        product_name: insuranceContext.productName,
        location: location
      });
      return true;
    }

    window.trackEvent(eventName, buildClickPayload(element, href, text, location, insuranceContext, {
      cta_type: element.dataset.trackCtaType || getCtaType(element, href)
    }));

    return true;
  }

  function handleTrackedClick(event) {
    var element = event.target.closest('a, button');
    var href;
    var text;
    var location;
    var insuranceContext;

    if (!element) {
      return;
    }

    if (element.closest('form') && element.matches('button[type="submit"], button:not([type])')) {
      return;
    }

    href = element.getAttribute('href') || '';
    text = cleanText(element.innerText || element.textContent || element.getAttribute('aria-label'));
    location = getLocation(element);
    insuranceContext = getInsuranceContext(element, href, getPagePath());

    if (trackExplicitEvent(element, href, text)) {
      return;
    }

    if (isWhatsappUrl(href)) {
      href = appendWhatsappAttribution(href, {
        insuranceType: insuranceContext.insuranceType,
        location: location
      });
      element.setAttribute('href', href);
      window.trackEvent('click_whatsapp', buildClickPayload(element, href, text, location, insuranceContext, {
        phone_number: getPhoneNumberFromHref(href)
      }));
      return;
    }

    if (/^tel:/i.test(href)) {
      window.trackEvent('click_call', buildClickPayload(element, href, text, location, insuranceContext, {
        phone_number: getPhoneNumberFromHref(href)
      }));
      return;
    }

    if (/^mailto:/i.test(href)) {
      window.trackEvent('click_email', {
        location: location,
        page_path: getPagePath(),
        email: href.replace(/^mailto:/i, '').split('?')[0],
        cta_text: text
      });
      return;
    }

    if (isDownloadUrl(href)) {
      window.trackEvent('file_download', {
        file_url: href,
        file_name: getFileName(href),
        page_path: getPagePath(),
        link_text: text
      });
      return;
    }

    if (isCtaElement(element, href, text)) {
      window.trackEvent('click_cta', buildClickPayload(element, href, text, location, insuranceContext, {
        cta_type: getCtaType(element, href)
      }));
      return;
    }

    if (isInsuranceInternalLink(href)) {
      window.trackEvent('click_internal_link', {
        source_page: getPagePath(),
        destination_page: getUrlPath(href),
        link_text: text,
        insurance_type: insuranceContext.insuranceType,
        product_name: insuranceContext.productName,
        location: location
      });
    }
  }

  function buildFormEventPayload(form, extra) {
    var formName = getFormName(form);
    var insuranceContext = getInsuranceContext(form, '', getPagePath() + ' ' + formName);
    var attribution = getAttributionPayload(insuranceContext);
    var payload = {
      form_name: formName,
      page_path: getPagePath(),
      insurance_type: insuranceContext.insuranceType,
      product_name: insuranceContext.productName,
      location: getLocation(form),
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign
    };

    if (attribution.utm_content) {
      payload.utm_content = attribution.utm_content;
    }

    if (attribution.utm_term) {
      payload.utm_term = attribution.utm_term;
    }

    if (extra) {
      Object.keys(extra).forEach(function (key) {
        payload[key] = extra[key];
      });
    }

    return payload;
  }

  function trackFormStart(event) {
    var form = event.target && event.target.closest && event.target.closest('form');
    var formName;

    if (!form) {
      return;
    }

    formName = getFormName(form);

    if (trackedForms[formName]) {
      return;
    }

    trackedForms[formName] = true;
    window.trackEvent('form_start', buildFormEventPayload(form));
  }

  function trackFormSubmit(event) {
    var form = event.target;
    var now;
    var lastSubmitAt;

    if (!form || !form.matches || !form.matches('form')) {
      return;
    }

    now = Date.now();

    if (trackingState.submittedForms) {
      lastSubmitAt = trackingState.submittedForms.get(form) || 0;

      if (now - lastSubmitAt < SUBMIT_DEDUP_WINDOW_MS) {
        return;
      }

      trackingState.submittedForms.set(form, now);
    } else if (form.dataset.carsaSubmitTrackedAt) {
      lastSubmitAt = Number(form.dataset.carsaSubmitTrackedAt) || 0;

      if (now - lastSubmitAt < SUBMIT_DEDUP_WINDOW_MS) {
        return;
      }

      form.dataset.carsaSubmitTrackedAt = String(now);
    } else {
      form.dataset.carsaSubmitTrackedAt = String(now);
    }

    trackingState.lastFormSubmitAt = now;
    trackingState.lastSubmittedForm = form;

    window.trackEvent('form_submit', buildFormEventPayload(form));
  }

  function trackFormError(form, extra) {
    var payload;
    var dedupKey;
    var now = Date.now();

    if (!form) {
      return;
    }

    payload = buildFormEventPayload(form, extra);
    dedupKey = [
      payload.form_name || '',
      payload.page_path || '',
      payload.error_type || '',
      payload.field_name || '',
      payload.error_message || ''
    ].join('|');

    if (now - (trackingState.formErrorKeys[dedupKey] || 0) < FORM_ERROR_DEDUP_WINDOW_MS) {
      return;
    }

    trackingState.formErrorKeys[dedupKey] = now;
    window.trackEvent('form_error', payload);
  }

  function trackFormSuccess(form, extra) {
    var payload;
    var dedupKey;
    var now = Date.now();

    if (!form) {
      return;
    }

    payload = buildFormEventPayload(form, extra);
    dedupKey = [
      payload.form_name || '',
      payload.page_path || '',
      payload.insurance_type || '',
      payload.endpoint || ''
    ].join('|');

    if (now - (trackingState.formSuccessKeys[dedupKey] || 0) < FORM_SUCCESS_DEDUP_WINDOW_MS) {
      return;
    }

    trackingState.formSuccessKeys[dedupKey] = now;
    window.trackEvent('form_success', payload);
  }

  function trackFieldValidationError(event) {
    var field = event.target;
    var form;

    if (!field || !field.form) {
      return;
    }

    form = field.form;
    trackFormError(form, {
      error_type: 'validation',
      field_name: field.name || field.id || 'unknown_field',
      error_message: cleanText(field.validationMessage || 'invalid_field')
    });
  }

  function trackProductSelection(event) {
    var target = event.target;
    var productValue;
    var insuranceType;
    var phoneButton;
    var whatsappButton;

    if (!target || target.id !== 'select-producto') {
      return;
    }

    if (!target.value || target.value === 'null') {
      return;
    }

    productValue = cleanText(target.value);
    insuranceType = getInsuranceTypeFromLabel(productValue);
    trackingState.lastSelectedProduct = productValue;

    phoneButton = document.getElementById('btn-calendly');
    whatsappButton = document.getElementById('btn-whatsapp');

    [phoneButton, whatsappButton].forEach(function (button) {
      if (!button) {
        return;
      }

      button.dataset.trackInsuranceType = insuranceType || '';
      button.dataset.trackProductName = productValue;
    });

    window.trackEvent('select_product', {
      page_path: getPagePath(),
      location: 'contact_product_selector',
      insurance_type: insuranceType,
      product_name: productValue
    });
  }

  function isAjaxLeadRequest(url) {
    return /\/enviar\.php(?:[?#].*)?$/i.test(getUrlPath(url || ''));
  }

  function patchFetch() {
    var originalFetch = window.fetch;

    if (!originalFetch || originalFetch.__carsaTrackingPatched) {
      return;
    }

    window.fetch = function (input) {
      var requestUrl = typeof input === 'string' ? input : (input && input.url) || '';
      var pendingForm = trackingState.lastSubmittedForm;
      var submittedAt = trackingState.lastFormSubmitAt;

      return originalFetch.apply(window, arguments).then(function (response) {
        if (pendingForm && isAjaxLeadRequest(requestUrl) && Date.now() - submittedAt < LEAD_REQUEST_WINDOW_MS) {
          if (response && response.ok) {
            trackFormSuccess(pendingForm, {
              endpoint: getUrlPath(requestUrl),
              transport: 'fetch'
            });
          } else {
            trackFormError(pendingForm, {
              endpoint: getUrlPath(requestUrl),
              transport: 'fetch',
              error_type: 'request_failed',
              error_message: response ? 'http_' + response.status : 'request_failed'
            });
          }
        }

        return response;
      }).catch(function (error) {
        if (pendingForm && isAjaxLeadRequest(requestUrl) && Date.now() - submittedAt < LEAD_REQUEST_WINDOW_MS) {
          trackFormError(pendingForm, {
            endpoint: getUrlPath(requestUrl),
            transport: 'fetch',
            error_type: 'request_failed',
            error_message: cleanText((error && error.message) || 'network_error')
          });
        }

        throw error;
      });
    };

    window.fetch.__carsaTrackingPatched = true;
  }

  function trackInsurancePageView() {
    var insuranceType = getInsuranceType(getPagePath());

    if (!insuranceType) {
      return;
    }

    window.trackEvent('view_insurance_page', {
      insurance_type: insuranceType,
      page_path: getPagePath(),
      page_title: document.title || ''
    });
  }

  function trackThankYouPage() {
    var params;
    var productKey;
    var insuranceType;
    var attribution;

    if (!/\/agradecimiento(?:\.html)?$/i.test(getPagePath())) {
      return;
    }

    params = new URLSearchParams(window.location.search || '');
    productKey = cleanText(params.get('producto')) || 'general';
    insuranceType = getInsuranceTypeFromLabel(productKey) || getInsuranceType(productKey) || 'general';
    attribution = getAttributionPayload({ insuranceType: insuranceType });

    window.trackEvent('form_success', {
      form_name: 'contacto_redirect_form',
      page_path: getPagePath(),
      insurance_type: insuranceType,
      product_name: getProductLabel(insuranceType) || productKey,
      location: 'thank_you_page',
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      utm_content: attribution.utm_content || null,
      utm_term: attribution.utm_term || null
    });
  }

  function trackScrollDepth() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    var docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
    );
    var maxScroll = Math.max(docHeight - viewportHeight, 1);
    var percent = Math.round((scrollTop / maxScroll) * 100);

    [50, 75, 90].forEach(function (target) {
      if (percent >= target && !trackedScroll[target]) {
        trackedScroll[target] = true;
        window.trackEvent('scroll_depth', {
          page_path: getPagePath(),
          percent: target
        });
      }
    });
  }

  function trackEngagedTime(seconds) {
    if (trackedTime[seconds]) {
      return;
    }

    trackedTime[seconds] = true;
    window.trackEvent('engaged_time', {
      page_path: getPagePath(),
      seconds: seconds
    });
  }

  function patchWindowOpen() {
    var originalOpen = window.open;

    if (!originalOpen || originalOpen.__carsaTrackingPatched) {
      return;
    }

    window.open = function (url) {
      var insuranceContext;
      var trackedUrl = url;

      if (isWhatsappUrl(url)) {
        insuranceContext = getInsuranceContext(null, url, getPagePath());
        trackedUrl = appendWhatsappAttribution(url, {
          insuranceType: insuranceContext.insuranceType,
          location: 'script'
        });

        if (Date.now() - (trackingState.lastFormSubmitAt || 0) >= WHATSAPP_AFTER_SUBMIT_SUPPRESS_MS) {
          window.trackEvent('click_whatsapp', buildClickPayload(null, trackedUrl, null, 'script', insuranceContext, {
            phone_number: getPhoneNumberFromHref(trackedUrl)
          }));
        }
      }

      arguments[0] = trackedUrl;
      return originalOpen.apply(window, arguments);
    };

    window.open.__carsaTrackingPatched = true;
  }

  function init() {
    if (trackingState.initialized) {
      return;
    }

    trackingState.initialized = true;

    patchWindowOpen();
    patchFetch();
    trackInsurancePageView();
    trackThankYouPage();

    document.addEventListener('click', handleTrackedClick, true);
    document.addEventListener('focusin', trackFormStart, true);
    document.addEventListener('input', trackFormStart, true);
    document.addEventListener('change', trackFormStart, true);
    document.addEventListener('change', trackProductSelection, true);
    document.addEventListener('invalid', trackFieldValidationError, true);
    document.addEventListener('submit', trackFormSubmit, true);
    window.addEventListener('scroll', trackScrollDepth, { passive: true });

    [30, 60, 120].forEach(function (seconds) {
      window.setTimeout(function () {
        trackEngagedTime(seconds);
      }, seconds * 1000);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}());
