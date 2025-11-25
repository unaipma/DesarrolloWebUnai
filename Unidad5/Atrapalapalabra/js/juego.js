"use strict";

import { DOMFacade } from "../js/DomFacade.js";

const palabras = [
  "casa",
  "perro",
  "computadora",
  "sol",
  "montaña",
  "libro",
  "ciudad",
  "coche",
  "música",
  "ventana",
  "playa",
  "cielo",
  "lluvia",
  "bosque",
  "río",
  "teléfono",
  "mesa",
  "silla",
  "puerta",
  "camino",
  "flor",
  "nube",
  "fuego",
  "tiempo",
  "estrella",
];

document.addEventListener("DOMContentLoaded", () => {
  let jugador = JSON.parse(sessionStorage.getItem("jugador"));
  DOMFacade.get("nombreuser").textContent = jugador.nombre;
  DOMFacade.get("puntuacion").textContent = jugador.puntuacion;
});

const btnjugar = DOMFacade.get("btnjugar");

btnjugar.addEventListener("click", function (e) {
  let div = DOMFacade.get("juego");
  palabras.forEach((element) => {
    let palabra = document.createElement("p");
    palabra.textContent = element;
    const intervalID = setInterval(myCallback, 500, palabra);
  });
});

function myCallback(a, b, palabra) {
  palabra.style.top = window.screen.height / 2 + "px";
}
