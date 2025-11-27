const tablero = document.getElementById("tablero");
const add = document.getElementById("add");
const logout = document.getElementById("logout");
const btnColor = document.getElementById("color");
const btnDelete = document.getElementById("delete");
const btnMoveMode = document.getElementById("moveMode");

let seleccionado = null;
let mover = false;
let elementoMovido = null;

// Añadir cuadro
add.addEventListener("click", () => {
  const div = document.createElement("div");
  div.classList.add("cuadro");

  // Posición inicial aleatoria
  div.style.left = Math.random() * (tablero.clientWidth - 80) + "px";
  div.style.top = Math.random() * (tablero.clientHeight - 80) + "px";

  tablero.appendChild(div);
});

// Selección de cuadro
tablero.addEventListener("click", (e) => {
  if (e.target.classList.contains("cuadro")) {
    if (seleccionado) seleccionado.classList.remove("selected");
    seleccionado = e.target;
    seleccionado.classList.add("selected");
  }
});

// Cambiar color
btnColor.addEventListener("click", () => {
  if (seleccionado) {
    seleccionado.style.background = getRandomColor();
  }
});

// Eliminar cuadro
btnDelete.addEventListener("click", () => {
  if (seleccionado) {
    seleccionado.remove();
    seleccionado = null;
  }
});

// Activar/Desactivar modo mover
btnMoveMode.addEventListener("click", () => {
  mover = !mover;
  btnMoveMode.textContent = mover ? "Mover: ON" : "Mover: OFF";
});

// Movimiento (si está activado)
document.addEventListener("mousedown", (e) => {
  if (mover && seleccionado && e.target === seleccionado) {
    elementoMovido = seleccionado;
  }
});

document.addEventListener("mousemove", (e) => {
  if (mover && elementoMovido) {
    elementoMovido.style.left = e.pageX - 40 + "px";
    elementoMovido.style.top = e.pageY - 40 + "px";
  }
});

document.addEventListener("mouseup", () => (elementoMovido = null));

// Logout
logout.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "index.html";
});

function getRandomColor() {
  return `hsl(${Math.random() * 360}, 80%, 60%)`;
}
