/* =========================================================
   DELHI CONCIERGE — STABLE RUNTIME
   fixes:
   - modal recolor on theme change
   - duplicate navigation
   - flicker
   - multiple listeners
   ========================================================= */

(function () {

  /* =========================================================
     PAGE TRANSITIONS (single system only)
     ========================================================= */

  document.addEventListener("click", function (e) {

    const link = e.target.closest("a");
    if (!link) return;

    // ignore anchors & external links
    if (link.target === "_blank") return;
    if (link.href.startsWith("mailto:")) return;
    if (link.href.startsWith("tel:")) return;

    const url = new URL(link.href, location.origin);
    if (url.origin !== location.origin) return;
    if (url.hash) return;

    const current = location.pathname === "/" ? "/index.html" : location.pathname;
    const target = url.pathname === "/" ? "/index.html" : url.pathname;

    if (current === target) {
      e.preventDefault();
      return;
    }

    e.preventDefault();

    document.body.classList.add("page-leave");

    setTimeout(() => {
      window.location.href = target;
    }, 180);
  });


  /* =========================================================
     MOBILE MENU
     ========================================================= */

  window.toggleMenu = function () {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  };

  document.querySelectorAll("#mobileMenu a").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("mobileMenu");
      if (menu) menu.classList.remove("active");
    });
  });


  /* =========================================================
     THEME TOGGLE (SAFE WITH MODAL)
     ========================================================= */

  const toggleBtn = document.getElementById("themeToggle");

  if (toggleBtn) {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      toggleBtn.textContent = "☀️";
    } else {
      toggleBtn.textContent = "🌙";
    }

    toggleBtn.addEventListener("click", () => {

      /* IMPORTANT PART:
         temporarily disable blur repaint while theme changes */

      const modalOpen = document.body.classList.contains("modal-open");

      if (modalOpen) {
        document.body.classList.add("theme-switching");
      }

      document.body.classList.toggle("dark");

      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      toggleBtn.textContent = isDark ? "☀️" : "🌙";

      // allow repaint after theme applied
      if (modalOpen) {
        setTimeout(() => {
          document.body.classList.remove("theme-switching");
        }, 120);
      }

    });
  }

  /* ================= CONTACT FORM (FIREBASE LEADS) ================= */

  document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");
    if (!form) return;

    const status = document.getElementById("formStatus");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        status.textContent = "Please fill all fields.";
        return;
      }

      // show sending state
      status.textContent = "Sending… please wait";

      try {

        await firebase.firestore().collection("leads").add({
          name: name,
          email: email,
          message: message,
          pageUrl: window.location.href,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        status.textContent = "";
        form.reset();

        /* show popup */
        document.body.classList.add("show-success");

        /* auto close after 6s */
        setTimeout(() => {
          document.body.classList.remove("show-success");
        }, 5000);

      } catch (err) {
        console.error(err);
        status.textContent = "Could not send. Please message on WhatsApp instead.";
      }

    });

  });


  /* =========================================================
     WHATSAPP CLICK TRACKING
     ========================================================= */

  const whatsappBtn = document.querySelector(".whatsapp");

  if (whatsappBtn && typeof db !== "undefined") {
    whatsappBtn.addEventListener("click", async () => {
      try {
        await db.collection("events").add({
          type: "whatsapp_click",
          page: location.href,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      } catch (e) {
        console.warn("WhatsApp tracking failed");
      }
    });
  }

})();

/* close success popup */

const successClose = document.getElementById("successClose");

successClose?.addEventListener("click", () => {
  document.body.classList.remove("show-success");
});