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