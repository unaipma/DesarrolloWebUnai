"use strict";

const btnadd = document.getElementById("btnañadir");
const btnstats = document.getElementById("stats");
const btnborrar = document.getElementById("borrar");
const btnbuscar = document.getElementById("buscarpokemon");
const btnrecargar = document.getElementById("volvercargar");
const addForm = document.getElementById("addForm");
const searchInput = document.getElementById("searchInput");

btnrecargar.addEventListener("click", function (e) {
  const list = document.getElementById("pokemonList");
  const array = JSON.parse(localStorage.getItem("pokemones"));
  list.innerHTML = "";

  array.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element.name} - ${element.type} - Nivel: ${element.level} }`;
    list.appendChild(li);
  });
});

btnadd.addEventListener("click", function (e) {
  e.preventDefault();

  let nombre = document.getElementById("name").value;
  let tipo = document.getElementById("type").value;
  let nivel = parseInt(document.getElementById("nivel").value);

  if (!nombre || !tipo || isNaN(nivel)) {
    alert("pon bien los campos");
    return;
  }

  let pokemon = new Pokemon(nombre, tipo, nivel);

  let pokemonesArray = [];
  if (localStorage.getItem("pokemones")) {
    pokemonesArray = JSON.parse(localStorage.getItem("pokemones"));
  }
  pokemonesArray.push(pokemon);

  localStorage.setItem("pokemones", JSON.stringify(pokemonesArray));
  const list = document.getElementById("pokemonList");
  const li = document.createElement("li");
  li.textContent = `${nombre} - ${tipo} - Nivel: ${nivel}`;
  list.appendChild(li);
});

btnbuscar.addEventListener("click", (event) => {
  const list = document.getElementById("pokemonList");
  let texto = document.getElementById("search").value;
  let array = JSON.parse(localStorage.getItem("pokemones"));
  list.innerHTML = "";
  let li = document.createElement("li");
  li.textContent = "POkemones encontrados";
  list.appendChild(li);
  if (texto == "fuego" || texto == "planta" || texto == "agua") {
    array.forEach((element) => {
      if (texto == element.type) {
        let li = document.createElement("li");
        li.textContent = `${element.name} - ${element.type} - Nivel: ${element.level} - Fecha: ${element.date}`;
        list.appendChild(li);
      }
    });
  } else {
    array.forEach((element) => {
      if (texto == element.name) {
        let li = document.createElement("li");
        li.textContent = `${element.name} - ${element.type} - Nivel: ${element.level} - Fecha: ${element.date}`;
        list.appendChild(li);
      }
    });
  }
});
btnstats.addEventListener("click", (event) => {
  const array = JSON.parse(localStorage.getItem("pokemones"));

  if (!array || array.length === 0) {
    alert("No hay Pokémon registrados.");
    return;
  }

  let statsDiv = document.getElementById("stats");
  statsDiv.innerHTML = "";

  const typeStats = array.reduce((acc, pokemon) => {
    if (!acc[pokemon.type]) acc[pokemon.type] = { count: 0, totalLevel: 0 };
    acc[pokemon.type].count++;
    acc[pokemon.type].totalLevel += pokemon.level;
    return acc;
  }, {});

  for (let type in typeStats) {
    let avgLevel = typeStats[type].totalLevel / typeStats[type].count;
    statsDiv.innerHTML += `<p>Nivel promedio de ${type}: ${avgLevel.toFixed(
      2
    )}</p>`;
  }
});

btnborrar.addEventListener("click", (event) => {
  localStorage.clear();
  const list = document.getElementById("pokemonList");
  list.innerHTML = "";
});

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("pokemonList");
  const array = JSON.parse(localStorage.getItem("pokemones"));
  list.innerHTML = "";

  array.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element.name} - ${element.type} - Nivel: ${element.level} - Fecha: ${element.date}`;
    list.appendChild(li);
  });
});

export class Pokemon {
  constructor(name, type, level) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.date = new Date().toLocaleDateString("es-ES");
  }
}
