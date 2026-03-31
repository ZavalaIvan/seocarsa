const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  const url = window.location.pathname.split("/").pop();
  const menu = d.querySelectorAll(".menu-flotante ul li");
  let faqMainContainer, faqMainContainerTop, containerMenuFlotante, menFlotante;

  if (url === 'faq') {
    faqMainContainer = document.getElementById('faq-main-container');
    faqMainContainerTop = faqMainContainer.offsetTop;
    containerMenuFlotante = document.querySelector('.container-menu-flotante');
    menFlotante = document.querySelector('.menu-flotante');
  } else {
    faqMainContainer = document.getElementById('pasosContratacion-main-container');
    faqMainContainerTop = faqMainContainer.offsetTop;
    containerMenuFlotante = document.querySelector('.container-menu-flotante');
    menFlotante = document.querySelector('.menu-flotante');
  }

  menu.forEach((item) => {
    item.addEventListener("click", (e) => {
      menu.forEach((i) => i.classList.remove("active"));
      e.currentTarget.classList.add("active");
    });
  });

  window.addEventListener('scroll', function() {
    if (window.scrollY >= 354) {
      containerMenuFlotante.style.top = '0rem';
      menFlotante.style.top = '6rem';
    } else {
      containerMenuFlotante.style.top = '-6rem';
    }
  });


  $('details').on('click', function () {
    if ($(this).prop('open')) {
        $(this).find('i').css('transform', 'rotate(0deg)');
    } else {
        $(this).find('i').css('transform', 'rotate(-180deg)');
    }
});
});