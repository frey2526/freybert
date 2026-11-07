// Cambio de tema al estilo Omarchy: botón en el pie o tecla T.
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

// El tema inicial lo pone el script del <head>; aquí solo lo cambiamos.
function paintName() {
  const name = themes.find(([id]) => id === root.dataset.theme)?.[1] ?? themes[0][1];
  label.textContent = name;
}

function nextTheme() {
  const index = themes.findIndex(([id]) => id === root.dataset.theme);
  const [id] = themes[(index + 1) % themes.length];
  root.dataset.theme = id;
  localStorage.setItem("freybert-theme", id);
  paintName();
}

paintName();
button.addEventListener("click", nextTheme);

addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() !== "t") return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.target.closest("input, textarea, select, [contenteditable]")) return;
  nextTheme();
});

document.getElementById("year").textContent = new Date().getFullYear();
