/* ========================================
   ESC PLAN - ESCAPE PLAN THEME JS
   ======================================== */

/* -------------------------------
   Mobile menu toggle
-------------------------------- */
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const icon = document.getElementById("menuIcon");

  if (!menu || !icon) return;

  menu.classList.toggle("active");

  if (menu.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
}

/* -------------------------------
   Scroll to phone input
-------------------------------- */
function scrollToPhoneInput() {
  const phoneInput = document.getElementById("phone");
  if (!phoneInput) return;

  phoneInput.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  setTimeout(() => {
    phoneInput.focus();
  }, 400);
}

/* -------------------------------
   Placeholder actions
-------------------------------- */
function searchProduct() {
  alert("Search feature coming soon!");
}

function openUser() {
  alert("User profile feature coming soon!");
}

function openCart() {
  alert("Cart feature coming soon!");
}

/* -------------------------------
   Delivery / Pincode dropdown
-------------------------------- */
function togglePincodeBar() {
  const deliveryBar = document.querySelector(".delivery-bar");
  if (!deliveryBar) return;

  deliveryBar.classList.toggle("active");
}

/* -------------------------------
   DOM Ready
-------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  /* Pre-join notify form validation */
  const form = document.getElementById("prejoinForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const phoneField = document.getElementById("phone");
      const emailField = document.getElementById("email");
      const msg = document.getElementById("form-message");

      if (!phoneField || !emailField || !msg) return;

      const phone = phoneField.value.trim();
      const email = emailField.value.trim();

      msg.textContent = "";
      msg.style.color = "#ffb3b3";

      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        msg.textContent = "Please enter a valid 10 digit phone number.";
        return;
      }

      if (email !== "") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          msg.textContent = "Please enter a valid email address.";
          return;
        }
      }

      msg.style.color = "#b6ffb6";
      msg.textContent = "Successfully registered. We will notify you!";
      form.reset();
    });
  }

  /* Pincode input: allow only numbers, max 6 digits */
  const pincodeInput = document.getElementById("pincodeInput");

  if (pincodeInput) {
    pincodeInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "").slice(0, 6);
    });
  }

  /* Close delivery dropdown on outside click */
  document.addEventListener("click", function (e) {
    const deliveryBar = document.querySelector(".delivery-bar");
    const deliveryInner = document.querySelector(".delivery-bar-inner");
    const deliveryDropdown = document.querySelector(".delivery-dropdown");

    if (!deliveryBar || !deliveryInner || !deliveryDropdown) return;

    const clickedInsideBar = deliveryInner.contains(e.target);
    const clickedInsideDropdown = deliveryDropdown.contains(e.target);

    if (!clickedInsideBar && !clickedInsideDropdown) {
      deliveryBar.classList.remove("active");
    }
  });
});

// Image Grid
(function () {
  "use strict";

  function initL3Switcher() {
    var mainImg = document.getElementById("l3MainImg");
    var thumbsContainer = document.getElementById("l3Thumbs");

    if (!mainImg || !thumbsContainer) return;

    var thumbs = thumbsContainer.querySelectorAll(".l3-thumb");
    if (thumbs.length < 2) return;

    var switching = false;

    function switchImage(thumb) {
      if (switching || thumb.classList.contains("active")) return;

      var newSrc = thumb.getAttribute("data-full");
      var newAlt = thumb.getAttribute("data-alt") || "";

      if (!newSrc) return;

      switching = true;

      // Fade out main image
      mainImg.classList.add("is-switching");

      setTimeout(function () {
        mainImg.src = newSrc;
        mainImg.alt = newAlt;

        // Update active thumb
        thumbs.forEach(function (t) {
          t.classList.remove("active");
        });
        thumb.classList.add("active");

        // Wait for new image to paint, then fade in
        mainImg.onload = function () {
          mainImg.classList.remove("is-switching");
          mainImg.onload = null;
          switching = false;
        };

        // Fallback: if onload doesn't fire (cached image)
        setTimeout(function () {
          mainImg.classList.remove("is-switching");
          switching = false;
        }, 420);
      }, 300);
    }

    thumbs.forEach(function (thumb) {
      // Mouse click
      thumb.addEventListener("click", function () {
        switchImage(thumb);
      });

      // Keyboard: Enter / Space
      thumb.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          switchImage(thumb);
        }
      });
    });
  }

  // Init after DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initL3Switcher);
  } else {
    initL3Switcher();
  }

  // Re-init if Shopify theme editor reloads the section
  document.addEventListener("shopify:section:load", function (e) {
    if (e.target && e.target.querySelector("#rareImageGrid")) {
      initL3Switcher();
    }
  });
})();


// Footer
(function () {
  function initAccordion() {
    // Only activate on mobile widths
    var isMobile = window.matchMedia("(max-width: 768px)").matches;
    var accordions = document.querySelectorAll("[data-accordion]");

    accordions.forEach(function (col) {
      var trigger = col.querySelector("[data-accordion-trigger]");
      if (!trigger) return;

      // Remove any pre-existing listener to avoid duplicates on resize
      trigger.removeEventListener("click", trigger._accordionHandler);

      if (isMobile) {
        trigger._accordionHandler = function () {
          var isOpen = col.classList.contains("footer-col--open");
          // Close all open columns (optional — comment out for multi-open behaviour)
          accordions.forEach(function (c) {
            c.classList.remove("footer-col--open");
          });
          if (!isOpen) {
            col.classList.add("footer-col--open");
          }
        };
        trigger.addEventListener("click", trigger._accordionHandler);
        trigger.style.cursor = "pointer";
      } else {
        // On desktop: ensure columns are always "open" (body visible)
        col.classList.remove("footer-col--open");
        trigger.style.cursor = "default";
        var body = col.querySelector("[data-accordion-body]");
        if (body) body.style.maxHeight = "";
      }
    });
  }

  // Run on load
  document.addEventListener("DOMContentLoaded", initAccordion);

  // Re-run when viewport resizes across the 768px breakpoint
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initAccordion, 150);
  });
})();
