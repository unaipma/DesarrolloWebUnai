let listalibros = [];
const btnSubmit = document.getElementById("btnagregarlibro");
const btnSubmit2 = document.getElementById("btnconsultar");
class Libro {
  constructor(titulo, autor, paginas, prestado) {
    this.titulo = titulo;
    this.autor = autor;
    this.paginas = paginas;
    this.prestado = prestado;
  }
}

btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  let titulo = document.getElementById("titulo").value;
  let autor = document.getElementById("autor").value;
  let paginas = document.getElementById("paginas").value;
  let prestado = document.getElementById("prestado").checked;
  let libro = new Libro(titulo, autor, paginas, prestado);
  listalibros.push(libro);
  window.alert("Libro agregado correctamente");
});

function mostrarLibros(arrayLibros) {
  let ul = document.getElementById("listalibros");
  let item = document.createElement("li");
  arrayLibros.forEach((libro) => {
    item.textContent = `Título: ${libro.titulo}, Autor: ${libro.autor}, Páginas: ${libro.paginas}, Prestado: ${libro.prestado}`;
    ul.appendChild(item);
  });
}

btnSubmit2.addEventListener("click", (event) => {
  window.alert("Libros mostrados correctamente");
  mostrarLibros(listalibros);
});
