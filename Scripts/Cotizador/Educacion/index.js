var USUARIO_ID = 0, AGENTE_ID = 0;

var Cotizacion = {
    Contacto: {
        Id: 0,
        Edad: 0,
        Nombre: '',
        Apellidos: '',
        Correo: '',
        Telefono: '',
        Genero: '',
    },
    Menor: {
        Genero: '',
        Edad: 0,
    },
    MontoAportacion: 0,
    FrecuenciaPago: 0,
    Monto: {
        Minimo: 0,
        Maximo: 0,
    }
};

$(function () {
    iniciarQueryString();

    urlCanonica = 'seguro-educacional/allianz/';

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

    $('#btnCotizarEducacion').click(() => {
        if (valForm_dtCliente(true)) {
            $('#myModalActualizando').modal('show');

            Cotizacion.MontoAportacion = parseFloat(EliminarMascaraMoney($('#txt_monto').val()));

            Cotizacion.Contacto.Edad = parseInt($('#txt_edad').val());
            Cotizacion.Contacto.Genero = $('#btn_genero_m').hasClass('activo') ? 'M' : 'H';

            Cotizacion.Menor.Edad = parseInt($('#txt_edad_hijo').val());
            Cotizacion.Menor.Genero = $('#btn_genero_hijo_m').hasClass('activo') ? 'M' : 'H';

            $('#postContactoId').val(0);
            $('#postCotizacionId').val(0);
            $('#postNombre_c').val(Cotizacion.Contacto.Nombre);
            $("#postApellidoPa_c").val(Cotizacion.Contacto.Apellidos);
            $("#postApellidoMa_c").val('');
            $("#postCorreo_c").val(Cotizacion.Contacto.Correo);
            $("#postCelular_c").val(Cotizacion.Contacto.Telefono);
            $("#postGenero").val(Cotizacion.Contacto.Genero);
            $("#postEdad").val(Cotizacion.Contacto.Edad);
            $("#postMontoAportacion").val(Cotizacion.MontoAportacion);
            $("#postFrecuenciaPago").val(Cotizacion.FrecuenciaPago);

            $("#postGeneroMenor").val(Cotizacion.Menor.Genero);
            $("#postEdadMenor").val(Cotizacion.Menor.Edad);

            $("#frmResultados").submit();
        }
    });

    ObtenerMontoAportacion();
    pintarDatosContacto();

    $("#txt_periodo").change(function () {
        valForm_dtCliente();
    });
});

/**
 * Pintar Los datos retornados de un json del Contacto
 * @param {any} data json
 */
function pintarDatosContacto() {
    $('#error_txt_edad, #error_txt_edad_hijo, #error_txt_monto, #error_txt_genero, #error_txt_genero_hijo').addClass('input_visible');

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

function btnGenero_dtCliente(pthis, genero) {
    $('#error_txt_genero').addClass('input_visible');

    $("#btn_genero_h, #btn_genero_m").removeClass("activo");
    $("#btn_genero_" + genero).addClass("activo");

    valForm_dtCliente();
}

function btnGenero_dtClienteHijo(pthis, genero) {
    $('#error_txt_genero_hijo').addClass('input_visible');

    $("#btn_genero_hijo_h, #btn_genero_hijo_m").removeClass("activo");
    $("#btn_genero_hijo_" + genero).addClass("activo");

    valForm_dtCliente();
}

function valForm_dtCliente(InputObligatorio = false) {
    let resultado;

    let monto = $('#txt_monto').val();
    let valGenero = false,
        valEdad = GeneralValidar_Inputs('#txt_edad', $('#txt_edad').val(), 'EdadEducacion', InputObligatorio),
        valMonto = GeneralValidar_Inputs('#txt_monto', monto, 'Texto', InputObligatorio),
        valPeriodo = true,
        valGeneroHijo = false,
        valEdadHijo = GeneralValidar_Inputs('#txt_edad_hijo', $('#txt_edad_hijo').val(), 'EdadEducacionHijo', InputObligatorio);

    valGenero = ($("#btn_genero_h").hasClass("activo") || $("#btn_genero_m").hasClass("activo")) ? true : false;

    valGeneroHijo = ($("#btn_genero_hijo_h").hasClass("activo") || $("#btn_genero_hijo_m").hasClass("activo")) ? true : false;

    if (valPeriodo) {
        ObtenerMontoAportacion();
        valMonto = GeneralValidar_Inputs('#txt_monto', monto, 'MontoEducacion', InputObligatorio);
    }

    resultado = valGenero && valEdad && valMonto && valPeriodo && valGeneroHijo && valEdadHijo;

    if (!resultado) {
        if (InputObligatorio) {
            if (!valEdad) {
                $('#error_txt_edad').text(`* debe ser entre 18 y 64 años`)
                    .removeClass('input_visible');
            }
            if (!valEdadHijo) {
                $('#error_txt_edad_hijo').text(`* debe ser entre 0 y 18 años`)
                    .removeClass('input_visible');
            }
            if (!valMonto) {
                $('#error_txt_monto').removeClass('input_visible');
            }
            if (!valGenero) {
                $('#error_txt_genero').removeClass('input_visible');
            }
            if (!valGeneroHijo) {
                $('#error_txt_genero_hijo').removeClass('input_visible');
            }
        }
    }

    return resultado;
}

function ObtenerMontoAportacion() {
    let periodo = parseInt($('#txt_periodo').val());

    let listaAportaciones = [
        { Periodo: 4, Minimo: 1500, Maximo: 12500 },
        { Periodo: 3, Minimo: 4500, Maximo: 37500 },
        { Periodo: 2, Minimo: 9000, Maximo: 75000 },
        { Periodo: 1, Minimo: 18000, Maximo: 150000 },
    ];

    if (Cotizacion.FrecuenciaPago != periodo) {
        Cotizacion.FrecuenciaPago = periodo;
        let filtroPeriodo = listaAportaciones.filter(a => a.Periodo == periodo);

        Cotizacion.Monto.Minimo = filtroPeriodo[0].Minimo;
        Cotizacion.Monto.Maximo = filtroPeriodo[0].Maximo;

        let montoMinimo = ColocarMascaraMoneyLabel(Cotizacion.Monto.Minimo, 1);
        let montoMaximo = ColocarMascaraMoneyLabel(Cotizacion.Monto.Maximo, 1);
        $('#txt_monto').attr('placeholder', `ingresar monto entre ${montoMinimo} y ${montoMaximo}`);
        $('#error_txt_monto').text(`* debe ser entre ${montoMinimo} y ${montoMaximo}`);
    }
}