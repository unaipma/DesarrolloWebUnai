import { DOMFacade } from "../js/patrones/DomFacade.js";
import { factory } from "../js/patrones/factory.js";
import { PokemonArray } from "../js/patrones/singleton.js";

let boton = DOMFacade.get("submit");
let lista = DOMFacade.get("resultado");
let array = new PokemonArray();

boton.addEventListener("click", (event) => {
    event.preventDefault();

    let nombre = DOMFacade.get("nombre").value;
   let tipoFin = document.getElementById("type");
   let tipo = tipoFin[tipoFin.selectedIndex].value;
    let nivel = DOMFacade.get("nivel").value;

    let pokemon = factory(tipo, nombre, nivel);
    if (!pokemon) return alert("Selecciona un tipo válido");

    let saved = JSON.parse(localStorage.getItem("pokemones") || "[]");
    array.setAll(saved);

    array.push(pokemon);
    localStorage.setItem("pokemones", JSON.stringify(array.getAll()));

    DOMFacade.appendText(lista, pokemon.nombre);
});

