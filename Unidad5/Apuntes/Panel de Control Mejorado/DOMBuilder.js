class DOMBuilder {
  /**
   * Crea un elemento del DOM con clases, texto y atributos opcionales.
   * @param {string} etiqueta - La etiqueta HTML (ej. 'div', 'button').
   * @param {string|string[]} clases - Clase o array de clases CSS.
   * @param {string} texto - Texto interior del elemento.
   * @param {Object} atributos - Objeto con atributos (ej. { type: 'text', id: 'mi-id' }).
   * @returns {HTMLElement} El elemento creado.
   */
  static crearElemento(etiqueta, clases = [], texto = "", atributos = {}) {
    const elemento = document.createElement(etiqueta);

    if (Array.isArray(clases)) {
      clases.forEach((clase) => elemento.classList.add(clase));
    } else if (clases) {
      elemento.classList.add(clases);
    }

    if (texto) {
      elemento.textContent = texto;
    }

    for (const [clave, valor] of Object.entries(atributos)) {
      if (clave.startsWith('data-')) {
        elemento.setAttribute(clave, valor);
      } else if (clave === 'onclick') {
        // If it's a string function name, we can't easily set it as an attribute safely without eval or window access
        // Better to handle events via addEventListener in the main script, but for compatibility with current structure:
        elemento.setAttribute('onclick', valor);
      } else {
        elemento[clave] = valor;
        // Also set attribute for styling/selectors if needed
        elemento.setAttribute(clave, valor);
      }
    }

    return elemento;
  }

  /**
   * Limpia todo el contenido de un contenedor.
   * @param {HTMLElement} contenedor - El elemento a limpiar.
   */
  static limpiarContenedor(contenedor) {
    while (contenedor.firstChild) {
      contenedor.removeChild(contenedor.firstChild);
    }
  }
}
