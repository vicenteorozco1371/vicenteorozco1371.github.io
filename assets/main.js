/* ============================================================
   Portafolio — datos de proyectos y render
   Para agregar un proyecto: copia un objeto del array PROJECTS.
   ============================================================ */

const PROJECTS = [
  {
    name: "GAPS Travel",
    url: "https://www.gapstravel.com/",
    category: "Web corporativa",
    description:
      "Agencia de viajes en Guayaquil: boletos aéreos, gestión de visas (USA/Schengen), seguros de viaje, viajes corporativos y cruceros.",
    tech: ["Laravel", "PHP", "HTML/CSS/JS"],
  },
  {
    name: "Capital Inteligente",
    url: "https://capitalinteligenteec.com/",
    category: "Plataforma",
    description:
      "Plataforma de educación y gestión financiera: calculadoras (interés compuesto, FIRE), comparador de bancos, ebooks, quiz financiero y blog, con panel de administración propio.",
    tech: ["PHP", "HTML/CSS/JS", "Panel admin"],
  },
  {
    name: "360 BTL",
    url: "http://360btl.com.ec/",
    category: "Web corporativa",
    description:
      "Sitio corporativo de agencia de marketing BTL y eventos: portafolio de trabajos, servicios y clientes como Pilsener, Pronaca y Dove.",
    tech: ["PHP", "HTML/CSS/JS"],
  },
  {
    name: "Porci Ecuador 2026",
    url: "https://eventoporciecuador.com/",
    category: "Landing / Evento",
    description:
      "Landing page de congreso sectorial de la industria porcícola: inscripción en línea, agenda académica y pasarela de pago.",
    tech: ["HTML/CSS/JS"],
  },
  {
    name: "360 BTL — Panel de Gestión",
    url: "https://app.360btl.com.ec/",
    category: "Aplicación web",
    description:
      "Aplicación web interna de gestión de proyectos para la agencia: dashboard, tableros de proyectos/cobros/diseños, calendario, roles de usuario y exportación a Excel/PDF.",
    tech: ["PHP", "HTML/CSS/JS", "VPS"],
    private: true,
  },
  {
    name: "SAGLIK S.A.S.",
    url: "https://www.sagliksas.com/",
    category: "Web corporativa",
    description:
      "Sitio de distribuidora de insumos médicos, camas hospitalarias, camillas y equipos de laboratorio en Ecuador, con catálogo de productos separado.",
    tech: ["HTML/CSS/JS"],
  },
];

/* ---------- Screenshot automático ----------
   Servicio principal: WordPress mShots (gratis, sin API key).
   Mientras genera la captura, mShots responde con una imagen
   "cargando" de otro tamaño (sin error HTTP). Si la imagen no
   llega con el ancho pedido, la tratamos como provisional y
   reintentamos. Si falla, mostramos las iniciales del proyecto.
   800×500 mantiene el mismo encuadre que 1280×800 y pesa menos. */
const SHOT_W = 800;
const SHOT_H = 500;

function shotUrl(url, w = SHOT_W, h = SHOT_H) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${w}&h=${h}`;
}

function makeCard(p) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.tech = p.tech.join("|").toLowerCase();

  const initials = p.name
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();

  card.innerHTML = `
    <div class="card-shot">
      <div class="shot-fallback">${initials}</div>
      <img alt="Captura de ${p.name}" loading="lazy" />
    </div>
    <div class="card-body">
      <h3 class="card-title">${p.name} <span class="cat">${p.category}</span></h3>
      <p class="card-desc">${p.description}</p>
      <div class="card-tags">${p.tech.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      <div class="card-foot">
        ${
          p.private
            ? `<span class="card-link is-private">Acceso privado</span>`
            : `<a class="card-link" href="${p.url}" target="_blank" rel="noopener">Visitar sitio</a>`
        }
      </div>
    </div>
  `;

  const img = card.querySelector("img");
  let attempts = 0;
  const maxAttempts = 5;
  const load = () => {
    img.src = shotUrl(p.url) + "&_t=" + attempts;
  };
  img.addEventListener("error", () => {
    if (attempts++ < maxAttempts) {
      setTimeout(load, 3000);
    } else {
      img.remove(); // deja visible el placeholder
    }
  });
  img.addEventListener("load", () => {
    const provisional = img.naturalWidth !== SHOT_W;
    if (provisional && attempts++ < maxAttempts) {
      setTimeout(load, 3000); // captura aún generándose: esperar y reintentar
      return;
    }
    img.style.opacity = "1";
  });
  img.style.opacity = "0";
  img.style.transition = "opacity .4s";
  load();

  return card;
}

function buildFilters() {
  const all = new Set();
  PROJECTS.forEach((p) => p.tech.forEach((t) => all.add(t)));
  const techs = ["Todos", ...[...all].sort()];
  const wrap = document.getElementById("filters");

  techs.forEach((t, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter" + (i === 0 ? " is-active" : "");
    btn.textContent = t;
    btn.dataset.filter = t.toLowerCase();
    btn.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");
      applyFilter(btn.dataset.filter);
    });
    wrap.appendChild(btn);
  });
}

function applyFilter(f) {
  document.querySelectorAll(".card").forEach((card) => {
    // Coincidencia exacta por tecnología (evita que "java" coincida con "javascript")
    const show = f === "todos" || card.dataset.tech.split("|").includes(f);
    card.style.display = show ? "" : "none";
  });
}

function init() {
  const grid = document.getElementById("grid");
  PROJECTS.forEach((p) => grid.appendChild(makeCard(p)));
  buildFilters();
  document.getElementById("year").textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", init);
