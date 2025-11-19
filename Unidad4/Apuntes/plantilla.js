🟦 FACTORY METHOD — PLANTILLA
📌 Cuándo usarlo

Cuando quiero centralizar la creación de objetos y decidir qué clase instanciar según el tipo.

🧬 Código plantilla
// Producto base
class Producto {}

// Productos concretos
class ProductoA extends Producto {}
class ProductoB extends Producto {}

// Fábrica
class Factory {
  create(tipo) {
    switch(tipo) {
      case "A": return new ProductoA();
      case "B": return new ProductoB();
      default: return new Producto();
    }
  }
}

// Uso
const f = new Factory();
const obj = f.create("A");

🟦 ABSTRACT FACTORY — PLANTILLA
📌 Cuándo usarlo

Cuando necesito crear familias de objetos relacionados que deben ser compatibles entre sí.

🧬 Código plantilla
// Abstract Factory
class UIFactory {
  crearBoton() {}
  crearInput() {}
}

// Familias concretas
class DarkFactory extends UIFactory {
  crearBoton() { return new BotonDark(); }
  crearInput() { return new InputDark(); }
}

class LightFactory extends UIFactory {
  crearBoton() { return new BotonLight(); }
  crearInput() { return new InputLight(); }
}

// Uso
const fabrica = new DarkFactory();
const btn = fabrica.crearBoton();

🟦 BUILDER — PLANTILLA
📌 Cuándo usarlo

Cuando necesito construir un objeto complejo paso a paso, con muchos parámetros opcionales.

🧬 Código plantilla
class Builder {
  constructor() { this.obj = {}; }

  setA(valor) { this.obj.a = valor; return this; }
  setB(valor) { this.obj.b = valor; return this; }
  setC(valor) { this.obj.c = valor; return this; }

  build() { return this.obj; }
}

// Uso
const obj = new Builder().setA(1).setC(3).build();

🟦 SINGLETON — PLANTILLA
📌 Cuándo usarlo

Cuando solo debe existir una única instancia en toda la aplicación.

🧬 Código plantilla
class Singleton {
  static instancia;
  constructor() {
    if (Singleton.instancia) return Singleton.instancia;
    Singleton.instancia = this;
  }
}

const s1 = new Singleton();
const s2 = new Singleton(); // mismo objeto

🟩 FACADE — PLANTILLA
📌 Cuándo usarlo

Cuando quiero simplificar un sistema complejo con una interfaz única y sencilla.

🧬 Código plantilla
class SistemaComplejo {
  metodo1() {}
  metodo2() {}
  metodo3() {}
}

class Facade {
  constructor() { this.sistema = new SistemaComplejo(); }

  operacionSimple() {
    this.sistema.metodo1();
    this.sistema.metodo3();
  }
}

// Uso
const api = new Facade();
api.operacionSimple();

🟩 ADAPTER — PLANTILLA
📌 Cuándo usarlo

Cuando necesito que dos interfaces incompatibles trabajen juntas.

🧬 Código plantilla
class MotorViejo {
  encenderMotor() {}
}

class MotorNuevo {
  start() {}
}

// Adaptador
class AdaptadorMotorNuevo {
  constructor() { this.motor = new MotorNuevo(); }
  encenderMotor() { this.motor.start(); }
}

// Uso
const motor = new AdaptadorMotorNuevo();
motor.encenderMotor();

🟩 DECORATOR — PLANTILLA
📌 Cuándo usarlo

Cuando quiero añadir funcionalidades a un objeto sin modificar su clase original.

🧬 Código plantilla
class Componente {
  operacion() { return "Base"; }
}

class Decorador {
  constructor(componente) { this.componente = componente; }
  operacion() { return this.componente.operacion(); }
}

class DecoradorExtra extends Decorador {
  operacion() { return super.operacion() + " + Extra"; }
}

// Uso
const base = new Componente();
const decorado = new DecoradorExtra(base);

🟩 COMPOSITE — PLANTILLA
📌 Cuándo usarlo

Cuando tengo estructuras tipo árbol y quiero tratar objetos y colecciones igual.

🧬 Código plantilla
class Component {
  operacion() {}
}

class Hoja extends Component {
  operacion() { return "Hoja"; }
}

class Contenedor extends Component {
  constructor() { super(); this.hijos = []; }
  agregar(c) { this.hijos.push(c); }
  operacion() { return this.hijos.map(h => h.operacion()).join(", "); }
}

🟧 OBSERVER — PLANTILLA
📌 Cuándo usarlo

Cuando varios objetos deben reaccionar automáticamente a un cambio.

🧬 Código plantilla
class Observer {
  constructor() { this.subs = []; }
  subscribe(fn) { this.subs.push(fn); }
  notify(data) { this.subs.forEach(fn => fn(data)); }
}

// Uso
const obs = new Observer();
obs.subscribe(d => console.log("Recibido:", d));

obs.notify("evento");

🟧 STRATEGY — PLANTILLA
📌 Cuándo usarlo

Cuando tengo varios algoritmos intercambiables.

🧬 Código plantilla
class EstrategiaA {
  ejecutar() { return "A"; }
}
class EstrategiaB {
  ejecutar() { return "B"; }
}

class Contexto {
  setEstrategia(e) { this.e = e; }
  operar() { return this.e.ejecutar(); }
}

// Uso
const c = new Contexto();
c.setEstrategia(new EstrategiaA());

🟧 COMMAND — PLANTILLA
📌 Cuándo usarlo

Cuando quiero encapsular acciones (ideal para undo/redo).

🧬 Código plantilla
class Command {
  execute() {}
}

class LuzOn extends Command {
  execute() { console.log("Encender luz"); }
}

class Control {
  setCommand(cmd) { this.cmd = cmd; }
  ejecutar() { this.cmd.execute(); }
}

// Uso
const control = new Control();
control.setCommand(new LuzOn());
control.ejecutar();

🟧 STATE — PLANTILLA
📌 Cuándo usarlo

Cuando un objeto cambia su comportamiento según su estado.

🧬 Código plantilla
class EstadoA {
  manejar() { return "Estado A"; }
}
class EstadoB {
  manejar() { return "Estado B"; }
}

class Contexto {
  setEstado(e) { this.estado = e; }
  ejecutar() { return this.estado.manejar(); }
}

// Uso
const ctx = new Contexto();
ctx.setEstado(new EstadoA());

🟧 MEDIATOR — PLANTILLA
📌 Cuándo usarlo

Cuando varios objetos se comunican entre sí y quieres evitar dependencias entre ellos.

🧬 Código plantilla
class Mediador {
  enviar(msg, origen) {
    // decide quién recibe el mensaje
  }
}

class Colega {
  constructor(m) { this.mediador = m; }
  enviar(msg) { this.mediador.enviar(msg, this); }
}