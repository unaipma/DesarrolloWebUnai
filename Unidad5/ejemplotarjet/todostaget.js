// Documento JS de práctica: TODOS los tipos de uso de e.target
// --------------------------------------------------------------
// Incluye ejemplos listos para copiar/pegar
// Cada bloque explica un tipo de comprobación diferente

// 1. Por clase: classList.contains()
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("cuadro")) {
    console.log("Has pulsado un cuadro");
  }
});

// 2. Por ID
document.addEventListener("click", (e) => {
  if (e.target.id === "botonEspecial") {
    console.log("Click en el botón especial");
  }
});

// 3. Por etiqueta HTML: tagName
document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    console.log("Has pulsado un <button>");
  }
});

// 4. Por atributo personalizado: dataset / getAttribute
document.addEventListener("click", (e) => {
  if (e.target.dataset.action === "eliminar") {
    console.log("Acción: eliminar");
  }
});

// 5. Por texto interno del elemento: textContent
document.addEventListener("click", (e) => {
  if (e.target.textContent.trim() === "Borrar") {
    console.log("Botón Borrar pulsado");
  }
});

// 6. Por tipo de input: e.target.type
document.addEventListener("input", (e) => {
  if (e.target.type === "checkbox") {
    console.log("Has pulsado un checkbox");
  }
});

// 7. Por name (formularios)
document.addEventListener("change", (e) => {
  if (e.target.name === "opcion") {
    console.log("Radio de nombre 'opcion' seleccionado");
  }
});

// 8. Con matches(): selector CSS avanzado
document.addEventListener("click", (e) => {
  if (e.target.matches(".btn.rojo[data-accion='pintar']")) {
    console.log("Botón rojo con acción pintar");
  }
});

// 9. Con closest(): buscar el elemento padre más cercano
document.addEventListener("click", (e) => {
  const tarjeta = e.target.closest(".tarjeta");
  if (tarjeta) {
    console.log("Has hecho clic dentro de una tarjeta");
    tarjeta.classList.toggle("activa");
  }
});

// 10. Ejemplo completo práctico usando varios métodos juntos:
// Un contenedor que gestiona múltiples tipos de botones

document.getElementById("panel")?.addEventListener("click", (e) => {
  // Botón para colorear
  if (e.target.matches("button[data-color]")) {
    const color = e.target.dataset.color;
    e.target.style.background = color;
    console.log("Botón coloreado:", color);
  }

  // Botón borrar por texto
  if (e.target.textContent.trim() === "Eliminar") {
    e.target.remove();
    console.log("Elemento eliminado por texto");
  }

  // Acciones especiales por ID
  if (e.target.id === "resetPanel") {
    document.getElementById("panel").innerHTML = "";
    console.log("Panel reiniciado");
  }
});
