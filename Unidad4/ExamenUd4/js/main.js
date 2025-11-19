"use strict";
import { DOMFacade } from "../js/patterns/DomFacade.js";
import { Tren } from "../js/patterns/model/Tren.js";
import { Singleton } from "../js/patterns/Singleton.js";

const array = Singleton.getTrainData();

let btnbuscar = DOMFacade.get("buscar");
let lista = DOMFacade.get("list");
let btnadd = DOMFacade.get("submit");
let btnborrar = DOMFacade.get("borrar");
let btnsimular = DOMFacade.get("simular");

btnadd.addEventListener("click", function (e) {
  let nombre = DOMFacade.get("nombre").value;
  let tipo = DOMFacade.get("tipo").value;

  let velocidad = DOMFacade.get("velocidad").value;
  let tren = new Tren(nombre, tipo, velocidad);
  array.push(tren);
  localStorage.setItem("trenes", JSON.stringify(array));
});

btnborrar.addEventListener("click", function (e) {
  localStorage.clear();
  lista.innerHTML = "";
  array = Singleton.getTrainData();
});

document.addEventListener("DOMContentLoaded", () => {
  const array = JSON.parse(localStorage.getItem("trenes"));
  lista.innerHTML = "";

  array.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element.nombre} - ${element.tipo} - Nivel: ${element.velocidad} - Fecha ${element.date} `;
    list.appendChild(li);
  });
});

btnbuscar.addEventListener("click", function (e) {
  e.preventDefault();
  let texto = DOMFacade.get("busqueda").value;
  lista.innerHTML = "";

  array.forEach((element) => {
    if (
      element.nombre.toLowerCase().includes(texto.toLowerCase()) ||
      element.tipo.toLowerCase().includes(texto.toLowerCase())
    ) {
      const li = document.createElement("li");
      li.textContent = `${element.nombre} - ${element.tipo} - Nivel: ${element.velocidad} - Fecha ${element.date}`;
      lista.appendChild(li);
    }
  });
});
btnsimular.addEventListener("click", function (e) {
  e.preventDefault();
  let texto = DOMFacade.get("trensel").value;
  let tren;
  array.forEach((element) => {
    if (
      element.nombre.toLowerCase().includes(texto.toLowerCase()) ||
      element.tipo.toLowerCase().includes(texto.toLowerCase())
    )
      tren = element;
  });
  let li;
  let listaresultado = DOMFacade.get("sim");
  let origen = DOMFacade.get("origen").value;
  let destino = DOMFacade.get("destino").value;
  if (origen == "SodorCentral") {
    switch (destino) {
      case Knapford:
        li = document.createElement("li");
        tiempo = tren.velocidad * 15;
        li.textContent = "Distancia es 15 km, el tiempo sera  ".tiempo;
        break;
      case Vicarstown:
        li = document.createElement("li");
        tiempo = tren.velocidad * 25;
        li.textContent = "Distancia es 25 km, el tiempo sera  ".tiempo;
        break;
      case TidmouthSheds:
        li = document.createElement("li");
        tiempo = tren.velocidad * 27;
        li.textContent = "Distancia es 27 km, el tiempo sera  ".tiempo;
        break;
      default:
        const li = document.createElement("li");
        tiempo = tren.velocidad * 15;
        li.textContent = "es el mismo destino";
        break;
    }
  } else if (origen == "SodorCentral") {
    switch (destino) {
      case Knapford:
        li = document.createElement("li");
        tiempo = tren.velocidad * 15;
        li.textContent = "Distancia es 15 km, el tiempo sera  ".tiempo;
        break;
      case Vicarstown:
        li = document.createElement("li");
        tiempo = tren.velocidad * 25;
        li.textContent = "Distancia es 25 km, el tiempo sera  ".tiempo;
        break;
      case TidmouthSheds:
        li = document.createElement("li");
        tiempo = tren.velocidad * 27;
        li.textContent = "Distancia es 27 km, el tiempo sera  ".tiempo;
        break;
      default:
        const li = document.createElement("li");
        tiempo = tren.velocidad * 15;
        li.textContent = "es el mismo destino";
        break;
    }
  }
});
