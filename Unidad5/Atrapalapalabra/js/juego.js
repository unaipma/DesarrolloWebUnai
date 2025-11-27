"use strict";

import { DOMFacade } from "../js/DomFacade.js";

const palabras = [
  "casa","perro","computadora","sol","montaña","libro","ciudad","coche",
  "música","ventana","playa","cielo","lluvia","bosque","río","teléfono",
  "mesa","silla","puerta","camino","flor","nube","fuego","tiempo","estrella",
];

document.addEventListener("DOMContentLoaded", () => {
  let jugador = JSON.parse(sessionStorage.getItem("jugador"));
  DOMFacade.get("nombreuser").textContent = jugador.nombre;
  DOMFacade.get("puntuacion").textContent = jugador.puntuacion;
});

const btnjugar = DOMFacade.get("btnjugar");
const input = DOMFacade.get("palabra");

let intervalo = null;
let palabraActual = "";
let palabraElemento = DOMFacade.get("palabraMostrar");

btnjugar.addEventListener("click", iniciarJuego);

function iniciarJuego() {
  nuevaPalabra();

  if (!intervalo) {
    intervalo = setInterval(bajar, 50);
  }
}

function nuevaPalabra() {
  palabraActual = palabras[Math.floor(Math.random() * palabras.length)];
  palabraElemento.textContent = palabraActual;
  palabraElemento.style.position = "absolute";
  palabraElemento.style.top = "0px";
  palabraElemento.style.left = "50%"; 
  input.value = "";
  input.focus();
}

function bajar() {
  let topActual = parseFloat(palabraElemento.style.top);

  if (isNaN(topActual)) topActual = 0;

  palabraElemento.style.top = topActual + 3 + "px";

  
  const limiteY = 350; 

  if (topActual >= limiteY) {
    alert("¡Has perdido! No escribiste la palabra a tiempo.");
    nuevaPalabra();
  }
}


input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (input.value.trim() === palabraActual) {
      nuevaPalabra();
    }
  }
});
