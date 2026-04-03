let producto = 'null';

let urlCalendly = '',
    urlWhatsapp = '';

$(document).ready(function () {
    $('#select-producto').change(function () {
        producto = $(this).val();

        let waLink = "https://api.whatsapp.com/send?phone=5219997402368";
        urlCalendly = "tel:+529991299740";

        $('.card-calendly').hide();

        switch (producto) {
            case 'Ahorro':
                $('.card-calendly').show();
                waLink += "&text=Hola,%20solicito%20informacion%20sobre%20los%20planes%20de%20ahorro%20Allianz.";
                break;
            case 'Vida':
                $('.card-calendly').show();
                waLink += "&text=Hola,%20solicito%20informacion%20sobre%20los%20seguros%20de%20vida.";
                break;
            case 'Salud':
                waLink += "&text=Hola,%20solicito%20informacion%20sobre%20los%20seguros%20de%20gastos%20medicos%20mayores.";
                break;
            case 'Hogar':
                waLink += "&text=Hola,%20solicito%20informacion%20sobre%20los%20seguros%20de%20hogar.";
                break;
            case 'Auto':
                $('.card-calendly').show();
                waLink += "&text=Hola,%20solicito%20informacion%20sobre%20los%20seguros%20de%20auto.";
                break;
            case 'Educacion':
                $('.card-calendly').show();
                waLink += "&text=Hola,%20solicito%20informacion%20sobre%20los%20planes%20de%20educacion%20y%20ahorro.";
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
                waLink += "Hola, solicito informacion sobre los planes de ahorro.";
                break;
            case 'Vida':
                waLink += "Hola, solicito informacion sobre los seguros de vida.";
                break;
            case 'Salud':
                waLink += "Hola, solicito informacion sobre los seguros de gastos medicos mayores.";
                break;
            case 'Hogar':
                waLink += "Hola, solicito informacion sobre los seguros de hogar.";
                break;
            case 'Auto':
                waLink += "Hola, solicito informacion sobre los seguros de auto.";
                break;
            case 'Educacion':
                waLink += "Hola, solicito informacion sobre los planes de educacion y ahorro.";
                break;
        }

        tidioChatApi.messageFromVisitor(waLink);
    });
});
