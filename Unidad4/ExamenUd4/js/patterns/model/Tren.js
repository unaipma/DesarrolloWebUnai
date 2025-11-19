export class Tren {
  constructor(nombre, tipo, velocidad) {
    this.date = new Date().toLocaleDateString("es-ES");
    this.nombre = nombre;
    this.tipo = tipo;
    this.velocidad = velocidad;
  }
}
