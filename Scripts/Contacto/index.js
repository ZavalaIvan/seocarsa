let d = document;
let producto, productoTxt, agradecimiento, embudo, creadoMediante;
$(document).ready(function () {

    //Datos del Usuario en Sesion
    Sesion.UsuarioId = ($('#postUsuarioId').val() != '') ? parseInt($('#postUsuarioId').val()) : 0;
    Sesion.GrupoId = ($('#postGrupoId').val() != '') ? parseInt($('#postGrupoId').val()) : 0;
    Sesion.JerarquiaId = ($('#postAgenteId').val() != '') ? parseInt($('#postAgenteId').val()) : 0;

    $('#btnContactoAahorro').click(function (e) {
        e.preventDefault();
        if (valForm_Contacto()) {
            enviarContacto();
        }
    });

    switch (_Vista) {
        case 'IndexContacto':
            producto = '1'
            agradecimiento = 'agradecimiento'
            break;
        case 'VidaContacto':
            producto = '4'
            agradecimiento = 'seguros-de-vida/allianz/agradecimiento'
            productoTxt = 'VIDA'
            embudo = '2'
            creadoMediante = 'FORMULARIO VIDA'
            break;
        case 'GMMContacto':
            producto = '2'
            agradecimiento = 'seguros-de-gastos-medicos-mayores/agradecimiento'
            productoTxt = 'GMM'
            embudo = '4'
            creadoMediante = 'FORMULARIO GMM'
            break;
        case 'AutoContacto':
            producto = '1'
            agradecimiento = 'seguros-de-auto/agradecimiento'
            productoTxt = 'AUTO'
            embudo = '1'
            creadoMediante = 'FORMULARIO AUTO'
            break;
        case 'EducacionContacto':
            producto = '6'
            agradecimiento = 'seguro-educacional/allianz/agradecimiento'
            productoTxt = 'EDUCACIONAL'
            embudo = '7'
            creadoMediante = 'FORMULARIO EDUCACIONAL'
            break;
        case 'GMMGNPContacto':
            producto = '5'
            agradecimiento = 'seguros-de-gastos-medicos-mayores/gnp/agradecimiento'
            productoTxt = 'GMM GNP'
            embudo = '3'
            creadoMediante = 'FORMULARIO GMM GNP'
            break;
    
        default:
            break;
    }
});


function valForm_Contacto(InputObligatorio = false) {
    $('#error_txtNombre, #error_txtApellido, #error_txt_correo, #error_txtTelefono, #error_txtDudas').addClass('input_visible');

    let resultado;

    let valNombre = GeneralValidar_Inputs('#txtNombre', $('#txtNombre').val(), 'Nombre', InputObligatorio), valApellido = GeneralValidar_Inputs('#txtApellido', $('#txtApellido').val(), 'Nombre', InputObligatorio),
        valCelular = GeneralValidar_Inputs('#txtTelefono', $('#txtTelefono').val(), 'Telefono', InputObligatorio),
        valCorreo = GeneralValidar_Inputs('#txt_correo', $('#txt_correo').val(), 'EmailRegex', InputObligatorio),
        valDuda = true;

    if ($('#txtDudas').val() != '') {
        valApeP = GeneralValidar_Inputs('#txtDudas', $('#txtDudas').val(), 'Texto', InputObligatorio);
    }

    resultado = valNombre && valApellido && valCorreo && valCelular && valDuda;

    if (!resultado) {
        if (!InputObligatorio) {
            if (!valNombre)
                $('#error_txtNombre').removeClass('input_visible');
            if (!valApellido)
                $('#error_txtApellido').removeClass('input_visible');
            if (!valCorreo)
                $('#error_txt_correo').removeClass('input_visible');
            if (!valCelular)
                $('#error_txtTelefono').removeClass('input_visible');
            if (!valDuda)
                $('#error_txtDudas').removeClass('input_visible');
        }
    }

    return resultado;
}



function enviarContacto() {
    $('#myModalActualizando').modal('show');
    let json = {
        ACTUALIZA_PERSONALES_BASICOS: 'SI',
        ID_AFILIACION: Sesion.JerarquiaId,
        NOMBRE: $('#txtNombre').val().trim(),
        APELLIDO_PATERNO: $('#txtApellido').val().trim(),
        APELLIDO_MATERNO: "",
        TELEFONO: $('#txtTelefono').val().trim(),
        CORREO: $('#txt_correo').val().trim(),
        CREADO_MEDIANTE: creadoMediante,
        PRODUCTO: producto,
        EMBUDO: embudo,
    };

    GetJSON(
        "/Generic/CrearModificarContacto", json,
        function (data) {
            var JsonRegistroFormulario = {
                ID_CONTACTO: data.id_contacto,
                ID_AGENTE: Sesion.JerarquiaId,
                NOMBRE: $('#txtNombre').val().trim(),
                CORREO: $('#txt_correo').val().trim(),
                CELULAR: $('#txtTelefono').val().trim(),
                COMENTARIO: $('#txtDudas').val().trim(),
                PRODUCTO: productoTxt
            };

            GetJSON('/Generic/CrearRegistroFormulario', JsonRegistroFormulario, function (data) {
                localStorage.removeItem('api_fbtrace_id');
                localStorage.setItem('$ContactoCorreo', $('#txt_correo').val().trim());
                windowLocationHref(`https://${window.location.host}/${agradecimiento}`);
                $('#txtNombre, #txtApellido, #txtTelefono, #txt_correo, #txtDudas').val('');
            }, 'CrearRegistroFormulario', '');
        },
        "CrearModificarContacto",""
    );
}