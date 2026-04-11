/* ==========================================================
   Archivo: general.js (versión dummy)
   Propósito: Evitar errores del CMS sin ejecutar funciones reales
   Autor: Limpieza personalizada para JoCMS
   ========================================================== */

console.log("general.js (dummy) cargado ✅ — sin funciones activas");

// --- Funciones vacías para compatibilidad con JoCMS ---
function GetJSON(url, parametros, callback) {
  console.log(`GetJSON llamada ignorada -> ${url}`);
  if (typeof callback === "function") callback({});
}
function General_InsertarBurbujaWhatsApp() {
  if (typeof document === "undefined") return;
  if (!document.body) return;
  if (document.querySelector(".carsa-whatsapp-float")) return;
  if (window.location && /(^|\/)contacto\.html$/i.test(window.location.pathname)) return;

  var enlace = document.createElement("a");
  enlace.className = "carsa-whatsapp-float";
  enlace.href = "https://wa.me/529992653187?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20CARSA";
  enlace.target = "_blank";
  enlace.rel = "noopener";
  enlace.setAttribute("aria-label", "Abrir WhatsApp de CARSA");
  enlace.style.position = "fixed";
  enlace.style.right = "22px";
  enlace.style.bottom = "22px";
  enlace.style.width = "62px";
  enlace.style.height = "62px";
  enlace.style.borderRadius = "50%";
  enlace.style.background = "linear-gradient(180deg, #25d366 0%, #1ebe5b 100%)";
  enlace.style.color = "#ffffff";
  enlace.style.display = "inline-flex";
  enlace.style.alignItems = "center";
  enlace.style.justifyContent = "center";
  enlace.style.boxShadow = "0 14px 30px rgba(20, 168, 89, 0.34)";
  enlace.style.zIndex = "2147483647";
  enlace.style.textDecoration = "none";
  enlace.style.lineHeight = "1";
  enlace.style.overflow = "hidden";
  enlace.innerHTML =
    '<svg class="carsa-whatsapp-float__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.768.966-.941 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.787-1.48-1.76-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.015-1.04 2.48 0 1.463 1.065 2.877 1.213 3.075.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.626.711.226 1.359.194 1.87.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347M12.004 2.003c-5.514 0-9.998 4.484-9.998 9.998 0 1.762.46 3.483 1.333 5.001L2 22l5.146-1.35a9.96 9.96 0 0 0 4.858 1.248h.004c5.512 0 9.996-4.484 9.996-9.998 0-2.672-1.04-5.184-2.93-7.074-1.89-1.89-4.402-2.823-7.07-2.823m0 18.108h-.003a8.3 8.3 0 0 1-4.233-1.158l-.303-.18-3.055.801.815-2.977-.197-.305a8.29 8.29 0 0 1-1.277-4.446c.002-4.58 3.73-8.308 8.313-8.308 2.22 0 4.307.865 5.876 2.436a8.27 8.27 0 0 1 2.428 5.874c-.002 4.582-3.73 8.31-8.309 8.31"></path>' +
    "</svg>";

  var icono = enlace.querySelector("svg");
  if (icono) {
    icono.style.width = "34px";
    icono.style.height = "34px";
    icono.style.display = "block";
    icono.style.flex = "0 0 34px";
    icono.style.fill = "currentColor";
  }

  if (window.matchMedia && window.matchMedia("(max-width: 768px)").matches) {
    enlace.style.right = "16px";
    enlace.style.bottom = "16px";
    enlace.style.width = "58px";
    enlace.style.height = "58px";

    if (icono) {
      icono.style.width = "32px";
      icono.style.height = "32px";
      icono.style.flex = "0 0 32px";
    }
  }

  document.body.appendChild(enlace);
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", General_InsertarBurbujaWhatsApp);
  } else {
    General_InsertarBurbujaWhatsApp();
  }
}

function GetJSONUsuarioID(url, parametros, callback) {
  console.log(`GetJSONUsuarioID llamada ignorada -> ${url}`);
  if (typeof callback === "function") callback({});
}

function General_ManejaError_Objeto(objeto) {
  console.log("General_ManejaError_Objeto llamada (dummy)");
}

function MostrarMensaje(mensaje, tipo) {
  console.log(`MostrarMensaje (dummy): ${mensaje} (${tipo})`);
}

function General_ConfigurarMascaras() {
  console.log("Máscaras desactivadas (dummy).");
}

function General_ConfigurarCalendarios() {
  console.log("Calendarios desactivados (dummy).");
}

function General_ValidarFormulario() {
  console.log("Validación de formulario desactivada (dummy).");
  return true;
}

function General_LimpiarFormulario() {
  console.log("Limpieza de formulario desactivada (dummy).");
}

function General_CrearModal(titulo, contenido) {
  console.log(`Modal simulado (dummy): ${titulo}`);
}

function General_OcultarModal() {
  console.log("Modal cerrado (dummy).");
}

// --- Compatibilidad mínima ---
window.General = {
  GetJSON,
  GetJSONUsuarioID,
  ManejaError_Objeto: General_ManejaError_Objeto,
  ConfigurarMascaras: General_ConfigurarMascaras,
  ConfigurarCalendarios: General_ConfigurarCalendarios,
  ValidarFormulario: General_ValidarFormulario,
  LimpiarFormulario: General_LimpiarFormulario,
  CrearModal: General_CrearModal,
  OcultarModal: General_OcultarModal,
};

// Evita el error "iniciarQueryString is not defined"
function iniciarQueryString() {
  // Esta función es intencionalmente vacía.
  // Algunos módulos de JoCMS la llaman al iniciar la página.
  console.log("iniciarQueryString() llamada ignorada (dummy).");
}
function Carsa_InitNavbarFallback() {
  if (typeof document === "undefined" || window.__carsaNavbarFallbackBound) {
    return;
  }

  window.__carsaNavbarFallbackBound = true;

  function isDesktopNavbar() {
    return typeof window.matchMedia === "function" &&
      window.matchMedia("(min-width: 992px)").matches;
  }

  function getCollapseTarget(toggle) {
    var selector = toggle.getAttribute("data-bs-target") || toggle.getAttribute("href");
    if (!selector || selector === "#") {
      return null;
    }

    var navbar = toggle.closest(".navbar");
    if (navbar && selector.charAt(0) === "#") {
      var localTarget = navbar.querySelector(selector);
      if (localTarget) {
        return localTarget;
      }
    }

    try {
      return document.querySelector(selector);
    } catch (error) {
      return null;
    }
  }

  function closeNavbarDropdowns(navbar, exceptToggle) {
    if (!navbar) {
      return;
    }

    navbar.querySelectorAll(".nav-item.dropdown > .dropdown-toggle.show").forEach(function (toggle) {
      if (toggle === exceptToggle) {
        return;
      }

      toggle.classList.remove("show");
      toggle.setAttribute("aria-expanded", "false");
    });

    navbar.querySelectorAll(".dropdown-menu.show").forEach(function (menu) {
      if (exceptToggle && exceptToggle.nextElementSibling === menu) {
        return;
      }

      menu.classList.remove("show");
    });
  }

  function syncCollapseToggle(toggle, panel) {
    var expanded = panel.classList.contains("show");
    toggle.setAttribute("aria-expanded", String(expanded));
    toggle.classList.toggle("collapsed", !expanded);
  }

  function setCollapseState(toggle, panel, expanded) {
    panel.classList.toggle("show", expanded);
    panel.classList.remove("collapsing");
    syncCollapseToggle(toggle, panel);

    if (!expanded) {
      closeNavbarDropdowns(toggle.closest(".navbar"));
    }
  }

  function setDropdownState(toggle, menu, expanded) {
    closeNavbarDropdowns(toggle.closest(".navbar"), expanded ? toggle : null);
    toggle.classList.toggle("show", expanded);
    toggle.setAttribute("aria-expanded", String(expanded));
    menu.classList.toggle("show", expanded);
  }

  document.addEventListener("click", function (event) {
    var toggler = event.target.closest('.navbar .navbar-toggler[data-bs-toggle="collapse"]');

    if (toggler) {
      var panel = getCollapseTarget(toggler);
      if (!panel) {
        return;
      }

      var wantsOpen = !panel.classList.contains("show");
      event.preventDefault();
      event.stopPropagation();
      setCollapseState(toggler, panel, wantsOpen);

      return;
    }

    var dropdownToggle = event.target.closest(".navbar .nav-item.dropdown > .dropdown-toggle");
    if (!dropdownToggle || isDesktopNavbar()) {
      return;
    }

    var dropdownMenu = dropdownToggle.nextElementSibling;
    if (!dropdownMenu || !dropdownMenu.classList.contains("dropdown-menu")) {
      return;
    }

    var wantsDropdownOpen = !dropdownMenu.classList.contains("show");
    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === "function") {
      event.stopImmediatePropagation();
    }
    setDropdownState(dropdownToggle, dropdownMenu, wantsDropdownOpen);
  });

  document.addEventListener("click", function (event) {
    if (isDesktopNavbar()) {
      return;
    }

    var link = event.target.closest(".navbar .dropdown-item, .navbar .nav-link:not(.dropdown-toggle), .navbar .btn-element-contact");
    if (!link) {
      return;
    }

    var navbar = link.closest(".navbar");
    var panel = navbar ? navbar.querySelector(".navbar-collapse.show") : null;
    var toggler = navbar ? navbar.querySelector(".navbar-toggler") : null;

    if (!panel || !toggler) {
      return;
    }

    window.setTimeout(function () {
      setCollapseState(toggler, panel, false);
    }, 0);
  });

  document.addEventListener("shown.bs.collapse", function (event) {
    if (!event.target.classList.contains("navbar-collapse")) {
      return;
    }

    var navbar = event.target.closest(".navbar");
    var toggler = navbar ? navbar.querySelector('.navbar-toggler[data-bs-target], .navbar-toggler[href]') : null;
    if (toggler) {
      syncCollapseToggle(toggler, event.target);
    }
  });

  document.addEventListener("hidden.bs.collapse", function (event) {
    if (!event.target.classList.contains("navbar-collapse")) {
      return;
    }

    var navbar = event.target.closest(".navbar");
    var toggler = navbar ? navbar.querySelector('.navbar-toggler[data-bs-target], .navbar-toggler[href]') : null;
    if (toggler) {
      syncCollapseToggle(toggler, event.target);
    }

    closeNavbarDropdowns(navbar);
  });

  document.querySelectorAll(".navbar .navbar-toggler").forEach(function (toggle) {
    var panel = getCollapseTarget(toggle);
    if (panel) {
      syncCollapseToggle(toggle, panel);
    }
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", Carsa_InitNavbarFallback);
  } else {
    Carsa_InitNavbarFallback();
  }
}
