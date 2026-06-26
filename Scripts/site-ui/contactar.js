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

    $('#select-producto').change(function () {
        producto = $(this).val();

        let waLink = "https://api.whatsapp.com/send?phone=529992968025";
        urlCalendly = "tel:+529991299740";

        $('.card-calendly').hide();

        switch (producto) {
            case 'Ahorro':
                $('.card-calendly').show();
                waLink += "&text=Hola%2C%20solicito%20informaci%C3%B3n%20sobre%20los%20planes%20de%20ahorro%20Allianz.";
                break;
            case 'Vida':
                $('.card-calendly').show();
                waLink += "&text=Hola%2C%20solicito%20informaci%C3%B3n%20sobre%20los%20seguros%20de%20vida.";
                break;
            case 'Salud':
                waLink += "&text=Hola%2C%20solicito%20informaci%C3%B3n%20sobre%20los%20seguros%20de%20gastos%20m%C3%A9dicos%20mayores.";
                break;
            case 'Hogar':
                waLink += "&text=Hola%2C%20solicito%20informaci%C3%B3n%20sobre%20los%20seguros%20de%20hogar.";
                break;
            case 'Auto':
                $('.card-calendly').show();
                waLink += "&text=Hola%2C%20solicito%20informaci%C3%B3n%20sobre%20los%20seguros%20de%20auto.";
                break;
            case 'Educacion':
                $('.card-calendly').show();
                waLink += "&text=Hola%2C%20solicito%20informaci%C3%B3n%20sobre%20los%20planes%20de%20educaci%C3%B3n%20y%20ahorro.";
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
