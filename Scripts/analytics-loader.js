// Loads Google Analytics after the page becomes interactive enough to avoid
// competing with initial rendering and Core Web Vitals.
(function () {
  var TAG_ID = 'G-WHXRQNH3ZK';
  var loaded = false;
  var fallbackTimer;
  var passiveOptions = { passive: true, once: true };
  var listeners = ['pointerdown', 'keydown', 'touchstart', 'scroll', 'mousemove'];

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  function cleanup() {
    listeners.forEach(function (eventName) {
      window.removeEventListener(eventName, loadAnalytics, passiveOptions);
    });
    window.removeEventListener('load', scheduleIdleLoad);
    if (fallbackTimer) {
      window.clearTimeout(fallbackTimer);
    }
  }

  function injectAnalyticsScript() {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(TAG_ID);
    script.onload = function () {
      window.gtag('js', new Date());
      window.gtag('config', TAG_ID);
    };
    document.head.appendChild(script);
  }

  function loadAnalytics() {
    if (loaded) {
      return;
    }

    loaded = true;
    cleanup();
    injectAnalyticsScript();
  }

  function scheduleIdleLoad() {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadAnalytics, { timeout: 4000 });
      return;
    }

    fallbackTimer = window.setTimeout(loadAnalytics, 4000);
  }

  listeners.forEach(function (eventName) {
    window.addEventListener(eventName, loadAnalytics, passiveOptions);
  });

  if (document.readyState === 'complete') {
    scheduleIdleLoad();
  } else {
    window.addEventListener('load', scheduleIdleLoad, { once: true });
  }
}());
