(function () {
  'use strict';

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  var SITE_URL = 'https://carsaseguros.mx';
  var ORG_ID = SITE_URL + '/#organization';
  var BUSINESS_ID = SITE_URL + '/#insurance-agency';
  var WEBSITE_ID = SITE_URL + '/#website';
  var GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/pk8kE9BM5KyEEavD7';
  var SOCIAL_PROFILES = [
    'https://www.facebook.com/CarsaSegurosyFianzas',
    'https://www.instagram.com/grupocarsa/',
    'https://www.teamcarsa.com/',
    GOOGLE_MAPS_URL
  ];

  function toArray(value) {
    return Array.isArray(value) ? value : [value];
  }

  function getJsonLdTypes(node, types) {
    var key;

    if (!node || typeof node !== 'object') {
      return;
    }

    if (node['@type']) {
      toArray(node['@type']).forEach(function (type) {
        types[String(type)] = true;
      });
    }

    if (Array.isArray(node)) {
      node.forEach(function (item) {
        getJsonLdTypes(item, types);
      });
      return;
    }

    for (key in node) {
      if (Object.prototype.hasOwnProperty.call(node, key)) {
        getJsonLdTypes(node[key], types);
      }
    }
  }

  function collectExistingTypes() {
    var types = {};

    document.querySelectorAll('script[type="application/ld+json"]').forEach(function (script) {
      try {
        getJsonLdTypes(JSON.parse(script.textContent), types);
      } catch (error) {
        // Ignore invalid third-party or hand-authored JSON-LD blocks.
      }
    });

    return types;
  }

  function getPageUrl() {
    return SITE_URL + (window.location.pathname || '/');
  }

  function cleanText(value) {
    return (value || '').replace(/\s+/g, ' ').trim();
  }

  function getPageName() {
    var h1 = document.querySelector('h1');
    return cleanText(h1 && h1.textContent) || cleanText(document.title) || 'CARSA Seguros y Fianzas';
  }

  function buildBusinessNode() {
    return {
      '@type': ['LocalBusiness', 'InsuranceAgency'],
      '@id': BUSINESS_ID,
      name: 'CARSA Seguros y Fianzas',
      alternateName: 'CARSA Seguros',
      legalName: 'Consultores Asociados en Riesgos, Agente de Seguros y de Fianzas, S.A. de C.V.',
      url: SITE_URL + '/',
      logo: SITE_URL + '/Content/img/home/Logo.webp',
      image: SITE_URL + '/Content/img/home/OG_Meta.webp',
      description: 'Agencia de seguros y fianzas en Mexico con asesoria en linea para personas y empresas.',
      telephone: '+52-999-944-4999',
      email: 'contacto@segurosfianzas.com',
      priceRange: '$$',
      hasMap: GOOGLE_MAPS_URL,
      openingHours: 'Mo-Fr 08:00-17:00',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'C. 60 326, Gonzalo Guerrero',
        addressLocality: 'Merida',
        addressRegion: 'Yucatan',
        postalCode: '97118',
        addressCountry: 'MX'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 21.021830761301565,
        longitude: -89.62525664766997
      },
      areaServed: {
        '@type': 'Country',
        name: 'Mexico'
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          telephone: '+52-999-944-4999',
          email: 'contacto@segurosfianzas.com',
          areaServed: 'MX',
          availableLanguage: ['es']
        },
        {
          '@type': 'ContactPoint',
          contactType: 'WhatsApp',
          telephone: '+52-999-296-8025',
          areaServed: 'MX',
          availableLanguage: ['es']
        }
      ],
      sameAs: SOCIAL_PROFILES,
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:00'
        }
      ],
      identifier: [
        {
          '@type': 'PropertyValue',
          name: 'Google Maps Place ID',
          value: 'ChIJyf4tBdJ2Vo8REw_u_bkm3YY'
        }
      ],
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Plus Code',
          value: '29CF+MV Merida, Yucatan'
        },
        {
          '@type': 'PropertyValue',
          name: 'Place ID',
          value: 'ChIJyf4tBdJ2Vo8REw_u_bkm3YY'
        }
      ]
    };
  }

  function buildBaseGraph(types) {
    var graph = [];

    if (!types.Organization) {
      graph.push({
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'CARSA Seguros y Fianzas',
        url: SITE_URL + '/',
        logo: SITE_URL + '/Content/img/home/Logo.webp',
        sameAs: SOCIAL_PROFILES
      });
    }

    if (!types.InsuranceAgency && !types.LocalBusiness && !types.FinancialService) {
      graph.push(buildBusinessNode());
    }

    if (!types.WebSite) {
      graph.push({
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: 'CARSA Seguros y Fianzas',
        url: SITE_URL + '/',
        publisher: {
          '@id': ORG_ID
        },
        inLanguage: 'es-MX'
      });
    }

    if (!types.WebPage && !types.ContactPage && !types.CollectionPage) {
      graph.push({
        '@type': 'WebPage',
        '@id': getPageUrl() + '#webpage',
        url: getPageUrl(),
        name: getPageName(),
        isPartOf: {
          '@id': WEBSITE_ID
        },
        about: {
          '@id': BUSINESS_ID
        },
        inLanguage: 'es-MX'
      });
    }

    return graph;
  }

  function buildBreadcrumbGraph(types) {
    var path = (window.location.pathname || '/').replace(/^\/+|\/+$/g, '');
    var title = getPageName();

    if (types.BreadcrumbList || !path) {
      return null;
    }

    return {
      '@type': 'BreadcrumbList',
      '@id': getPageUrl() + '#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: SITE_URL + '/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: title,
          item: getPageUrl()
        }
      ]
    };
  }

  function buildFaqGraph(types) {
    var questions = [];

    if (types.FAQPage) {
      return null;
    }

    document.querySelectorAll('details').forEach(function (details) {
      var summary = details.querySelector('summary');
      var answer = cleanText(details.textContent).replace(cleanText(summary && summary.textContent), '').trim();

      if (summary && answer) {
        questions.push({
          '@type': 'Question',
          name: cleanText(summary.textContent),
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer
          }
        });
      }
    });

    document.querySelectorAll('.faq-item').forEach(function (item) {
      var question = item.querySelector('.faq-question, h2, h3, summary');
      var answer = item.querySelector('.faq-answer, p');

      if (question && answer) {
        questions.push({
          '@type': 'Question',
          name: cleanText(question.textContent),
          acceptedAnswer: {
            '@type': 'Answer',
            text: cleanText(answer.textContent)
          }
        });
      }
    });

    if (!questions.length) {
      return null;
    }

    return {
      '@type': 'FAQPage',
      '@id': getPageUrl() + '#faq',
      mainEntity: questions.slice(0, 12)
    };
  }

  function appendJsonLd(graph) {
    var script;

    if (!graph.length || document.getElementById('carsa-dynamic-jsonld')) {
      return;
    }

    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'carsa-dynamic-jsonld';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph
    });

    document.head.appendChild(script);
  }

  function init() {
    var types = collectExistingTypes();
    var graph = buildBaseGraph(types);
    var breadcrumb = buildBreadcrumbGraph(types);
    var faq = buildFaqGraph(types);

    if (breadcrumb) {
      graph.push(breadcrumb);
    }

    if (faq) {
      graph.push(faq);
    }

    appendJsonLd(graph);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}());
