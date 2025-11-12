export class Pokemon {
  constructor(name, type, level) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.date = new Date().toLocaleDateString("es-ES");
  }
}
