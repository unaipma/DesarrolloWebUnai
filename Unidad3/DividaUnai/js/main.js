"use strict";
import { DolarToEuroRate, EuroToDolarRate } from "./constants.js";

const btn = document.getElementById("convertir");
const from = document.getElementById("from");
const to = document.getElementById("to");
const amount = document.getElementById("amount");
const result = document.getElementById("result");

btn.addEventListener("click", () => {
  let valor = 0;
  let text = "";

  // Comparar correctamente los valores del select
  if (from.value === "USD" && to.value === "EUR") {
    valor = amount.value * DolarToEuroRate;
    text = `${amount.value} dólares son ${valor.toFixed(2)} euros.`;
  } else if (from.value === "EUR" && to.value === "USD") {
    valor = amount.value * EuroToDolarRate;
    text = `${amount.value} euros son ${valor.toFixed(2)} dólares.`;
  } else {
    text = "Conversión no soportada todavía.";
  }

  // Crear y añadir elemento al HTML
  const li = document.createElement("li");
  li.textContent = text;
  result.appendChild(li);

  // Guardar en localStorage
  localStorage.setItem("history", text);
});
