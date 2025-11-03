let listalibros = JSON.parse(sessionStorage.getItem("LIBRERIA")) || [];
import { Libro } from "./model/libroModel.js";
const btnSubmit = document.getElementById("btnagregarlibro");
const form = document.getElementById("formAgregar");

btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  let titulo = document.getElementById("titulo").value;
  let autor = document.getElementById("autor").value;
  let paginas = document.getElementById("paginas").value;
  let prestado = document.getElementById("prestado").checked;
  let libro = new Libro(titulo, autor, paginas, prestado);
  listalibros.push(libro);
  addStorage(listalibros);
  window.alert("Libro agregado correctamente");

  
  if (form) {
    form.reset();
  } else {
    
    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("paginas").value = "";
    document.getElementById("prestado").checked = false;
  }
  
});

function addStorage(array) {
  sessionStorage.setItem("LIBRERIA", JSON.stringify(array));
}
