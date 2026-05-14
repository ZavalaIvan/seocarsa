(function () {
  'use strict';

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  var referrer = document.referrer || '';

  if (!referrer) {
    return;
  }

  var SOURCES = [
    { source: 'chatgpt', hosts: ['chatgpt.com', 'chat.openai.com'] },
    { source: 'openai', hosts: ['openai.com'] },
    { source: 'perplexity', hosts: ['perplexity.ai'] },
    { source: 'claude', hosts: ['claude.ai'] },
    { source: 'anthropic', hosts: ['anthropic.com'] },
    { source: 'gemini', hosts: ['gemini.google.com'] },
    { source: 'copilot', hosts: ['copilot.microsoft.com'] },
    { source: 'bing_chat', hosts: ['bing.com'], pathPattern: /\/chat(?:\/|$)/i },
    { source: 'poe', hosts: ['poe.com'] },
    { source: 'you', hosts: ['you.com'] },
    { source: 'phind', hosts: ['phind.com'] }
  ];

  function normalizeHost(hostname) {
    return (hostname || '').replace(/^www\./i, '').toLowerCase();
  }

  function matchesHost(hostname, expectedHost) {
    return hostname === expectedHost || hostname.slice(-(expectedHost.length + 1)) === '.' + expectedHost;
  }

  function detectSource(url) {
    var hostname = normalizeHost(url.hostname);
    var path = url.pathname || '/';
    var i;
    var source;
    var j;

    for (i = 0; i < SOURCES.length; i += 1) {
      source = SOURCES[i];

      for (j = 0; j < source.hosts.length; j += 1) {
        if (matchesHost(hostname, source.hosts[j]) && (!source.pathPattern || source.pathPattern.test(path))) {
          return source.source;
        }
      }
    }

    return null;
  }

  function hasSessionEvent(key) {
    try {
      return window.sessionStorage && window.sessionStorage.getItem(key) === '1';
    } catch (error) {
      return false;
    }
  }

  function markSessionEvent(key) {
    try {
      if (window.sessionStorage) {
        window.sessionStorage.setItem(key, '1');
      }
    } catch (error) {
      // Storage may be disabled. Tracking should never break the page.
    }
  }

  function pushAiTrafficEvent(aiSource) {
    var pagePath = window.location.pathname || '/';
    var storageKey = 'carsa_ai_traffic_detected|' + aiSource + '|' + pagePath;

    if (hasSessionEvent(storageKey)) {
      return;
    }

    markSessionEvent(storageKey);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'ai_traffic_detected',
      ai_source: aiSource,
      ai_referrer: referrer,
      page_path: pagePath
    });
  }

  try {
    var referrerUrl = new URL(referrer);
    var aiSource = detectSource(referrerUrl);

    if (aiSource) {
      pushAiTrafficEvent(aiSource);
    }
  } catch (error) {
    // Ignore malformed or privacy-trimmed referrers.
  }
}());
