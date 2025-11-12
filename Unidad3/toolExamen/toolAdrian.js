export class guardarDatos {
  constructor(storage, key) {
    this.storage = storage; // Puede ser localStorage o sessionStorage
    this.key = key; // Nombre de la clave donde se guardan los libros
  }

  // Cargar array desde storage
  load() {
    const data = this.storage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  // Guardar array al storage
  save(array) {
    this.storage.setItem(this.key, JSON.stringify(array));
  }

  // Agregar un libro
  add(libro) {
    const libros = this.load();
    libros.push(libro);
    this.save(libros);
  }

  // Mostrar todos los libros (en consola)
  showAll() {
    console.log(this.load());
  }

  // Vaciar todos los libros
  clear() {
    this.save([]); // Guarda un array vacío
  }
}