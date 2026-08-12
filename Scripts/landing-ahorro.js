(function () {
  'use strict';

  var quoteForm;
  var quoteCard;
  var panels;
  var progressItems;
  var currentStep = 0;
  var started = false;
  var completedSteps = {};
  var stepEvents = ['quote_step_1', 'quote_step_2', 'quote_step_3'];

  function emit(eventName, params) {
    var payload = params || {};

    if (typeof window.trackEvent === 'function') {
      window.trackEvent(eventName, payload);
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, payload));
  }

  function getVariant() {
    return (document.body && document.body.dataset.landingVariant) || 'seguro-de-ahorro';
  }

  function basePayload(location) {
    return {
      page_path: window.location.pathname,
      landing_variant: getVariant(),
      insurance_type: getVariant() === 'seguro-de-ahorro' ? 'ahorro' : 'retiro',
      location: location || 'landing_ahorro'
    };
  }

  function trackQuoteStart(location) {
    if (started) {
      return;
    }

    started = true;
    emit('quote_start', basePayload(location || 'hero_quote'));
  }

  function setStep(nextStep, options) {
    var opts = options || {};

    currentStep = Math.max(0, Math.min(nextStep, panels.length - 1));

    panels.forEach(function (panel, index) {
      var isActive = index === currentStep;
      panel.hidden = !isActive;
      panel.setAttribute('aria-hidden', String(!isActive));
    });

    progressItems.forEach(function (item, index) {
      item.classList.toggle('is-active', index === currentStep);
      item.classList.toggle('is-complete', index < currentStep);

      if (index === currentStep) {
        item.setAttribute('aria-current', 'step');
      } else {
        item.removeAttribute('aria-current');
      }
    });

    updateNextButton();

    if (opts.focus !== false) {
      var firstFocusable = panels[currentStep].querySelector('input:not([type="hidden"]), button');
      if (firstFocusable) {
        window.setTimeout(function () {
          firstFocusable.focus({ preventScroll: true });
        }, 0);
      }
    }
  }

  function getStepSelection(stepIndex) {
    var checked = panels[stepIndex].querySelector('input[type="radio"]:checked');
    return checked ? checked.value : '';
  }

  function updateNextButton() {
    var panel = panels[currentStep];
    var nextButton = panel && panel.querySelector('[data-quote-next]');

    if (!nextButton) {
      return;
    }

    nextButton.disabled = !getStepSelection(currentStep);
  }

  function reportStepError(stepNumber, fieldName) {
    emit('form_error', Object.assign(basePayload('hero_quote'), {
      form_name: quoteForm.id,
      error_type: 'validation',
      field_name: fieldName,
      error_message: 'missing_quote_step_' + stepNumber
    }));
  }

  function completeCurrentStep() {
    var stepNumber = currentStep + 1;
    var value = getStepSelection(currentStep);

    if (!value) {
      reportStepError(stepNumber, currentStep === 0 ? 'objetivo' : currentStep === 1 ? 'aportacion' : 'edad');
      return;
    }

    if (!completedSteps[stepNumber]) {
      completedSteps[stepNumber] = true;
      emit(stepEvents[stepNumber - 1], Object.assign(basePayload('hero_quote'), {
        step_number: stepNumber,
        step_value: value
      }));
    }

    setStep(currentStep + 1);
  }

  function scrollToQuote() {
    if (!quoteCard) {
      return;
    }

    quoteCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function selectGoalAndContinue(value) {
    var radio = quoteForm.querySelector('input[name="objetivo"][value="' + value.replace(/"/g, '\\"') + '"]');

    trackQuoteStart('goal_card');

    if (radio) {
      radio.checked = true;
      if (!completedSteps[1]) {
        completedSteps[1] = true;
        emit(stepEvents[0], Object.assign(basePayload('goal_card'), {
          step_number: 1,
          step_value: radio.value
        }));
      }
      setStep(1, { focus: false });
    }

    scrollToQuote();
  }

  function normalizePhone(value) {
    var digits = (value || '').replace(/\D/g, '');

    if (digits.length === 12 && digits.slice(0, 2) === '52') {
      digits = digits.slice(2);
    }

    return digits;
  }

  function setFieldError(input, message) {
    var errorNode = document.getElementById(input.dataset.errorId || '');
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    input.setCustomValidity(message || '');

    if (errorNode) {
      errorNode.textContent = message || '';
    }
  }

  function validateContactFields() {
    var nameInput = quoteForm.elements.name;
    var phoneInput = quoteForm.elements.whatsapp;
    var name = nameInput.value.trim();
    var phone = normalizePhone(phoneInput.value);
    var valid = true;

    setFieldError(nameInput, '');
    setFieldError(phoneInput, '');

    if (name.length < 2) {
      setFieldError(nameInput, 'Escribe tu nombre.');
      valid = false;
    }

    if (phone.length !== 10) {
      setFieldError(phoneInput, 'Ingresa un WhatsApp de 10 dígitos.');
      valid = false;
    }

    if (valid) {
      phoneInput.value = phone;
    } else {
      quoteForm.reportValidity();
    }

    return valid;
  }

  function buildSuccessWhatsappUrl() {
    var name = quoteForm.elements.name.value.trim();
    var objective = quoteForm.elements.objetivo.value;
    var contribution = quoteForm.elements.aportacion.value;
    var age = quoteForm.elements.edad.value;
    var message = [
      'Hola, soy ' + name + '.',
      'Completé el diagnóstico de CARSA y quiero revisar mis opciones.',
      'Objetivo: ' + objective,
      'Aportación mensual: ' + contribution,
      'Edad: ' + age
    ].join('\n');

    return 'https://wa.me/529992968025?text=' + encodeURIComponent(message);
  }

  function showSuccess() {
    var success = document.getElementById('quoteSuccess');
    var successLink = document.getElementById('quoteSuccessWhatsapp');
    var formInner = document.getElementById('quoteFormInner');

    if (successLink) {
      successLink.href = buildSuccessWhatsappUrl();
    }

    if (formInner) {
      formInner.hidden = true;
    }

    if (success) {
      success.hidden = false;
      success.focus({ preventScroll: true });
    }
  }

  async function submitLead(event) {
    var submitButton;
    var status;
    var response;
    var responseText;

    event.preventDefault();
    trackQuoteStart('hero_quote');

    if (!validateContactFields()) {
      return;
    }

    submitButton = quoteForm.querySelector('[type="submit"]');
    status = document.getElementById('quoteFormStatus');
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando…';
    status.textContent = '';

    quoteForm.elements.landing_url.value = window.location.href;

    try {
      response = await window.fetch(quoteForm.action, {
        method: 'POST',
        body: new FormData(quoteForm),
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      responseText = (await response.text()).trim();

      if (!response.ok || responseText !== 'OK') {
        throw new Error('lead_request_failed');
      }

      emit('lead_form_submit', Object.assign(basePayload('hero_quote'), {
        form_name: quoteForm.id,
        objective: quoteForm.elements.objetivo.value,
        contribution_range: quoteForm.elements.aportacion.value,
        age_range: quoteForm.elements.edad.value
      }));

      showSuccess();
    } catch (error) {
      submitButton.disabled = false;
      submitButton.textContent = 'Ver mis opciones';
      status.textContent = 'No pudimos enviar tus datos. Inténtalo de nuevo o escríbenos por WhatsApp.';
      emit('form_error', Object.assign(basePayload('hero_quote'), {
        form_name: quoteForm.id,
        error_type: 'request_failed',
        error_message: error && error.message ? error.message : 'lead_request_failed'
      }));
    }
  }

  function populateAttributionFields() {
    var params = new URLSearchParams(window.location.search || '');
    var fields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid'];

    fields.forEach(function (fieldName) {
      var field = quoteForm.elements[fieldName];
      if (field) {
        field.value = params.get(fieldName) || '';
      }
    });

    quoteForm.elements.landing_url.value = window.location.href;
  }

  function initQuote() {
    quoteForm = document.getElementById('savingsQuoteForm');
    quoteCard = document.getElementById('cotizador');

    if (!quoteForm || !quoteCard) {
      return;
    }

    panels = Array.prototype.slice.call(quoteForm.querySelectorAll('[data-quote-step]'));
    progressItems = Array.prototype.slice.call(quoteForm.querySelectorAll('[data-progress-step]'));

    quoteForm.addEventListener('focusin', function (event) {
      if (!event.target.matches('button[data-quote-back]')) {
        trackQuoteStart('hero_quote');
      }
    });

    quoteForm.addEventListener('change', function (event) {
      if (event.target.matches('input[type="radio"]')) {
        updateNextButton();
      }
    });

    quoteForm.addEventListener('click', function (event) {
      var next = event.target.closest('[data-quote-next]');
      var back = event.target.closest('[data-quote-back]');

      if (next) {
        completeCurrentStep();
      }

      if (back) {
        setStep(currentStep - 1);
      }
    });

    quoteForm.elements.name.addEventListener('input', function () {
      setFieldError(quoteForm.elements.name, '');
    });

    quoteForm.elements.whatsapp.addEventListener('input', function () {
      setFieldError(quoteForm.elements.whatsapp, '');
    });

    quoteForm.addEventListener('submit', submitLead);
    populateAttributionFields();
    setStep(0, { focus: false });
  }

  function initNavigation() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.getElementById('landingNav');

    if (!toggle || !nav) {
      return;
    }

    function closeNav() {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.classList.remove('nav-open');
    }

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        closeNav();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) {
        closeNav();
      }
    });
  }

  function createReviewCard(review) {
    var article = document.createElement('article');
    var head = document.createElement('div');
    var identity = document.createElement('div');
    var avatar;
    var name = document.createElement('div');
    var date = document.createElement('div');
    var stars = document.createElement('div');
    var text = document.createElement('p');
    var numericRating = Number(review.rating);
    var rating = Number.isFinite(numericRating) ? Math.max(1, Math.min(5, numericRating)) : null;

    article.className = 'review-card';
    head.className = 'review-card__head';
    name.className = 'review-card__name';
    date.className = 'review-card__date';
    stars.className = 'review-card__stars';

    if (review.avatar) {
      avatar = document.createElement('img');
      avatar.src = review.avatar;
      avatar.alt = '';
      avatar.loading = 'lazy';
    } else {
      avatar = document.createElement('span');
      avatar.textContent = (review.name || 'Google').charAt(0).toUpperCase();
    }

    avatar.className = 'review-card__avatar';
    name.textContent = review.name || 'Reseña verificada en Google';
    text.textContent = review.text || '';

    identity.appendChild(name);
    if (review.date) {
      date.textContent = review.date;
      identity.appendChild(date);
    }
    head.appendChild(avatar);
    head.appendChild(identity);
    article.appendChild(head);
    if (rating !== null) {
      stars.textContent = '\u2605'.repeat(Math.round(rating));
      stars.setAttribute('aria-label', rating + ' de 5 estrellas');
      article.appendChild(stars);
    }
    if (review.text) {
      article.appendChild(text);
    }

    if (review.link) {
      var link = document.createElement('a');
      link.className = 'text-link';
      link.href = review.link;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Ver en Google';
      article.appendChild(link);
    }

    return article;
  }

  function renderCarsaGoogleReviews(reviews) {
    var grid = document.querySelector('[data-reviews-grid]');
    var elfsight = document.querySelector('[data-reviews-elfsight]');

    if (!grid || !Array.isArray(reviews) || !reviews.length) {
      return false;
    }

    grid.textContent = '';
    reviews.slice(0, 6).forEach(function (review) {
      grid.appendChild(createReviewCard(review));
    });

    grid.hidden = false;
    if (elfsight) {
      elfsight.hidden = true;
    }

    return true;
  }

  function initReviews() {
    var elfsight = document.querySelector('[data-reviews-elfsight]');
    var widget = document.querySelector('[data-elfsight-app-lazy]');
    var status = document.querySelector('[data-reviews-status]');
    var loaded = false;

    window.renderCarsaGoogleReviews = renderCarsaGoogleReviews;

    if (renderCarsaGoogleReviews(window.CARSA_GOOGLE_REVIEWS)) {
      return;
    }

    if (!elfsight || !widget) {
      if (status) {
        status.textContent = 'Las reseñas verificadas estarán disponibles próximamente.';
      }
      return;
    }

    elfsight.hidden = false;

    function loadElfsight() {
      var script;

      if (loaded || document.querySelector('script[src*="elfsightcdn.com/platform.js"]')) {
        return;
      }

      loaded = true;
      script = document.createElement('script');
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      script.addEventListener('load', function () {
        if (status) {
          status.hidden = true;
        }
      });
      document.body.appendChild(script);
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        if (entries.some(function (entry) { return entry.isIntersecting; })) {
          observer.disconnect();
          loadElfsight();
        }
      }, { rootMargin: '280px 0px' });
      observer.observe(elfsight);
    } else {
      window.setTimeout(loadElfsight, 1200);
    }
  }

  function initCtasAndAliases() {
    document.addEventListener('click', function (event) {
      var goal = event.target.closest('[data-goal-value]');
      var quoteLink = event.target.closest('[data-scroll-to-quote]');
      var whatsapp = event.target.closest('[data-landing-whatsapp]');
      var phone = event.target.closest('a[href^="tel:"]');

      if (goal) {
        event.preventDefault();
        selectGoalAndContinue(goal.dataset.goalValue || 'Aún no estoy seguro');
      } else if (quoteLink) {
        event.preventDefault();
        trackQuoteStart(quoteLink.dataset.trackLocation || 'cta');
        scrollToQuote();
      }

      if (whatsapp) {
        emit('whatsapp_click', basePayload(whatsapp.dataset.trackLocation || 'landing_whatsapp'));
      }

      if (phone) {
        emit('phone_click', basePayload(phone.dataset.trackLocation || 'landing_phone'));
      }
    });
  }

  function init() {
    initNavigation();
    initQuote();
    initReviews();
    initCtasAndAliases();
    emit('landing_view', Object.assign(basePayload('page_load'), {
      page_title: document.title
    }));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}());
