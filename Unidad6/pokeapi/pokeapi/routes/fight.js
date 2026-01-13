let fight = require("../models/fight");
var express = require('express');
var router = express.Router();


let fightList = [
];

router.get('/', (req, res) => {
    res.json(fightList);
});

router.post('/', (req, res) => {
    let newFight = new fight(
        req.body.dateStart,
        req.body.dateEnd,
        req.body.pokeName,
        req.body.damageDoneTrainer,
        req.body.damageReceivedTrainer,
        req.body.damageDonePokemon,
        req.body.image,
        req.body.caught,
        req.body.shiny
    );
    fightList.push(newFight);
    res.status(201).json(newFight);
});

router.put('/:id', (req, res) => {
    let fight = fightList.find(fight => fight.id == req.params.id);
    if (fight) {
        fight.dateStart = req.body.dateStart;
        fight.dateEnd = req.body.dateEnd;
        fight.pokeName = req.body.pokeName;
        fight.damageDoneTrainer = req.body.damageDoneTrainer;
        fight.damageReceivedTrainer = req.body.damageReceivedTrainer;
        fight.damageDonePokemon = req.body.damageDonePokemon;
        fight.image = req.body.image;
        fight.caught = req.body.caught;
        fight.shiny = req.body.shiny;
        res.json(fight);
    } else {
        res.status(404).send();
    }
});

module.exports = router;