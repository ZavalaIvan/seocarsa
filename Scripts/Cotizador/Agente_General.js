var Sesion = {
    UsuarioId: 0,
    GrupoId: 0,
    JerarquiaId: 0,
    Nombre: "",
    Correo: "",
    Telefono: "",
    Foto: "",
    TipoUsuario: 0,
    AsistenteUsuarioId: 0,
    AsistenteId: 0,
    PromotoriaId: 0,
}

$(document).ready(function () {
    //validador js
    jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
    });

    $("#ValCorreo").validate({
        rules: {
            field: {
                required: true,
                email: true
            }
        }
    });

    $("#ValCorreo2").validate({
        rules: {
            field: {
                required: true,
                email: true
            }
        }
    });

    $("#ValCorreo_Confir").validate({
        rules: {
            field: {
                required: true,
                email: true
            }
        }
    });

    $("#ValCorreo_con_com").validate({
        rules: {
            field: {
                required: true,
                email: true
            }
        }
    });

    $("#ValCorreo_con_admin").validate({
        rules: {
            field: {
                required: true,
                email: true
            }
        }
    });

    $("#ValCorreo_con_cob").validate({
        rules: {
            field: {
                required: true,
                email: true
            }
        }
    });
});

/**
 * Aldair
Validadores de campos utilizados en Janem
 * @param {any} input '#txtInput' el id del input
 * @param {any} valInput 'Valor' el valor del input
 * @param {any} tipoInput 'Etiqueta' para validar
 */
function GeneralValidar_Inputs(input, valInput, tipoInput, paintElement) {
    var resultado = false;
    if (valInput != undefined) {
        switch (tipoInput) {
            case 'Nombre':
                valInput = valInput.trim();
                if (valInput.length > 2 && GeneralValidar_Regex(valInput, 'nombre'))
                    resultado = true;
                break;
            case 'RazonSocial':
                valInput = valInput.trim();
                if (valInput.length > 2)
                    resultado = true;
                break;
            case 'CURP':
                valInput = valInput.trim();
                if (valInput.length == 18 && GeneralValidar_Regex(valInput, 'curp'))
                    resultado = true;
                break;
            case 'RFC':
                valInput = valInput.trim();
                if (valInput.length == 13 && GeneralValidar_Regex(valInput, 'rfc'))
                    resultado = true;
                break;
            case 'RFC_Homoclave':
                valInput = valInput.trim();
                if (valInput.length == 13) {
                    if (GeneralValidar_Regex(valInput, 'rfc'))
                        resultado = true;
                }
                else if (valInput.length == 10) {
                    if (GeneralValidar_Regex(valInput, 'rfcSinHomoclave'))
                        resultado = true;
                }
                break;
            case 'RFC_Moral':
                valInput = valInput.trim();
                if (valInput.length == 12 && GeneralValidar_Regex(valInput, 'rfc'))
                    resultado = true;
                break;
            case 'RFC_Moral_Homoclave':
                valInput = valInput.trim();
                if (valInput.length == 12) {
                    if (GeneralValidar_Regex(valInput, 'rfc'))
                        resultado = true;
                }
                else if (valInput.length == 9) {
                    if (GeneralValidar_Regex(valInput, 'rfcSinHomoclave'))
                        resultado = true;
                }
                break;
            case 'RFC_Fisica_Moral':
                valInput = valInput.trim();
                if ((valInput.length >= 12 || valInput.length <= 13) && GeneralValidar_Regex(valInput, 'rfc'))
                    resultado = true;
                break;
            case 'CLABE':
                if (valInput.length == 18) {
                    resultado = false;

                    $.each(arrayBancos, function (i, f) {
                        if (f.COD_INTE == valInput.substr(0, 3)) {
                            resultado = true;
                            $('#txt_bn_dt_banco').val(f.COD_INTE);
                        }
                    });
                }
                else if (valInput.length < 18) {
                    $.each(arrayBancos, function (i, f) {
                        if (f.COD_INTE == valInput.substr(0, 3)) {
                            resultado = true;
                            $('#txt_bn_dt_banco').val(f.COD_INTE);
                        }
                    });

                    if (!resultado)
                        $('#txt_bn_dt_banco').val('null');

                    resultado = false;
                }
                break;
            case 'CLABEInter':
                if (valInput.length >= 16 && valInput.length <= 18) {
                    resultado = true;
                }
                break;
            case 'Email':
                valInput = valInput.trim();
                if (GeneralValidacion_Correo(valInput, 'ValCorreo'))
                    resultado = true;
                break;
            case 'Email_Confirmacion':
                valInput = valInput.trim();
                if (GeneralValidacion_Correo(valInput, 'ValCorreo_Confir'))
                    resultado = true;
                break;
            case 'EmailRegex':
                valInput = valInput.trim();
                if (valInput != '' && GeneralValidar_Regex(valInput, 'email'))
                    resultado = true;
                break;
            case 'Email_Contacto':
                var valjs = '';

                switch (input) {
                    case '#txt_dt_con_correo_com':
                    case '#txt_contacto_correo_comercial':
                        valjs = 'ValCorreo_con_com';
                        break;
                    case '#txt_dt_con_correo_admin':
                    case '#txt_contacto_correo_administracion':
                        valjs = 'ValCorreo_con_admin';
                        break;
                    case '#txt_dt_con_correo_cob':
                    case '#txt_contacto_correo_cobranza':
                        valjs = 'ValCorreo_con_cob';
                        break;
                    case '#txt_dt_con_correo_otro':
                    case '#txt_contacto_correo_otro':
                        valjs = 'ValCorreo_con_otro';
                        break;
                    case '#txt_info_genCorreo':
                        valjs = 'ValCorreoGerenteComercial';
                        break;
                    case '#txt_info_ejeCorreo':
                        valjs = 'ValCorreoEjecutivoComercial';
                        break;
                }

                valInput = valInput.trim();
                if (GeneralValidacion_Correo(valInput, valjs))
                    resultado = true;
                break;
            case 'Email_cc_cco':
                valInput = valInput.trim();
                if (valInput != '' && GeneralValidar_Regex(valInput, 'email'))
                    resultado = true;
                break;
            case 'Email_Solicitud_Vida_Insignia':
                var valjs = '';

                switch (input) {
                    case '#txt_ct_Correo':
                        valjs = 'ValCorreo';
                        break;
                    case '#txt_sl_Correo':
                        valjs = 'ValCorreo2';
                        break;
                }

                valInput = valInput.trim();
                if (GeneralValidacion_Correo(valInput, valjs))
                    resultado = true;
                break;
            case 'CP':
                if (valInput)
                    resultado = true;
                break;
            case 'Telefono':
                if (valInput.length == 14)
                    resultado = true;
                break;
            case 'Texto':
                valInput = valInput.trim();
                if (valInput !== '' && valInput !== '$0')
                    resultado = true;
                break;
            case 'Lista':
                if (valInput !== 'null' && $(input).prop('selectedIndex') > 0)
                    resultado = true;
                break;
            case 'ListaHoras':
            case 'ListaEstatus':
                if (valInput !== 'null')
                    resultado = true;
                break;
            case 'HasClass':
                if ($(input).hasClass(valInput))
                    resultado = true;
                break;
            case 'Iguales':
                if ($(input).val() == $(valInput).val())
                    resultado = true;
                break;
            case 'Monto':
                valInput = valInput.trim();
                if (valInput != '' && valInput != '0.00')
                    resultado = true;
                break;
            case 'MontoVida':
                valInput = valInput.trim();
                if (valInput != '' && valInput != '0.00') {
                    let monto = parseFloat(EliminarMascaraMoney(valInput));
                    resultado = (monto >= PerfilCotizacion.MontoMinimo && monto <= PerfilCotizacion.MontoMaximo) ? true : false;
                }
                break;
            case 'MontoAhorro':
            case 'MontoEducacion':
                valInput = valInput.trim();
                if (valInput != '' && valInput != '0.00') {
                    let monto = parseFloat(EliminarMascaraMoney(valInput));
                    resultado = (Cotizacion.Monto.Minimo <= monto && monto <= Cotizacion.Monto.Maximo) ? true : false;
                }
                break;
            case 'Vencimiento': // POSTERIOR IGUAL A LA FECHA ACTUAL
                if (valInput.length == 10) {
                    var fechaAnterior = new Date();
                    fechaAnterior.setHours(00, 00, 00, 00);

                    var parts = valInput.split('/');
                    var fechaCapturada = new Date((parts[2]), parts[1] - 1, parts[0]);

                    if (existeFecha2(valInput)) {
                        if (fechaCapturada >= fechaAnterior) {
                            resultado = true;
                        }
                    }
                }
                break;
            case 'Fecha': // ANTERIOR 90 AÑOS O IGUAL O MENOR A LA FECHA ACTUAL
                if (valInput.length == 10) {
                    var fechaAnterior = new Date();
                    fechaAnterior.setFullYear(fechaAnterior.getFullYear() - 100)
                    fechaAnterior.setHours(00, 00, 00, 00);

                    var fechaPosterior = new Date();
                    fechaPosterior.setHours(00, 00, 00, 00);

                    var parts = valInput.split('/');
                    var fechaCapturada = new Date((parts[2]), parts[1] - 1, parts[0]);

                    if (existeFecha2(valInput)) {
                        if (fechaCapturada >= fechaAnterior && fechaCapturada <= fechaPosterior) {
                            resultado = true;
                        }
                    }
                }
                break;
            case 'FechaGMM': // ANTERIOR 71 AÑOS O IGUAL O MENOR A LA FECHA ACTUAL
            case 'FechaBxmasGMM':
                if (valInput.length == 10) {
                    var fechaAnterior = new Date();
                    fechaAnterior.setFullYear(fechaAnterior.getFullYear() - 71)
                    fechaAnterior.setHours(00, 00, 00, 00);

                    var fechaPosterior = new Date();
                    fechaPosterior.setHours(00, 00, 00, 00);

                    var parts = valInput.split('/');
                    var fechaCapturada = new Date((parts[2]), parts[1] - 1, parts[0]);

                    if (existeFecha2(valInput)) {
                        if (fechaCapturada >= fechaAnterior && fechaCapturada <= fechaPosterior) {
                            resultado = true;
                        }
                    }
                }
                break;
            case 'FechaAtlasGMM': // ANTERIOR 65 AÑOS O IGUAL O MENOR A LA FECHA ACTUAL
            case 'FechaAxaGMM':
                if (valInput.length == 10) {
                    var fechaAnterior = new Date();
                    fechaAnterior.setFullYear(fechaAnterior.getFullYear() - 65)
                    fechaAnterior.setHours(00, 00, 00, 00);

                    var fechaPosterior = new Date();
                    fechaPosterior.setHours(00, 00, 00, 00);

                    var parts = valInput.split('/');
                    var fechaCapturada = new Date((parts[2]), parts[1] - 1, parts[0]);

                    if (existeFecha2(valInput)) {
                        if (fechaCapturada >= fechaAnterior && fechaCapturada <= fechaPosterior) {
                            resultado = true;
                        }
                    }
                }
                break;
            case 'FechaAuto': // ANTERIOR 90 AÑOS O IGUAL O MAYOR DE 17 AÑOS
                if (valInput.length == 10) {
                    var fechaAnterior = new Date();
                    fechaAnterior.setFullYear(fechaAnterior.getFullYear() - 100)
                    fechaAnterior.setHours(00, 00, 00, 00);

                    var fechaPosterior = new Date();
                    fechaPosterior.setFullYear(fechaPosterior.getFullYear() - 17)
                    fechaPosterior.setHours(00, 00, 00, 00);

                    var parts = valInput.split('/');
                    var fechaCapturada = new Date((parts[2]), parts[1] - 1, parts[0]);

                    if (existeFecha2(valInput)) {
                        if (fechaCapturada >= fechaAnterior && fechaCapturada <= fechaPosterior) {
                            resultado = true;
                        }
                    }
                }
                break;
            case 'FechaPoliza': // POSTERIOR 5 AÑOS, ANTERIOR 80 AÑOS
                if (valInput.length == 10) {
                    var fechaAnterior = new Date();
                    fechaAnterior.setFullYear(fechaAnterior.getFullYear() - 80)
                    fechaAnterior.setHours(00, 00, 00, 00);

                    var fechaPosterior = new Date();
                    fechaPosterior.setFullYear(fechaPosterior.getFullYear() + 1);
                    fechaPosterior.setHours(00, 00, 00, 00);

                    var parts = valInput.split('/');
                    var fechaCapturada = new Date((parts[2]), parts[1] - 1, parts[0]);

                    if (existeFecha2(valInput)) {
                        if (fechaCapturada >= fechaAnterior && fechaCapturada <= fechaPosterior) {
                            resultado = true;
                        }
                    }
                }
                break;
            case 'FechaAntiguedad': // ANTERIOR 90 AÑOS O IGUAL O MENOR A LA FECHA ACTUAL
                if (valInput.length == 10) {
                    var fechaAnterior = new Date();
                    fechaAnterior.setFullYear(fechaAnterior.getFullYear() - 100)
                    fechaAnterior.setHours(00, 00, 00, 00);

                    var fechaPosterior = new Date();
                    fechaPosterior.setHours(00, 00, 00, 00);

                    var parts = valInput.split('/');
                    var fechaCapturada = new Date((parts[2]), parts[1] - 1, parts[0]);

                    if (existeFecha2(valInput)) {
                        if (fechaCapturada >= fechaAnterior && fechaCapturada <= fechaPosterior) {
                            resultado = true;
                        }
                    }
                }
                break;
            case 'TiempoExpe':
                valInput = valInput.trim();
                if (valInput != '' && valInput >= '0')
                    resultado = true;
                break;
            case 'Dia_Cobro':
                if (valInput != '') {
                    if (valInput >= 0 && valInput <= 31) {
                        resultado = true;
                    }
                }
                break;
            case 'Edad':
                if (valInput != '') {
                    if (valInput >= 0 && valInput <= 70) {
                        resultado = true;
                    }
                }
                break;
            case 'EdadVida':
                if (valInput != '') {
                    if (valInput >= 18 && valInput <= 70) {
                        resultado = true;
                    }
                }
                break;
            case 'EdadAhorro':
            case 'EdadEducacion':
                if (valInput != '') {
                    if (valInput >= 18 && valInput <= 64) {
                        resultado = true;
                    }
                }
                break;
            case 'EdadEducacionHijo':
                if (valInput != '') {
                    if (valInput >= 0 && valInput <= 18) {
                        resultado = true;
                    }
                }
                break;
            case 'EdadAtlasGMM':
            case 'EdadAxaGMM':
            case 'EdadBxmasGMM':
            case 'EdadGNPGMM':
                if (valInput != '') {
                    if (valInput >= 0 && valInput <= 64) {
                        resultado = true;
                    }
                }
                break;
            case 'Edad_Auto':
                if (valInput != '' && valInput > 17 && valInput < 100)
                    resultado = true;
                break;
            case 'Fecha_Doc': // POSTERIOR A LA FECHA ACTUAL (MES/AÑO)
                if (valInput.length == 10) {
                    if (existeFecha2(valInput)) {
                        var fechaActual = new Date();
                        fechaActual.setDate(1);
                        fechaActual.setHours(00, 00, 00, 00);

                        var parts = valInput.split('/');
                        var fechaCapturada = new Date((parts[2]), parts[1] - 1, parts[0]);

                        if (fechaCapturada >= fechaActual) {
                            resultado = true;
                        }
                    }
                }
                break;
            case 'Fecha_Doc_Vigencia': // NO MAYOR DE 3 MESES EN RELACIÓN A LA FECHA ACTUAL
                if (valInput.length == 7) {
                    var fechaAnterior = new Date();
                    fechaAnterior.setMonth(fechaAnterior.getMonth() - 3)
                    fechaAnterior.setDate(1);
                    fechaAnterior.setHours(00, 00, 00, 00);

                    var fechaPosterior = new Date();
                    fechaPosterior.setMonth(fechaPosterior.getMonth() + 1);
                    fechaPosterior.setDate(1);
                    fechaPosterior.setHours(00, 00, 00, 00);

                    var parts = valInput.split('/');
                    var fechaCapturada = new Date((parts[1]), parts[0] - 1, '01');

                    if (existeFecha2('01/' + valInput)) {
                        if (fechaCapturada >= fechaAnterior && fechaCapturada <= fechaPosterior) {
                            resultado = true;
                        }
                    }

                }
                break;
            case 'NombrePago':
                valInput = valInput.trim();
                if (valInput.length > 10 && GeneralValidar_Regex(valInput, 'nombre'))
                    resultado = true;
                break;
            case 'Tarjeta':
                //if (valInput.length >= 17 && valInput.length <= 23) {
                if (valInput.length == 19) {
                    if (valInput.substr(0, 2) == '51' || valInput.substr(0, 2) == '52' || valInput.substr(0, 2) == '53' || valInput.substr(0, 2) == '54' || valInput.substr(0, 2) == '55')
                        resultado = true;
                    else if (valInput.substr(0, 1) == '4')
                        resultado = true;
                    else if (valInput.substr(0, 2) == '37')
                        resultado = true;
                }
            case 'Tarjeta_Insignia':
                //if (valInput.length >= 17 && valInput.length <= 23) {
                if (valInput.length == 19) {
                    if (valInput.substr(0, 2) == '51' || valInput.substr(0, 2) == '52' || valInput.substr(0, 2) == '53' || valInput.substr(0, 2) == '54' || valInput.substr(0, 2) == '55')
                        resultado = true;
                    else if (valInput.substr(0, 1) == '4')
                        resultado = true;
                    else if (valInput.substr(0, 2) == '37')
                        resultado = true;
                    else if (valInput.substr(0, 2) == '57')
                        resultado = true;
                    else if (valInput.substr(0, 2) == '50')
                        resultado = true;
                }
            case 'Tarjeta_Emision_MVA':
                if (valInput.length == 19 || valInput.length == 18) {
                    if (valInput.substr(0, 1) == '5')
                        resultado = true;
                    else if (valInput.substr(0, 1) == '4')
                        resultado = true;
                    else if (valInput.substr(0, 1) == '3')
                        resultado = true;
                }
            case 'Tarjeta_Emision_MV':
                if (valInput.length == 19 || valInput.length == 18) {
                    if (valInput.substr(0, 1) == '5')
                        resultado = true;
                    else if (valInput.substr(0, 1) == '4')
                        resultado = true;
                }
            case 'Cod_Seg':
                if (valInput.length < 5 && valInput.length > 2)
                    resultado = true;
                break;
            case 'VencimientoPago':
                if (valInput.length == 5) {
                    var fecha = new Date();
                    var ano = '' + fecha.getFullYear();
                    var mes = ('0' + (fecha.getMonth() + 1)).slice(-2);

                    if (mes.length == 1)
                        mes = '0' + mes;

                    ano = ano.substr(2, 4);

                    var cadena = valInput,
                        separador = "/",
                        arregloDeSubCadenas = cadena.split(separador);

                    var _meses = arregloDeSubCadenas[0];
                    var _ano = arregloDeSubCadenas[1];

                    if (ano <= _ano && _meses <= 12) {
                        if (ano == _ano) {
                            if (_meses >= mes)
                                resultado = true;
                        }
                        else
                            resultado = true;
                    }
                }
                break;
            case 'VencimientoPago_Emision': // mm/aa
                if (valInput.length == 5) {
                    var fecha = new Date();
                    var ano = '' + fecha.getFullYear();
                    var mes = ('0' + (fecha.getMonth() + 1)).slice(-2);

                    if (mes.length == 1)
                        mes = '0' + mes;

                    ano = ano.substr(2, 4);

                    var cadena = valInput,
                        separador = "/",
                        arregloDeSubCadenas = cadena.split(separador);

                    var _meses = arregloDeSubCadenas[0];
                    var _ano = arregloDeSubCadenas[1];

                    if (ano <= _ano && _meses <= 12) {
                        if (ano == _ano) {
                            if (_meses >= mes)
                                resultado = true;
                        }
                        else
                            resultado = true;
                    }
                }
                break;
            case 'VencimientoPago_Emision2': // mm/aaaa
                if (valInput.length == 7) {
                    var fecha = new Date();
                    var ano = '' + fecha.getFullYear();
                    var mes = ('0' + (fecha.getMonth() + 1)).slice(-2);

                    if (mes.length == 1)
                        mes = '0' + mes;

                    //ano = ano.substr(2, 4);

                    var cadena = valInput,
                        separador = "/",
                        arregloDeSubCadenas = cadena.split(separador);

                    var _meses = arregloDeSubCadenas[0];
                    var _ano = arregloDeSubCadenas[1];

                    if (ano <= _ano && _meses <= 12) {
                        if (ano == _ano) {
                            if (_meses >= mes)
                                resultado = true;
                        }
                        else
                            resultado = true;
                    }
                }
                break;
            case 'identificacion':
                var nVal = parseInt(valInput);
                if (nVal > 0)
                    resultado = true;
                break;
            case 'serie':
                valInput = valInput.trim();
                if (valInput.length > 0 && valid_vin(valInput))
                    resultado = true;
                break;
            case 'nci':
                valInput = valInput.trim();
                if (valInput.length > 0)
                    resultado = true;
                break;
            case 'FechaValorFactura': // ACTUAL, ANTERIOR 1 AÑOS
                if (valInput.length == 10) {
                    var fechaAnterior = new Date();
                    fechaAnterior.setFullYear(fechaAnterior.getFullYear() - 1);
                    fechaAnterior.setMonth(0);
                    fechaAnterior.setDate(1);
                    fechaAnterior.setHours(00, 00, 00, 00);

                    var fechaPosterior = new Date();
                    fechaPosterior.setFullYear(fechaPosterior.getFullYear());
                    fechaPosterior.setMonth(11);
                    fechaPosterior.setDate(30);
                    fechaPosterior.setHours(00, 00, 00, 00);

                    var parts = valInput.split('/');
                    var fechaCapturada = new Date((parts[2]), parts[1] - 1, parts[0]);

                    if (existeFecha2(valInput)) {
                        if (fechaCapturada >= fechaAnterior && fechaCapturada <= fechaPosterior) {
                            resultado = true;
                        }
                    }
                }
            case 'FechaEmision': // ACTUAL, ANTERIOR 1 AÑOS
                if (valInput.length == 10) {
                    var fechaAnterior = new Date();
                    fechaAnterior.setHours(00, 00, 00, 00);

                    var fechaPosterior = new Date();
                    fechaPosterior.setDate(fechaPosterior.getDate() + 30);
                    fechaPosterior.setHours(00, 00, 00, 00);

                    var parts = valInput.split('/');
                    var fechaCapturada = new Date((parts[2]), parts[1] - 1, parts[0]);

                    if (existeFecha2(valInput)) {
                        if (fechaCapturada >= fechaAnterior && fechaCapturada <= fechaPosterior) {
                            resultado = true;
                        }
                    }
                }
                break;
            case 'Email_Emision':
                var valjs = '';

                switch (input) {
                    case '#txt_pfisica_correo':
                        valjs = 'ValCorreo_Emision_PFisica';
                        break;
                    case '#txt_pmoral_correo':
                        valjs = 'ValCorreo_Emision_PMoral';
                        break;
                    case '#txt_conductor_correo':
                        valjs = 'ValCorreo_Emision_Conductor';
                        break;
                    case '#txt_asegurado_correo':
                        valjs = 'ValCorreo_Emision_Asegurado_Fisica';
                        break;
                    case '#txt_asegurado_pmoral_correo':
                        valjs = 'ValCorreo_Emision_Asegurado_Moral';
                        break;
                    case '#txt_beneficiario_pfisica_correo':
                    case '#txt_aseg_pfisica_correo':
                    case '#txt_beneficiario_correo':
                        valjs = 'ValCorreo_Emision_Beneficiario_Fisica';
                        break;
                    case '#txt_beneficiario_pmoral_correo':
                    case '#txt_aseg_pmoral_correo':
                        valjs = 'ValCorreo_Emision_Beneficiario_Moral';
                        break;
                    case '#txt_accidentes_correo':
                        valjs = 'ValCorreo_Emision_Accidentes';
                        break;
                    case '#txt_pago_correo':
                        valjs = 'ValCorreo_Emision_Pago';
                        break;
                    case '#txt_facturacion_correo':
                    case '#txt_pfisica_facturacion_correo':
                        valjs = 'ValCorreo_Emision_Facturacion_PFisica';
                        break;
                    case '#txt_facturacion_pmoral_correo':
                    case '#txt_pmoral_facturacion_correo':
                        valjs = 'ValCorreo_Emision_Facturacion_PMoral';
                        break;
                }

                valInput = valInput.trim();
                if (GeneralValidacion_Correo(valInput, valjs))
                    resultado = true;
                break;
            case 'Porcentaje':
                if (valInput != '') {
                    if (valInput >= 0 && valInput <= 100) {
                        resultado = true;
                    }
                }
                break;
            case 'Email_Empresa_Contacto':
                var valjs = '';
                var cadena = input.split('_');

                valjs = 'ValCorreo_contacto_' + cadena[2];
                valInput = valInput.trim();

                if (GeneralValidacion_Correo_SinJS(valInput, valjs))
                    resultado = true;
                break;
        }
    }

    if (paintElement == true) {
        if (resultado) {
            if (tipoInput == 'ListaEstatus') {
                if (valInput != '1') {
                    $(input).addClass('input_valido');
                    $(input).removeClass('input_invalido');
                }
                else {
                    $(input).removeClass('input_valido');
                    $(input).removeClass('input_invalido');
                }
            }
            else {
                $(input).addClass('input_valido');
                $(input).removeClass('input_invalido');
            }
        }
        else {
            $(input).removeClass('input_valido');
            $(input).addClass('input_invalido');
        }
    }

    return resultado;
}


function valid_vin(vin) {
    // Reject based on bad pattern match
    no_ioq = '[a-hj-npr-z0-9]';  // Don't allow characters I,O or Q
    matcher = new RegExp("^" + no_ioq + "{8}[0-9xX]" + no_ioq + "{8}$", 'i'); // Case insensitive
    if (vin.match(matcher) == null)
        return false;

    // Reject base on bad check digit
    return check_digit_check(vin);
};

var check_digit_check = function (vin) {
    cleaned_vin = vin.toUpperCase();

    letter_map = {
        A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8,
        J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9,
        S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9,
        1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 0: 0
    };
    weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

    products = 0;
    for (var i = 0; i < cleaned_vin.length; i++) {
        // alert('adding ' + letter_map[vin[i]] + ' * ' + weights[i] + ' to ' + products);
        products += letter_map[cleaned_vin[i]] * weights[i];
    }
    check_digit_should_be = products % 11;
    if (check_digit_should_be == 10) check_digit_should_be = 'X';

    return check_digit_should_be == cleaned_vin[8];
}

/**
 * Funcion general para marcar error al perder focus el input
 * @param {any} elem input elemento
 */
function valInputFocus(elem, classError) {
    var valInput;
    switch ($(elem).attr("tipoval")) {
        case 'Nombre':
        case 'RazonSocial':
        case 'Texto':
        case 'Telefono':
        case 'Email_Confirmacion':
        case 'Email':
        case 'EmailRegex':
        case 'Email_Contacto':
        case 'Email_Solicitud_Vida_Insignia':
        case 'Monto':
        case 'MontoVida':
        case 'MontoAhorro':
        case 'MontoEducacion':
        case 'EdadAhorro':
        case 'EdadEducacion':
        case 'EdadEducacionHijo':
        case 'Edad':
        case 'EdadVida':
        case 'EdadAtlasGMM':
        case 'EdadBxmasGMM':
        case 'EdadAxaGMM':
        case 'EdadGNPGMM':
        case 'Edad_Auto':
        case 'Vencimiento':
        case 'TiempoExpe':
        case "Fecha":
        case "FechaPoliza":
        case "CURP":
        case "RFC":
        case "RFC_Moral":
        case 'RFC_Fisica_Moral':
        case 'RFC_Homoclave':
        case 'RFC_Moral_Homoclave':
        case 'Fecha_Doc_Vigencia':
        case 'Fecha_Doc':
        case 'FechaAuto':
        case 'FechaGMM':
        case 'FechaAtlasGMM':
        case 'FechaAxaGMM':
        case 'FechaBxmasGMM':
        case 'NombrePago':
        case 'Tarjeta':
        case 'Tarjeta_Insignia':
        case 'VencimientoPago':
        case 'Cod_Seg':
        case 'identificacion':
        case 'serie':
        case 'nci':
        case 'Dia_Cobro':
        case 'FechaValorFactura':
        case 'Tarjeta_Emision_MVA':
        case 'Tarjeta_Emision_MV':
        case 'VencimientoPago_Emision':
        case 'VencimientoPago_Emision2':
        case 'FechaEmision':
        case 'FechaAntiguedad':
        case 'Email_Emision':
        case 'CLABE':
        case 'CLABEInter':
        case 'Meses':
        case 'Anio':
        case "Porcentaje":
        case 'Email_Empresa_Contacto':
            if ($('#' + elem.id).val() !== '' && $('#' + elem.id).val() !== '$0') {
                valInput = GeneralValidar_Inputs('#' + elem.id, $('#' + elem.id).val(), $('#' + elem.id).attr("tipoval"), true);

                if (elem.id !== 'txt_dt_dic_numint' && elem.id !== 'txt_cont_facebook' && elem.id !== 'txt_cont_twitter') {
                    if (valInput) {
                        var valCorreosIguales;
                        if (elem.id === 'txt_cont_correo_conf') {
                            valCorreosIguales = GeneralValidar_Inputs('#txt_cont_correo_conf', '#txt_cont_correo', 'Iguales', true);

                            if (!valCorreosIguales) {
                                $('#error_' + elem.id).text('* Los correos no son iguales');
                                $('#error_' + elem.id).removeClass(classError);
                            }
                            else {
                                $('#error_' + elem.id).addClass(classError);
                            }
                        }
                        else if (elem.id === 'txtConfirmPassword') {
                            valCorreosIguales = GeneralValidar_Inputs('#txtConfirmPassword', '#txtPassword', 'Iguales', true);

                            if (!valCorreosIguales) {
                                $('#error_' + elem.id).text('* Las contraseñas no son iguales');
                                $('#error_' + elem.id).removeClass(classError);
                            }
                            else {
                                $('#error_' + elem.id).addClass(classError);
                            }
                        }
                        else {
                            $('#error_' + elem.id).addClass(classError);
                        }
                    }
                    else {
                        if (elem.id === 'txt_cont_correo_conf')
                            $('#error_' + elem.id).text('* Correo incorrecto');
                        $('#error_' + elem.id).removeClass(classError);
                    }
                }
            }
            else {
                $('#' + elem.id).removeClass('input_valido');
                $('#' + elem.id).removeClass('input_invalido');
                $('#error_' + elem.id).addClass(classError);
            }
            break;
        case 'Fecha_Retiro_65_Insignia':
        case 'Fecha_Temporal_20_Insignia':
        case 'Fecha_Educacional_18_Contratante_Insignia':
        case 'Fecha_Educacional_18_Insignia':
            if ($('#' + elem.id).val() !== '') {
                valInput = GeneralValidar_Inputs_Fecha_CVIDA('#' + elem.id, $('#' + elem.id).val(), $('#' + elem.id).attr("tipoval"), true);

                if (valInput) {
                    $('#error_' + elem.id).addClass(classError);
                }
                else {
                    if ($(elem).attr("tipoval") == 'Fecha_Retiro_65_Insignia')
                        $('#error_' + elem.id).text('Edad fuera del rango de 18 a 60 años');
                    else if ($(elem).attr("tipoval") == 'Fecha_Temporal_20_Insignia')
                        $('#error_' + elem.id).text('Edad fuera del rango de 15 a 70 años');
                    else if ($(elem).attr("tipoval") == 'Fecha_Educacional_18_Contratante_Insignia')
                        $('#error_' + elem.id).text('Edad fuera del rango de 18 a 61 años');
                    else if ($(elem).attr("tipoval") == 'Fecha_Educacional_18_Insignia')
                        $('#error_' + elem.id).text('Edad fuera del rango de 0 a 13 años');

                    $('#error_' + elem.id).removeClass(classError);
                }
            }
            else {
                $('#' + elem.id).removeClass('input_valido');
                $('#' + elem.id).removeClass('input_invalido');
                $('#error_' + elem.id).addClass(classError);
            }
            break;
        case 'Lista':
        case 'ListaHoras':
        case 'ListaEstatus':
            if ($('#' + elem.id).val() !== 'null') {
                valInput = GeneralValidar_Inputs('#' + elem.id, $('#' + elem.id).val(), $('#' + elem.id).attr("tipoval"), true);

                if (valInput)
                    $('#error_' + elem.id).addClass(classError);
                else
                    $('#error_' + elem.id).removeClass(classError);
            }
            else {
                $('#' + elem.id).removeClass('input_valido');
                $('#' + elem.id).removeClass('input_invalido');
                $('#error_' + elem.id).addClass(classError);
            }
            break;
        case 'CP':
            //txtCPKeyup(elem);

            if ($('#' + elem.id).val() !== '') {
                if (elem.id == "txt_p_gmm_con_cp")
                    valInput = GeneralValidar_Inputs('#' + elem.id, cpCorrecto_PolGMM, $('#' + elem.id).attr("tipoval"), true);
                else if (elem.id == "txt_p_gmm_tit_cp")
                    valInput = GeneralValidar_Inputs('#' + elem.id, cpCorrecto_PolGMM_Tit, $('#' + elem.id).attr("tipoval"), true);
                else if (elem.id == "txt_dt_dic_fis_cp")
                    valInput = GeneralValidar_Inputs('#' + elem.id, cpCorrecto_Fiscal, $('#' + elem.id).attr("tipoval"), true);
                else
                    valInput = GeneralValidar_Inputs('#' + elem.id, cpCorrecto, $('#' + elem.id).attr("tipoval"), true);

                if (valInput)
                    $('#error_' + elem.id).addClass(classError);
                else
                    $('#error_' + elem.id).removeClass(classError);
            }
            else {
                $('#' + elem.id).removeClass('input_valido');
                $('#' + elem.id).removeClass('input_invalido');
                $('#error_' + elem.id).addClass(classError);
            }
            break;
    }
}

/**
 * Funcion general para marcar error al perder focus el input
 * @param {any} elem input elemento
 */
function valInputFocus_hide(elem) {
    var valInput;
    switch ($(elem).attr("tipoval")) {
        case 'Nombre':
        case 'RazonSocial':
        case 'Texto':
        case 'Telefono':
        case 'Email_Confirmacion':
        case 'Email':
        case 'Email_Contacto':
        case 'Email_Solicitud_Vida_Insignia':
        case 'Monto':
        case 'MontoVida':
        case 'MontoAhorro':
        case 'MontoEducacion':
        case 'EdadAhorro':
        case 'EdadEducacion':
        case 'EdadEducacionHijo':
        case 'Edad':
        case 'EdadVida':
        case 'EdadAtlasGMM':
        case 'EdadAxaGMM':
        case 'EdadBxmasGMM':
        case 'EdadGNPGMM':
        case 'Edad_Auto':
        case 'Vencimiento':
        case 'TiempoExpe':
        case "Fecha":
        case 'FechaAuto':
        case "FechaPoliza":
        case "CURP":
        case "RFC":
        case "RFC_Moral":
        case "Porcentaje":
        case 'Fecha_Doc_Vigencia':
        case 'Fecha_Doc':
        case 'NombrePago':
        case 'Tarjeta':
        case 'Tarjeta_Insignia':
        case 'VencimientoPago':
        case 'Cod_Seg':
        case 'identificacion':
        case 'serie':
        case 'nci':
        case 'Dia_Cobro':
        case 'FechaValorFactura':
            if ($('#' + elem.id).val() !== '') {
                valInput = GeneralValidar_Inputs('#' + elem.id, $('#' + elem.id).val(), $('#' + elem.id).attr("tipoval"), true);

                if (elem.id !== 'txt_dt_dic_numint' && elem.id !== 'txt_cont_facebook' && elem.id !== 'txt_cont_twitter') {
                    if (valInput) {
                        var valCorreosIguales;
                        if (elem.id === 'txt_cont_correo_conf') {
                            valCorreosIguales = GeneralValidar_Inputs('#txt_cont_correo_conf', '#txt_cont_correo', 'Iguales', true);

                            if (!valCorreosIguales) {
                                $('#error_' + elem.id).text('* Los correos no son iguales');
                                $('#error_' + elem.id).removeClass('input_hide');
                            }
                            else {
                                $('#error_' + elem.id).addClass('input_hide');
                            }
                        }
                        else if (elem.id === 'txtConfirmPassword') {
                            valCorreosIguales = GeneralValidar_Inputs('#txtConfirmPassword', '#txtPassword', 'Iguales', true);

                            if (!valCorreosIguales) {
                                $('#error_' + elem.id).text('* Las contraseñas no son iguales');
                                $('#error_' + elem.id).removeClass('input_hide');
                            }
                            else {
                                $('#error_' + elem.id).addClass('input_hide');
                            }
                        }
                        else {
                            $('#error_' + elem.id).addClass('input_hide');
                        }
                    }
                    else {
                        if (elem.id === 'txt_cont_correo_conf')
                            $('#error_' + elem.id).text('* Correo incorrecto');
                        $('#error_' + elem.id).removeClass('input_hide');
                    }
                }
            }
            else {
                $('#' + elem.id).removeClass('input_valido');
                $('#' + elem.id).removeClass('input_invalido');
                $('#error_' + elem.id).addClass('input_hide');
            }
            break;
        case 'Lista':
        case 'ListaHoras':
        case 'ListaEstatus':
            if ($('#' + elem.id).val() !== 'null') {
                valInput = GeneralValidar_Inputs('#' + elem.id, $('#' + elem.id).val(), $('#' + elem.id).attr("tipoval"), true);

                if (valInput)
                    $('#error_' + elem.id).addClass('input_hide');
                else
                    $('#error_' + elem.id).removeClass('input_hide');
            }
            else {
                $('#' + elem.id).removeClass('input_valido');
                $('#' + elem.id).removeClass('input_invalido');
                $('#error_' + elem.id).addClass('input_hide');
            }
            break;
        case 'CP':
            //txtCPKeyup(elem);

            if ($('#' + elem.id).val() !== '') {
                valInput = GeneralValidar_Inputs('#' + elem.id, cpCorrecto, $('#' + elem.id).attr("tipoval"), true);

                if (valInput)
                    $('#error_' + elem.id).addClass('input_hide');
                else
                    $('#error_' + elem.id).removeClass('input_hide');
            }
            else {
                $('#' + elem.id).removeClass('input_valido');
                $('#' + elem.id).removeClass('input_invalido');
                $('#error_' + elem.id).addClass('input_hide');
            }
            break;
    }
}

/**
 * Funcion general para marcar error al perder focus el input
 * @param {any} elem input elemento
 */
function valInputFocus_visible(elem) {
    var valInput;
    switch ($(elem).attr("tipoval")) {
        case 'Nombre':
        case 'RazonSocial':
        case 'Texto':
        case 'Telefono':
        case 'Email_Confirmacion':
        case 'Email':
        case 'Email_Contacto':
        case 'Email_Solicitud_Vida_Insignia':
        case 'Monto':
        case 'MontoVida':
        case 'MontoAhorro':
        case 'MontoEducacion':
        case 'EdadAhorro':
        case 'EdadEducacion':
        case 'EdadEducacionHijo':
        case 'Edad':
        case 'EdadVida':
        case 'EdadAtlasGMM':
        case 'EdadAxaGMM':
        case 'EdadBxmasGMM':
        case 'EdadGNPGMM':
        case 'Edad_Auto':
        case 'Vencimiento':
        case 'TiempoExpe':
        case "Fecha":
        case 'FechaAuto':
        case "FechaPoliza":
        case "CURP":
        case "RFC":
        case "RFC_Moral":
        case "Porcentaje":
        case 'Fecha_Doc_Vigencia':
        case 'Fecha_Doc':
        case 'NombrePago':
        case 'Tarjeta':
        case 'Tarjeta_Insignia':
        case 'VencimientoPago':
        case 'Cod_Seg':
        case 'identificacion':
        case 'serie':
        case 'nci':
        case 'Dia_Cobro':
        case 'FechaValorFactura':
            if ($('#' + elem.id).val() !== '') {
                valInput = GeneralValidar_Inputs('#' + elem.id, $('#' + elem.id).val(), $('#' + elem.id).attr("tipoval"), true);

                if (elem.id !== 'txt_dt_dic_numint' && elem.id !== 'txt_cont_facebook' && elem.id !== 'txt_cont_twitter') {
                    if (valInput) {
                        var valCorreosIguales;
                        if (elem.id === 'txt_cont_correo_conf') {
                            valCorreosIguales = GeneralValidar_Inputs('#txt_cont_correo_conf', '#txt_cont_correo', 'Iguales', true);

                            if (!valCorreosIguales) {
                                $('#error_' + elem.id).text('* Los correos no son iguales');
                                $('#error_' + elem.id).removeClass('input_visible');
                            }
                            else {
                                $('#error_' + elem.id).addClass('input_visible');
                            }
                        }
                        else if (elem.id === 'txtConfirmPassword') {
                            valCorreosIguales = GeneralValidar_Inputs('#txtConfirmPassword', '#txtPassword', 'Iguales', true);

                            if (!valCorreosIguales) {
                                $('#error_' + elem.id).text('* Las contraseñas no son iguales');
                                $('#error_' + elem.id).removeClass('input_visible');
                            }
                            else {
                                $('#error_' + elem.id).addClass('input_visible');
                            }
                        }
                        else {
                            $('#error_' + elem.id).addClass('input_visible');
                        }
                    }
                    else {
                        if (elem.id === 'txt_cont_correo_conf')
                            $('#error_' + elem.id).text('* Correo incorrecto');
                        $('#error_' + elem.id).removeClass('input_visible');
                    }
                }
            }
            else {
                $('#' + elem.id).removeClass('input_valido');
                $('#' + elem.id).removeClass('input_invalido');
                $('#error_' + elem.id).addClass('input_visible');
            }
            break;
        case 'Lista':
        case 'ListaHoras':
        case 'ListaEstatus':
            if ($('#' + elem.id).val() !== 'null') {
                valInput = GeneralValidar_Inputs('#' + elem.id, $('#' + elem.id).val(), $('#' + elem.id).attr("tipoval"), true);

                if (valInput)
                    $('#error_' + elem.id).addClass('input_visible');
                else
                    $('#error_' + elem.id).removeClass('input_visible');
            }
            else {
                $('#' + elem.id).removeClass('input_valido');
                $('#' + elem.id).removeClass('input_invalido');
                $('#error_' + elem.id).addClass('input_visible');
            }
            break;
        case 'CP':
            //txtCPKeyup(elem);

            if ($('#' + elem.id).val() !== '') {
                valInput = GeneralValidar_Inputs('#' + elem.id, cpCorrecto, $('#' + elem.id).attr("tipoval"), true);

                if (valInput)
                    $('#error_' + elem.id).addClass('input_visible');
                else
                    $('#error_' + elem.id).removeClass('input_visible');
            }
            else {
                $('#' + elem.id).removeClass('input_valido');
                $('#' + elem.id).removeClass('input_invalido');
                $('#error_' + elem.id).addClass('input_visible');
            }
            break;
    }
}


//Descargar_documentos
function download_unica(nombre, url) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    var link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', nombre);
    //link.click();
    link.dispatchEvent(evt);
}

function descargar_pop_up() {
    download_unica($('#pop_up_descargar_liga_nombre').text(), $('#pop_up_descargar_liga').text());
}

/**Consultar registro de correo */
function ExisteRegistroCorreo() {
    var oParam = {
        "ID_USUARIO": $("#postUsuarioId").val()
    }

    var oParam2 = "{ 'ID_USUARIO': '" + USUARIO_ID + "'}";

    $.ajax({
        type: "POST",
        url: '/Generic/ObtieneAccesosEnvioCorreos',
        data: oParam2,
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        cache: false,
        success: function (r) {
            if (r.success) {
                AccesoEnviarCorreos = true;
            }
            else {
                AccesoEnviarCorreos = false;
            }
        },
        error: function (xhr) {
            AccesoEnviarCorreos = false;
            console.log("Error ObtieneAccesosEnvioCorreos " + xhr.message);
        }
    });
}