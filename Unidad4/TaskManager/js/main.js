import { TaskFactory } from "./patterns/factory.js";
import { StorageFacade } from "./patterns/facade.js";
import { Observer } from "./patterns/observer.js";
import { TaskView } from "./ui/view.js";

const form = document.querySelector("#task-form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const type = document.querySelector("#type");
const listContainer = document.querySelector("#task-list");

let tasks = StorageFacade.load();
const observer = new Observer();

// Render inicial
TaskView.render(tasks, listContainer, observer);

// Suscripción a cambios
observer.subscribe((event) => {
  if (event.action === "toggle") {
    tasks = tasks.map(t => t.id === event.id ? { ...t, done: !t.done } : t);
  } else if (event.action === "delete") {
    tasks = tasks.filter(t => t.id !== event.id);
  }
  StorageFacade.save(tasks);
  TaskView.render(tasks, listContainer, observer);
});

// Añadir tarea
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = TaskFactory.create(type.value, title.value, description.value);
  tasks.push(task);
  StorageFacade.save(tasks);
  TaskView.render(tasks, listContainer, observer);
  form.reset();
});
