$(function () {
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 50) {
            $('.navbar-default').removeClass('backColorTransparent');
        }
        else {
            $('.navbar-default').addClass('backColorTransparent');
        }
    });

    $('.a_whatsapp').click(function () {
        let googleUrl = urlCanonica.charAt(urlCanonica.length - 1) === '/' ? urlCanonica : `${urlCanonica}/`;
        SetGoogleAnalytics(`${googleUrl}cta-wapp`);
    });
    $('.a_mail').click(() => {
        let googleUrl = urlCanonica.charAt(urlCanonica.length - 1) === '/' ? urlCanonica : `${urlCanonica}/`;
        SetGoogleAnalytics(`${googleUrl}cta-tel`);
    });
});