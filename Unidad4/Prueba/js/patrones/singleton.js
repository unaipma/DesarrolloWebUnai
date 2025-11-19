export class PokemonArray {
    constructor() {
        if (PokemonArray.instance) return PokemonArray.instance;
        this.array = [];
        PokemonArray.instance = this;
    }

    push(item) {
        this.array.push(item);
    }

    getAll() {
        return this.array;
    }

    setAll(arr) {
        this.array = arr;
    }
}
