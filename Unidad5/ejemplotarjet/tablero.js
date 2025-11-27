const tablero = document.getElementById("tablero");
const add = document.getElementById("add");

// 1. Añadir nuevos cuadros dinámicamente
add.addEventListener("click", () => {
  const div = document.createElement("div");
  div.classList.add("cuadro");
  tablero.appendChild(div);
});

// 2. Delegación de eventos sobre el contenedor
tablero.addEventListener("click", (e) => {
  if (e.target.classList.contains("cuadro")) {
    e.target.style.background = getRandomColor();
  }
});

// 3. Eliminar cuadros con doble clic
tablero.addEventListener("dblclick", (e) => {
  if (e.target.classList.contains("cuadro")) {
    e.target.remove();
  }
});

// Función auxiliar
function getRandomColor() {
  return `hsl(${Math.random() * 360}, 70%, 60%)`;
}
