const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-menu-toggle]");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const galleryItems = document.querySelectorAll(".gallery-item");
if (galleryItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  galleryItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
    observer.observe(item);
  });
}

const form = document.querySelector("[data-contact-form]");
const note = document.querySelector("[data-form-note]");
const submitBtn = document.querySelector("[data-submit-btn]");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (note) note.textContent = "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando…";
    }

    const data = new FormData(form);
    const nombre = String(data.get("nombre") || "").trim();
    const apellido = String(data.get("apellido") || "").trim();
    const asunto = String(data.get("asunto") || "").trim();

    data.set(
      "_subject",
      asunto || `Consulta de ${nombre} ${apellido}`.trim() || "Nueva consulta desde la web"
    );

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        if (note) note.textContent = "Mensaje enviado. ¡Gracias! Te responderé pronto.";
      } else {
        const result = await response.json().catch(() => null);
        const message =
          result?.errors?.map((e) => e.message).join(" ") ||
          "No se pudo enviar el mensaje. Inténtalo de nuevo.";
        if (note) note.textContent = message;
      }
    } catch {
      if (note) note.textContent = "Error de conexión. Inténtalo de nuevo.";
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar";
      }
    }
  });
}
