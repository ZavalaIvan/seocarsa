(function () {
  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
      return;
    }

    callback();
  }

  function syncCollapseToggle(toggle, panel) {
    var expanded = panel.classList.contains("show");
    toggle.classList.toggle("collapsed", !expanded);
    toggle.setAttribute("aria-expanded", String(expanded));
  }

  function closeNavbarDropdowns(navbar, exceptToggle) {
    if (!navbar) {
      return;
    }

    navbar.querySelectorAll(".dropdown-toggle.show").forEach(function (toggle) {
      if (toggle === exceptToggle) {
        return;
      }

      toggle.classList.remove("show");
      toggle.setAttribute("aria-expanded", "false");
    });

    navbar.querySelectorAll(".dropdown-menu.show").forEach(function (menu) {
      if (exceptToggle && exceptToggle.nextElementSibling === menu) {
        return;
      }

      menu.classList.remove("show");
    });
  }

  function initNavbar() {
    var navbar = document.querySelector(".navbar");
    var toggle = document.querySelector('.navbar .navbar-toggler[data-bs-target="#navbarNav"]');
    var panel = document.getElementById("navbarNav");

    if (!navbar || !toggle || !panel) {
      return;
    }

    function isDesktop() {
      return window.matchMedia("(min-width: 992px)").matches;
    }

    function setPanelState(expanded) {
      panel.classList.toggle("show", expanded);
      syncCollapseToggle(toggle, panel);

      if (!expanded) {
        closeNavbarDropdowns(navbar);
      }
    }

    syncCollapseToggle(toggle, panel);

    toggle.addEventListener("click", function (event) {
      if (isDesktop()) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      setPanelState(!panel.classList.contains("show"));
    });

    navbar.querySelectorAll(".nav-item.dropdown > .dropdown-toggle").forEach(function (dropdownToggle) {
      var menu = dropdownToggle.nextElementSibling;
      if (!menu || !menu.classList.contains("dropdown-menu")) {
        return;
      }

      dropdownToggle.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        var shouldOpen = !dropdownToggle.classList.contains("show");
        closeNavbarDropdowns(navbar, shouldOpen ? dropdownToggle : null);
        dropdownToggle.classList.toggle("show", shouldOpen);
        dropdownToggle.setAttribute("aria-expanded", String(shouldOpen));
        menu.classList.toggle("show", shouldOpen);
      });
    });

    panel.querySelectorAll(".dropdown-item, .nav-link:not(.dropdown-toggle), .btn-element-contact").forEach(function (link) {
      link.addEventListener("click", function () {
        if (isDesktop()) {
          closeNavbarDropdowns(navbar);
          return;
        }

        setPanelState(false);
      });
    });

    document.addEventListener("click", function (event) {
      if (!navbar.contains(event.target)) {
        closeNavbarDropdowns(navbar);

        if (!isDesktop()) {
          setPanelState(false);
        }
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeNavbarDropdowns(navbar);

        if (!isDesktop()) {
          setPanelState(false);
        }
      }
    });

    window.addEventListener("resize", function () {
      closeNavbarDropdowns(navbar);

      if (isDesktop()) {
        panel.classList.remove("show");
      }

      syncCollapseToggle(toggle, panel);
    }, { passive: true });
  }

  function activateTab(button, tabButtons) {
    var targetSelector = button.getAttribute("data-bs-target");
    var targetPane = targetSelector ? document.querySelector(targetSelector) : null;

    if (!targetPane) {
      return;
    }

    tabButtons.forEach(function (tabButton) {
      var paneSelector = tabButton.getAttribute("data-bs-target");
      var pane = paneSelector ? document.querySelector(paneSelector) : null;
      var isActive = tabButton === button;

      tabButton.classList.toggle("active", isActive);
      tabButton.setAttribute("aria-selected", String(isActive));
      tabButton.setAttribute("tabindex", isActive ? "0" : "-1");

      if (pane) {
        pane.classList.toggle("show", isActive);
        pane.classList.toggle("active", isActive);
      }
    });
  }

  function initTabs() {
    var tabButtons = Array.prototype.slice.call(document.querySelectorAll('#pills-tab [data-bs-toggle="pill"]'));

    if (!tabButtons.length) {
      return;
    }

    tabButtons.forEach(function (button, index) {
      var isActive = button.classList.contains("active");
      button.setAttribute("aria-selected", String(isActive));
      button.setAttribute("tabindex", isActive ? "0" : "-1");

      button.addEventListener("click", function (event) {
        event.preventDefault();
        activateTab(button, tabButtons);
      });

      button.addEventListener("keydown", function (event) {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
          return;
        }

        event.preventDefault();

        var nextIndex = index;
        if (event.key === "ArrowRight") {
          nextIndex = (index + 1) % tabButtons.length;
        } else if (event.key === "ArrowLeft") {
          nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabButtons.length - 1;
        }

        tabButtons[nextIndex].focus();
        activateTab(tabButtons[nextIndex], tabButtons);
      });
    });
  }

  function setAccordionItemState(button, panel, expanded) {
    button.classList.toggle("collapsed", !expanded);
    button.setAttribute("aria-expanded", String(expanded));
    panel.classList.toggle("show", expanded);
  }

  function initAccordion() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll('.accordion .accordion-button[data-bs-target]'));

    if (!buttons.length) {
      return;
    }

    buttons.forEach(function (button) {
      var targetSelector = button.getAttribute("data-bs-target");
      var panel = targetSelector ? document.querySelector(targetSelector) : null;

      if (!panel) {
        return;
      }

      setAccordionItemState(button, panel, panel.classList.contains("show"));

      button.addEventListener("click", function (event) {
        event.preventDefault();

        var shouldOpen = !panel.classList.contains("show");
        var parentSelector = panel.getAttribute("data-bs-parent");
        var siblingButtons = parentSelector
          ? Array.prototype.slice.call(document.querySelectorAll(parentSelector + ' .accordion-button[data-bs-target]'))
          : [button];

        siblingButtons.forEach(function (otherButton) {
          var otherSelector = otherButton.getAttribute("data-bs-target");
          var otherPanel = otherSelector ? document.querySelector(otherSelector) : null;

          if (!otherPanel) {
            return;
          }

          setAccordionItemState(otherButton, otherPanel, false);
        });

        setAccordionItemState(button, panel, shouldOpen);
      });
    });
  }

  function initDeferredElfsight() {
    var widget = document.querySelector("[data-elfsight-app-lazy]");

    if (!widget) {
      return;
    }

    var loaded = false;
    var fallbackTimer;
    var interactionEvents = ["pointerdown", "keydown", "touchstart"];

    function cleanup() {
      interactionEvents.forEach(function (eventName) {
        window.removeEventListener(eventName, loadScript, passiveOnce);
      });

      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
      }
    }

    function injectScript() {
      var script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }

    function loadScript() {
      if (loaded) {
        return;
      }

      loaded = true;
      cleanup();
      injectScript();
    }

    var passiveOnce = { passive: true, once: true };

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            observer.disconnect();
            loadScript();
          }
        });
      }, { rootMargin: "300px 0px" });

      observer.observe(widget);
    }

    interactionEvents.forEach(function (eventName) {
      window.addEventListener(eventName, loadScript, passiveOnce);
    });

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(loadScript, { timeout: 6000 });
      return;
    }

    fallbackTimer = window.setTimeout(loadScript, 6000);
  }

  ready(function () {
    initNavbar();
    initTabs();
    initAccordion();
    initDeferredElfsight();
  });
})();
