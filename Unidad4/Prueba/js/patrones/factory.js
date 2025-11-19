
class PokemonFuego{
    constructor(nombre, nivel){
        this.nombre=nombre;
        this.tipo="fuego";
        this.nivel=nivel;
    }
}

class PokemonPlanta{
    constructor(nombre, nivel){
        this.nombre=nombre;
        this.tipo="planta";
        this.nivel=nivel;
    }
}

class PokemonAgua{
    constructor(nombre, nivel){
        this.nombre=nombre;
        this.tipo="agua";
        this.nivel=nivel;
    }
}


export function factory(tipo, nombre, nivel){
    switch (tipo) {
        case "fuego":
            return new PokemonFuego(nombre, nivel);
        case "agua":
            return new PokemonAgua(nombre, nivel);
        case "planta":
            return new PokemonPlanta(nombre, nivel);
        default:
            return null;
    }
}




