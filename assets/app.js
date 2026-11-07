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
const cursor = document.createElement("span");
cursor.className = "cursor";
cursor.textContent = "▊";

const lines = [
  { prompt: true, text: "whoami" },
  { text: "freybert" },
  { blank: true },
  { prompt: true, text: "ls" },
  { text: "// nada todavía", comment: true },
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
