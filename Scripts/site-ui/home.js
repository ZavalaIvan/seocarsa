// home.js — versión segura y compatible
let pasoProceso = 1;
let divNuestroProceso = 0;

$(document).ready(function () {

    // ==============================
    // Carrusel de logos (usa Slick)
    // ==============================
    if ($('.customer-logos').length && typeof $.fn.slick !== 'undefined') {
        try {
            $('.customer-logos').slick({
                slidesToShow: 7,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 1000,
                arrows: false,
                dots: false,
                pauseOnHover: false,
                responsive: [
                    { breakpoint: 960, settings: { slidesToShow: 3, infinite: true } },
                    { breakpoint: 769, settings: { slidesToShow: 2 } },
                    { breakpoint: 651, settings: { slidesToShow: 3 } },
                    { breakpoint: 550, settings: { slidesToShow: 3 } },
                    { breakpoint: 321, settings: { slidesToShow: 1.5 } }
                ]
            });
        } catch (e) {
            console.warn("Error iniciando Slick:", e);
        }
    }

    // ==============================
    // Efectos de scroll a secciones
    // ==============================
    const scrollSuave = (selectorBtn, destinoId, offsetExtra = 0, duracion = 800) => {
        if ($(selectorBtn).length && $(destinoId).length) {
            $(selectorBtn).on('click', function (e) {
                e.preventDefault();
                const destino = $(destinoId).offset().top - offsetExtra;
                $('html, body').stop(true, true).animate({ scrollTop: destino }, duracion);
            });
        }
    };

    // Botones con scroll
    scrollSuave('#btn-productos, #btn-mob-productos', '#nuestros-productos', 100);
    scrollSuave('#btn-AccordeonAhorro', '#accordionFlushExample', 70, 500);
    scrollSuave('#btn-AccordeonVida', '#accordionFlushExample', 14, 500);
    scrollSuave('#btn-AccordeonSalud', '#accordionFlushExample', -40, 500);
    scrollSuave('#btn-AccordeonHogar', '#accordionFlushExample', -95, 500);
    scrollSuave('#btn-AccordeonAuto', '#accordionFlushExample', -150, 500);

    // ==============================
    // Efectos visuales del proceso
    // ==============================
    const limpiarProceso = () => {
        $('.proceso-punto, .proceso-paso, .barras').removeClass('active inactive');
    };

    const activarPaso = (n) => {
        limpiarProceso();
        $(`.punto${n} .proceso-punto`).addClass('active');
        $(`.proceso-paso${n}`).addClass('active');
        $(`.barras${n}`).addClass('active');
        if (n > 1) $(`.barras${n - 1}`).addClass('inactive');
    };

    if ($('.proceso-paso1').length) {
        for (let i = 1; i <= 4; i++) {
            $(`.proceso-paso${i}`).on('mouseenter', () => activarPaso(i));
        }
        $('.proceso-paso1, .proceso-paso2, .proceso-paso3, .proceso-paso4').on('mouseleave', limpiarProceso);
    }

    // ==============================
    // Guardar posición de sección (opcional)
    // ==============================
    if ($("#nuestros-proceso").length) {
        divNuestroProceso = $("#nuestros-proceso").offset().top;
    }

});
