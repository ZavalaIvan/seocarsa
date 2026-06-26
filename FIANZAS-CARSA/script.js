/* ===================================================================
   CARSA FIANZAS - SCRIPTS
   JavaScript de la calculadora, captura de leads y generacion de PDFs
   Requiere: jsPDF cargado por CDN (ya esta incluido en index.html)
   =================================================================== */

/* === Bloque 1 === */
const LOGO_DATA_URI = "data:image/jpeg;base64,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";

/* === Bloque 2 === */
// ===== CALCULADOR DE FIANZAS =====
  const CONFIG = {
    cuota:              0.012,   // 1.20% sobre afianzado
    primaMinima:        2700,    // Prima neta mínima cuando el afianzado es bajo
    umbralPrimaMinima:  250000,  // Si afianzado < 250,000 → aplica prima mínima
    derechosIV:         0.035,   // 3.5% sobre prima neta
    expedicion:         3000,
    ratificacion:       3500,    // solo primera vez
    buro:               200,
    iva:                0.16
  };

  const TIPO_NAMES = {
    cumplimiento: "Fianza de Cumplimiento",
    anticipo:     "Fianza de Anticipo",
    vicios:       "Fianza de Vicios Ocultos"
  };

  const PAGE_TRACKING = {
    page_path: window.location.pathname || '/carsa-fianzas',
    insurance_type: 'fianzas',
    product_name: 'Fianzas',
    tracking_source: 'fianzas_carsa_page'
  };
  const startedTrackingForms = new Set();
  let calculatorStarted = false;

  function trackCarsaEvent(eventName, params) {
    const payload = Object.assign({}, PAGE_TRACKING, params || {});

    if (typeof window.trackEvent === 'function') {
      window.trackEvent(eventName, payload);
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, payload));
  }

  function trackCalculatorStart(interaction) {
    if (calculatorStarted) return;
    calculatorStarted = true;
    trackCarsaEvent('form_start', {
      form_name: 'calculadora_fianzas',
      location: 'fianzas_calculator',
      interaction: interaction || 'calculator'
    });
  }

  function getDownloadFormName(tipo) {
    return tipo === 'requisitos' ? 'descarga_requisitos_fianzas' : 'descarga_cotizacion_fianzas';
  }

  function trackDownloadFormStart(tipo, extra) {
    const formName = getDownloadFormName(tipo);
    if (startedTrackingForms.has(formName)) return;
    startedTrackingForms.add(formName);
    trackCarsaEvent('form_start', Object.assign({
      form_name: formName,
      location: 'pdf_download_modal',
      download_type: tipo
    }, extra || {}));
  }

  function trackDownloadSubmit(tipo, extra) {
    trackCarsaEvent('form_submit', Object.assign({
      form_name: getDownloadFormName(tipo),
      location: 'pdf_download_modal',
      download_type: tipo
    }, extra || {}));
  }

  function trackDownloadError(tipo, fieldName, message) {
    trackCarsaEvent('form_error', {
      form_name: getDownloadFormName(tipo),
      location: 'pdf_download_modal',
      download_type: tipo,
      error_type: 'validation',
      field_name: fieldName,
      error_message: message
    });
  }

  function trackDownloadSuccess(tipo, extra) {
    trackCarsaEvent('form_success', Object.assign({
      form_name: getDownloadFormName(tipo),
      location: 'pdf_download_modal',
      download_type: tipo,
      endpoint: 'netlify_forms'
    }, extra || {}));
  }

  function trackSelectedFianza(card, action) {
    const tipo = card.dataset.tipo;
    const estado = recolectarEstado();
    const fianza = estado.fianzas.find(f => f.tipo === tipo);

    if (!fianza) return;

    trackCarsaEvent('select_product', {
      location: 'fianzas_calculator',
      action: action || 'change',
      product_name: fianza.nombre,
      product_type: fianza.tipo,
      contract_value: Math.round(estado.contrato),
      fianza_percentage: fianza.pct,
      is_selected: fianza.include,
      value: Math.round(fianza.total),
      currency: 'MXN'
    });
  }

  let primeraVez = true;

  const inputMonto = document.getElementById('calcMonto');
  const granTotalEl = document.getElementById('calcGranTotal');
  const cards = document.querySelectorAll('.calc-card');
  const toggleBtns = document.querySelectorAll('.calc-toggle-btn');

  function fmt(n) {
    return '$' + Math.round(n).toLocaleString('es-MX');
  }
  function parseMonto(str) {
    return parseFloat((str || '').toString().replace(/[^0-9.]/g, '')) || 0;
  }

  function calcularFianza(montoAfianzado, primeraVez) {
    // Prima neta: si el monto afianzado es menor al umbral, se aplica la prima mínima
    const primaCalculada = montoAfianzado * CONFIG.cuota;
    const primaMinAplicada = (montoAfianzado < CONFIG.umbralPrimaMinima) && (primaCalculada < CONFIG.primaMinima);
    const primaNeta = primaMinAplicada ? CONFIG.primaMinima : primaCalculada;
    const derechos = primaNeta * CONFIG.derechosIV;
    const expedicion = CONFIG.expedicion;
    const ratificacion = primeraVez ? CONFIG.ratificacion : 0;
    const buro = CONFIG.buro;
    const subtotal = primaNeta + derechos + expedicion + ratificacion + buro;
    const iva = subtotal * CONFIG.iva;
    const total = subtotal + iva;
    return { primaNeta, derechos, expedicion, ratificacion, buro, subtotal, iva, total, primaMinAplicada };
  }

  function recolectarEstado() {
    const contrato = parseMonto(inputMonto.value);
    const fianzas = [];

    cards.forEach(card => {
      const tipo = card.dataset.tipo;
      const include = card.querySelector('[data-include]').checked;
      const pct = parseInt(card.querySelector('[data-pct]').value, 10);
      const montoAfianzado = contrato * (pct / 100);
      const r = calcularFianza(montoAfianzado, primeraVez);
      fianzas.push({ tipo, nombre: TIPO_NAMES[tipo], include, pct, montoAfianzado, ...r });
    });

    // Ajuste: la ratificación de firmas es UN solo trámite notarial para el contrato
    // de afianzamiento. Si hay múltiples fianzas incluidas para el mismo contrato,
    // solo la primera fianza incluida la cobra; las demás se ajustan a 0 y se
    // recalcula su subtotal, IVA y total.
    if (primeraVez) {
      const incluidas = fianzas.filter(f => f.include);
      if (incluidas.length > 1) {
        const principal = incluidas[0]; // la primera fianza incluida (orden: Cumplimiento, Anticipo, Vicios)
        for (let i = 1; i < incluidas.length; i++) {
          const f = incluidas[i];
          f.ratificacion = 0;
          f.ratificacionCompartidaCon = principal.nombre;
          f.subtotal = f.primaNeta + f.derechos + f.expedicion + f.ratificacion + f.buro;
          f.iva = f.subtotal * CONFIG.iva;
          f.total = f.subtotal + f.iva;
        }
      }
    }

    return { contrato, primeraVez, fianzas };
  }

  function actualizar() {
    const { contrato, fianzas } = recolectarEstado();
    let granTotal = 0;

    fianzas.forEach(f => {
      const card = document.querySelector(`.calc-card[data-tipo="${f.tipo}"]`);

      // Visual: tarjeta deshabilitada si no está incluida
      if (f.include) {
        card.classList.remove('disabled');
        granTotal += f.total;
      } else {
        card.classList.add('disabled');
      }

      card.querySelector('[data-pctval]').textContent = f.pct;
      card.querySelector('[data-monto]').textContent = fmt(f.montoAfianzado);
      card.querySelector('[data-prima]').textContent = fmt(f.primaNeta);
      const primaMetaEl = card.querySelector('[data-prima-meta]');
      if (primaMetaEl) {
        primaMetaEl.textContent = f.primaMinAplicada ? '(prima mínima)' : '(1.20% sobre afianzado)';
      }
      card.querySelector('[data-derechos]').textContent = fmt(f.derechos);
      card.querySelector('[data-expedicion]').textContent = fmt(f.expedicion);
      const ratifEl = card.querySelector('[data-ratificacion]');
      ratifEl.textContent = fmt(f.ratificacion);
      // Si esta fianza tiene ratificación compartida, mostrar nota visual
      const ratifRow = card.querySelector('.calc-row-firsttime');
      const ratifLabel = ratifRow ? ratifRow.querySelector('td:first-child .calc-meta') : null;
      if (ratifLabel) {
        if (f.ratificacionCompartidaCon) {
          ratifLabel.textContent = '(incluida en ' + f.ratificacionCompartidaCon.replace('Fianza de ', '') + ')';
        } else {
          ratifLabel.textContent = '(primera vez)';
        }
      }
      card.querySelector('[data-buro]').textContent = fmt(f.buro);
      card.querySelector('[data-subtotal]').textContent = fmt(f.subtotal);
      card.querySelector('[data-iva]').textContent = fmt(f.iva);
      card.querySelector('[data-total]').textContent = fmt(f.total);

      const rowFirstTime = card.querySelector('.calc-row-firsttime');
      if (primeraVez) rowFirstTime.classList.remove('hidden');
      else rowFirstTime.classList.add('hidden');
    });

    granTotalEl.textContent = fmt(granTotal);

    // CTA inteligente: mostrar el bloque "calc-next" solo si hay cotización válida
    const calcNext = document.getElementById('calcNext');
    if (calcNext) {
      const tieneCotizacion = contrato > 0 && fianzas.some(f => f.include);
      if (tieneCotizacion) {
        calcNext.style.display = '';
        // Rellenar datos contextuales
        const totalEl = document.getElementById('calcNextTotal');
        const contratoEl = document.getElementById('calcNextContrato');
        if (totalEl) totalEl.textContent = fmt(granTotal);
        if (contratoEl) contratoEl.textContent = fmt(contrato);
        // Actualizar el link de WhatsApp con datos pre-armados
        const waLink = document.getElementById('calcNextWhatsapp');
        if (waLink) {
          const incluidas = fianzas.filter(f => f.include).map(f => f.nombre).join(', ');
          const msg = 'Hola CARSA, ya tengo mi cotización estimada:\n\n' +
            '• Monto del contrato: ' + fmt(contrato) + '\n' +
            '• Fianzas: ' + incluidas + '\n' +
            '• Total estimado: ' + fmt(granTotal) + '\n\n' +
            'Quiero avanzar con la emisión.';
          waLink.href = 'https://wa.me/529992968025?text=' + encodeURIComponent(msg);
        }
      } else {
        calcNext.style.display = 'none';
      }
    }
  }

  // Listeners
  inputMonto.addEventListener('input', function(e) {
    trackCalculatorStart('contract_amount');
    const cursor = e.target.selectionStart;
    const prevLen = e.target.value.length;
    const num = parseMonto(e.target.value);
    e.target.value = num ? num.toLocaleString('es-MX') : '';
    const diff = e.target.value.length - prevLen;
    try { e.target.setSelectionRange(cursor + diff, cursor + diff); } catch(e) {}
    actualizar();
  });

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      toggleBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      primeraVez = this.dataset.firsttime === 'true';
      actualizar();
      trackCalculatorStart('client_type');
      trackCarsaEvent('calculator_option_change', {
        form_name: 'calculadora_fianzas',
        location: 'fianzas_calculator',
        option_name: 'client_type',
        option_value: primeraVez ? 'primera_vez' : 'recurrente'
      });
    });
  });

  cards.forEach(card => {
    card.querySelector('[data-include]').addEventListener('change', function() {
      actualizar();
      trackCalculatorStart('bond_type');
      trackSelectedFianza(card, 'toggle');
    });
    const slider = card.querySelector('[data-pct]');
    slider.addEventListener('input', function() {
      actualizar();
      trackCalculatorStart('bond_percentage');
    });
    slider.addEventListener('change', function() {
      trackSelectedFianza(card, 'percentage');
    });
  });

  actualizar();

/* === Bloque 3 === */
// ===== MODAL UNIFICADO DE DESCARGA DE PDFs CON CAPTURA DE LEADS =====
  const pdfModal = document.getElementById('pdfModal');
  const btnDownloadPDF = document.getElementById('btnDownloadPDF');
  const btnDownloadReq = document.getElementById('btnDownloadReq');
  const pdfModalGo = document.getElementById('pdfModalGo');
  const pdfModalTitle = document.getElementById('pdfModalTitle');
  const pdfModalSubtitle = document.getElementById('pdfModalSubtitle');

  // Estado: qué PDF se está descargando
  let pdfPendiente = null; // 'cotizacion' | 'requisitos'

  const STORAGE_KEY = 'carsa_lead_data_v1';

  function leerLeadGuardado() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function guardarLead(lead) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lead));
    } catch (e) { /* ignore */ }
  }

  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validarTelefono(tel) {
    // Acepta números mexicanos con o sin lada, espacios, guiones, paréntesis
    const limpio = tel.replace(/[\s\-()]/g, '');
    return /^\+?\d{10,15}$/.test(limpio);
  }

  function configurarModal(tipo) {
    pdfPendiente = tipo;
    if (tipo === 'cotizacion') {
      pdfModalTitle.textContent = 'Tu cotización en PDF';
      pdfModalSubtitle.textContent = 'Déjanos tus datos para descargar tu cotización. Te enviaremos también una copia y guardaremos tu información para asesorarte sobre la emisión.';
    } else {
      pdfModalTitle.textContent = 'Tus requisitos en PDF';
      pdfModalSubtitle.textContent = 'Déjanos tus datos para descargar el documento con los requisitos. Te contactaremos para ayudarte a armar tu expediente.';
    }
  }

  function abrirModal() {
    // Si ya tenemos los datos del lead en esta sesión, los rellenamos
    const lead = leerLeadGuardado();
    if (lead) {
      document.getElementById('pdfClienteNombre').value = lead.nombre || '';
      document.getElementById('pdfClienteEmail').value = lead.email || '';
      document.getElementById('pdfClienteTel').value = lead.tel || '';
    }
    pdfModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('pdfClienteNombre').focus(), 100);
  }

  function closePdfModal() {
    pdfModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  pdfModal.addEventListener('click', function(e) {
    if (e.target === pdfModal) closePdfModal();
  });

  // === BOTÓN: DESCARGAR COTIZACIÓN ===
  btnDownloadPDF.addEventListener('click', function() {
    const { fianzas } = recolectarEstado();
    const algunaIncluida = fianzas.some(f => f.include);
    if (!algunaIncluida) {
      trackDownloadError('cotizacion', 'fianzas_incluidas', 'sin_fianza_seleccionada');
      alert('Selecciona al menos una fianza para generar la cotización.');
      return;
    }
    configurarModal('cotizacion');
    trackDownloadFormStart('cotizacion');

    // Smart: si ya tenemos datos en esta sesión, descarga directo
    const lead = leerLeadGuardado();
    if (lead && lead.nombre && lead.email && lead.tel) {
      // Aún registramos esta nueva descarga
      trackDownloadSubmit('cotizacion', { lead_reused: true });
      registrarLead(lead, 'cotizacion');
      generarPDFCotizacion({ nombre: lead.nombre, email: lead.email, tel: lead.tel, ref: '' });
      trackDownloadSuccess('cotizacion', { lead_reused: true });
      return;
    }
    abrirModal();
  });

  // === BOTÓN: DESCARGAR REQUISITOS ===
  btnDownloadReq.addEventListener('click', function() {
    configurarModal('requisitos');
    trackDownloadFormStart('requisitos');

    // Smart: si ya tenemos datos, descarga directo
    const lead = leerLeadGuardado();
    if (lead && lead.nombre && lead.email && lead.tel) {
      trackDownloadSubmit('requisitos', { lead_reused: true });
      registrarLead(lead, 'requisitos');
      generarPDFRequisitos();
      trackDownloadSuccess('requisitos', { lead_reused: true });
      return;
    }
    abrirModal();
  });

  // === HANDLER DEL FORMULARIO ===
  pdfModalGo.addEventListener('click', function() {
    const nombre = document.getElementById('pdfClienteNombre').value.trim();
    const email = document.getElementById('pdfClienteEmail').value.trim();
    const tel = document.getElementById('pdfClienteTel').value.trim();
    const ref = document.getElementById('pdfClienteRef').value.trim();
    const tipoDescarga = pdfPendiente || 'cotizacion';

    // Validaciones
    if (!nombre) {
      trackDownloadError(tipoDescarga, 'nombre', 'nombre_requerido');
      alert('Por favor ingresa tu nombre o razón social.');
      document.getElementById('pdfClienteNombre').focus();
      return;
    }
    if (!email || !validarEmail(email)) {
      trackDownloadError(tipoDescarga, 'email', 'email_invalido');
      alert('Por favor ingresa un correo electrónico válido.');
      document.getElementById('pdfClienteEmail').focus();
      return;
    }
    if (!tel || !validarTelefono(tel)) {
      trackDownloadError(tipoDescarga, 'telefono', 'telefono_invalido');
      alert('Por favor ingresa un teléfono válido (10 dígitos mínimo).');
      document.getElementById('pdfClienteTel').focus();
      return;
    }

    // Guardar en sessionStorage para no pedirlos otra vez
    const leadData = { nombre, email, tel };
    guardarLead(leadData);

    // Registrar lead (enviar correo a Katy)
    trackDownloadSubmit(tipoDescarga);
    registrarLead(leadData, pdfPendiente, ref);

    // Cerrar modal y generar PDF
    closePdfModal();
    if (pdfPendiente === 'cotizacion') {
      generarPDFCotizacion({ nombre, email, tel, ref });
    } else if (pdfPendiente === 'requisitos') {
      generarPDFRequisitos();
    }
    trackDownloadSuccess(tipoDescarga);
  });

  // === ENVÍO DE LEAD A NETLIFY FORMS (llega automático al dashboard) ===
  function registrarLead(lead, tipo, ref) {
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
    const hora = ahora.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });

    let detalleContexto = '';
    let tipoDescarga = '';

    if (tipo === 'cotizacion') {
      tipoDescarga = 'Cotización de fianzas';
      const { contrato, fianzas } = recolectarEstado();
      const incluidas = fianzas.filter(f => f.include);
      const granTotal = incluidas.reduce((acc, f) => acc + f.total, 0);
      detalleContexto = 'Generado: ' + fecha + ' ' + hora + '\n';
      detalleContexto += 'Monto del contrato: ' + fmt(contrato) + '\n';
      incluidas.forEach(f => {
        detalleContexto += '• ' + f.nombre + ' (' + f.pct + '%): ' + fmt(f.total) + '\n';
      });
      detalleContexto += 'TOTAL ESTIMADO: ' + fmt(granTotal);
      if (ref) detalleContexto += '\nReferencia: ' + ref;
    } else if (tipo === 'requisitos') {
      tipoDescarga = 'Requisitos para tramitar fianza';
      detalleContexto = 'Descargó el documento de requisitos (PFAE y Persona Moral) el ' + fecha + ' ' + hora;
    }

    // Construir form data para Netlify Forms
    const formData = new FormData();
    formData.append('form-name', 'lead-pdf-download');
    formData.append('nombre', lead.nombre);
    formData.append('email', lead.email);
    formData.append('telefono', lead.tel);
    formData.append('tipo_descarga', tipoDescarga);
    formData.append('referencia', ref || '');
    formData.append('cotizacion_detalle', detalleContexto);

    // Enviar a Netlify (silencioso, no interrumpe el flujo)
    try {
      const urlEncoded = new URLSearchParams(formData).toString();
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: urlEncoded
      }).catch(() => { /* silencioso, el PDF se descarga igual */ });
    } catch (e) { /* silencioso */ }
  }

/* === Bloque 4 === */
// ===== GENERACIÓN DE PDFs =====

  // === PDF DE COTIZACIÓN ===
  function generarPDFCotizacion(cliente) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'letter' });

    const { contrato, fianzas } = recolectarEstado();
    const fianzasIncluidas = fianzas.filter(f => f.include);

    // Colores corporativos
    const NAVY = [13, 44, 90];
    const GOLD = [184, 146, 61];
    const INK = [44, 62, 87];
    const MUTE = [107, 122, 146];
    const LINE = [216, 221, 232];

    const pageW = 215.9;
    const pageH = 279.4;
    const margin = 18;
    let y = margin;

    // Header con logo
    try {
      doc.addImage(LOGO_DATA_URI, 'JPEG', margin, y, 28, 25);
    } catch(e) { /* fallback sin logo */ }
    doc.setFontSize(9);
    doc.setTextColor(...MUTE);
    doc.setFont(undefined, 'normal');
    doc.text('CARSA Seguros y Fianzas', pageW - margin, y + 6, { align: 'right' });
    doc.text('Consultores Asociados en Riesgos, Agente de Seguros y de Fianzas, S.A. de C.V.', pageW - margin, y + 11, { align: 'right' });
    doc.text('Calle 10 #326 · Gonzalo Guerrero · Mérida, Yucatán · México', pageW - margin, y + 16, { align: 'right' });
    doc.text('Tel: 999 944 4999 · WhatsApp: 999 296 8025', pageW - margin, y + 21, { align: 'right' });
    doc.text('katycanul@segurosfianzas.com', pageW - margin, y + 26, { align: 'right' });

    y += 35;

    // Línea dorada
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.6);
    doc.line(margin, y, pageW - margin, y);
    y += 10;

    // Título
    doc.setFontSize(20);
    doc.setTextColor(...NAVY);
    doc.setFont(undefined, 'bold');
    doc.text('Cotización estimada de fianzas', margin, y);
    y += 7;
    doc.setFontSize(10);
    doc.setTextColor(...MUTE);
    doc.setFont(undefined, 'normal');
    const fecha = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
    doc.text('Fecha: ' + fecha, margin, y);
    y += 12;

    // Bloque cliente
    doc.setFillColor(245, 247, 251);
    doc.rect(margin, y, pageW - margin*2, 22, 'F');
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.8);
    doc.line(margin, y, margin, y + 22);

    doc.setFontSize(8);
    doc.setTextColor(...MUTE);
    doc.text('CLIENTE', margin + 5, y + 6);
    doc.setFontSize(13);
    doc.setTextColor(...NAVY);
    doc.setFont(undefined, 'bold');
    doc.text(cliente.nombre, margin + 5, y + 12);

    if (cliente.ref || cliente.email) {
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...INK);
      const detalles = [];
      if (cliente.ref) detalles.push('Ref: ' + cliente.ref);
      if (cliente.email) detalles.push(cliente.email);
      doc.text(detalles.join('  ·  '), margin + 5, y + 18);
    }
    y += 28;

    // Datos del contrato
    doc.setFontSize(10);
    doc.setTextColor(...NAVY);
    doc.setFont(undefined, 'bold');
    doc.text('Monto del contrato:', margin, y);
    doc.setFont(undefined, 'normal');
    doc.text(fmt(contrato), margin + 50, y);
    doc.setFont(undefined, 'bold');
    doc.text('Tipo de cliente:', margin + 100, y);
    doc.setFont(undefined, 'normal');
    doc.text(primeraVez ? 'Primera vez' : 'Recurrente', margin + 138, y);
    y += 10;

    // Desglose por fianza
    fianzasIncluidas.forEach((f, idx) => {
      // Salto de página si es necesario
      if (y > pageH - 80) {
        doc.addPage();
        y = margin;
      }

      // Header de la fianza
      doc.setFillColor(...NAVY);
      doc.rect(margin, y, pageW - margin*2, 8, 'F');
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.text(f.nombre.toUpperCase(), margin + 4, y + 5.5);
      doc.setFont(undefined, 'normal');
      doc.setFontSize(9);
      doc.text(`${f.pct}% del contrato  ·  Monto afianzado: ${fmt(f.montoAfianzado)}`, pageW - margin - 4, y + 5.5, { align: 'right' });
      y += 12;

      // Tabla desglose
      const primaLabel = f.primaMinAplicada
        ? 'Prima neta (prima mínima aplicada)'
        : 'Prima neta (1.20% sobre afianzado)';
      const rows = [
        [primaLabel, fmt(f.primaNeta)],
        ['Derechos de investigación y vigilancia (3.5%)', fmt(f.derechos)],
        ['Gastos de expedición', fmt(f.expedicion)]
      ];
      if (primeraVez) {
        const label = f.ratificacionCompartidaCon
          ? 'Ratificación de firmas (incluida en ' + f.ratificacionCompartidaCon.replace('Fianza de ', '') + ')'
          : 'Ratificación de firmas (primera vez)';
        rows.push([label, fmt(f.ratificacion)]);
      }
      rows.push(['Consulta Buró de Crédito', fmt(f.buro)]);

      doc.setFontSize(9);
      doc.setTextColor(...INK);
      rows.forEach(row => {
        doc.text(row[0], margin + 2, y);
        doc.text(row[1], pageW - margin - 2, y, { align: 'right' });
        doc.setDrawColor(...LINE);
        doc.setLineWidth(0.1);
        doc.line(margin, y + 1.5, pageW - margin, y + 1.5);
        y += 5.5;
      });

      // Subtotal
      y += 1;
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...NAVY);
      doc.text('Subtotal', margin + 2, y);
      doc.text(fmt(f.subtotal), pageW - margin - 2, y, { align: 'right' });
      y += 5.5;
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...INK);
      doc.text('IVA (16%)', margin + 2, y);
      doc.text(fmt(f.iva), pageW - margin - 2, y, { align: 'right' });
      y += 6;

      // Total
      doc.setFillColor(...GOLD);
      doc.rect(margin, y - 1, pageW - margin*2, 8, 'F');
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...NAVY);
      doc.text('PRIMA TOTAL', margin + 2, y + 4.5);
      doc.text(fmt(f.total), pageW - margin - 2, y + 4.5, { align: 'right' });
      y += 14;
    });

    // Total general
    if (y > pageH - 50) { doc.addPage(); y = margin; }
    const granTotal = fianzasIncluidas.reduce((s, f) => s + f.total, 0);
    doc.setFillColor(...NAVY);
    doc.rect(margin, y, pageW - margin*2, 18, 'F');
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.6);
    doc.rect(margin, y, pageW - margin*2, 18, 'S');
    doc.setFontSize(9);
    doc.setTextColor(...GOLD);
    doc.setFont(undefined, 'normal');
    doc.text('TOTAL ESTIMADO COTIZACIÓN', margin + 4, y + 7);
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.text(fmt(granTotal), pageW - margin - 4, y + 12, { align: 'right' });
    y += 24;

    // Disclaimer
    doc.setFontSize(8);
    doc.setTextColor(...MUTE);
    doc.setFont(undefined, 'italic');
    const disclaimer = 'Cotización estimada con fines presupuestales. Las cifras presentadas son referencias del mercado mexicano (cuota del 1.20%, derechos del 3.5%, gastos de expedición, ratificación, buró). Cuando el monto afianzado es menor a $250,000, aplica una prima neta mínima de $2,700. La ratificación de firmas se cobra una sola vez por contrato de afianzamiento, aunque se emitan varias fianzas en la misma operación. La cotización formal está sujeta a la suscripción y aprobación de la afianzadora correspondiente conforme a la normativa de la Comisión Nacional de Seguros y Fianzas (CNSF), y puede variar según el plazo del contrato, el tipo de obligación y el perfil financiero del solicitante. Para una cotización formal y vinculante, contacta a CARSA Seguros y Fianzas.';
    const lines = doc.splitTextToSize(disclaimer, pageW - margin*2);
    doc.text(lines, margin, y);
    y += lines.length * 3.5 + 6;

    // Footer
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.4);
    doc.line(margin, pageH - 18, pageW - margin, pageH - 18);
    doc.setFontSize(8);
    doc.setTextColor(...MUTE);
    doc.setFont(undefined, 'normal');
    doc.text('CARSA Seguros y Fianzas · Despacho fundado en 1998 · Autorizado por la CNSF', margin, pageH - 12);
    doc.text('Tel: 999 944 4999 · WhatsApp: 999 296 8025 · contacto@segurosfianzas.com · carsaseguros.mx', margin, pageH - 8);

    // Guardar
    const safeName = cliente.nombre.replace(/[^a-z0-9]/gi, '_').slice(0, 40);
    doc.save(`Cotizacion_CARSA_${safeName}.pdf`);
  }

  // === PDF DE REQUISITOS ===
  btnDownloadReq.addEventListener('click', function() {
    generarPDFRequisitos();
  });

  function generarPDFRequisitos() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'letter' });

    const NAVY = [13, 44, 90];
    const GOLD = [184, 146, 61];
    const INK = [44, 62, 87];
    const MUTE = [107, 122, 146];
    const LINE = [216, 221, 232];

    const pageW = 215.9;
    const pageH = 279.4;
    const margin = 18;
    let y = margin;

    // Header con logo
    try {
      doc.addImage(LOGO_DATA_URI, 'JPEG', margin, y, 28, 25);
    } catch(e) {}
    doc.setFontSize(9);
    doc.setTextColor(...MUTE);
    doc.text('CARSA Seguros y Fianzas', pageW - margin, y + 6, { align: 'right' });
    doc.text('Consultores Asociados en Riesgos, Agente de Seguros y de Fianzas, S.A. de C.V.', pageW - margin, y + 11, { align: 'right' });
    doc.text('Calle 10 #326 · Gonzalo Guerrero · Mérida, Yucatán', pageW - margin, y + 16, { align: 'right' });
    doc.text('Tel: 999 944 4999 · WhatsApp: 999 296 8025', pageW - margin, y + 21, { align: 'right' });
    doc.text('katycanul@segurosfianzas.com', pageW - margin, y + 26, { align: 'right' });
    y += 35;

    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.6);
    doc.line(margin, y, pageW - margin, y);
    y += 10;

    // Título
    doc.setFontSize(18);
    doc.setTextColor(...NAVY);
    doc.setFont(undefined, 'bold');
    doc.text('Requisitos para apertura de línea de afianzamiento', margin, y);
    y += 7;
    doc.setFontSize(9);
    doc.setTextColor(...MUTE);
    doc.setFont(undefined, 'normal');
    const intro = 'Lista general aplicable a las principales afianzadoras del mercado mexicano (Sofimex, Aserta, Insurgentes y otras). Algunos requisitos pueden variar dependiendo del monto, tipo de fianza y políticas específicas de cada afianzadora.';
    const introLines = doc.splitTextToSize(intro, pageW - margin*2);
    doc.text(introLines, margin, y);
    y += introLines.length * 4 + 6;

    function dibujarBloque(titulo, items) {
      // Header del bloque
      doc.setFillColor(...NAVY);
      doc.rect(margin, y, pageW - margin*2, 9, 'F');
      doc.setFontSize(11);
      doc.setTextColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.text(titulo, margin + 4, y + 6);
      y += 14;

      doc.setFontSize(9);
      doc.setTextColor(...INK);
      doc.setFont(undefined, 'normal');

      items.forEach((item, idx) => {
        if (y > pageH - 25) {
          doc.addPage();
          y = margin;
        }
        const num = String(idx + 1).padStart(2, '0');
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...GOLD);
        doc.text(num, margin, y);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...INK);
        const lines = doc.splitTextToSize(item, pageW - margin*2 - 12);
        doc.text(lines, margin + 8, y);
        y += lines.length * 4.2 + 2;
        doc.setDrawColor(...LINE);
        doc.setLineWidth(0.1);
        doc.line(margin, y - 1, pageW - margin, y - 1);
        y += 1;
      });
      y += 6;
    }

    const personaFisica = [
      'Documento fuente: contrato, pedido, orden de compra, acta de fallo, etc.',
      'Contrato para el otorgamiento de fianzas firmado (3 tantos) por el fiado y obligado solidario. Si está casado por bienes mancomunados, debe firmar el cónyuge.',
      'Cuestionario para persona física con actividad empresarial (fiado y obligado solidario)',
      'Carta de autorización para consulta en Buró de Crédito firmada por fiado y obligado solidario',
      'Carta valor y formato de ratificación de firmas (fiado y obligado solidario)',
      'Identificación oficial vigente (INE) del fiado y obligado solidario',
      'Comprobante domiciliario reciente (no mayor a 3 meses) a nombre del fiado u obligado solidario (luz, agua, estado de cuenta bancario o departamental)',
      'Alta de Hacienda y Constancia de Situación Fiscal con fecha actual',
      'Currículum profesional con detalle de la actividad empresarial y experiencia',
      'Acta de matrimonio (fiado y obligado solidario)',
      'Última declaración anual y declaraciones parciales del año en curso',
      'Estados financieros anuales auditados o firmados por el fiado y contador (con copia y número de cédula profesional, incluyendo leyenda de protesta de decir verdad)',
      'Estados financieros actualizados firmados por fiado y contador',
      'Garantía de recuperación: copia de escrituras de un bien inmueble libre de gravamen, boleta predial vigente y constancia de no adeudo del predial',
      'INE y comprobante de domicilio del propietario del inmueble (si es distinto al fiado u obligado solidario)'
    ];

    const personaMoral = [
      'Documento fuente: contrato, pedido, orden de compra, acta de fallo, etc.',
      'Contrato para el otorgamiento de fianzas firmado (3 tantos) por el fiado y obligado solidario',
      'Cuestionarios para personas morales y físicas (fiado y obligado solidario)',
      'Carta de autorización para consulta en Buró de Crédito firmada por representante legal y obligado solidario',
      'Carta valor y formato de ratificación de firmas',
      'Identificación oficial vigente del representante legal y obligado solidario',
      'Comprobante domiciliario reciente del fiado y obligado solidario (no mayor a 3 meses)',
      'Alta de Hacienda y Constancia de Situación Fiscal con fecha actual',
      'Currículum de la empresa firmado por representante legal o administrador único',
      'Acta de matrimonio del obligado solidario',
      'Última declaración anual y declaraciones parciales del año en curso',
      'Estados financieros anuales auditados o firmados por fiado y contador (con cédula profesional)',
      'Estados financieros actualizados firmados por representante legal y contador',
      'Copia del acta constitutiva con sus modificaciones y poderes de administración, dominio y suscripción de títulos de crédito',
      'Garantía de recuperación: copia de escrituras de un bien inmueble libre de gravamen, boleta predial vigente y constancia de no adeudo del predial',
      'INE y comprobante de domicilio del propietario del inmueble (si es distinto al fiado u obligado solidario)'
    ];

    dibujarBloque('PERSONA FÍSICA CON ACTIVIDAD EMPRESARIAL (PFAE)', personaFisica);

    if (y > pageH - 60) {
      doc.addPage();
      y = margin;
    }

    dibujarBloque('PERSONA MORAL (EMPRESAS)', personaMoral);

    // Notas
    if (y > pageH - 80) {
      doc.addPage();
      y = margin;
    }
    doc.setFillColor(245, 247, 251);
    doc.rect(margin, y, pageW - margin*2, 64, 'F');
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.8);
    doc.line(margin, y, margin, y + 64);

    doc.setFontSize(10);
    doc.setTextColor(...NAVY);
    doc.setFont(undefined, 'bold');
    doc.text('Notas importantes', margin + 5, y + 7);
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...INK);
    const notas = [
      'Buró de Crédito: el fiado y obligado solidario no deben tener adeudos activos ni pagos atrasados. Cualquier registro negativo puede frenar la emisión.',
      'Si el obligado solidario es persona moral, debe entregar los mismos requisitos de persona moral.',
      'Si el inmueble en garantía está a nombre de varias personas, todas deben firmar.',
      'Los contratos múltiples requieren ratificación de firmas ante notario público (costo adicional).',
      'En operaciones que califiquen, podemos emitir sin garantía hipotecaria — consultar caso por caso.',
      'La documentación se entrega en formato digital (PDF). Algunos originales pueden requerirse al final del proceso.',
      'Para persona física SIN actividad empresarial (judiciales, arrendamiento personal), los requisitos varían — consultar.'
    ];
    let ny = y + 13;
    notas.forEach(n => {
      doc.setTextColor(...GOLD);
      doc.text('•', margin + 5, ny);
      doc.setTextColor(...INK);
      const lines = doc.splitTextToSize(n, pageW - margin*2 - 14);
      doc.text(lines, margin + 9, ny);
      ny += lines.length * 4 + 1;
    });

    // Footer
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.4);
    doc.line(margin, pageH - 18, pageW - margin, pageH - 18);
    doc.setFontSize(8);
    doc.setTextColor(...MUTE);
    doc.setFont(undefined, 'normal');
    doc.text('CARSA Seguros y Fianzas · Despacho fundado en 1998 · Autorizado por la CNSF', margin, pageH - 12);
    doc.text('Tel: 999 944 4999 · WhatsApp: 999 296 8025 · contacto@segurosfianzas.com · carsaseguros.mx', margin, pageH - 8);

    doc.save('Requisitos_Fianzas_CARSA.pdf');
  }

/* === Bloque 5 === */
function submitForm(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const nombre = data.get('nombre');
    const telefono = data.get('telefono');
    const tipo = data.get('tipo');
    const monto = data.get('monto');
    trackDownloadFormStart('cotizacion', { location: 'legacy_quote_form' });
    trackDownloadSubmit('cotizacion', {
      location: 'legacy_quote_form',
      product_name: tipo || 'Fianzas',
      contract_value_raw: monto || ''
    });

    // Mensaje formateado (texto plano para máxima compatibilidad)
    const fechaActual = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
    const horaActual = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });

    const cuerpoTexto =
      'Solicitud de cotización de fianza\n' +
      'Recibida el ' + fechaActual + ' a las ' + horaActual + '\n' +
      '\n' +
      '— Datos del solicitante —\n' +
      'Nombre: ' + nombre + '\n' +
      'WhatsApp: ' + telefono + '\n' +
      '\n' +
      '— Datos del contrato —\n' +
      'Tipo de fianza: ' + tipo + '\n' +
      'Monto aproximado del contrato: ' + monto + '\n' +
      '\n' +
      'Origen: formulario hero del sitio carsaseguros.mx';

    // 1. Abrir WhatsApp con los datos (ruta principal)
    const msgWA = 'Hola CARSA, quiero cotizar una fianza:\n\n' +
      '• Nombre: ' + nombre + '\n' +
      '• WhatsApp: ' + telefono + '\n' +
      '• Tipo de fianza: ' + tipo + '\n' +
      '• Monto del contrato: ' + monto;
    const wa = 'https://wa.me/529992968025?text=' + encodeURIComponent(msgWA);
    window.open(wa, '_blank');
    trackDownloadSuccess('cotizacion', {
      location: 'legacy_quote_form',
      transport: 'whatsapp'
    });

    // 2. Mostrar UI de confirmación con opciones múltiples
    setTimeout(function() {
      mostrarConfirmacion(nombre, cuerpoTexto);
    }, 300);

    return false;
  }

  function mostrarConfirmacion(nombre, cuerpoTexto) {
    // Construir mailto con copia automática
    const subject = 'Cotización de fianza — ' + nombre;
    const mailto = 'mailto:katycanul@segurosfianzas.com' +
      '?cc=rcastilla@segurosfianzas.com' +
      '&subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(cuerpoTexto);

    // Crear modal de confirmación
    const overlay = document.createElement('div');
    overlay.className = 'submit-confirmation';
    overlay.innerHTML =
      '<div class="submit-confirmation-card">' +
        '<div class="submit-confirmation-icon">✓</div>' +
        '<h3>Listo, ' + nombre.split(' ')[0] + '</h3>' +
        '<p>Te abrimos <strong>WhatsApp</strong> con tus datos. Si quieres asegurar que tu solicitud llegue, también puedes <strong>enviarla por correo</strong>.</p>' +
        '<div class="submit-confirmation-actions">' +
          '<a href="' + mailto + '" class="btn-primary">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke-linecap="round" stroke-linejoin="round"/><polyline points="22,6 12,13 2,6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            'Enviar también por correo' +
          '</a>' +
          '<button type="button" class="btn-secondary" onclick="cerrarConfirmacion()">Cerrar</button>' +
        '</div>' +
        '<p class="submit-confirmation-tel">¿Prefieres llamar? <a href="tel:+529999444999">999 944 4999</a></p>' +
      '</div>';
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
  }

  function cerrarConfirmacion() {
    const overlay = document.querySelector('.submit-confirmation');
    if (overlay) overlay.remove();
    document.body.style.overflow = '';
  }
