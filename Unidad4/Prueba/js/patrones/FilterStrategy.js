// Estrategia base
export class FilterStrategy {
  filter(pokemons) { 
    return pokemons; 
  }
}

// Filtrar por tipo
export class TypeFilter extends FilterStrategy {
  constructor(type) {
    super();
    this.type = type;
  }

  filter(pokemons) {
    return pokemons.filter(p => p.tipo === this.type);
  }
}

// Filtrar por nivel
export class LevelFilter extends FilterStrategy {
  constructor(level) {
    super();
    this.level = level;
  }

  filter(pokemons) {
    return pokemons.filter(p => p.nivel == this.level);
  }
}

// Mostrar todos
export class AllFilter extends FilterStrategy {
  filter(pokemons) {
    return pokemons;
  }
}
