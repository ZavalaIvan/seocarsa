var USUARIO_ID = 0, AGENTE_ID = 0;

var Genero = '',
    cpCorrecto = false,
    Privacidad = false;

var SITE_BASE_URL = (window.location && window.location.origin && /^https?:/i.test(window.location.origin))
        ? window.location.origin.replace(/\/$/, '')
        : 'https://carsaseguros.mx',
    LigaContacto = SITE_BASE_URL + '/contacto',
    LigaHome = SITE_BASE_URL + '/';

$(function () {

    urlCanonica = urlCanonica + '/';

    //Datos del Usuario en Sesion
    Sesion.UsuarioId = ($('#postUsuarioId').val() != '') ? parseInt($('#postUsuarioId').val()) : 0;
    Sesion.GrupoId = ($('#postGrupoId').val() != '') ? parseInt($('#postGrupoId').val()) : 0;
    Sesion.JerarquiaId = ($('#postAgenteId').val() != '') ? parseInt($('#postAgenteId').val()) : 0;
    Sesion.Nombre = $('#postNombre').val();
    Sesion.Correo = $('#postCorreo').val();
    Sesion.Telefono = $('#postTelefono').val();
    Sesion.Foto = $('#postFoto_Perfil').val();
    Sesion.PromotoriaId = ($('#postPromotoriaId').val() != '') ? parseInt($('#postPromotoriaId').val()) : 0;

    USUARIO_ID = $('#postUsuarioId').val();
    AGENTE_ID = $('#postAgenteId').val();

    //Funcion para detectar cuando se realiza un scroll a la pagina
    let navBar = document.getElementById('navBar');
    window.onscroll = function () {
        if (window.pageYOffset > 0) {
            navBar.classList.add('scrolled');
            
        } else {
            navBar.classList.remove('scrolled');
        }
    };

    $('#check_terminos').change(function () {
        $('#lb_check_terminos').removeClass('container_check_active');
        if ($('[id=check_terminos]').is(':checked')) {
            $('#lb_check_terminos').addClass('container_check_active');
        }
        valForm_Formulario();
    });

    $('#btnCotizar').click(function () {
        if (valForm_Formulario(true)) {
            $('#myModalActualizando').modal('show');
            switch (landing) {
                case 'Hogar':
                    CAPTCHA.VALIDATION("hogar_lead_form");
                    break;
            }
        }
    });

    $('#formulario').find('input, textarea').keyup(function () { valForm_Formulario(); });

    $(".maskTelefonica").keydown(function () { maskLadaTelefonica(this); });
    $(".valInputFocus").focusout(function () { valInputFocus(this, 'input_visible'); });
    $(".focusMinusculas").focusout(function () { General_Minusculas(this); });
    $(".focusPrimeraMayuscula").focusout(function () { General_PrimeraMayuscula(this); });
});

function valForm_Formulario(InputObligatorio = false) {
    $('#error').addClass('input_hidden');
    $('#nombre, #apellido, #correo, #celular, #necesidades').removeClass('input_invalido');

    var resultado = false;

    maskLadaTelefonicaAutollenado('#celular');

    var valNombre = GeneralValidar_Inputs('#nombre', $('#nombre').val(), 'Nombre', InputObligatorio),
        valApellidos = true,
        valCorreo = GeneralValidar_Inputs('#correo', $('#correo').val(), 'Email', InputObligatorio),
        valCelular = GeneralValidar_Inputs('#celular', $('#celular').val(), 'Telefono', InputObligatorio),
        valNecesidades = GeneralValidar_Inputs('#necesidades', $('#necesidades').val(), 'Texto', InputObligatorio),
        valPrivacidad = $('[id=check_terminos]').is(':checked');

    if ($('#apellido').val() != '')
        valApellido = GeneralValidar_Inputs('#apellido', $('#apellido').val(), 'Nombre', InputObligatorio)

    if (valCorreo || valCelular) {
        if (!valCorreo) valCorreo = true;
        if (!valCelular) valCelular = true;

        $('#correo, #celular').removeClass('input_invalido');
    }

    resultado = valNombre && valApellidos && valCorreo && valCelular && valPrivacidad && valNecesidades;

    if (!resultado && InputObligatorio) {
        let msgError = '';

        if (!valNombre)
            msgError = '* Nombre incorrecto <br>';
        else if (!valApellidos)
            msgError = '* Apellido incorrecto <br>';
        else if (!valCorreo || !valCelular) {
            if (!valCorreo)
                msgError += '* Correo incorrecto <br>';
            if (!valCelular)
                msgError += '* Teléfono a 10 dígitos <br>';
        }
        else if (!valNecesidades)
            msgError = '* Escribe un poco sobre tus necesidades<br>';
        else if (!Privacidad)
            msgError = '* Debes aceptar los términos y condiciones.';

        $('#error').removeClass('input_hidden').html(msgError);
    }

    return resultado;
}

function Registrar_Contacto() {
    /*
     * PRODUCTO: 1 Auto, 2 GMM, 3 Hogar, 4 Vida, 5 Ahorro, 6 Educacional, 8 PensionateYa
     * 
     * CREADO_MEDIANTE: 
     * GOAGENTE AUTO
     * GOAGENTE GMM
     * FORMULARIO HOGAR
     * FORMULARIO VIDA
     * FORMULARIO AHORRO
     * FORMULARIO OTROS
     * FORMULARIO CONTACTO
     * 
     * PRODUCTO: 
     * AUTO
     * GMM
     * HOGAR
     * VIDA
     * AHORRO
     * OTROS
     * CONTACTO
     * */
    var valApPaterno = '';
    if ($('#apellido').val() != '')
        valApPaterno = $('#apellido').val().trim();

    let Producto = 0,
        Embudo = 0,
        CreadoMediante = '';
    switch (landing) {
        case 'Vida':
            Producto = 4;
            Embudo = 2,
            CreadoMediante = 'FORMULARIO VIDA';
            break;
        case 'Hogar':
            Producto = 3;
            Embudo = 5,
            CreadoMediante = 'FORMULARIO HOGAR';
            break;
        case 'Ahorro':
            Producto = 5;
            Embudo = 3,
            CreadoMediante = 'FORMULARIO AHORRO';
            break;
    }

    JsonModificarContacto = {
        ACTUALIZA_PERSONALES_BASICOS: 'SI',
        ACTUALIZA_DIRECCION: 'NO',
        ID_AFILIACION: AGENTE_ID,
        NOMBRE: $('#nombre').val().trim(),
        APELLIDO_PATERNO: valApPaterno,
        APELLIDO_MATERNO: '',
        TELEFONO: $('#celular').val().trim(),
        CORREO: $('#correo').val().trim(),
        CREADO_MEDIANTE: CreadoMediante,
        PRODUCTO: Producto,
        EMBUDO: Embudo, 
    };

    GetJSON('/Generic/CrearModificarContacto', JsonModificarContacto, function (data) {
        if (data.status === '200') {
            var ID_CONTACTO = data.id_contacto;
            LigaContacto += ID_CONTACTO;

            var JsonRegistroFormulario = {
                ID_CONTACTO: ID_CONTACTO,
                ID_AGENTE: AGENTE_ID,
                NOMBRE: $('#nombre').val().trim(),
                CORREO: $('#correo').val().trim(),
                CELULAR: $('#celular').val().trim(),
                COMENTARIO: $('#necesidades').val().trim(),
                PRODUCTO: landing.toUpperCase()
            };

            GetJSON('/Generic/CrearRegistroFormulario', JsonRegistroFormulario, function (data) {
                if (data.status === '200') {
                    setTimeout(function () {
                        $('#modalContratacion').modal('show');
                        $('#myModalActualizando').modal('hide');
                    }, 3000);
                }
                else {
                    $('#myModalActualizando').modal('hide');
                }
            }, 'CrearModificarContacto', '');
        }
    }, 'CrearModificarContacto', '');
}

var EnviarEmails = {
    nuevoContacto: () => {
        let AgenteNombre = $('#postAgenteNombre').val().trim().split(' ');

        let ContactoNombre = $('#nombre').val().trim();
        if ($('#apellido').val().trim() !== '')
            ContactoNombre += ' ' + $('#apellido').val().trim();

        let Direccion = '';
        if ($('#postDireccionCorta').val().trim() !== '')
            Direccion = $('#postDireccionCorta').val().trim();
        else
            Direccion = $('#postDireccionExacta').val().trim();

        let Telefono = $('#celular').val(),
            TelefonoSinFormato = '';
        if (Telefono != '') {
            TelefonoSinFormato = ObtenerSoloNumeros(Telefono)
        }

        var oParam = {
            "UsuarioId": USUARIO_ID,
            "AgenteCorreo": $('#postAgenteCorreo').val().trim(),
            "AgenteNombre": AgenteNombre[0],
            "AgenteNombreCompleto": $('#postAgenteNombre').val().trim(),
            "AgenteTelefono": $('#postAgenteTelefono').val().trim(),
            "AgenteDireccion": Direccion,
            "AgenteLogo": $('#postLogoUrl').val().trim(),
            "AgenteFoto": $('#postPerfilUrl').val().trim(),
            "TipoImagen": $('#postImagenOpcion').val().trim(),
            "Encabezado": $('#postEncabezado_Nombre').val().trim(),

            "LinkCrm": LigaHome,
            "LinkNuevoContacto": LigaContacto,
            "ContactoNombre": ContactoNombre,
            "ContactoTelefono": Telefono,
            "ContactoCorreo": $('#correo').val().trim(),
            "ContactoTelefonoSinFormato": TelefonoSinFormato,

            "Formulario": landing.toUpperCase()
        }

        $.ajax({
            type: "POST",
            url: '/Generic/MailNuevoContactoFormulario',
            data: "{ 'pJSON': '" + JSON.stringify(oParam) + "'}",
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            cache: false,
            success: function (r) {
                $('#error').addClass('input_visible');
                $('#nombre, #apellido, #correo, #celular, #necesidades').removeClass('input_invalido');

                $('#nombre, #apellido, #correo, #celular, #necesidades').val('');
                $('#check_terminos').removeAttr('checked');
                $('#lb_check_terminos').removeClass('container_check_active');

                if (r.success) {
                    console.log('Email nuevoContacto enviado');
                }
            },
            error: function (xhr) {
                console.log('Email nuevoContacto no enviado');
            }
        });

        if (esProduccion())
            SendRegistroHubspot();
    }
}

function SendRegistroHubspot() {
    let Fuente = '';
    let pagina = '';
    switch (landing) {
        case 'Vida':
            Fuente = 'Saltodigital Vida';
            pagina = 'Landing Vida';
            break;
        case 'Hogar':
            Fuente = 'Saltodigital Hogar';
            pagina = 'Landing Hogar';
            break;
        case 'Ahorro':
            Fuente = 'Saltodigital Ahorro';
            pagina = 'Landing Ahorro';
            break;
    }

    var oParam = {
        "txtNombre": $('#nombre').val().trim(),
        "txtApellido": $('#apellido').val().trim(),
        "txtCorreo": $('#correo').val().trim(),
        "txtTelefono": $('#celular').val().trim(),
        "txtContratar": '',
        "txtDetalle": `Landing ${landing}
                       Necesidades: ${$('#necesidades').val()}`,
        "txtLiga": '',
        "txtFuente": Fuente,
        "txtPagina": pagina,
    }

    var oParam2 = "{ 'pJSON': '" + JSON.stringify(oParam) + "'}";

    $.ajax({
        type: "POST",
        url: '/Prod/EnviarHubSpot',
        data: oParam2,
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        cache: false,
        success: function (r) {
            if (r.success) {
                console.log('Send Hubspot');
            }
        },
        error: function (xhr) {
            console.log('No Send Hubspot');
        }
    });
}

function captchaValid() {
    let googleUrl = '';
    switch (landing) {
        case 'Vida':
        case 'Hogar':
        case 'Ahorro':
            googleUrl = urlCanonica.charAt(urlCanonica.length - 1) === '/' ? urlCanonica : `${urlCanonica}/`;
            SetGoogleAnalytics(`${googleUrl}cta-cotizar`);
            break;
    }
    Registrar_Contacto();
}

function captchaBot() {
    $('#myModalActualizando').modal('hide');
}
