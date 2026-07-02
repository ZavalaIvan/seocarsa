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

    function crearMensajeWhatsapp(servicio, pagina) {
        return [
            "Hola, quiero información sobre " + servicio + ".",
            "Vengo desde: Página web",
            "Página: " + pagina,
            "Botón: Botón de contacto"
        ].join("\n");
    }

    let pathname = window.location.pathname;
    let segments = pathname.split('/');
    let skandiaSegment = segments[segments.length - 2];
    let vidaAhorroSegment = segments[segments.length - 3];

    if (skandiaSegment == 'skandia') {
        urlWhatsapp = 'https://api.whatsapp.com/send?phone=529992968025&text=' + encodeURIComponent(crearMensajeWhatsapp('Ahorro / Retiro', 'Plan de ahorro Skandia'));
    } else if (vidaAhorroSegment == 'seguros-de-vida') {
        urlWhatsapp = 'https://api.whatsapp.com/send?phone=529992968025&text=' + encodeURIComponent(crearMensajeWhatsapp('Seguro de vida', 'Seguro de vida'));
    } else if (skandiaSegment == 'seguros-de-auto') {
        urlWhatsapp = 'https://api.whatsapp.com/send?phone=529992968025&text=' + encodeURIComponent(crearMensajeWhatsapp('Seguro de auto', 'Seguro de auto'));
    } else {
        urlWhatsapp = 'https://api.whatsapp.com/send?phone=529992968025&text=' + encodeURIComponent(crearMensajeWhatsapp('Ahorro / Retiro', 'Plan personal de retiro Allianz'));
    }

    let btnChat = doc.getElementById('btn-chat');
    if (btnChat) {
        btnChat.addEventListener('click', function (element) {
            element.preventDefault();
            let texto = vidaAhorroSegment == 'seguros-de-vida'
                ? "Hola, solicito información sobre los planes de vida."
                : "Hola, solicito información sobre los planes de ahorro.";
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
