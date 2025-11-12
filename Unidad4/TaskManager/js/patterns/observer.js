// Patrón Observer: permite notificar cambios a los suscriptores
export class Observer {
  constructor() {
    this.subscribers = [];
  }

  subscribe(fn) {
    this.subscribers.push(fn);
  }

  notify(data) {
    this.subscribers.forEach(fn => fn(data));
  }
}
