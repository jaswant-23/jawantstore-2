/* ========================================
   ESC PLAN - ESCAPE PLAN THEME JS
   ======================================== */

// Mobile menu toggle
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

// Scroll to phone input
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

// Search
function searchProduct() {
  alert("Search feature coming soon!");
}

// User profile
function openUser() {
  alert("User profile feature coming soon!");
}

// Cart
function openCart() {
  alert("Cart feature coming soon!");
}

// Pre-join notify form validation
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("prejoinForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const msg = document.getElementById("form-message");

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
});
