

var express = require('express');
var router = express.Router();


let pokemonescapturados =[
];

router.get('/',(req,res)=>{
  res.json(pokemonescapturados);
});

module.exports = router;