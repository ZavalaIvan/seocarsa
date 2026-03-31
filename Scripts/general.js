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
