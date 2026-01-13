import { DOMFacade } from "./DomFacade.js";
import { Fight } from "./fight-model.js";
const URI = "https://pokeapi.co/api/v2/pokemon/";
const sectionBattle = DOMFacade.get("battlesec");
const btnEscapar = DOMFacade.get("btnescapar");
const btnAtacar = DOMFacade.get("btnatacar");
const btnCapturar = DOMFacade.get("btncapturar");
let currentPokemon = null;

document.addEventListener("DOMContentLoaded", () => {
  sacarPokemon();
});

btnCapturar.addEventListener("click", () => {
  const vidaTexto = DOMFacade.get("vida").textContent;
  const parts = vidaTexto.split(" / ");
  const vidaActual = parseInt(parts[0].split(" HP: ")[1], 10);
  const vidaMax = parseInt(parts[1], 10);
  const probabilida = 100 - ((vidaActual * 100) / vidaMax);

  let rand = Math.floor(Math.random() * 100);
  if (rand < probabilida) {
    alert("Has capturado al pokemon!");
    sectionBattle.innerHTML = "";
    sacarPokemon();
    guardarEnHistorial();
    const img = DOMFacade.get("pokemonimg");
    if (img.dataset.shiny !== "true") {
      const mihp = DOMFacade.get("mihp");
      mihp.value = parseInt(mihp.value, 10) + Math.floor(parseInt(mihp.value, 10) * 0.5);
    } else {
      DOMFacade.get("mihp").value = 1000;
    }

  } else {
    alert("El pokemon se ha escapado!");
    pokemonmeataca();
  }





});

btnEscapar.addEventListener("click", () => {
  sectionBattle.innerHTML = "";
  sacarPokemon();
});

btnAtacar.addEventListener("click", () => {
  let vid = DOMFacade.get("vida").textContent;
  let vida = parseInt(vid.split(" / ")[0].split(" HP: ")[1]);
  let ataque = Math.floor(Math.random() * 40);
  vida -= ataque;
  let vidaTexto = DOMFacade.get("vida");
  vidaTexto.textContent = ` HP: ${vida} / ${vid.split(" / ")[1]}`;
  let slider = DOMFacade.get("hpbar");
  slider.value = vida;
  if (vida < 1) {
    alert("Has derrotado al pokemon!");
    sacarPokemon();
    guardarEnHistorial();
  } else {
    pokemonmeataca();
  }

});

function guardarEnHistorial() {
  fetch('http://localhost:3000/pokemon/' + currentPokemon.id)
    .then(response => {
      if (response.ok) {

        return response.json().then(pokemon => {
          const nuevoNivel = pokemon.nivel + 1;
          const pokemonActualizado = {
            id: pokemon.id,
            foto: pokemon.foto,
            shinny: pokemon.shinny,

            nombre: pokemon.nombre,
            nivel: nuevoNivel
          };

          fetch('http://localhost:3000/pokemon/' + currentPokemon.id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(pokemonActualizado)
          }).then(resp => {
            if (resp.ok) {
              console.log("Nivel del Pokémon actualizado a " + nuevoNivel);
            }
          });
        });
      } else if (response.status === 404) {

        const nuevoPokemon = {
          id: currentPokemon.id,
          foto: currentPokemon.sprites.front_default,
          nombre: currentPokemon.name,
          shinny: DOMFacade.get("pokemonimg").dataset.shiny === "true",
          nivel: 1
        };

        fetch('http://localhost:3000/pokemon', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nuevoPokemon)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error("Error al guardar el Pokémon");
            }
            return response.json();
          })
          .then(data => {
            console.log("Pokémon guardado:", data);
          });
      } else {
        throw new Error("Error verificando historial: " + response.status);
      }
    })
    .catch(error => {
      console.error(error);
    });
};

function pokemonmeataca() {
  let vidaEntrenadorInput = DOMFacade.get("mihp").value;
  let vidaEntrenador = parseInt(vidaEntrenadorInput);
  let ataquepokemon = DOMFacade.get("ataque").textContent;
  let ataque = parseInt(ataquepokemon.split("Ataque: ")[1]);
  vidaEntrenador -= ataque;
  let vidaTextoEntrenador = DOMFacade.get("mihp");
  vidaTextoEntrenador.value = vidaEntrenador;
  if (vidaEntrenador < 1) {
    alert("Has sido derrotado ");
    sectionBattle.innerHTML = "";
    sacarPokemon();
  }

};


function sacarPokemon() {
  let rand = Math.floor(Math.random() * 100);
  fetch(URI + rand).then(async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let pokemon = await response.json();
    let at = DOMFacade.get("ataque");
    const ataquestat = pokemon.stats.find(
      (s) => s.stat && s.stat.name === "attack"
    );
    let ataque = ataquestat ? ataquestat.base_stat : 100;
    at.textContent = `Ataque: ${ataque}`;


    let imagen = DOMFacade.get("pokemonimg");
    let posibilidad = Math.floor(Math.random() * 100);
    if (posibilidad < 6) {
      imagen.src = pokemon.sprites.front_shiny;
      imagen.style.border = "5px solid gold";
      imagen.dataset.shiny = "true";
    } else {
      imagen.src = pokemon.sprites.front_default;
      imagen.style.border = "";
      imagen.dataset.shiny = "false";
    }
    imagen.width = 200;
    currentPokemon = pokemon;

    let slider = DOMFacade.get("hpbar");

    const hpStat = pokemon.stats.find((s) => s.stat && s.stat.name === "hp");
    let vida = hpStat ? hpStat.base_stat : 100;

    slider.max = vida;
    slider.value = vida;

    let vidaTexto = DOMFacade.get("vida");

    vidaTexto.textContent = ` HP: ${slider.value} / ${vida}`;

    guardarEnHistorial();

  });

  function guardarEnHistorial() {
    let ahora = new Date();
    let fight = new Fight(
      `${ahora.getDate()}/${ahora.getMonth() + 1}/${ahora.getFullYear()} 
${ahora.getHours()}:${ahora.getMinutes()}`,
      null,
      currentPokemon.name,
      "luchando",
      "luchando",
      DOMFacade.get("pokemonimg").src,
      "luchando",
      DOMFacade.get("pokemonimg").dataset.shiny
    );
    fetch('http://localhost:3000/fight', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fight)
    })
      .then(response => {
        if (response.ok) {
          console.log("Combate guardado en historial");
        } else {
          console.error("Error guardando combate");
        }
      })
      .catch(err => console.error(err));

  }

}
