// Clase base para todas las tareas
export class Task {
  constructor(title, description) {
    this.id = Date.now();
    this.title = title;
    this.description = description;
    this.done = false;
    this.createdAt = new Date();
    this.type = "normal";
  }
}
