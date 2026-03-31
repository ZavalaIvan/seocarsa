// =========================================
// Archivo: index.js
// Versión limpia y estable (sin Google Analytics)
// =========================================

// Contador de animación de pasos (si existen)
var ContadorPuntosAnimacion = 0;

$(function () {
    // =========================================
    // Definir urlCanonica si no existe
    // =========================================
    if (typeof urlCanonica === 'undefined') {
        var urlCanonica = window.location.origin + window.location.pathname;
    }

    // Asegura que termine con una barra
    if (!urlCanonica.endsWith('/')) {
        urlCanonica += '/';
    }

    // =========================================
    // Crear objeto Sesion si no existe
    // =========================================
    if (typeof Sesion === 'undefined') {
        var Sesion = {};
    }

    // =========================================
    // Obtener datos del usuario desde inputs ocultos
    // =========================================
    Sesion.UsuarioId = ($('#postUsuarioId').val() || 0);
    Sesion.GrupoId = ($('#postGrupoId').val() || 0);
    Sesion.JerarquiaId = ($('#postAgenteId').val() || 0);
    Sesion.Nombre = $('#postNombre').val() || '';
    Sesion.Correo = $('#postCorreo').val() || '';
    Sesion.Telefono = $('#postTelefono').val() || '';
    Sesion.Foto = $('#postFoto_Perfil').val() || '';
    Sesion.PromotoriaId = ($('#postPromotoriaId').val() || 0);

    // =========================================
    // Scroll suave para enlaces con clase .anclas
    // =========================================
    $('.anclas').click(function (e) {
        e.preventDefault();
        var destino = $(this).attr('href');

        if ($(destino).length) {
            var offset = ($(window).width() < 768) ? 0 : 80;
            $('html, body').animate({
                scrollTop: $(destino).offset().top - offset
            }, 1000);
        }
    });

    // =========================================
    // Iniciar animación de puntos si los elementos existen
    // =========================================
    if ($('#paso1').length && $('#img_paso1').length) {
        AnimacionPuntos();
    }

    // =========================================
    // Evento del botón "Cotizar"
    // =========================================
    $('#btnCotizar').click(() => {
        // Redirige al inicio del dominio actual
        window.location.href = `https://${window.location.host}`;
    });
});

// =========================================
// FUNCION: Animación cíclica de pasos
// (Cambia entre #paso1, #paso2, #paso3)
// =========================================
function AnimacionPuntos() {
    for (var i = 1; i <= 3; i++) {
        $('#paso' + i).removeClass('activo');
        $('#img_paso' + i).hide();
    }

    ContadorPuntosAnimacion++;
    if (ContadorPuntosAnimacion > 3) {
        ContadorPuntosAnimacion = 1;
    }

    $('#paso' + ContadorPuntosAnimacion).addClass('activo');
    $('#img_paso' + ContadorPuntosAnimacion).show();

    setTimeout(AnimacionPuntos, 3000);
}
