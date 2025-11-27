const tablero = document.getElementById("tablero");
const add = document.getElementById("add");
const logout = document.getElementById("logout");

add.addEventListener("click", () => {
  const div = document.createElement("div");
  div.classList.add("cuadro");
  tablero.appendChild(div);
});

// Delegación de eventos
tablero.addEventListener("click", e => {
  if (e.target.classList.contains("cuadro")) {
    e.target.style.background = getRandomColor();
  }
});

// Doble click = eliminar
tablero.addEventListener("dblclick", e => {
  if (e.target.classList.contains("cuadro")) {
    e.target.remove();
  }
});

// Movimiento
let mover = null;

tablero.addEventListener("mousedown", e => {
  if (e.target.classList.contains("cuadro")) {
    mover = e.target;
  }
});

document.addEventListener("mousemove", e => {
  if (mover) {
    mover.style.position = "absolute";
    mover.style.left = e.pageX + "px";
    mover.style.top = e.pageY + "px";
  }
});

document.addEventListener("mouseup", () => mover = null);

logout.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "index.html";
});

function getRandomColor() {
  return `hsl(${Math.random() * 360}, 80%, 60%)`;
}
