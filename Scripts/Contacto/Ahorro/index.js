let doc = document;

let urlWhatsapp = '';

$(document).ready(function () {
    function abrirChatTidio(texto) {
        if (!window.tidioChatApi || typeof window.tidioChatApi.show !== 'function' || typeof window.tidioChatApi.open !== 'function') {
            return;
        }

        window.tidioChatApi.show();
        window.tidioChatApi.open();

        if (texto && typeof window.tidioChatApi.messageFromVisitor === 'function') {
            window.tidioChatApi.messageFromVisitor(texto);
        }
    }

    let pathname = window.location.pathname;
    let segments = pathname.split('/');
    let skandiaSegment = segments[segments.length - 2];
    let vidaAhorroSegment = segments[segments.length - 3];

    if (skandiaSegment == 'skandia') {
        urlWhatsapp = 'https://api.whatsapp.com/send?phone=5214461437348&text=Hola,%20solicito%20informacion%20sobre%20los%20planes%20de%20ahorro%20Skandia.';
    } else if (vidaAhorroSegment == 'seguros-de-vida') {
        urlWhatsapp = 'https://api.whatsapp.com/send?phone=5214461437348&text=Hola,%20solicito%20informacion%20sobre%20los%20seguros%20de%20vida.';
    } else if (skandiaSegment == 'seguros-de-auto') {
        urlWhatsapp = 'https://api.whatsapp.com/send?phone=5214461437348&text=Hola,%20solicito%20informacion%20sobre%20los%20seguros%20de%20auto.';
    } else {
        urlWhatsapp = 'https://api.whatsapp.com/send?phone=5214461437348&text=Hola,%20solicito%20informacion%20sobre%20los%20planes%20de%20ahorro%20Allianz.';
    }

    let btnChat = doc.getElementById('btn-chat');
    if (btnChat) {
        btnChat.addEventListener('click', function (element) {
            element.preventDefault();
            let texto = vidaAhorroSegment == 'seguros-de-vida'
                ? "Hola, solicito informacion sobre los planes de vida."
                : "Hola, solicito informacion sobre los planes de ahorro.";
            abrirChatTidio(texto);
        });
    }

    let btnWhats = doc.getElementById('btn-whats');
    if (btnWhats) {
        btnWhats.addEventListener('click', function (element) {
            element.preventDefault();
            window.open(urlWhatsapp, '_blank');
        });
    }
});
