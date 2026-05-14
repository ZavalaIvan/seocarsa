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

  var CTA_WORDS = [
    'cotizar',
    'contactar',
    'contacto',
    'asesoria',
    'asesoría',
    'agendar',
    'ver mas',
    'ver más',
    'conocer mas',
    'conocer más',
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
    lastFormSubmitAt: 0
  };
  var SUBMIT_DEDUP_WINDOW_MS = 5000;
  var WHATSAPP_AFTER_SUBMIT_SUPPRESS_MS = 3000;

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

  function getInsuranceType(value) {
    var source = normalize(value || getPagePath() + ' ' + document.title);
    var match = INSURANCE_ROUTES.find(function (route) {
      return route.pattern.test(source);
    });

    return match ? match.type : null;
  }

  function getLocation(element) {
    if (!element) {
      return 'unknown';
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

  function trackExplicitEvent(element, href, text) {
    var eventName = element.dataset && element.dataset.trackEvent;
    var location = getLocation(element);
    var insuranceType = element.dataset.trackInsuranceType || getInsuranceType(href || getPagePath());

    if (!eventName) {
      return false;
    }

    if (eventName === 'click_whatsapp') {
      window.trackEvent(eventName, {
        location: location,
        page_path: getPagePath(),
        cta_text: text,
        insurance_type: insuranceType,
        destination_url: href
      });
      return true;
    }

    if (eventName === 'click_call') {
      window.trackEvent(eventName, {
        location: location,
        page_path: getPagePath(),
        phone_number: href.replace(/^tel:/i, ''),
        cta_text: text
      });
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
        insurance_type: insuranceType,
        location: location
      });
      return true;
    }

    window.trackEvent(eventName, {
      location: location,
      page_path: getPagePath(),
      cta_text: text,
      cta_type: element.dataset.trackCtaType || getCtaType(element, href),
      insurance_type: insuranceType,
      destination_url: href || null
    });

    return true;
  }

  function handleTrackedClick(event) {
    var element = event.target.closest('a, button');

    if (!element) {
      return;
    }

    if (element.closest('form') && element.matches('button[type="submit"], button:not([type])')) {
      return;
    }

    var href = element.getAttribute('href') || '';
    var text = cleanText(element.innerText || element.textContent || element.getAttribute('aria-label'));
    var location = getLocation(element);
    var insuranceType = element.dataset.trackInsuranceType || getInsuranceType(href || getPagePath());

    if (trackExplicitEvent(element, href, text)) {
      return;
    }

    if (isWhatsappUrl(href)) {
      window.trackEvent('click_whatsapp', {
        location: location,
        page_path: getPagePath(),
        cta_text: text,
        insurance_type: insuranceType,
        destination_url: href
      });
      return;
    }

    if (/^tel:/i.test(href)) {
      window.trackEvent('click_call', {
        location: location,
        page_path: getPagePath(),
        phone_number: href.replace(/^tel:/i, ''),
        cta_text: text
      });
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
      window.trackEvent('click_cta', {
        location: location,
        page_path: getPagePath(),
        cta_text: text,
        cta_type: getCtaType(element, href),
        insurance_type: insuranceType,
        destination_url: href || null
      });
      return;
    }

    if (isInsuranceInternalLink(href)) {
      window.trackEvent('click_internal_link', {
        source_page: getPagePath(),
        destination_page: getUrlPath(href),
        link_text: text,
        insurance_type: insuranceType,
        location: location
      });
    }
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
    window.trackEvent('form_start', {
      form_name: formName,
      page_path: getPagePath(),
      insurance_type: form.dataset.trackInsuranceType || getInsuranceType(getPagePath() + ' ' + formName),
      location: getLocation(form)
    });
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

    window.trackEvent('form_submit', {
      form_name: getFormName(form),
      page_path: getPagePath(),
      insurance_type: form.dataset.trackInsuranceType || getInsuranceType(getPagePath() + ' ' + getFormName(form)),
      location: getLocation(form)
    });
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
      if (isWhatsappUrl(url)) {
        if (Date.now() - (trackingState.lastFormSubmitAt || 0) < WHATSAPP_AFTER_SUBMIT_SUPPRESS_MS) {
          return originalOpen.apply(window, arguments);
        }

        window.trackEvent('click_whatsapp', {
          location: 'script',
          page_path: getPagePath(),
          cta_text: null,
          insurance_type: getInsuranceType(url || getPagePath()),
          destination_url: url
        });
      }

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
    trackInsurancePageView();

    document.addEventListener('click', handleTrackedClick, true);
    document.addEventListener('focusin', trackFormStart, true);
    document.addEventListener('input', trackFormStart, true);
    document.addEventListener('change', trackFormStart, true);
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
