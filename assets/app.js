// Temas: se cambian con la tecla T o con el botón del pie.
const themes = [
  ["tokyo-night", "Tokyo Night"],
  ["catppuccin", "Catppuccin"],
  ["gruvbox", "Gruvbox"],
  ["everforest", "Everforest"],
  ["rose-pine", "Rosé Pine"],
];

const root = document.documentElement;
const button = document.getElementById("theme-btn");
const label = document.getElementById("theme-name");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const noMotion = root.classList.contains("no-motion");

function paintName() {
  const name = themes.find(([id]) => id === root.dataset.theme)?.[1] ?? themes[0][1];
  label.textContent = name;
}

function applyTheme(id) {
  root.dataset.theme = id;
  localStorage.setItem("freybert-theme", id);
  paintName();
}

function cycleTheme() {
  const index = themes.findIndex(([id]) => id === root.dataset.theme);
  const [id] = themes[(index + 1) % themes.length];

  // Si el navegador soporta View Transitions, el cambio se funde de golpe.
  if (document.startViewTransition && !reduceMotion && !noMotion) {
    try {
      document.startViewTransition(() => applyTheme(id));
      return;
    } catch {
      /* si falla, cae al cambio normal */
    }
  }
  applyTheme(id);
}

paintName();
button.addEventListener("click", cycleTheme);

addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() !== "t") return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.target.closest("input, textarea, select, [contenteditable]")) return;
  cycleTheme();
});

document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Terminal que se escribe sola ----------

const code = document.getElementById("terminal-code");

if (code) {
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.textContent = "▊";

  const lines = [
    { prompt: true, text: "cat rol.txt" },
    { text: "ajedrecista · programador · desarrollador de sistemas" },
    { blank: true },
    { prompt: true, text: "ls" },
    { text: "sobre  ajedrez  proyectos  como-trabajo  ahora  contacto", comment: true },
    { blank: true },
    { prompt: true, text: "" },
  ];

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function newline() {
    code.insertBefore(document.createTextNode("\n"), cursor);
  }

  async function typeInto(node, text) {
    for (const char of text) {
      node.textContent += char;
      await sleep(48);
    }
  }

  async function writeTerminal() {
    code.appendChild(cursor);
    // Deja que el nombre termine de "escribirse" antes de empezar.
    if (!noMotion && !reduceMotion) await sleep(900);
    let first = true;

    for (const line of lines) {
      if (!first) newline();
      first = false;
      if (line.blank) continue;

      if (line.prompt) {
        const prompt = document.createElement("span");
        prompt.className = "prompt";
        prompt.textContent = "$ ";
        code.insertBefore(prompt, cursor);
      }

      const text = document.createElement("span");
      if (line.comment) text.className = "comment";
      code.insertBefore(text, cursor);

      if (noMotion || reduceMotion) {
        text.textContent = line.text;
      } else {
        await typeInto(text, line.text);
        await sleep(140);
      }
    }
  }

  writeTerminal();
}

// ---------- Fondo y luz que siguen al ratón ----------

const finePointer = matchMedia("(pointer: fine)").matches;

if (finePointer && !reduceMotion && !noMotion) {
  const body = document.body;
  const terminal = document.querySelector(".terminal");
  const hero = document.querySelector(".hero");

  let targetX = innerWidth / 2;
  let targetY = innerHeight * 0.3;
  let glowX = targetX;
  let glowY = targetY;
  let frame = 0;

  // La luz persigue al cursor con un pequeño retraso (suavizado).
  function followGlow() {
    glowX += (targetX - glowX) * 0.14;
    glowY += (targetY - glowY) * 0.14;
    root.style.setProperty("--mx", `${glowX.toFixed(1)}px`);
    root.style.setProperty("--my", `${glowY.toFixed(1)}px`);

    if (Math.abs(targetX - glowX) > 0.5 || Math.abs(targetY - glowY) > 0.5) {
      frame = requestAnimationFrame(followGlow);
    } else {
      frame = 0;
    }
  }

  addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    body.classList.add("has-pointer");

    // Paralaje suave del fondo: -1 a 1 desde el centro.
    root.style.setProperty("--px", (event.clientX / innerWidth * 2 - 1).toFixed(3));
    root.style.setProperty("--py", (event.clientY / innerHeight * 2 - 1).toFixed(3));

    if (!frame) frame = requestAnimationFrame(followGlow);
  }, { passive: true });

  // La terminal se inclina un poco hacia el cursor.
  if (terminal && hero) {
    hero.addEventListener("pointermove", (event) => {
      const rect = terminal.getBoundingClientRect();
      const clamp = (value) => Math.max(-1, Math.min(1, value));
      const dx = clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2));
      const dy = clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2));

      terminal.style.setProperty("--ry", `${(dx * 1.5).toFixed(2)}deg`);
      terminal.style.setProperty("--rx", `${(-dy * 1.5).toFixed(2)}deg`);
    }, { passive: true });

    hero.addEventListener("pointerleave", () => {
      terminal.style.setProperty("--rx", "0deg");
      terminal.style.setProperty("--ry", "0deg");
    });
  }
}

// Foco de luz dentro de cada tarjeta.
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--cx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--cy", `${event.clientY - rect.top}px`);
  }, { passive: true });
});

// ---------- Barra de progreso al bajar ----------

const progress = document.querySelector(".progress");

function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  root.style.setProperty("--scroll", max > 0 ? (scrollY / max).toFixed(4) : "0");
}

addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// ---------- Secciones que aparecen al bajar ----------

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reduceMotion && !noMotion) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.15 });

  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add("is-visible"));
}
