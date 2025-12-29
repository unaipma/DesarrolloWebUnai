import { DOMFacade } from "./DomFacade.js";
const URI = "https://pokeapi.co/api/v2/pokemon/";
const sectionBattle = DOMFacade.get("battlesec");
const btnEscapar= DOMFacade.get("btnescapar");
const btnAtacar= DOMFacade.get("btnatacar");
const btnCapturar= DOMFacade.get("btncapturar");


document.addEventListener("DOMContentLoaded", () => {
  sacarPokemon();
});

btnCapturar.addEventListener("click", () => {
   let vid = DOMFacade.get("vida").textContent;
  let vida= parseInt(vid.split(" / ")[0].split(" HP: ")[1]);
  // me he quedado aqui


});

btnEscapar.addEventListener("click", () => {
  sectionBattle.innerHTML = "";
  sacarPokemon();
});

btnAtacar.addEventListener("click", () => {
  let vid = DOMFacade.get("vida").textContent;
  let vida= parseInt(vid.split(" / ")[0].split(" HP: ")[1]);
  let ataque = Math.floor(Math.random() * 40);
  vida -= ataque;
  let vidaTexto = DOMFacade.get("vida");
  vidaTexto.textContent = ` HP: ${vida} / ${vid.split(" / ")[1]}`;
  let slider = DOMFacade.get("hpbar");
  slider.value = vida;
  if(vida<1){
    alert("Has derrotado al pokemon!");
    sacarPokemon();
    guardarEnHistorial();
  }else{
    pokemonmeataca();
  }

});
function guardarEnHistorial(){

}

function pokemonmeataca(){

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
    at.textContent = `Attack: ${ataque}`;
   

    let imagen = DOMFacade.get("pokemonimg");
    let posibilidad = Math.floor(Math.random() * 100);
    if (posibilidad < 6) {
      imagen.src = pokemon.sprites.front_shiny;
      imagen.border = "5px solid gold";
    } else {
      imagen.src = pokemon.sprites.front_default;
    }
    imagen.width = 200;

    
    let slider = DOMFacade.get("hpbar");

    const hpStat = pokemon.stats.find((s) => s.stat && s.stat.name === "hp");
    let vida = hpStat ? hpStat.base_stat : 100;
   
    slider.max = vida;
    slider.value = vida;
    
    let vidaTexto = DOMFacade.get("vida");
 
    vidaTexto.textContent = ` HP: ${slider.value} / ${vida}`;
    sectionBattle.appendChild(vidaTexto);
  });
}
