export class Fight {
    constructor(
        dateStart,
        dateEnd,
        pokeName,
        damageDoneTrainer,
        damageReceivedTrainer,
        damageDonePokemon,
        image,
        caught,
        shiny
    ) {
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.pokeName = pokeName;
        this.damageDoneTrainer = damageDoneTrainer;
        this.damageReceivedTrainer = damageReceivedTrainer;
        this.damageDonePokemon = damageDonePokemon;
        this.image = image;
        this.caught = caught;
        this.shiny = shiny;
    }
}
