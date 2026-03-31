var USUARIO_ID = 0, AGENTE_ID = 0;

var Cotizacion = {
    Contacto: {
        Id: 0,
        Edad: 0,
        Nombre: '',
        Apellidos: '',
        Correo: '',
        Telefono: '',
    },
    MontoAportacion: 0,
    FrecuenciaPago: 0,
    Monto: {
        Minimo: 0,
        Maximo: 0,
    }
};

$(document).ready(function ($) {
    /* iniciarQueryString(); */

    //Datos del Usuario en Sesion
    Sesion.UsuarioId = ($('#postUsuarioId').val() != '') ? parseInt($('#postUsuarioId').val()) : 0;
    Sesion.GrupoId = ($('#postGrupoId').val() != '') ? parseInt($('#postGrupoId').val()) : 0;
    Sesion.JerarquiaId = ($('#postAgenteId').val() != '') ? parseInt($('#postAgenteId').val()) : 0;
    Sesion.Nombre = $('#postNombre').val();
    Sesion.Correo = $('#postCorreo').val();
    Sesion.Telefono = $('#postTelefono').val();
    Sesion.Foto = $('#postFoto_Perfil').val();
    Sesion.PromotoriaId = ($('#postPromotoriaId').val() != '') ? parseInt($('#postPromotoriaId').val()) : 0;

    $('#txt_monto').maskMoney({
        prefix: '$',
        allowNegative: true,
        thousands: ',',
        decimal: '.',
        precision: 0
    });

    $('#btnCotizarAhorro').click(() => {
        if (valForm_dtCliente(true)) {
            $('#myModalActualizando').modal('show');

            let monto = parseFloat(EliminarMascaraMoney($('#txt_monto').val()));
            let edad = parseInt($('#txt_edad').val());

            $('#postContactoId').val(0);
            $('#postCotizacionId').val(0);
            $('#postNombre_c').val(Cotizacion.Contacto.Nombre);
            $("#postApellidoPa_c").val(Cotizacion.Contacto.Apellidos);
            $("#postApellidoMa_c").val('');
            $("#postCorreo_c").val(Cotizacion.Contacto.Correo);
            $("#postCelular_c").val(Cotizacion.Contacto.Telefono);
            $("#postEdad").val(edad);
            $("#postMontoAportacion").val(monto);
            $("#postFrecuenciaPago").val(Cotizacion.FrecuenciaPago);
            $("#frmResultados").submit();
        }
    });

    ObtenerMontoAportacion();
    pintarDatosContacto();

    document.querySelectorAll('.btnCotizarAhorro').forEach((btn) => {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            var hero = document.getElementById('hero');
            hero.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const carousel = new bootstrap.Carousel('#carouselHome')
    if (window.innerWidth <= 767) {
        carousel.pause();
    } else {
        carousel.dispose();
    }

    $('.proceso-paso1').mouseenter(function () {
        $('.proceso-punto').removeClass('active');
        $('.proceso-paso').removeClass('active');
        $('.barras').removeClass('active inactive');

        $('.punto1 .proceso-punto').addClass('active');
        $('.proceso-paso1').addClass('active');
        $('.barras1').addClass('active');
    });

    $('.proceso-paso2').mouseenter(function () {
        $('.proceso-punto').removeClass('active');
        $('.proceso-paso').removeClass('active');
        $('.barras').removeClass('active inactive');

        $('.punto2 .proceso-punto').addClass('active');
        $('.proceso-paso2').addClass('active');
        $('.barras2').addClass('active');
        $('.barras1').addClass('inactive');
    });

    $('.proceso-paso3').mouseenter(function () {
        $('.proceso-punto').removeClass('active');
        $('.proceso-paso').removeClass('active');
        $('.barras').removeClass('active inactive');

        $('.punto3 .proceso-punto').addClass('active');
        $('.proceso-paso3').addClass('active');
        $('.barras3').addClass('active');
        $('.barras2').addClass('inactive');
    });

    $('.proceso-paso4').mouseenter(function () {
        $('.proceso-punto').removeClass('active');
        $('.proceso-paso').removeClass('active');
        $('.barras').removeClass('active inactive');

        $('.punto4 .proceso-punto').addClass('active');
        $('.proceso-paso4').addClass('active');
        $('.barras4').addClass('active');
        $('.barras3').addClass('inactive');
    });

    $('.proceso-paso1, .proceso-paso2, .proceso-paso3, .proceso-paso4').mouseleave(function () {
        $('.proceso-punto').removeClass('active');
        $('.proceso-paso').removeClass('active');
        $('.barras').removeClass('active inactive');
    });

    $('details').on('click', function () {
        if ($(this).prop('open')) {
            $(this).find('i').css('transform', 'rotate(0deg)');
        } else {
            $(this).find('i').css('transform', 'rotate(-180deg)');
        }
    });

});

/**
 * Pintar Los datos retornados de un json del Contacto
 * @param {any} data json
 */
function pintarDatosContacto() {
    $('#error_txt_edad, #error_txt_monto').addClass('input_visible');

    //Datos Personales
    var $MulticotizadorSaas_nombre = getCookie('$MulticotizadorSaas_nombre');
    if ($MulticotizadorSaas_nombre != '')
        Cotizacion.Contacto.Nombre = $MulticotizadorSaas_nombre;

    var $MulticotizadorSaas_apellidos = getCookie('$MulticotizadorSaas_apellidos');
    if ($MulticotizadorSaas_apellidos != '')
        Cotizacion.Contacto.Apellidos = $MulticotizadorSaas_apellidos;

    var $MulticotizadorSaas_correo = getCookie('$MulticotizadorSaas_correo');
    if ($MulticotizadorSaas_correo != '')
        Cotizacion.Contacto.Correo = $MulticotizadorSaas_correo;

    var $MulticotizadorSaas_celular = getCookie('$MulticotizadorSaas_celular');
    if ($MulticotizadorSaas_celular != '')
        Cotizacion.Contacto.Telefono = $MulticotizadorSaas_celular;
}

function valForm_dtCliente(InputObligatorio = false) {
    let resultado;

    let monto = $('#txt_monto').val();
    let valEdad = GeneralValidar_Inputs('#txt_edad', $('#txt_edad').val(), 'EdadAhorro', InputObligatorio),
        valMonto = GeneralValidar_Inputs('#txt_monto', monto, 'MontoAhorro', InputObligatorio),
        valPeriodo = true;

    if (valPeriodo) {
        ObtenerMontoAportacion();
        valMonto = GeneralValidar_Inputs('#txt_monto', monto, 'MontoAhorro', InputObligatorio);
    }

    resultado = valEdad && valMonto && valPeriodo;

    if (!resultado) {
        if (InputObligatorio) {
            if (!valEdad) {
                $('#error_txt_edad').text(`* debe ser entre 18 y 64 años`)
                    .removeClass('input_visible');
            }
            if (!valMonto) {
                $('#error_txt_monto').removeClass('input_visible');
            }
        }
    }

    return resultado;
}

function ObtenerMontoAportacion() {
    let periodo = 4;
  
    //let listaAportaciones = [
    //    { Periodo: 4, Minimo: 2000, Maximo: 17000 },
    //    { Periodo: 3, Minimo: 4500, Maximo: 37500 },
    //    { Periodo: 2, Minimo: 9000, Maximo: 75000 },
    //    { Periodo: 1, Minimo: 18000, Maximo: 150000 },
    //];

    let listaAportaciones = [
        { Periodo: 4, Minimo: 2000, Maximo: 17000 },
        { Periodo: 3, Minimo: 6000, Maximo: 40000 },
        { Periodo: 2, Minimo: 12000, Maximo: 100000 },
        { Periodo: 1, Minimo: 24000, Maximo: 180000 },
    ];

    if (Cotizacion.FrecuenciaPago != periodo) {
        Cotizacion.FrecuenciaPago = periodo;
        let filtroPeriodo = listaAportaciones.filter(a => a.Periodo == periodo);

        Cotizacion.Monto.Minimo = filtroPeriodo[0].Minimo;
        Cotizacion.Monto.Maximo = filtroPeriodo[0].Maximo;

        let montoMinimo = ColocarMascaraMoneyLabel(Cotizacion.Monto.Minimo, 1);
        let montoMaximo = ColocarMascaraMoneyLabel(Cotizacion.Monto.Maximo, 1);
        $('#txt_monto').attr('placeholder', `Monto entre ${montoMinimo} y ${montoMaximo}`);
        $('#error_txt_monto').text(`* debe ser entre ${montoMinimo} y ${montoMaximo}`);
    }
}