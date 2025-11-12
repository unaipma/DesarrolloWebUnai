// Vista de tareas (gestiona el DOM)
export const TaskView = {
  render(tasks, container, observer) {
    container.innerHTML = "";
    if (tasks.length === 0) {
      container.innerHTML = "<li>No hay tareas</li>";
      return;
    }

    tasks.forEach(task => {
      const li = document.createElement("li");
      li.className = `task ${task.type} ${task.done ? "done" : ""}`;
      li.innerHTML = `
        <div class="info">
          <div class="title">${task.title}</div>
          <small>${task.description || ""}</small>
        </div>
        <button data-id="${task.id}" class="toggle">${task.done ? "Desmarcar" : "Marcar"}</button>
        <button data-id="${task.id}" class="delete">Eliminar</button>
      `;
      container.appendChild(li);
    });

    // Manejar botones de acción
    container.addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      if (e.target.classList.contains("toggle")) observer.notify({ action: "toggle", id });
      if (e.target.classList.contains("delete")) observer.notify({ action: "delete", id });
    });
  }
};
