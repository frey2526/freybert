// Checklist de la guía: se guarda en este navegador.
const boxes = [...document.querySelectorAll(".check-item input")];
const counter = document.getElementById("check-count");
const reset = document.getElementById("reset-checks");
const KEY = "freybert-guia-checklist";

function paint() {
  const done = boxes.filter((box) => box.checked).length;
  counter.textContent = `${done} / ${boxes.length}`;
  localStorage.setItem(KEY, JSON.stringify(boxes.map((box) => box.checked)));
}

let saved = [];
try {
  saved = JSON.parse(localStorage.getItem(KEY) || "[]");
} catch {
  saved = [];
}

boxes.forEach((box, index) => {
  box.checked = saved[index] === true;
  box.addEventListener("change", paint);
});

reset.addEventListener("click", () => {
  boxes.forEach((box) => { box.checked = false; });
  paint();
});

paint();
