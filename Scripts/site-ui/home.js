let pasoProceso = 1;
let divNuestroProceso = 0;

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initLogoMarquee() {
    const container = document.querySelector(".customer-logos");
    if (!container || container.dataset.enhanced === "true") {
      return;
    }

    const items = Array.from(container.children);
    if (!items.length) {
      return;
    }

    const styleId = "customer-logos-marquee-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .customer-logos {
          overflow: hidden;
          width: 100%;
          padding-block: 0.5rem;
        }

        .customer-logos-track {
          display: flex;
          align-items: center;
          width: max-content;
          gap: 1.75rem;
          will-change: transform;
          animation: customer-logos-scroll 28s linear infinite;
        }

        .customer-logos-track:hover {
          animation-play-state: paused;
        }

        .customer-logos-track > * {
          flex: 0 0 clamp(96px, 10vw, 140px);
        }

        .customer-logos-track img {
          margin-inline: auto;
        }

        @keyframes customer-logos-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (max-width: 768px) {
          .customer-logos-track {
            gap: 1rem;
            animation-duration: 22s;
          }

          .customer-logos-track > * {
            flex-basis: clamp(88px, 28vw, 116px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .customer-logos-track {
            animation: none;
            transform: none;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const track = document.createElement("div");
    track.className = "customer-logos-track";

    items.forEach(function (item) {
      track.appendChild(item);
    });

    items.forEach(function (item) {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });

    container.textContent = "";
    container.appendChild(track);
    container.dataset.enhanced = "true";
  }

  function scrollSuave(buttonSelector, targetSelector, offsetExtra = 0) {
    const buttons = document.querySelectorAll(buttonSelector);
    const target = document.querySelector(targetSelector);

    if (!buttons.length || !target) {
      return;
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        const targetTop = target.getBoundingClientRect().top + window.scrollY - offsetExtra;

        window.scrollTo({
          top: targetTop,
          behavior: reduceMotion ? "auto" : "smooth",
        });
      });
    });
  }

  function initProcesoHover() {
    const pasos = [1, 2, 3, 4].map(function (n) {
      return document.querySelector(".proceso-paso" + n);
    }).filter(Boolean);

    if (!pasos.length) {
      return;
    }

    function limpiarProceso() {
      document.querySelectorAll(".proceso-punto, .proceso-paso, .barras").forEach(function (element) {
        element.classList.remove("active", "inactive");
      });
    }

    function activarPaso(step) {
      limpiarProceso();

      const punto = document.querySelector(".punto" + step + " .proceso-punto");
      const paso = document.querySelector(".proceso-paso" + step);
      const barra = document.querySelector(".barras" + step);
      const barraAnterior = step > 1 ? document.querySelector(".barras" + (step - 1)) : null;

      if (punto) {
        punto.classList.add("active");
      }

      if (paso) {
        paso.classList.add("active");
      }

      if (barra) {
        barra.classList.add("active");
      }

      if (barraAnterior) {
        barraAnterior.classList.add("inactive");
      }
    }

    pasos.forEach(function (paso, index) {
      paso.addEventListener("mouseenter", function () {
        activarPaso(index + 1);
      });

      paso.addEventListener("mouseleave", limpiarProceso);
    });
  }

  function initHomeUi() {
    initLogoMarquee();
    scrollSuave("#btn-productos, #btn-mob-productos", "#nuestros-productos", 100);
    scrollSuave("#btn-AccordeonAhorro", "#accordionFlushExample", 70);
    scrollSuave("#btn-AccordeonVida", "#accordionFlushExample", 14);
    scrollSuave("#btn-AccordeonSalud", "#accordionFlushExample", -40);
    scrollSuave("#btn-AccordeonHogar", "#accordionFlushExample", -95);
    scrollSuave("#btn-AccordeonAuto", "#accordionFlushExample", -150);
    initProcesoHover();

    const proceso = document.getElementById("nuestros-proceso");
    if (proceso) {
      divNuestroProceso = proceso.getBoundingClientRect().top + window.scrollY;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHomeUi);
  } else {
    initHomeUi();
  }
})();
