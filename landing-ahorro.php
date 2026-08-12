<?php
declare(strict_types=1);

ini_set('display_errors', '0');

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

$baseFaqs = [
    [
        'question' => '¿Qué es un seguro de ahorro?',
        'answer' => 'Es una solución que combina aportaciones periódicas para construir un fondo con componentes de protección. Las condiciones, plazos, coberturas y disponibilidad del ahorro cambian según el producto, por eso conviene comparar antes de contratar.'
    ],
    [
        'question' => '¿Cuánto debo ahorrar mensualmente?',
        'answer' => 'Depende de tu edad, objetivo, plazo y capacidad real de pago. Una buena aportación es la que puedes sostener sin comprometer tus gastos esenciales; con esos datos podemos mostrarte alternativas compatibles con tu presupuesto.'
    ],
    [
        'question' => '¿Qué diferencia hay entre un PPR y un seguro de ahorro?',
        'answer' => 'Un PPR está diseñado específicamente para el retiro y puede ofrecer beneficios fiscales si cumple los requisitos aplicables. Un seguro de ahorro puede enfocarse en distintas metas y añadir protección de vida. Algunas soluciones combinan ambos enfoques; la comparación debe revisar contrato, plazo, liquidez y tratamiento fiscal.'
    ],
    [
        'question' => '¿Qué pasa si dejo de pagar?',
        'answer' => 'Depende de las condiciones del plan y del tiempo transcurrido. Puede haber periodos de gracia, reducción de beneficios, cargos o cancelación. Antes de elegir te explicamos por escrito qué ocurriría en cada alternativa.'
    ],
    [
        'question' => '¿Puedo utilizarlo para mi retiro?',
        'answer' => 'Sí. Existen seguros de ahorro y planes diseñados para formar un fondo de largo plazo. La opción adecuada depende de la edad a la que quieres retirarte, el monto que puedes aportar y el nivel de protección que buscas.'
    ],
    [
        'question' => '¿La asesoría tiene costo?',
        'answer' => 'La orientación inicial y la comparación de opciones de CARSA no tienen costo para el prospecto ni te obligan a contratar.'
    ],
    [
        'question' => '¿Puedo recibir atención en Mérida?',
        'answer' => 'Sí. CARSA brinda atención personalizada en Mérida y Yucatán, además de seguimiento por teléfono y WhatsApp.'
    ],
    [
        'question' => '¿Cómo funciona la solicitud de opciones?',
        'answer' => 'Respondes tres preguntas sobre tu objetivo, presupuesto y edad, compartes tu nombre y WhatsApp, y un asesor revisa alternativas compatibles contigo para explicarte aportaciones, protección, plazo, beneficios y condiciones.'
    ],
    [
        'question' => '¿Puedo comparar varias opciones antes de contratar?',
        'answer' => 'Sí. El objetivo de la asesoría es que entiendas las diferencias entre opciones antes de tomar una decisión. No hay obligación de contratar.'
    ]
];

$retirementFaqs = $baseFaqs;
$retirementFaqs[0] = [
    'question' => '¿Qué es un plan de ahorro para el retiro?',
    'answer' => 'Es una estrategia de largo plazo basada en aportaciones periódicas para construir un fondo que complemente tus ingresos futuros. Antes de elegir conviene revisar plazo, liquidez, protección, costos y condiciones.'
];

$pprFaqs = array_merge([[
    'question' => '¿Qué es un Plan Personal de Retiro o PPR?',
    'answer' => 'Es un instrumento diseñado específicamente para acumular recursos para el retiro. Puede ofrecer beneficios fiscales cuando cumple los requisitos legales aplicables, pero cada plan tiene condiciones de permanencia, aportación y retiro que deben revisarse antes de contratar.'
]], $baseFaqs);

$baseBenefits = [
    ['title' => 'Ahorro para tu retiro', 'copy' => 'Construye un fondo de largo plazo mientras mantienes protección según el plan.', 'goal' => 'Ahorrar para mi retiro', 'icon' => '/Content/img/disiplina-para-formar-fondo-ahorro.svg'],
    ['title' => 'Protección para tu familia', 'copy' => 'Combina ahorro con protección financiera y revisa qué cobertura necesita tu familia.', 'goal' => 'Proteger a mi familia', 'icon' => '/Content/img/proteccion-financiera-y-seguro-de-vida.svg'],
    ['title' => 'Patrimonio e inversión', 'copy' => 'Construye patrimonio con aportaciones periódicas y condiciones que puedas entender.', 'goal' => 'Crear patrimonio', 'icon' => '/Content/img/capital-garantizado-y-protegido.svg']
];

$retirementBenefits = [
    ['title' => 'Complementa tu retiro', 'copy' => 'Construye un fondo adicional con una aportación que puedas sostener en el tiempo.', 'goal' => 'Ahorrar para mi retiro', 'icon' => '/Content/img/disiplina-para-formar-fondo-ahorro.svg'],
    ['title' => 'Protege tu plan familiar', 'copy' => 'Revisa alternativas que incorporan protección mientras avanzas hacia tu meta.', 'goal' => 'Proteger a mi familia', 'icon' => '/Content/img/proteccion-financiera-y-seguro-de-vida.svg'],
    ['title' => 'Construye patrimonio', 'copy' => 'Ordena aportaciones, plazo y flexibilidad alrededor de tu objetivo de largo plazo.', 'goal' => 'Crear patrimonio', 'icon' => '/Content/img/capital-garantizado-y-protegido.svg']
];

$pprBenefits = [
    ['title' => 'Fondo para tu retiro', 'copy' => 'Compara estructuras de PPR según tu edad, horizonte y aportación mensual.', 'goal' => 'Ahorrar para mi retiro', 'icon' => '/Content/img/disiplina-para-formar-fondo-ahorro.svg'],
    ['title' => 'Protección complementaria', 'copy' => 'Identifica qué alternativas incluyen protección y cómo cambia el costo del plan.', 'goal' => 'Proteger a mi familia', 'icon' => '/Content/img/proteccion-financiera-y-seguro-de-vida.svg'],
    ['title' => 'Beneficios y condiciones', 'copy' => 'Revisa permanencia, flexibilidad y posibles beneficios fiscales antes de decidir.', 'goal' => 'Ahorrar e invertir', 'icon' => '/Content/img/beneficios-fiscales-para-tu-patrimonio.svg']
];

$variants = [
    'seguro-de-ahorro' => [
        'slug' => 'seguro-de-ahorro',
        'form' => 'landing_ahorro',
        'title' => 'Seguro de Ahorro | Compara Opciones | CARSA',
        'description' => 'Compara opciones de seguro de ahorro, protección y retiro según tu edad, objetivo y presupuesto. Asesoría personalizada en Mérida y Yucatán.',
        'eyebrow' => 'Seguro de ahorro en Mérida y Yucatán',
        'h1' => 'Compara seguros de ahorro y descubre la mejor opción para ti',
        'subheadline' => 'Compara planes de ahorro, protección y retiro con asesoría personalizada. Recibe opciones claras antes de decidir.',
        'goalTitle' => '¿Qué puedes lograr con un seguro de ahorro?',
        'goalIntro' => 'El punto de partida es tu objetivo. Después revisamos aportación, protección, plazo y condiciones para encontrar opciones que hagan sentido para ti.',
        'finalTitle' => '¿Listo para conocer tus opciones de seguro de ahorro?',
        'whatsappTopic' => 'seguro de ahorro',
        'benefits' => $baseBenefits,
        'faqs' => $baseFaqs
    ],
    'plan-para-el-retiro' => [
        'slug' => 'plan-para-el-retiro',
        'form' => 'landing_retiro',
        'title' => 'Plan para el Retiro | Compara Opciones con CARSA',
        'description' => 'Compara opciones de plan para el retiro según tu edad, objetivo y presupuesto. Recibe asesoría personalizada de CARSA en Mérida y Yucatán.',
        'eyebrow' => 'Ahorro para el retiro con asesoría personalizada',
        'h1' => 'Compara planes para el retiro según tu edad, objetivo y presupuesto',
        'subheadline' => 'Conoce alternativas de ahorro para el retiro, protección y patrimonio. Te explicamos aportaciones, plazos y condiciones antes de decidir.',
        'goalTitle' => '¿Qué puedes construir con un plan para el retiro?',
        'goalIntro' => 'Compara un plan de ahorro para el retiro desde tu realidad actual: edad, horizonte de tiempo y una aportación mensual sostenible.',
        'finalTitle' => '¿Listo para empezar tu plan para el retiro?',
        'whatsappTopic' => 'plan para el retiro',
        'benefits' => $retirementBenefits,
        'faqs' => $retirementFaqs
    ],
    'ppr' => [
        'slug' => 'ppr',
        'form' => 'landing_ppr',
        'title' => 'Plan Personal de Retiro (PPR) | Compara con CARSA',
        'description' => 'Compara opciones de Plan Personal de Retiro o PPR. Revisa aportaciones, plazo, protección, flexibilidad y posibles beneficios fiscales con asesoría CARSA.',
        'eyebrow' => 'Plan Personal de Retiro · PPR',
        'h1' => 'Compara opciones de Plan Personal de Retiro antes de decidir',
        'subheadline' => 'Revisa alternativas de PPR según tu edad, meta de retiro y presupuesto, con una explicación clara de beneficios, condiciones y flexibilidad.',
        'goalTitle' => '¿Qué puedes lograr con un Plan Personal de Retiro?',
        'goalIntro' => 'Un PPR puede ayudarte a construir un fondo para el retiro. Te ayudamos a comparar su estructura, permanencia y posibles beneficios fiscales sin asumir que todos los planes son iguales.',
        'finalTitle' => '¿Listo para comparar opciones de PPR?',
        'whatsappTopic' => 'Plan Personal de Retiro (PPR)',
        'benefits' => $pprBenefits,
        'faqs' => $pprFaqs
    ]
];

$requestPath = trim((string) parse_url($_SERVER['REQUEST_URI'] ?? '/seguro-de-ahorro', PHP_URL_PATH), '/');
$requestedVariant = isset($_GET['variant']) ? (string) $_GET['variant'] : '';
$variantKey = isset($variants[$requestPath]) ? $requestPath : (isset($variants[$requestedVariant]) ? $requestedVariant : 'seguro-de-ahorro');
$page = $variants[$variantKey];
$canonical = 'https://carsaseguros.mx/' . $page['slug'];
$whatsappText = rawurlencode('Hola, quiero información sobre ' . $page['whatsappTopic'] . ".\nVengo desde la landing de CARSA.");
$whatsappUrl = 'https://wa.me/529992968025?text=' . $whatsappText;

$googleReviews = [
    [
        'name' => 'EDUARDO CANTO CASTILLA',
        'rating' => 5,
        'text' => 'Les recomiendo ampliamente el lic ricardo y su equipo están siempre al pendiente de todos mis pólizas, la mejor agencia de seguros del sureste.',
        'link' => 'https://maps.app.goo.gl/BSESVMbwQ9jbUHan7'
    ],
    [
        'name' => 'Gerardo José Martínez Palma',
        'rating' => 5,
        'text' => 'Cuando he tenido que hacer uso de mi póliza, la respuesta tanto del seguro como de CARSA ha sido buena.',
        'link' => 'https://maps.app.goo.gl/8HAPPYc6bGutHLPs8'
    ],
    [
        'name' => 'EDUARDO GONZALEZ',
        'rating' => 5,
        'text' => 'Siempre que he ocupado mi seguro, han estado muy pendientes y apoyandonos, les recomiendo ampliamente este gran equipo de trabajo.',
        'link' => 'https://maps.app.goo.gl/iPsBF6jrZDXAPzhv8'
    ],
    [
        'name' => 'Huayo MP',
        'rating' => 5,
        'text' => 'Cuando realmente he necesitado hacer uso de mi póliza, el respaldo a sido siempre claro, agil y confiable.',
        'link' => 'https://maps.app.goo.gl/vWBWqk7TzrkJQ7BY7'
    ],
    [
        'name' => 'rita marquez',
        'rating' => 5,
        'text' => 'Excelente atención por parte de la empresa, con ellos tengo diversos seguros y siempre recordemos lo importante que es contar con seguro de gastos médicos.',
        'link' => 'https://maps.app.goo.gl/Q1kGqMqgcPWJQKLo8'
    ],
    [
        'name' => 'NOTARIA YUCATAN',
        'rating' => 5,
        'text' => 'El mejor despacho de seguros de Merida; confiables, siempre buscando las mejores opciones para sus clientes, Experiencia comprobada en el ramo, Los recomiendo ampliamente.',
        'link' => 'https://maps.app.goo.gl/cGDiQgALpXctjHuu8'
    ]
];

$schema = [
    '@context' => 'https://schema.org',
    '@graph' => [
        [
            '@type' => 'InsuranceAgency',
            '@id' => 'https://carsaseguros.mx/#organization',
            'name' => 'CARSA Seguros y Fianzas',
            'legalName' => 'Consultores Asociados en Riesgos, Agente de Seguros y de Fianzas, S.A. de C.V.',
            'url' => 'https://carsaseguros.mx/',
            'logo' => 'https://carsaseguros.mx/Content/img/home/Logo.webp',
            'telephone' => '+52-999-944-4999',
            'areaServed' => ['Mérida', 'Yucatán', 'México'],
            'hasMap' => 'https://maps.app.goo.gl/pk8kE9BM5KyEEavD7'
        ],
        [
            '@type' => 'WebPage',
            '@id' => $canonical . '#webpage',
            'url' => $canonical,
            'name' => $page['title'],
            'description' => $page['description'],
            'inLanguage' => 'es-MX',
            'about' => ['Seguro de ahorro', 'Seguro de vida con ahorro', 'Plan para el retiro', 'Plan Personal de Retiro']
        ],
        [
            '@type' => 'FAQPage',
            'mainEntity' => array_map(static function (array $faq): array {
                return [
                    '@type' => 'Question',
                    'name' => $faq['question'],
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => $faq['answer']
                    ]
                ];
            }, $page['faqs'])
        ]
    ]
];
?>
<!doctype html>
<html lang="es-MX">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title><?= e($page['title']) ?></title>
  <meta name="description" content="<?= e($page['description']) ?>">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="<?= e($canonical) ?>">
  <meta property="og:locale" content="es_MX">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="CARSA Seguros">
  <meta property="og:title" content="<?= e($page['title']) ?>">
  <meta property="og:description" content="<?= e($page['description']) ?>">
  <meta property="og:url" content="<?= e($canonical) ?>">
  <meta property="og:image" content="https://carsaseguros.mx/Content/img/home/OG_Meta.webp">
  <meta property="og:image:alt" content="CARSA Seguros y Fianzas">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="<?= e($page['title']) ?>">
  <meta name="twitter:description" content="<?= e($page['description']) ?>">
  <meta name="twitter:image" content="https://carsaseguros.mx/Content/img/home/OG_Meta.webp">
  <meta name="theme-color" content="#062a54">
  <link rel="icon" type="image/webp" href="/Content/img/carsaLogo-B.webp">
  <link rel="preload" as="image" href="/Content/img/cotiza-tu-seguro-medico.webp" fetchpriority="high">
  <link rel="stylesheet" href="/Content/landing-ahorro.css?v=20260812-2">
  <script type="application/ld+json"><?= json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?></script>
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-NZKHKWGJ');</script>
  <!-- End Google Tag Manager -->
  <script src="/Scripts/carsa-tracking.js?v=20260812-1" defer></script>
  <script src="/Scripts/ai-traffic-detection.js?v=20260514" defer></script>
  <script>window.CARSA_GOOGLE_REVIEWS = <?= json_encode($googleReviews, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?>;</script>
  <script src="/Scripts/landing-ahorro.js?v=20260812-3" defer></script>
</head>
<body data-landing-variant="<?= e($page['slug']) ?>">
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NZKHKWGJ" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

  <a class="skip-link" href="#contenido-principal">Saltar al contenido principal</a>

  <header class="landing-header">
    <div class="landing-container landing-header__inner">
      <a class="landing-logo" href="/" aria-label="Ir al inicio de CARSA">
        <img src="/Content/img/home/Logo-216.webp" alt="CARSA Seguros y Fianzas" width="216" height="91" decoding="async">
      </a>

      <button class="landing-nav-toggle" type="button" aria-expanded="false" aria-controls="landingNav" aria-label="Abrir menú" data-nav-toggle><span></span></button>

      <nav class="landing-nav" id="landingNav" aria-label="Navegación de la landing">
        <ul class="landing-nav__links">
          <li><a href="#objetivos">Seguro de ahorro</a></li>
          <li><a href="#comparador">Plan para el retiro</a></li>
          <li><a href="#proceso">¿Cómo funciona?</a></li>
          <li><a href="#preguntas">Preguntas frecuentes</a></li>
        </ul>
        <a class="landing-btn landing-btn--whatsapp landing-btn--sm" href="<?= e($whatsappUrl) ?>" target="_blank" rel="noopener noreferrer" data-landing-whatsapp data-track-event="click_whatsapp" data-track-location="header_whatsapp" data-track-cta-type="whatsapp">
          WhatsApp <img src="/Content/img/icn-whatsapp.webp" alt="" width="24" height="24">
        </a>
      </nav>
    </div>
  </header>

  <main id="contenido-principal">
    <section class="landing-hero" aria-labelledby="hero-title">
      <div class="landing-container hero-grid">
        <div class="hero-message">
          <div class="hero-copy">
            <p class="hero-eyebrow"><?= e($page['eyebrow']) ?></p>
            <h1 id="hero-title"><?= e($page['h1']) ?></h1>
            <p class="hero-subheadline"><?= e($page['subheadline']) ?></p>

            <ul class="hero-benefits" aria-label="Beneficios de la asesoría">
              <li><img src="/Content/img/iconos/asesoria-personalizada.svg" alt="" width="32" height="32">Asesoría sin costo</li>
              <li><img src="/Content/img/iconos/Respuesta-rapida.svg" alt="" width="32" height="32">Respuesta rápida por WhatsApp</li>
              <li><img src="/Content/img/iconos/atencion-local-yucatan.svg" alt="" width="32" height="32">Atención en Mérida y Yucatán</li>
              <li><img src="/Content/img/iconos/tus-datos-estan-protegidos.svg" alt="" width="32" height="32">Sin compromiso</li>
            </ul>

            <div class="hero-proof">
              <span class="hero-proof__mark" aria-hidden="true">45+</span>
              <span>Más de 45 años asesorando a personas y empresas en seguros y protección patrimonial.</span>
            </div>
          </div>
        </div>

        <aside class="quote-card" id="diagnostico" aria-labelledby="quote-title">
          <div id="quoteFormInner">
            <div class="quote-card__header">
              <h2 id="quote-title">Descubre tus opciones en 2 minutos</h2>
              <p>Tres preguntas rápidas y tus datos de contacto.</p>
            </div>

            <form id="savingsQuoteForm" action="/enviar.php" method="post" novalidate data-track-location="hero_quote">
              <input type="hidden" name="formulario" value="<?= e($page['form']) ?>">
              <input type="hidden" name="page" value="<?= e($canonical) ?>">
              <input type="hidden" name="variant" value="<?= e($page['slug']) ?>">
              <input type="hidden" name="landing_url" value="">
              <input type="hidden" name="utm_source" value="">
              <input type="hidden" name="utm_medium" value="">
              <input type="hidden" name="utm_campaign" value="">
              <input type="hidden" name="utm_content" value="">
              <input type="hidden" name="utm_term" value="">
              <input type="hidden" name="gclid" value="">
              <input type="hidden" name="gbraid" value="">
              <input type="hidden" name="wbraid" value="">
              <div class="honeypot-field" aria-hidden="true">
                <label for="website">No llenar este campo</label>
                <input id="website" name="website" type="text" tabindex="-1" autocomplete="off">
              </div>

              <ol class="quote-progress" aria-label="Progreso del diagnóstico">
                <li data-progress-step="1" aria-current="step"><span>1</span><small>Objetivo</small></li>
                <li data-progress-step="2"><span>2</span><small>Aportación</small></li>
                <li data-progress-step="3"><span>3</span><small>Edad</small></li>
                <li data-progress-step="4"><span>4</span><small>Contacto</small></li>
              </ol>

              <section class="quote-panel" data-quote-step="1" aria-hidden="false">
                <fieldset>
                  <legend>¿Qué quieres lograr?</legend>
                  <div class="choice-list">
                    <?php foreach (['Ahorrar para mi retiro', 'Proteger a mi familia', 'Crear patrimonio', 'Ahorrar e invertir', 'Aún no estoy seguro'] as $index => $objective): ?>
                      <label class="choice-card"><input type="radio" name="objetivo" value="<?= e($objective) ?>" <?= $index === 0 ? 'required' : '' ?>><span><?= e($objective) ?></span></label>
                    <?php endforeach; ?>
                  </div>
                </fieldset>
              </section>

              <section class="quote-panel" data-quote-step="2" aria-hidden="true" hidden>
                <fieldset>
                  <legend>¿Cuánto puedes ahorrar aproximadamente al mes?</legend>
                  <div class="choice-list">
                    <?php foreach (['Menos de $1,500', '$1,500 – $3,000', '$3,000 – $5,000', '$5,000 – $10,000', 'Más de $10,000'] as $index => $amount): ?>
                      <label class="choice-card"><input type="radio" name="aportacion" value="<?= e($amount) ?>" <?= $index === 0 ? 'required' : '' ?>><span><?= e($amount) ?></span></label>
                    <?php endforeach; ?>
                  </div>
                  <div class="quote-actions quote-actions--back-only"><button class="quote-back" type="button" data-quote-back>← Atrás</button></div>
                </fieldset>
              </section>

              <section class="quote-panel" data-quote-step="3" aria-hidden="true" hidden>
                <fieldset>
                  <legend>¿Qué edad tienes?</legend>
                  <div class="choice-list">
                    <?php foreach (['18 – 29 años', '30 – 39 años', '40 – 49 años', '50 – 59 años', '60 años o más'] as $index => $age): ?>
                      <label class="choice-card"><input type="radio" name="edad" value="<?= e($age) ?>" <?= $index === 0 ? 'required' : '' ?>><span><?= e($age) ?></span></label>
                    <?php endforeach; ?>
                  </div>
                  <div class="quote-actions quote-actions--back-only"><button class="quote-back" type="button" data-quote-back>← Atrás</button></div>
                </fieldset>
              </section>

              <section class="quote-panel" data-quote-step="4" aria-hidden="true" hidden>
                <fieldset>
                  <legend>¿A dónde te enviamos tus opciones?</legend>
                  <div class="contact-fields">
                    <div class="form-field">
                      <label for="quoteName">Nombre</label>
                      <input id="quoteName" name="name" type="text" autocomplete="name" placeholder="Escribe tu nombre" minlength="2" required aria-describedby="quoteNameError" data-error-id="quoteNameError">
                      <p class="form-error" id="quoteNameError" aria-live="polite"></p>
                    </div>
                    <div class="form-field">
                      <label for="quoteWhatsapp">WhatsApp</label>
                      <input id="quoteWhatsapp" name="whatsapp" type="tel" inputmode="numeric" autocomplete="tel" placeholder="10 dígitos" maxlength="14" required aria-describedby="quoteWhatsappHint quoteWhatsappError" data-error-id="quoteWhatsappError">
                      <p class="field-hint" id="quoteWhatsappHint">Te contactaremos para explicarte las alternativas.</p>
                      <p class="form-error" id="quoteWhatsappError" aria-live="polite"></p>
                    </div>
                  </div>
                  <div class="quote-actions"><button class="quote-back" type="button" data-quote-back>← Atrás</button><button class="landing-btn landing-btn--whatsapp" type="submit">Ver mis opciones</button></div>
                  <p class="quote-privacy"><img src="/Content/img/iconos/tus-datos-estan-protegidos.svg" alt="" width="17" height="17"><span>Tus datos están protegidos. No hay compromiso de contratación. Consulta nuestro <a href="/aviso-de-privacidad">aviso de privacidad</a>.</span></p>
                  <p class="form-status" id="quoteFormStatus" role="status" aria-live="polite"></p>
                </fieldset>
              </section>
            </form>
          </div>

          <div class="quote-success" id="quoteSuccess" tabindex="-1" hidden>
            <span class="quote-success__icon" aria-hidden="true">✓</span>
            <h3>Recibimos tu diagnóstico</h3>
            <p>Un asesor de CARSA revisará tus respuestas para contactarte con opciones compatibles con tu perfil.</p>
            <a class="landing-btn landing-btn--whatsapp" id="quoteSuccessWhatsapp" href="<?= e($whatsappUrl) ?>" target="_blank" rel="noopener noreferrer" data-landing-whatsapp data-track-event="click_whatsapp" data-track-location="quote_success_whatsapp" data-track-cta-type="whatsapp">Continuar por WhatsApp <img src="/Content/img/icn-whatsapp.webp" alt="" width="24" height="24"></a>
          </div>
        </aside>
      </div>
    </section>

    <div class="landing-container trust-wrap" aria-label="Razones para confiar en CARSA">
      <div class="trust-strip">
        <div class="trust-item"><img src="/Content/img/iconos/atencion-local-en-merida.svg" alt="" width="40" height="40" loading="lazy"><div><strong>Mérida y Yucatán</strong><span>Atención local y en línea</span></div></div>
        <div class="trust-item"><img src="/Content/img/iconos/asesoria-personalizada.svg" alt="" width="40" height="40" loading="lazy"><div><strong>Asesoría personalizada</strong><span>Según tu objetivo y presupuesto</span></div></div>
        <div class="trust-item"><img src="/Content/img/iconos/Mejores-aseguradoras-en-un-solo-lugar.svg" alt="" width="40" height="40" loading="lazy"><div><strong>Distintas aseguradoras</strong><span>Opciones para comparar</span></div></div>
        <div class="trust-item"><img src="/Content/img/iconos/Respuesta-rapida.svg" alt="" width="40" height="40" loading="lazy"><div><strong>Respuesta rápida</strong><span>Seguimiento por WhatsApp</span></div></div>
      </div>
    </div>

    <section class="landing-section" id="objetivos" aria-labelledby="goals-title">
      <div class="landing-container">
        <div class="section-heading">
          <p class="section-eyebrow">Opciones según tu meta</p>
          <h2 id="goals-title"><?= e($page['goalTitle']) ?></h2>
          <p><?= e($page['goalIntro']) ?></p>
        </div>

        <div class="goal-grid">
          <?php foreach ($page['benefits'] as $benefit): ?>
            <article class="goal-card">
              <img src="<?= e($benefit['icon']) ?>" alt="" width="68" height="68" loading="lazy">
              <div><h3><?= e($benefit['title']) ?></h3><p><?= e($benefit['copy']) ?></p><button class="text-link" type="button" data-goal-value="<?= e($benefit['goal']) ?>">Ver opciones</button></div>
            </article>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <section class="landing-section landing-section--soft" id="comparador" aria-labelledby="compare-title">
      <div class="landing-container compare-layout">
        <div class="compare-card" aria-label="Ejemplo ilustrativo de criterios para comparar">
          <div class="compare-card__title">Comparación personalizada <span>Sin cifras ficticias</span></div>
          <div class="compare-scroll">
            <table class="compare-table">
              <thead><tr><th>Qué comparamos</th><th>Opción A</th><th>Opción B</th><th>Opción C</th></tr></thead>
              <tbody>
                <?php foreach (['Aportación mensual', 'Suma asegurada', 'Plazo', 'Beneficios', 'Condiciones', 'Ahorro proyectado', 'Flexibilidad'] as $criterion): ?>
                  <tr><td><?= e($criterion) ?></td><td><span class="compare-pill">A revisar</span></td><td><span class="compare-pill">A revisar</span></td><td><span class="compare-pill">A revisar</span></td></tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          </div>
          <p class="compare-note">Vista ilustrativa. Las opciones y condiciones reales dependen de cada aseguradora y de tu perfil.</p>
        </div>

        <div class="compare-copy">
          <div class="section-heading section-heading--left">
            <p class="section-eyebrow">Compara antes de decidir</p>
            <h2 id="compare-title">Te mostramos opciones reales para que elijas con confianza</h2>
            <p>Analizamos diferentes alternativas de seguro de vida con ahorro, seguro de ahorro para el retiro, plan de ahorro para el retiro y PPR según tu perfil y objetivo.</p>
          </div>
          <ul>
            <li>Aportación mensual y plazo</li>
            <li>Protección, beneficios y condiciones</li>
            <li>Ahorro proyectado y flexibilidad</li>
            <li>Diferencias explicadas en lenguaje claro</li>
          </ul>
          <a class="landing-btn landing-btn--primary" href="#diagnostico" data-scroll-to-quote data-track-location="comparator_cta">Quiero comparar mis opciones</a>
        </div>
      </div>
    </section>

    <section class="landing-section" id="proceso" aria-labelledby="process-title">
      <div class="landing-container">
        <div class="section-heading"><p class="section-eyebrow">Claro y sin presión</p><h2 id="process-title">Así es nuestro proceso</h2></div>
        <div class="process-grid">
          <article class="process-card"><h3>Cuéntanos tu objetivo</h3><p>Responde unas preguntas rápidas.</p></article>
          <article class="process-card"><h3>Comparamos opciones</h3><p>Revisamos alternativas compatibles con tu perfil.</p></article>
          <article class="process-card"><h3>Te asesoramos</h3><p>Te explicamos diferencias, ventajas y condiciones.</p></article>
          <article class="process-card"><h3>Tú decides</h3><p>No hay obligación de contratar.</p></article>
        </div>
      </div>
    </section>

    <section class="advisor-section" aria-labelledby="advisor-title">
      <div class="landing-container advisor-layout">
        <div class="advisor-visual">
          <img src="/Content/img/home/png/img-hero-asesoria.webp" alt="Atención por WhatsApp con el equipo CARSA" width="322" height="472" loading="lazy" decoding="async">
        </div>
        <div class="advisor-copy">
          <p class="section-eyebrow">Personas que te acompañan</p>
          <h2 id="advisor-title">Estamos para ayudarte a tomar una mejor decisión</h2>
          <p>Tu diagnóstico no termina en una respuesta automática. Un asesor del equipo CARSA revisa tus objetivos para explicarte opciones y condiciones con claridad.</p>
          <ul class="advisor-list">
            <li>Asesoría inicial sin costo</li>
            <li>Atención personalizada antes, durante y después</li>
            <li>Seguimiento directo vía WhatsApp</li>
          </ul>
          <div class="advisor-name"><strong>Equipo CARSA</strong><span>Asesores de seguros y fianzas</span></div>
          <div><a class="landing-btn landing-btn--whatsapp" href="<?= e($whatsappUrl) ?>" target="_blank" rel="noopener noreferrer" data-landing-whatsapp data-track-event="click_whatsapp" data-track-location="advisor_whatsapp" data-track-cta-type="whatsapp">Hablar con un asesor por WhatsApp <img src="/Content/img/icn-whatsapp.webp" alt="" width="24" height="24" loading="lazy"></a></div>
        </div>
      </div>
    </section>

    <section class="landing-section landing-section--soft" aria-labelledby="reviews-title">
      <div class="landing-container">
        <div class="section-heading"><p class="section-eyebrow">Experiencias verificadas</p><h2 id="reviews-title">Lo que dicen nuestros clientes en Google</h2><p>Reseñas reales compartidas por clientes de CARSA. Cada extracto enlaza a su publicación original en Google.</p></div>
        <div class="reviews-component" data-reviews-component>
          <div class="reviews-grid" data-reviews-grid hidden></div>
          <div class="reviews-elfsight" data-reviews-elfsight hidden>
            <p class="reviews-status" data-reviews-status>Cargando reseñas verificadas desde Google…</p>
            <div class="elfsight-app-a613e865-6530-4769-8851-580b4f8ccfc5" data-elfsight-app-lazy></div>
          </div>
          <div class="reviews-footer"><a class="landing-btn landing-btn--ghost" href="https://maps.app.goo.gl/pk8kE9BM5KyEEavD7" target="_blank" rel="noopener noreferrer">Ver todas las reseñas en Google</a></div>
        </div>
      </div>
    </section>

    <section class="landing-section" id="preguntas" aria-labelledby="faq-title">
      <div class="landing-container">
        <div class="section-heading"><p class="section-eyebrow">Preguntas frecuentes</p><h2 id="faq-title">Dudas antes de elegir tu ahorro o retiro</h2></div>
        <div class="faq-list">
          <?php foreach ($page['faqs'] as $faq): ?>
            <details class="faq-item">
              <summary><?= e($faq['question']) ?></summary>
              <div class="faq-answer"><p><?= e($faq['answer']) ?></p></div>
            </details>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <section class="final-cta-wrap" aria-labelledby="final-title">
      <div class="landing-container">
        <div class="final-cta">
          <h2 id="final-title"><?= e($page['finalTitle']) ?></h2>
          <p>Conoce tus opciones sin compromiso y recibe asesoría personalizada.</p>
          <ul class="final-proof"><li>Sin compromiso</li><li>Atención personalizada</li><li>Datos confidenciales</li></ul>
          <div class="final-actions">
            <a class="landing-btn landing-btn--white" href="#diagnostico" data-scroll-to-quote data-track-location="final_quote_cta">Quiero conocer mis opciones</a>
            <a class="landing-btn landing-btn--whatsapp" href="<?= e($whatsappUrl) ?>" target="_blank" rel="noopener noreferrer" data-landing-whatsapp data-track-event="click_whatsapp" data-track-location="final_whatsapp" data-track-cta-type="whatsapp">Hablar por WhatsApp <img src="/Content/img/icn-whatsapp.webp" alt="" width="24" height="24" loading="lazy"></a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="landing-footer">
    <div class="landing-container landing-footer__inner">
      <div>
        <img src="/Content/img/home/Logo-216.webp" alt="CARSA Seguros y Fianzas" width="216" height="91" loading="lazy" decoding="async">
        <p>Consultores Asociados en Riesgos, Agente de Seguros y de Fianzas, S.A. de C.V.</p>
      </div>
      <div class="landing-footer__links">
        <a href="tel:+529999444999" data-track-event="click_call" data-track-location="footer_phone">(999) 944 4999</a>
        <a href="mailto:contacto@segurosfianzas.com">contacto@segurosfianzas.com</a>
        <a href="/aviso-de-privacidad">Aviso de privacidad</a>
      </div>
    </div>
  </footer>

  <div class="mobile-sticky" aria-label="Acciones rápidas">
    <a class="sticky-action sticky-action--whatsapp" href="<?= e($whatsappUrl) ?>" target="_blank" rel="noopener noreferrer" data-landing-whatsapp data-track-event="click_whatsapp" data-track-location="mobile_sticky_whatsapp" data-track-cta-type="whatsapp">WhatsApp <img src="/Content/img/icn-whatsapp.webp" alt="" width="24" height="24"></a>
    <a class="sticky-action" href="#diagnostico" data-scroll-to-quote data-track-location="mobile_sticky_quote">Ver opciones</a>
  </div>

  <a class="floating-whatsapp" href="<?= e($whatsappUrl) ?>" target="_blank" rel="noopener noreferrer" aria-label="Hablar por WhatsApp" data-landing-whatsapp data-track-event="click_whatsapp" data-track-location="desktop_floating_whatsapp" data-track-cta-type="whatsapp"><img src="/Content/img/icn-whatsapp.webp" alt="" width="24" height="24"></a>
</body>
</html>
