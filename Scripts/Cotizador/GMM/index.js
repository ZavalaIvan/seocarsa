var USUARIO_ID = 0, AGENTE_ID = 0;

var ListaAsegurados = [],
    ListaParentescos = [],
    ListaAseguradoras = [];

var cpCorrecto = false,
    incluidaBxmas = false;

var PerfilCotizacion = {
    CotizacionId: 0,
    Contacto: {
        Id: 0,
        Edad: 0,
        Nombre: "",
        Apellidos: "",
        Genero: "",
        Correo: "",
        Telefono: "",
    },
    CodigoPostal: 0,
    Aseguradoras: [],
    Asegurados: []
};

var isGNP = false;

$(function () {
    iniciarQueryString();

    isGNP = $('#postCanonical').val().includes('gnp') ? true : false;

    if (isGNP)
        urlCanonica = 'seguros-de-gastos-medicos-mayores/gnp/';
    else
        urlCanonica = 'seguros-de-gastos-medicos-mayores/';

    //Datos del Usuario en Sesion
    Sesion.UsuarioId = ($('#postUsuarioId').val() != '') ? parseInt($('#postUsuarioId').val()) : 0;
    Sesion.GrupoId = ($('#postGrupoId').val() != '') ? parseInt($('#postGrupoId').val()) : 0;
    Sesion.JerarquiaId = ($('#postAgenteId').val() != '') ? parseInt($('#postAgenteId').val()) : 0;
    Sesion.Nombre = $('#postNombre').val();
    Sesion.Correo = $('#postCorreo').val();
    Sesion.Telefono = $('#postTelefono').val();
    Sesion.Foto = $('#postFoto_Perfil').val();
    Sesion.PromotoriaId = ($('#postPromotoriaId').val() != '') ? parseInt($('#postPromotoriaId').val()) : 0;

    GetJSONUsuarioID('/GMM/ObtenerParentesco', {}, Sesion.UsuarioId, function (data) {
        ListaParentescos = data.data;

        if (isGNP) {
            ListaAsegurados.push(
                {
                    Id: 0,
                    Activo: true,
                }
            );

            let lista = getListaParentesco(ListaParentescos, true);
            $('#txt_parentesco0').empty().html(lista);

        }
    }, 'ObtenerParentesco', '');

    if (!isGNP) {
        GetJSONUsuarioID('/GMM/ObtenerAseguradorasGMM', { "PromotoriaId": Sesion.PromotoriaId }, Sesion.UsuarioId, function (data) {
            $.each(data.data, function (e, g) {
                PerfilCotizacion.Aseguradoras.push({
                    Id: g.Id,
                    AnteriorId: g.AnteriorId
                });
            });
            $('#myModalActualizando').modal('hide');
        }, 'ObtenerAseguradorasGMM', '');

        $('#btn_ir_home, #btn_atras').click(() => {
            windowLocationHref(`https://${window.location.host}/seguros-de-gastos-medicos-mayores`);
        });

        $('#btnCotizarGMM').click(() => {
            if (valForm_dtCliente(true)) {
                let googleUrl = urlCanonica.charAt(urlCanonica.length - 1) === '/' ? urlCanonica : `${urlCanonica}/`;
                SetGoogleAnalytics(`${googleUrl}cta-cotizar`);

                $('#myModalActualizando').modal('show');

                let Genero = 'H';
                if ($('#btn_genero_m').hasClass('activo'))
                    Genero = 'M';

                let Asegurados = [];
                Asegurados.push(
                    {
                        ParentescoId: (Genero == 'H') ? 1 : 2,
                        Edad: $('#txt_edad').val(),
                        Sexo: (Genero == 'H') ? 2 : 1,
                    }
                );

                $('#postContactoId').val(PerfilCotizacion.Contacto.Id);
                $('#postNombre_c').val(PerfilCotizacion.Contacto.Nombre);
                $("#postApellidoPa_c").val(PerfilCotizacion.Contacto.Apellidos);
                $("#postApellidoMa_c").val('');
                $("#postCorreo_c").val(PerfilCotizacion.Contacto.Correo);
                $("#postCelular_c").val(PerfilCotizacion.Contacto.Telefono);
                $("#postGenero_c").val(Genero);
                $("#postCP_c").val(PerfilCotizacion.CodigoPostal);
                $("#postAseguradora").val(JSON.stringify(PerfilCotizacion.Aseguradoras));
                $("#postAsegurados").val(JSON.stringify(Asegurados));
                $("#frmResultados").submit();
            }
        });
    }
    else {
        PerfilCotizacion.Aseguradoras.push({
            Id: 7,
            AnteriorId: 26
        });

        $('#btnCotizarGMM').click(() => {
            if (valForm_dtClienteGNP(true)) {
                $('#myModalActualizando').modal('show');

                let Asegurados = [];
                ListaAsegurados.map(a => {
                    if (a.Activo) {
                        let inputParentesco = `#txt_parentesco${a.Id}`,
                            inputEdad = `#txt_edad${a.Id}`;

                        Asegurados.push(
                            {
                                ParentescoId: $(inputParentesco).val(),
                                Edad: $(inputEdad).val(),
                                Sexo: $(inputParentesco).find('option:selected').attr('genero'),
                                FechaAntiguedad: ''
                            }
                        );
                    }
                });

                $('#postContactoId').val(PerfilCotizacion.Contacto.Id);
                $('#postNombre_c').val(PerfilCotizacion.Contacto.Nombre);
                $("#postApellidoPa_c").val(PerfilCotizacion.Contacto.Apellidos);
                $("#postApellidoMa_c").val('');
                $("#postCorreo_c").val(PerfilCotizacion.Contacto.Correo);
                $("#postCelular_c").val(PerfilCotizacion.Contacto.Telefono);
                $("#postGenero_c").val('');
                $("#postCP_c").val(PerfilCotizacion.CodigoPostal);
                $("#postAseguradora").val(JSON.stringify(PerfilCotizacion.Aseguradoras));
                $("#postAsegurados").val(JSON.stringify(Asegurados));
                $("#frmResultados").submit();
            }
        });
    }

    $('#btnAgregar').click(() => {
        addAsegurado();

        valForm_dtClienteGNP();
    });

    pintarDatosContacto();
});


/**
 * Pintar Los datos retornados de un json del Contacto
 * @param {any} data json
 */
function pintarDatosContacto() {
    $('#error_txt_genero, #error_txt_edad').addClass('input_visible');

    //Datos Personales
    var $MulticotizadorSaas_nombre = getCookie('$MulticotizadorSaas_nombre');
    if ($MulticotizadorSaas_nombre != '') {
        PerfilCotizacion.Contacto.Nombre = $MulticotizadorSaas_nombre;
    }

    var $MulticotizadorSaas_apellidos = getCookie('$MulticotizadorSaas_apellidos');
    if ($MulticotizadorSaas_apellidos != '') {
        PerfilCotizacion.Contacto.Apellidos = $MulticotizadorSaas_apellidos;
    }

    var $MulticotizadorSaas_correo = getCookie('$MulticotizadorSaas_correo');
    if ($MulticotizadorSaas_correo != '') {
        PerfilCotizacion.Contacto.Correo = $MulticotizadorSaas_correo;
    }

    var $MulticotizadorSaas_celular = getCookie('$MulticotizadorSaas_celular');
    if ($MulticotizadorSaas_celular != '') {
        PerfilCotizacion.Contacto.Telefono = $MulticotizadorSaas_celular;
    }

    var $MulticotizadorSaas_cp = getCookie('$MulticotizadorSaas_cp');
    if ($MulticotizadorSaas_cp != '') {
        PerfilCotizacion.CodigoPostal = $MulticotizadorSaas_cp;
    }

    var $MulticotizadorSaas_edad = getCookie('$MulticotizadorSaas_edad');
    if ($MulticotizadorSaas_edad != '') {
        PerfilCotizacion.Contacto.Edad = $MulticotizadorSaas_edad;
        $('#txt_edad').val($MulticotizadorSaas_edad);
    }
    else {
        $('#txt_edad').val('');
    }

    var $MulticotizadorSaas_genero = getCookie('$MulticotizadorSaas_genero');
    if ($MulticotizadorSaas_genero != "") {
        if ($MulticotizadorSaas_genero == "H") {
            $("#btn_genero_h").click();
        } else {
            $("#btn_genero_m").click();
        }
    } else {
        $("#btn_genero_h, #btn_genero_m").removeClass("activo");
    }

    valForm_dtCliente();
}

function btnGenero_dtCliente(pthis, genero) {
    $("#btn_genero_h, #btn_genero_m").removeClass("activo");
    $("#btn_genero_" + genero).addClass("activo");

    valForm_dtCliente();
}

function valForm_dtCliente(InputObligatorio = false) {
    $('#error_txt_genero, #error_txt_edad').addClass('input_visible');
    var resultado;

    var valGenero = false,
        valEdad = GeneralValidar_Inputs('#txt_edad', $('#txt_edad').val(), 'EdadAtlasGMM', InputObligatorio);

    if ($("#btn_genero_h").hasClass("activo") ||
        $("#btn_genero_m").hasClass("activo"))
        valGenero = true;

    resultado = valEdad && valGenero;

    if (!resultado) {
        if (InputObligatorio) {
            if (!valEdad)
                $('#error_txt_edad').text('* Su edad debe ser menor a 65 años')
                    .removeClass('input_visible');
            if (!valGenero)
                $('#error_txt_genero').text('* selecciona el genero')
                    .removeClass('input_visible');
        }
    }

    return resultado;
}

function getListaParentesco(data, titular) {
    let lista = `<option value="null" selected>Selecciona persona</option>`;
    data.map(p => {
        if (titular && (p.Id == 1 || p.Id == 2)) {
            switch (p.Id) {
                case 1:
                    lista += `<option value="${p.Id}" genero="${p.SexoId}">Mi (soy mujer)</option>`;
                    break;
                case 2:
                    lista += `<option value="${p.Id}" genero="${p.SexoId}">Mi (soy hombre)</option>`;
                    break;
            }
        }
        else if (!titular && (p.Id != 1 && p.Id != 2) && (p.Id < 9 || p.Id > 28)) {
            switch (p.Id) {
                case 3:
                    lista += `<option value="${p.Id}" genero="${p.SexoId}">esposa</option>`;
                    break;
                case 4:
                    lista += `<option value="${p.Id}" genero="${p.SexoId}">esposo</option>`;
                    break;
                case 29:
                    lista += `<option value="${p.Id}" genero="${p.SexoId}">mujer</option>`;
                    break;
                case 30:
                    lista += `<option value="${p.Id}" genero="${p.SexoId}">hombre</option>`;
                    break;
                default:
                    lista += `<option value="${p.Id}" genero="${p.SexoId}">${p.Descripcion.toLowerCase()}</option>`;
                    break;
            }
        }
    });
    return lista;
}

function addAsegurado() {
    let index = ListaAsegurados.length;
    let asegurado = `
        <div id="div-asegurado${index}" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 p0">
            <div class="div-parentesco">
                <select id="txt_parentesco${index}" class="form-control" tipoval="Lista" onfocusout="valInputFocus(this, 'input_visible');">
                ${getListaParentesco(ListaParentescos, false)}
                </select>
                <p id="error_txt_parentesco${index}" class="title_error input_visible">* Dato requerido</p>
            </div>
            <div class="div-edad">
                <input id="txt_edad${index}" class="form-control" type="number" maxlength="2" tipoval="EdadGNPGMM" onkeyup="valForm_dtClienteGNP();" oninput="maxLengthCheck(this);" onfocusout="valForm_dtClienteGNP(); valInputFocus(this, 'input_visible');" placeholder="Edad" />
                <p id="error_txt_edad${index}" class="title_error input_visible">* Dato requerido</p>
            </div>
            <button class="btn-quitar" onclick="removeAsegurado(${index});">
                <span class="material-icons">highlight_off</span>
            </button>
        </div>
    `;
    $('.divformulario').append(asegurado);

    ListaAsegurados.push(
        {
            Id: index,
            Activo: true,
        }
    );

    $(`#txt_parentesco${index}`).change(function () {
        valForm_dtClienteGNP();
    });
}

function removeAsegurado(Id) {
    $(`#div-asegurado${Id}`).remove();

    let index = ListaAsegurados.findIndex(a => a.Id == Id);
    ListaAsegurados[index].Activo = false;

    valForm_dtClienteGNP();
}

function valForm_dtClienteGNP(InputObligatorio = false) {
    var resultado = true;

    ListaAsegurados.map((a, i) => {
        if (a.Activo) {
            let inputParentesco = `#txt_parentesco${a.Id}`,
                inputEdad = `#txt_edad${a.Id}`;

            let valParentesco = GeneralValidar_Inputs(inputParentesco, $(inputParentesco).val(), 'Lista', InputObligatorio),
                valEdad = GeneralValidar_Inputs(inputEdad, $(inputEdad).val(), 'EdadGNPGMM', InputObligatorio);

            if (InputObligatorio) {
                if (!valEdad)
                    $(`#error_txt_edad${a.Id}`).text('*Debe ser menor a 65 años')
                        .removeClass('input_visible');
                if (!valParentesco)
                    $(`#error_txt_parentesco${a.Id}`).text('*Selecciona el Parentesco')
                        .removeClass('input_visible');
            }

            if (resultado)
                resultado = valEdad && valParentesco;

            if (i == 0) {
                if (valEdad && valParentesco)
                    $('.cotiza_ahora_gnp .btnAgregar').removeAttr('disabled')
                        .addClass('activo');
                else
                    $('.cotiza_ahora_gnp .btnAgregar').attr('disabled', 'disabled')
                        .removeClass('activo');
            }
        }
    });


    if (resultado)
        $('.cotiza_ahora_gnp .btnAgregar').removeAttr('disabled')
            .addClass('activo');
    else
        $('.cotiza_ahora_gnp .btnAgregar').attr('disabled', 'disabled')
            .removeClass('activo');

    return resultado;
}