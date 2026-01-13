
let Pokemon = require("../models/pokemonmodel");
var express = require('express');
var router = express.Router();


let pokemonescapturados = [
];

router.get('/', (req, res) => {
  res.json(pokemonescapturados);
});

router.post('/', (req, res) => {
  let pokemon = new Pokemon(
    req.body.id,
    req.body.nombre,
    req.body.foto,
    req.body.nivel,
    req.body.shinny
  );
  pokemonescapturados.push(pokemon);
  res.status(201).json(pokemon);
});

router.get('/:id', (req, res) => {
  let pokemon = pokemonescapturados.find(pokemon => pokemon.id == req.params.id);
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).send();
  }
});

router.put('/:id', (req, res) => {
  let pokemon = pokemonescapturados.find(pokemon => pokemon.id == req.params.id);
  if (pokemon) {
    pokemon.nivel = req.body.nivel;
    res.json(pokemon);
  } else {
    res.status(404).send();
  }
});



module.exports = router;