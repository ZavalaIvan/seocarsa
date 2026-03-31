let doc = document;

let urlWhatsapp = '';

$(document).ready(function () {
    let pathname = window.location.pathname;
    let segments = pathname.split('/');
    let lastSegment = segments[segments.length - 1];
    let skandiaSegment = segments[segments.length - 2];
    let vidaAhorroSegment = segments[segments.length - 3];

    if (skandiaSegment == 'skandia') {
        urlWhatsapp = 'https://api.whatsapp.com/send?phone=5214461437348&text=Hola,%20solicito%20información%20sobre%20los%20planes%20de%20ahorro%20Skandia.';
    } else if (vidaAhorroSegment == 'seguros-de-vida'){
        urlWhatsapp = 'https://api.whatsapp.com/send?phone=5214461437348&text=Hola,%20solicito%20información%20sobre%20los%seguros%20de%vida.';
    } else if (skandiaSegment == 'seguros-de-auto') {
    urlWhatsapp = 'https://api.whatsapp.com/send?phone=5214461437348&text=Hola,%20solicito%20información%20sobre%20los%seguros%20de%auto.';//preguntar si es el mismo numero
    }
    else {
        urlWhatsapp = 'https://api.whatsapp.com/send?phone=5214461437348&text=Hola,%20solicito%20informaci%C3%B3n%20sobre%20los%20planes%20de%20ahorro%20Allianz.';
    }

    doc.getElementById('btn-chat').addEventListener('click', function (element) {
        element.preventDefault();
        window.tidioChatApi.show();
        window.tidioChatApi.open();
        let texto; 
        vidaAhorroSegment == 'seguros-de-vida' ? texto = "Hola, solicito información sobre los planes de vida." : texto = "Hola, solicito información sobre los planes de ahorro.";
        tidioChatApi.messageFromVisitor(`${texto}`);
        
    });

    doc.getElementById('btn-whats').addEventListener('click', function (element) {
        element.preventDefault();
        window.open(`${urlWhatsapp}`, '_blank');
    });
});
 