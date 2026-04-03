/*let d = document;*/

var PerfilCotizacion = {
    marca: "",
    marcaId: 0,
    modelo: "",
    modeloId: 0,
    anio: 0,
    aseguradoras: [],
}

var tagVehiculos = [];

var LigaContacto = 'https://crm.alige.com.mx/nuevo_contacto/',
    LigaHome = 'https://crm.alige.com.mx/Usuario/Home/';

$(function () {
    iniciarQueryString();

    urlCanonica = 'seguro-de-auto/';

    //Datos del Usuario en Sesion
    Sesion.UsuarioId = ($('#postUsuarioId').val() != '') ? parseInt($('#postUsuarioId').val()) : 0;
    Sesion.GrupoId = ($('#postGrupoId').val() != '') ? parseInt($('#postGrupoId').val()) : 0;
    Sesion.JerarquiaId = ($('#postAgenteId').val() != '') ? parseInt($('#postAgenteId').val()) : 0;
    Sesion.Nombre = $('#postNombre').val();
    Sesion.Correo = $('#postCorreo').val();
    Sesion.Telefono = $('#postTelefono').val();
    Sesion.Foto = $('#postFoto_Perfil').val();
    Sesion.PromotoriaId = ($('#postPromotoriaId').val() != '') ? parseInt($('#postPromotoriaId').val()) : 0;

    $('#txt_anioAuto').click(function () {
        $('#error_perfilador').addClass('input_hidden');
        $('#containerKebab_anioAuto').show().addClass('activo');
    });
    
    if (_Catalogo.Respuesta.Catalogo.Modelos != undefined) {

        if (tagVehiculos.length == 0) {
            
            _Catalogo.Respuesta.Catalogo.Modelos.map((m, i) => {
                //if ($.inArray(name, wishlist[i]) > -1) { /* do something, no se si es por los 'label' y 'value' que no funciona este*/ }
                tagVehiculos.push({
                    'label': m.Marca + ' ' + m.Modelo,
                    'value': m.MarcaId + '-' + m.ModeloId
                });               
            });

        }
      
        $("#txt_vehiculo").autocomplete({
            source: tagVehiculos,
            minLength: 2,
            focus: function (event, ui) {
                $(this).val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $(this).val(ui.item.label);
                return false;
            }
        }).on('keypress', function (e) {
            AutoComplete();
        }).on('keydown', function (event) {
            AutoComplete();
        }).on('focusout', function (event) {
            AutoComplete();
        }).on('autocompleteselect', function (e, ui) {
            $('#txt_anioAuto').removeAttr('disabled', 'disabled');

            AutoCompleteAnios(ui.item.value);
           
        });
    }

    $('#btnCotizar').click(function () {
        $('#error_perfilador').addClass('input_hidden');

        let valMarca = (PerfilCotizacion.marca != '') ? true : false;
        let valAnio = (PerfilCotizacion.anio != 0) ? true : false;

        if (valMarca && valAnio) {
            $('#myModalActualizando').modal('show');

            $("#postPlan").val("Plan_AM");
            $("#postPlanId").val("4");

            $("#postMarca").val(PerfilCotizacion.marca);
            $("#postMarcaId").val(PerfilCotizacion.marcaId);
            $("#postAno").val(PerfilCotizacion.anio);
            $("#postModelo").val(PerfilCotizacion.modelo);
            $("#postModeloId").val(PerfilCotizacion.modeloId);

            $("#postAseguradora").val(JSON.stringify(PerfilCotizacion.aseguradoras));

            $("#frmResultados").submit();
        }
        else {
            if (!valMarca)
                $('#error_perfilador').html('* Selecciona la marca de tu vehiculo');
            else if (!valAnio)
                $('#error_perfilador').html('* Selecciona el año de tu vehiculo');
            $('#error_perfilador').removeClass('input_hidden');
        }
    });


    //$("#txt_anioAuto").click(function () {
    //    $("#error_perfilador").addClass("input_visible");
    //    $("#containerKebab_anioAuto").show().addClass("activo");
    //    if ($('#containerKebab_anioAuto').css('display') == 'block') {
    //        $("#containerAnioAuto").next('.material-icons').html("keyboard_arrow_up")
    //    }
    //    else {
    //        $("#containerAnioAuto").next('.material-icons').html("keyboard_arrow_down")
    //    }
    //});


    window.addEventListener("click", (e) => {
        if ($('#containerKebab_anioAuto').hasClass('activo')) {
            if (!document.getElementById('containerAnioAuto').contains(e.target) && !document.getElementById('menuKebab_anioAuto').contains(e.target)) {
                $('#containerKebab_anioAuto').hide();
            }           
        }

        $(".material-icons").css("float", "right")
        $('.material-icons').css("padding-right", "25px")
        if ($('#containerKebab_anioAuto').css('display') == 'block') {
            $(".material-icons").html("keyboard_arrow_up")
        }
        else {
            $(".material-icons").html("keyboard_arrow_down")
        }

        //$("#containerAnioAuto").next('.material-icons').css("float", "right")
        //if ($('#containerKebab_anioAuto').css('display') == 'block') {
        //    $("#containerAnioAuto").next('.material-icons').html("keyboard_arrow_up")
        //}
        //else {
        //    $("#containerAnioAuto").next('.material-icons').html("keyboard_arrow_down")
        //}
    });

    GetJSON('/Autos/Perfilador_ObtenerAseguradoras', {
        UsuarioID: Sesion.UsuarioId
    }, function (data) {
        let PromotoriaId = $('#postPromotoriaId').val();
        let listaAseguradas = [];
        $.each(data.Aseguradoras, function (e, g) {
            /* Por temas legales se quita Axa del Multicotizador Publico solo para promotorias (Saltodigital, AgenteTop, Prolife) */
            if (PromotoriaId == '2' || PromotoriaId == '3' || PromotoriaId == '9')
                listaAseguradas.push(parseInt(g.ID));
            else if (g.ID != 3)
                listaAseguradas.push(parseInt(g.ID));
        });

        PerfilCotizacion.aseguradoras = listaAseguradas.sort(function (a, b) { return a - b });
    }, 'Perfilador_ObtenerAseguradoras', '');
});

function AutoComplete() {
    $('#error_perfilador').addClass('input_hidden');

    if ($("#txt_vehiculo").val() == '') {
        PerfilCotizacion.marca = '';
        PerfilCotizacion.marcaId = 0;
        PerfilCotizacion.modelo = '';
        PerfilCotizacion.modeloId = 0;

        $('#txt_anioAuto').attr('disabled', 'disabled');
    }
}

function AutoCompleteAnios(valor_item) {
    $("#containerKebab_anioAuto .menuKebab").empty();

    var vehiculo = valor_item.split('-');

    var ListaAnios = _Catalogo.Respuesta.Catalogo.Modelos.filter(m => m.MarcaId == vehiculo[0] && m.ModeloId == vehiculo[1]);

    if (ListaAnios[0] != undefined) {
        PerfilCotizacion.marca = ListaAnios[0].Marca;
        PerfilCotizacion.marcaId = parseInt(ListaAnios[0].MarcaId);
        PerfilCotizacion.modelo = ListaAnios[0].Modelo;
        PerfilCotizacion.modeloId = parseInt(ListaAnios[0].ModeloId);

        if (ListaAnios[0].Anios != undefined) {
            let encontreAnio = (ListaAnios[0].Anios.indexOf(PerfilCotizacion.anio) >= 0) ? true : false;

            if (encontreAnio) {
                $('#txt_anioAuto').html(`${PerfilCotizacion.anio} <span class="material-icons">keyboard_arrow_down</span>`);
            }
            else {
                $('#txt_anioAuto').html(`Año <span class="material-icons">keyboard_arrow_down</span>`);
                PerfilCotizacion.anio = 0;
            }
           

            $("#containerKebab_anioAuto .menuKebab").empty();
            let listaKebab = ``;
            ListaAnios[0].Anios
                .sort(function (a, b) { return b - a })
                .map((m, i) => {
                    listaKebab += `
                            <div class="opcionKebab ${(encontreAnio && PerfilCotizacion.anio == m) ? `activo` : ``}" valor="${m}">
                                <span>${m}</span>
                            </div>
                        `;
                });
            $("#containerKebab_anioAuto .menuKebab").html(listaKebab);

            $('#containerKebab_anioAuto .opcionKebab').click(function () {
                $('#containerKebab_anioAuto').hide().removeClass('activo');
                $('#containerKebab_anioAuto .opcionKebab').removeClass('activo');
                $(this).addClass('activo');

                PerfilCotizacion.anio = parseInt($(this).attr('valor'));
                $('#txt_anioAuto').html(`${PerfilCotizacion.anio} <span class="material-icons">keyboard_arrow_down</span>`);
            });
        }
    }
    else {
        PerfilCotizacion.marca = '';
        PerfilCotizacion.marcaId = 0;
        PerfilCotizacion.modelo = '';
        PerfilCotizacion.modeloId = 0;

        $('#txt_anioAuto').attr('disabled', 'disabled');
    }
    $(".material-icons").css("float", "right")
 /*   $(".material-icons").html("keyboard_arrow_up")*/
    
}
