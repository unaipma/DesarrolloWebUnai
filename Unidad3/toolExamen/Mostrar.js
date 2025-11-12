// Mostrar un texto en un <div> o <p> existente
function mostrarTexto(idElemento, texto) {
  const destino = document.getElementById(idElemento);
  destino.textContent = texto;
}

// Mostrar lista completa de datos (session o local)
function mostrarStorage(tipo, idElemento) {
  const destino = document.getElementById(idElemento);
  destino.innerHTML = ""; // limpiar antes

  const lista = document.createElement("ul");
  const storage = tipo === "local" ? localStorage : sessionStorage;

  for (let i = 0; i < storage.length; i++) {
    const clave = storage.key(i);
    const valor = storage.getItem(clave);

    const li = document.createElement("li");
    li.textContent = `${clave}: ${valor}`;
    lista.appendChild(li);
  }

  destino.appendChild(lista);
}
