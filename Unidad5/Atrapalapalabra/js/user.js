export class user {
  constructor(nombre, password) {
    this.nombre = nombre;
    this.password = password;
    this.puntuacion=0;
  }
    static setpuntuacion(puntuacion){
      if(puntuacion>this.puntuacion){
        this.puntuacion=puntuacion;
      }
    
  }
}
