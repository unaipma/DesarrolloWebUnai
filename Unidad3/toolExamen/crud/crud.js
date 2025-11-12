// =============================
// 🧾 CRUD UNIVERSAL STORAGE
// =============================

// C = Crear o Actualizar
function crearDato(tipo, clave, valor) {
  const storage = tipo === "local" ? localStorage : sessionStorage;
  storage.setItem(clave, valor);
}

// R = Leer
function leerDato(tipo, clave) {
  const storage = tipo === "local" ? localStorage : sessionStorage;
  return storage.getItem(clave);
}

// U = Actualizar (igual que crear)
function actualizarDato(tipo, clave, nuevoValor) {
  const storage = tipo === "local" ? localStorage : sessionStorage;
  if (storage.getItem(clave) !== null) {
    storage.setItem(clave, nuevoValor);
    return true; // actualizado
  } else {
    return false; // no existe
  }
}

// D = Borrar
function borrarDato(tipo, clave) {
  const storage = tipo === "local" ? localStorage : sessionStorage;
  storage.removeItem(clave);
}

// Mostrar todo (lectura completa)
function mostrarTodo(tipo) {
  const storage = tipo === "local" ? localStorage : sessionStorage;
  const resultado = {};
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    resultado[key] = storage.getItem(key);
  }
  return resultado; // Devuelve objeto con todos los datos
}

// Vaciar todo
function limpiarStorage(tipo) {
  const storage = tipo === "local" ? localStorage : sessionStorage;
  storage.clear();
}



crearDato("local", "nombre", "Unai");
crearDato("session", "color", "azul");

console.log(leerDato("local", "nombre")); // "Unai"

actualizarDato("local", "nombre", "Unai Pastor");

borrarDato("session", "color");

console.log(mostrarTodo("local")); // {nombre: "Unai Pastor"}

limpiarStorage("session"); // borra todo el sessionStorage
