import { DOMFacade } from "./DomFacade.js";
const URI = "http://localhost:3000/pokemon";

document.addEventListener("DOMContentLoaded", () => {
  let contenido = DOMFacade.get("contenidoteam");
  fetch(URI, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar el equipo: " + response.status);
      }
      return response.json();
    })
    .then((pokemones) => {
      if (pokemones.length === 0) {
        contenido.innerHTML = "<p>No hay pókemons en el equipo aún.</p>";
        return;
      }

      for (let pokemon of pokemones) {
        let divPokemon = document.createElement("div");
        contenido.appendChild(divPokemon);
        let imgPokemon = document.createElement("img");
        let nombrePokemon = document.createElement("h3");
        imgPokemon.src = pokemon.foto;
        if (pokemon.shinny) {
          imgPokemon.style.border = "2px solid yellow";
          nombrePokemon.style.color = "purple";
        }
        divPokemon.appendChild(imgPokemon);

        nombrePokemon.textContent = pokemon.nombre;
        divPokemon.appendChild(nombrePokemon);
        let nivelPokemon = document.createElement("p");
        nivelPokemon.textContent = "Nivel: " + pokemon.nivel;
        divPokemon.appendChild(nivelPokemon);
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      contenido.textContent = "Error al cargar los datos del equipo.";
    });
});
