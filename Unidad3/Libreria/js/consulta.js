const listalibros = JSON.parse(sessionStorage.getItem("LIBRERIA")) || [];
const ul = document.getElementById("listalibros");


function mostrarLibros(arrayLibros) {
  ul.innerHTML = "";
  arrayLibros.forEach((libro) => {
    const prestado = libro.prestado ? "Sí" : "No";
    const item = document.createElement("li");
    item.className = "lib-item";
    item.innerHTML = `
      <article class="lib-card">
        <div class="card-header">${libro.titulo}</div>
        <div class="card-body">
          <p><strong>Autor:</strong> ${libro.autor}</p>
          <p><strong>Páginas:</strong> ${libro.paginas}</p>
          <p><strong>Prestado:</strong> ${prestado}</p>
        </div>
      </article>
    `;
    ul.appendChild(item);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  if (listalibros.length === 0) {
    const item = document.createElement("li");
    item.textContent = "No hay libros en la librería.";
    ul.appendChild(item);
  } else {
    mostrarLibros(listalibros);
  }
});
