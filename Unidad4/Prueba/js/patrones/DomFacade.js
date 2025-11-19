
export const DOMFacade = {
  /**
   * Seleccionar elemento
   */
  get(selector) {
    return document.getElementById(selector);
  },

  /**
   * Seleccionar todos
   */
  getAll(selector) {
    return Array.from(document.querySelectorAll(selector));
  },

  /**
   * Crear elemento con clases opcionales
   */
  create(tag, classes = []) {
    const element = document.createElement(tag);
    classes.forEach(c => element.classList.add(c));
    return element;
  },

  /**
   * Cambiar texto
   */
  text(selectorOrElement, value) {
    const el = typeof selectorOrElement === "string"
      ? this.get(selectorOrElement)
      : selectorOrElement;
    el.textContent = value;
  },

  /**
   * Cambiar HTML interno
   */
  html(selectorOrElement, value) {
    const el = typeof selectorOrElement === "string"
      ? this.get(selectorOrElement)
      : selectorOrElement;
    el.innerHTML = value;
  },

  /**
   * Añadir elementos al DOM
   */
  append(parent, ...children) {
    const el = typeof parent === "string"
      ? this.get(parent)
      : parent;
    children.forEach(ch => el.appendChild(ch));
  },

  /**
   * Escuchar eventos
   */
  on(selectorOrElement, event, callback) {
    const el = typeof selectorOrElement === "string"
      ? this.get(selectorOrElement)
      : selectorOrElement;
    el.addEventListener(event, callback);
  },

  /**
   * Eliminar elemento
   */
  remove(selectorOrElement) {
    const el = typeof selectorOrElement === "string"
      ? this.get(selectorOrElement)
      : selectorOrElement;
    el.remove();
  },

  appendText(parent, text) {
    const el = typeof parent === "string" ? this.get(parent) : parent;
    const li = document.createElement("li");
    li.textContent = text;
    el.appendChild(li);
},
clear(parent) {
    const el = typeof parent === "string" ? this.get(parent) : parent;
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
  }

};
