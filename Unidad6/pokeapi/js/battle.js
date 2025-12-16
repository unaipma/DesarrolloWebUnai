import { DOMFacade } from "./DomFacade.js";
const URI = "https://pokeapi.co/api/v2/pokemon/";
const sectionBattle = DOMFacade.get("battlesec");

document.addEventListener("DOMContentLoaded", () => {
  sacarPokemon();
});

function sacarPokemon() {
  let rand = Math.floor(Math.random() * 100);
  fetch(URI + rand).then(async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let pokemon = await response.json();
    let at = document.createElement("h2");
    const ataquestat = pokemon.stats.find(
      (s) => s.stat && s.stat.name === "attack"
    );
    let ataque = ataquestat ? ataquestat.base_stat : 100;
    at.textContent = `Attack: ${ataque}`;
    sectionBattle.appendChild(at);

    let imagen = document.createElement("img");
    let posibilidad = Math.floor(Math.random() * 100);
    if (posibilidad < 6) {
      imagen.src = pokemon.sprites.front_shiny;
      imagen.border = "5px solid gold";
    } else {
      imagen.src = pokemon.sprites.front_default;
    }
    imagen.width = 200;

    sectionBattle.appendChild(imagen);
    let slider = document.createElement("input");

    const hpStat = pokemon.stats.find((s) => s.stat && s.stat.name === "hp");
    let vida = hpStat ? hpStat.base_stat : 100;
    slider.type = "range";
    slider.min = 0;
    slider.max = vida;
    slider.value = vida;
    sectionBattle.appendChild(slider);
    let vidaTexto = document.createElement("p");
    vidaTexto.id = "vidaTexto";
    vidaTexto.textContent = ` HP: ${slider.value} / ${vida}`;
    sectionBattle.appendChild(vidaTexto);
  });
}
