let producto = 'null';

let urlCalendly = '',
    urlWhatsapp = '';

$(document).ready(function () {
    $('#select-producto').change(function () {
        producto = $(this).val();

        // 👉 Nuevo número de WhatsApp
        let waLink = "https://api.whatsapp.com/send?phone=5219997402368";

        // 👉 Calendly se convierte en llamada telefónica
        urlCalendly = "tel:+529991299740";

        $('.card-calendly').hide();
        switch (producto) {
            case 'Ahorro':
                $('.card-calendly').show();
                waLink += "&text=Hola,%20solicito%20informaci%C3%B3n%20sobre%20los%20planes%20de%20ahorro%20Allianz.";
                break;
            case 'Vida':
                $('.card-calendly').show();
                waLink += "&text=Hola,%20solicito%20informaci%C3%B3n%20sobre%20los%20seguros%20de%20vida.";
                break;
            case 'Salud':
                waLink += "&text=Hola,%20solicito%20informaci%C3%B3n%20sobre%20los%20seguros%20de%20gastos%20m%C3%A9dicos%20mayores.";
                break;
            case 'Hogar':
                waLink += "&text=Hola,%20solicito%20informaci%C3%B3n%20sobre%20los%20seguros%20de%20hogar.";
                break;
            case 'Auto':
                $('.card-calendly').show();
                waLink += "&text=Hola,%20solicito%20informaci%C3%B3n%20sobre%20los%20seguros%20de%20auto.";
                break;
            case 'Educacion':
                $('.card-calendly').show();
                waLink += "&text=Hola,%20solicito%20informaci%C3%B3n%20respecto%20los%20seguros%20que%20ofrece%20Alige.";
                break;
            case 'Mutuus':
                waLink += "&text=Hola,%20solicito%20informaci%C3%B3n%20sobre%20la%20membres%C3%ADa%20de%20salud%20de%20Muutus.";
                break;
        }

        if (producto == 'null') {
            $('.asesoria').addClass('disabled');
            $('.card button').attr('disabled', 'disabled');

            $('#btn-whatsapp').attr('href', '#');
            $('#btn-calendly').attr('href', '#');
        }
        else {
            urlWhatsapp = waLink;
            $('.asesoria').removeClass('disabled');
            $('.card button').removeAttr('disabled', 'disabled');

            // 👉 Actualizamos los botones
            $('#btn-whatsapp').attr('href', urlWhatsapp);
            $('#btn-calendly').attr('href', urlCalendly);
        }
    });

    $('#btn-chat').click(function () {
        window.tidioChatApi.show();
        window.tidioChatApi.open();

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
                waLink += "Hola, solicito información respecto los seguros que ofrece Alige.";
                break;
            case 'Mutuus':
                waLink += "Hola, solicito información sobre la membresía de salud de Muutus.";
                break;
        }

        tidioChatApi.messageFromVisitor(waLink);
    });
});
