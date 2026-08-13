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

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const nombre = String(data.get("nombre") || "").trim();
    const apellido = String(data.get("apellido") || "").trim();
    const email = String(data.get("email") || "").trim();
    const telefono = String(data.get("telefono") || "").trim();
    const asunto = String(data.get("asunto") || "").trim();
    const mensaje = String(data.get("mensaje") || "").trim();

    if (!nombre || !apellido || !email) {
      if (note) note.textContent = "Por favor, completa los campos obligatorios.";
      return;
    }

    const subject = encodeURIComponent(asunto || `Consulta de ${nombre} ${apellido}`);
    const body = encodeURIComponent(
      `Nombre: ${nombre} ${apellido}\nEmail: ${email}\nTeléfono: ${telefono}\n\n${mensaje}`
    );

    window.location.href = `mailto:info.fatima.studio@gmail.com?subject=${subject}&body=${body}`;
    if (note) {
      note.textContent = "Abriendo tu correo para enviar el mensaje…";
    }
    form.reset();
  });
}
