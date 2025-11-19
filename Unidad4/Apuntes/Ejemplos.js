
//FACTORY

class User {
  constructor(name) { this.name = name; this.role = "user"; }
}

class Admin extends User {
  constructor(name) { super(name); this.role = "admin"; }
}

class Guest extends User {
  constructor(name) { super(name); this.role = "guest"; }
}

export class UserFactory {
  static create(type, name) {
    switch(type) {
      case "admin": return new Admin(name);
      case "guest": return new Guest(name);
      default: return new User(name);
    }
  }
}
//
import { UserFactory } from "./UserFactory.js";

const u1 = UserFactory.create("admin", "Unai");
const u2 = UserFactory.create("guest", "Pedro");

console.log(u1.role); // admin
console.log(u2.role); // guest



//BUILDER
export class PizzaBuilder {
  constructor() { this.pizza = {}; }

  setMasa(tipo) { this.pizza.masa = tipo; return this; }
  setSalsa(tipo) { this.pizza.salsa = tipo; return this; }
  addIngrediente(i) {
    this.pizza.ingredientes = this.pizza.ingredientes || [];
    this.pizza.ingredientes.push(i);
    return this;
  }

  build() { return this.pizza; }
}

//
import { PizzaBuilder } from "./PizzaBuilder.js";

const pizza = new PizzaBuilder()
  .setMasa("fina")
  .setSalsa("tomate")
  .addIngrediente("queso")
  .addIngrediente("jamón")
  .build();

console.log(pizza);




//SINGLETON
export class Config {
  static instance;

  constructor() {
    if (Config.instance) return Config.instance;
    this.settings = { modo: "dev" };
    Config.instance = this;
  }
}

//
import { Config } from "./Config.js";

const c1 = new Config();
const c2 = new Config();

console.log(c1 === c2); // true


//FACADE
export const StorageFacade = {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  load(key) {
    return JSON.parse(localStorage.getItem(key)) || null;
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};

//
StorageFacade.save("tareas", [{id: 1}]);
console.log(StorageFacade.load("tareas"));


//ADAPTER

class MotorViejo {
  arrancar() { console.log("Motor viejo encendido"); }
}

class MotorNuevo {
  start() { console.log("Motor nuevo encendido"); }
}

export class MotorAdapter {
  constructor() { this.motor = new MotorNuevo(); }
  arrancar() { this.motor.start(); }
}
//
import { MotorAdapter } from "./Adapter.js";

const motor = new MotorAdapter();
motor.arrancar();


//DECORATOR
class Mensaje {
  enviar() { return "Mensaje enviado"; }
}

class MensajeEncriptado {
  constructor(mensaje) { this.mensaje = mensaje; }
  enviar() { return this.mensaje.enviar() + " (encriptado)"; }
}

export { Mensaje, MensajeEncriptado };
//
import { Mensaje, MensajeEncriptado } from "./Decorator.js";

const m1 = new Mensaje();
const m2 = new MensajeEncriptado(m1);

console.log(m2.enviar());



//COMPOSITE
class Archivo {
  constructor(nombre) { this.nombre = nombre; }
  mostrar() { return this.nombre; }
}

class Carpeta {
  constructor(nombre) {
    this.nombre = nombre;
    this.hijos = [];
  }
  agregar(elemento) { this.hijos.push(elemento); }
  mostrar() {
    return `${this.nombre}: [${this.hijos.map(h => h.mostrar()).join(", ")}]`;
  }
}

export { Archivo, Carpeta };
//
import { Archivo, Carpeta } from "./Composite.js";

const doc = new Archivo("foto.png");
const carpeta = new Carpeta("Imagenes");
carpeta.agregar(doc);

console.log(carpeta.mostrar());


//STRATEGY

class Suma {
  operar(a, b) { return a + b; }
}

class Resta {
  operar(a, b) { return a - b; }
}

export class Calculadora {
  setEstrategia(e) { this.e = e; }
  calcular(a, b) { return this.e.operar(a, b); }
}

export { Suma, Resta };
//
import { Calculadora, Suma, Resta } from "./Strategy.js";

const calc = new Calculadora();
calc.setEstrategia(new Suma());
console.log(calc.calcular(4, 2)); // 6



//COMMAND
class Encender {
  execute() { console.log("Luz encendida"); }
}

export class Control {
  setCommand(cmd) { this.cmd = cmd; }
  ejecutar() { this.cmd.execute(); }
}

export { Encender };
//
import { Control, Encender } from "./Command.js";

const c = new Control();
c.setCommand(new Encender());
c.ejecutar();


//STATE
class EstadoA {
  manejar() { return "Modo A"; }
}

class EstadoB {
  manejar() { return "Modo B"; }
}

export class Contexto {
  setEstado(e) { this.e = e; }
  ejecutar() { return this.e.manejar(); }
}

export { EstadoA, EstadoB };
//
import { Contexto, EstadoA, EstadoB } from "./State.js";

const ctx = new Contexto();
ctx.setEstado(new EstadoA());
console.log(ctx.ejecutar()); // Modo A



//MEDIATOR
class ChatMediator {
  constructor() { this.usuarios = []; }
  añadir(u) { this.usuarios.push(u); }
  enviar(mensaje, origen) {
    this.usuarios.forEach(u => {
      if (u !== origen) u.recibir(mensaje);
    });
  }
}

export class Usuario {
  constructor(nombre, chat) {
    this.nombre = nombre;
    this.chat = chat;
    chat.añadir(this);
  }

  enviar(msg) { this.chat.enviar(msg, this); }
  recibir(msg) { console.log(this.nombre, "ha recibido:", msg); }
}

export { ChatMediator };
//
import { ChatMediator, Usuario } from "./Mediator.js";

const chat = new ChatMediator();
const u3 = new Usuario("Unai", chat);
const u4 = new Usuario("Aitor", chat);

u1.enviar("Hola!");
