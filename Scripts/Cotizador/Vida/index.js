var USUARIO_ID = 0, AGENTE_ID = 0;

var PerfilCotizacion = {
    Contacto: {
        Id: 0,
        Edad: 0,
        Nombre: '',
        Apellidos: '',
        Genero: 0,
        Correo: '',
        Telefono: '',
    },
    MontoMinimo: 0,
    MontoMaximo: 0
};

var ConsultarMontoMinimo = true;

$(function () {
    iniciarQueryString();

    urlCanonica = 'seguro-de-vida/';

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

    $('#btnCotizarVida').click(() => {
        if (valForm_dtCliente(true)) {
            $('#myModalActualizando').modal('show');

            let monto = parseFloat(EliminarMascaraMoney($('#txt_monto').val()));
            let edad = parseInt($('#txt_edad').val());
            let genero = 'H';
            if ($('#btn_genero_m').hasClass('activo'))
                genero = 'M';

            $('#postContactoId').val(0);
            $('#postCotizacionId').val(0);
            $('#postNombre_c').val(PerfilCotizacion.Contacto.Nombre);
            $("#postApellidoPa_c").val(PerfilCotizacion.Contacto.Apellidos);
            $("#postApellidoMa_c").val('');
            $("#postCorreo_c").val(PerfilCotizacion.Contacto.Correo);
            $("#postCelular_c").val(PerfilCotizacion.Contacto.Telefono);
            $("#postGenero").val(genero);
            $("#postEdad").val(edad);
            $("#postMontoInvertir").val(monto);
            $("#frmResultados").submit();
        }
    });

    pintarDatosContacto();

    window.addEventListener("keyup", (e) => {
        if (document.getElementById(`txt_edad`)) {
            ConsultarMontoMinimo = true;
            valForm_dtCliente();
        }
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

    document.querySelectorAll('.btnCotizarAhorro').forEach((btn) => {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            var hero = document.getElementById('hero');
            hero.scrollIntoView({ behavior: 'smooth' });
        });
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
    $('#error_txt_genero, #error_txt_edad, #error_txt_monto').addClass('input_visible');

    //Datos Personales
    var $MulticotizadorSaas_nombre = getCookie('$MulticotizadorSaas_nombre');
    if ($MulticotizadorSaas_nombre != '')
        PerfilCotizacion.Contacto.Nombre = $MulticotizadorSaas_nombre;

    var $MulticotizadorSaas_apellidos = getCookie('$MulticotizadorSaas_apellidos');
    if ($MulticotizadorSaas_apellidos != '')
        PerfilCotizacion.Contacto.Apellidos = $MulticotizadorSaas_apellidos;

    var $MulticotizadorSaas_correo = getCookie('$MulticotizadorSaas_correo');
    if ($MulticotizadorSaas_correo != '')
        PerfilCotizacion.Contacto.Correo = $MulticotizadorSaas_correo;

    var $MulticotizadorSaas_celular = getCookie('$MulticotizadorSaas_celular');
    if ($MulticotizadorSaas_celular != '')
        PerfilCotizacion.Contacto.Telefono = $MulticotizadorSaas_celular;
}

function btnGenero_dtCliente(pthis, genero) {
    $('#error_txt_genero').addClass('input_visible');

    $("#btn_genero_h span, #btn_genero_m span").html('radio_button_unchecked');
    $(`#btn_genero_${genero} span`).html('radio_button_checked');
    

    $("#btn_genero_h, #btn_genero_m").removeClass("activo");
    $("#btn_genero_" + genero).addClass("activo");

    ConsultarMontoMinimo = true;
    valForm_dtCliente();
}

function valForm_dtCliente(InputObligatorio = false) {
    //$('#error_txt_genero, #error_txt_edad, #error_txt_monto').addClass('input_visible');
    let resultado;

    let monto = $('#txt_monto').val();
    let valGenero = false,
        valEdad = GeneralValidar_Inputs('#txt_edad', $('#txt_edad').val(), 'EdadVida', InputObligatorio),
        valMonto = GeneralValidar_Inputs('#txt_monto', monto, 'Texto', InputObligatorio);

    if ($("#btn_genero_h").hasClass("activo") ||
        $("#btn_genero_m").hasClass("activo"))
        valGenero = true;

    if (valEdad && valGenero) {
        valMonto = GeneralValidar_Inputs('#txt_monto', monto, 'MontoVida', InputObligatorio);
        if (ConsultarMontoMinimo)
            ObtenerMontoInvertir();
        $('#txt_monto').removeAttr('disabled');
    }
    else {
        $('#txt_monto').attr('disabled', 'disabled')
            .val('');
        ConsultarMontoMinimo = true;
    }

    resultado = valEdad && valGenero && valMonto;

    if (!resultado) {
        if (InputObligatorio) {
            if (!valEdad) {
                $('#error_txt_edad').text(`* debe ser entre 18 y 70 años`)
                    .removeClass('input_visible');
            }
            if (!valGenero)
                $('#error_txt_genero').text('* selecciona el genero')
                    .removeClass('input_visible');
            if (!valMonto) {
                $('#error_txt_monto').removeClass('input_visible');
            }
        }
    }

    return resultado;
}

function ObtenerMontoInvertir() {
    let edad = parseInt($('#txt_edad').val()),
        genero = $('#btn_genero_m').hasClass('activo') ? 1 : 2;

    if (PerfilCotizacion.Contacto.Edad != edad ||
        PerfilCotizacion.Contacto.Genero != genero) {
        GetJSONUsuarioID('/Vida/ObtenerMontoAInvertirCotizacionAllianz',
            {
                Edad: edad,
                Genero: genero,
                EsFumador: true
            },
            Sesion.UsuarioId,
            function (data) {
                if (data.status == 'OK') {
                    ConsultarMontoMinimo = false;
                    let montoMinimo = ColocarMascaraMoneyLabel(data.MontoAInvertir, 1);
                    let montoMaximo = ColocarMascaraMoneyLabel(data.MontoAInvertirMaximo, 1);
                    $('#txt_monto, #txt_monto_movil').attr('placeholder', `min ${montoMinimo.split('.')[0]} mxn - max ${montoMaximo.split('.')[0]} mxn`);
                    $('#error_txt_monto, #error_txt_monto_movil').text(`* min ${montoMinimo.split('.')[0]} mxn - max ${montoMaximo.split('.')[0]} mxn`);
                    PerfilCotizacion.MontoMinimo = data.MontoAInvertir;
                    PerfilCotizacion.MontoMaximo = data.MontoAInvertirMaximo;
                    PerfilCotizacion.Contacto.Edad = edad;
                    PerfilCotizacion.Contacto.Genero = genero;
                }
                else { //Error Emision de Autos  Controlada
                    General_ManejaErrorEmision(data, 'ObtenerMontoAInvertirCotizacionAllianz', '');
                    console.error('{ ' + data.message + ' }, ObtenerMontoAInvertirCotizacionAllianz');
                }
            }, 'ObtenerMontoAInvertirCotizacionAllianz', '');
    }
}
