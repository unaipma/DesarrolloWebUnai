"use strict";
import { DOMFacade } from "./DomFacade.js";
const formulario = DOMFacade.get("formulario");
const contenedor = document.getElementById("contenedor");
const boton = DOMFacade.get("Submit");
let cont = 0;
let total;
boton.addEventListener("click", (e) => {
  e.preventDefault();

  let filas = parseInt(DOMFacade.get("filas").value);
  let columnas = parseInt(DOMFacade.get("columnas").value);
  localStorage.setItem("filas", filas);
  localStorage.setItem("columnas", columnas);
  total = filas * columnas;
  if (!isNaN(filas) && !isNaN(columnas)) {
    generateGrid(filas, columnas);
    formulario.style.display = "none";
  } else {
    console.log("Por favor ingrese números válidos para filas y columnas.");
  }
});

function generateGridWithminas(rows, cols) {
  if (contenedor) {
    contenedor.innerHTML = "";
    let cells = [];
    for (let i = 0; i < rows; i++) {
      for (let z = 0; z < cols; z++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `cell-${i}-${z}`;
        cells.push(cell);

        contenedor.appendChild(cell);
        const img = document.createElement("img");
        img.src = "./img/circle.png";
        img.alt = "Círculo";
        img.width = "100";
        img.height = "100";
        img.id = "safe";
        cell.appendChild(img);
      }
    }

    let numMines = Math.floor((rows * cols) / (rows + cols));
    if (numMines < 1) {
      numMines = 1;
    }

    for (let i = 0; i < numMines; i++) {
      let randomIndex = Math.floor(Math.random() * cells.length);
      let cell = cells.splice(randomIndex, 1)[0];
      cell.id = "mina";
      cell.img = "./img/error.png";
    }
  }
}
function generateGrid(rows, cols) {
  if (contenedor) {
    contenedor.innerHTML = "";
    for (let i = 0; i < rows; i++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      for (let z = 0; z < cols; z++) {
        const img = document.createElement("img");
        img.src = "./img/circle.png";
        img.alt = "Círculo";
        img.width = "100";
        img.height = "100";
        img.id = "safe";
        cell.appendChild(img);
        contenedor.appendChild(cell);
      }
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
  let vidas = DOMFacade.get("vidas");
  const columnas = localStorage.getItem("columnas");
  const filas = localStorage.getItem("filas");
  vidas.textContent = 3;

  if (columnas > 0 || filas > 0) {
    generateGrid(parseInt(filas), parseInt(columnas));
    formulario.style.display = "none";
    total = columnas * filas;
  }
});

contenedor.addEventListener("click", (e) => {
  let vidas = DOMFacade.get("vidas");
  if (e.target.id == "safe") {
    e.target.src = "./img/boat.jpg";
    cont = cont + 1;
    if (cont == total - 3) {
      DOMFacade.get("perdedor").style.color = "green";
      DOMFacade.get("perdedor").textContent = "HAS GANADO";
    }
  } else {
    e.target.src = "./img/error.png";

    vidas.textContent = parseInt(vidas.textContent) - 1;
    if (vidas.textContent == 0) {
      DOMFacade.get("perdedor").textContent = "HAS PERDIDO PERDEDORRR";
      vidas.style.display = "none";
    }
  }
});
