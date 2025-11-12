import { Task } from "../models/task.js";

// Clases hijas especializadas
class UrgentTask extends Task {
  constructor(title, description) {
    super(title, description);
    this.type = "urgent";
    this.priority = "alta";
  }
}

class ScheduledTask extends Task {
  constructor(title, description) {
    super(title, description);
    this.type = "scheduled";
    this.scheduledDate = new Date(Date.now() + 86400000); // mañana
  }
}

// Patrón Factory: centraliza la creación de tareas
export class TaskFactory {
  static create(type, title, description) {
    switch (type) {
      case "urgent": return new UrgentTask(title, description);
      case "scheduled": return new ScheduledTask(title, description);
      default: return new Task(title, description);
    }
  }
}
