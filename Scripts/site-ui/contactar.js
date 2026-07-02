let producto = 'null';

let urlCalendly = '',
    urlWhatsapp = '';

$(document).ready(function () {
    function abrirChatTidio(mensaje) {
        if (!window.tidioChatApi || typeof window.tidioChatApi.show !== 'function' || typeof window.tidioChatApi.open !== 'function') {
            return;
        }

        window.tidioChatApi.show();
        window.tidioChatApi.open();

        if (mensaje && typeof window.tidioChatApi.messageFromVisitor === 'function') {
            window.tidioChatApi.messageFromVisitor(mensaje);
        }
    }

    function crearMensajeWhatsapp(servicio) {
        return [
            "Hola, quiero información sobre " + servicio + ".",
            "Vengo desde: Página web",
            "Página: Contacto",
            "Botón: Botón de contacto"
        ].join("\n");
    }

    $('#select-producto').change(function () {
        producto = $(this).val();

        let waLink = "https://api.whatsapp.com/send?phone=529992968025";
        urlCalendly = "tel:+529991299740";

        $('.card-calendly').hide();

        switch (producto) {
            case 'Ahorro':
                $('.card-calendly').show();
                waLink += "&text=" + encodeURIComponent(crearMensajeWhatsapp("Ahorro / Retiro"));
                break;
            case 'Vida':
                $('.card-calendly').show();
                waLink += "&text=" + encodeURIComponent(crearMensajeWhatsapp("Seguro de vida"));
                break;
            case 'Salud':
                waLink += "&text=" + encodeURIComponent(crearMensajeWhatsapp("Seguro de salud"));
                break;
            case 'Hogar':
                waLink += "&text=" + encodeURIComponent(crearMensajeWhatsapp("Seguro de hogar"));
                break;
            case 'Auto':
                $('.card-calendly').show();
                waLink += "&text=" + encodeURIComponent(crearMensajeWhatsapp("Seguro de auto"));
                break;
            case 'Educacion':
                $('.card-calendly').show();
                waLink += "&text=" + encodeURIComponent(crearMensajeWhatsapp("Ahorro / Retiro"));
                break;
            default:
                waLink += "&text=" + encodeURIComponent(crearMensajeWhatsapp("General"));
                break;
        }

        if (producto == 'null') {
            $('.asesoria').addClass('disabled');
            $('.card button').attr('disabled', 'disabled');

            $('#btn-whatsapp').attr('href', '#');
            $('#btn-calendly').attr('href', '#');
        } else {
            urlWhatsapp = waLink;
            $('.asesoria').removeClass('disabled');
            $('.card button').removeAttr('disabled', 'disabled');

            $('#btn-whatsapp').attr('href', urlWhatsapp);
            $('#btn-calendly').attr('href', urlCalendly);
        }
    });

    $('#btn-chat').click(function () {
        let waLink = '';

        switch (producto) {
            case 'Ahorro':
                waLink += "Hola, solicito información sobre los planes de ahorro.";
                break;
            case 'Vida':
                waLink += "Hola, solicito información sobre los seguros de vida.";
                break;
            case 'Salud':
                waLink += "Hola, solicito información sobre los seguros de gastos médicos mayores.";
                break;
            case 'Hogar':
                waLink += "Hola, solicito información sobre los seguros de hogar.";
                break;
            case 'Auto':
                waLink += "Hola, solicito información sobre los seguros de auto.";
                break;
            case 'Educacion':
                waLink += "Hola, solicito información sobre los planes de educación y ahorro.";
                break;
        }

        abrirChatTidio(waLink);
    });
});
