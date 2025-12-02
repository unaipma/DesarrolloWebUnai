// Estado
let usuarios = JSON.parse(localStorage.getItem("users")) || [];
let usuarioActual = JSON.parse(localStorage.getItem("currentUser")) || null;

// Elementos del DOM
const contenedorAuth = document.getElementById("auth-container");
const formularioLogin = document.getElementById("login-form");
const formularioRegistro = document.getElementById("register-form");
const dashboard = document.getElementById("dashboard");
const formLogin = document.getElementById("form-login");
const formRegistro = document.getElementById("form-register");
const btnMostrarRegistro = document.getElementById("show-register");
const btnMostrarLogin = document.getElementById("show-login");
const btnCerrarSesion = document.getElementById("logout-btn");
const mostradorUsuarioActual = document.getElementById("current-user-display");
const rejillaUsuarios = document.getElementById("users-grid");

// Elementos del Modal de Edición
const modalEditar = document.getElementById("edit-modal");
const formEditarUsuario = document.getElementById("form-edit-user");
const inputEditarNombre = document.getElementById("edit-username");
const inputEditarNombreOriginal = document.getElementById(
  "edit-original-username"
);
const btnCancelarEdicion = document.getElementById("cancel-edit");

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  if (usuarioActual) {
    mostrarDashboard();
  } else {
    mostrarLogin();
  }
});

// Listeners de Eventos
btnMostrarRegistro.addEventListener("click", (e) => {
  e.preventDefault();
  mostrarRegistro();
});

btnMostrarLogin.addEventListener("click", (e) => {
  e.preventDefault();
  mostrarLogin();
});

formRegistro.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombreUsuario = document.getElementById("reg-username").value;
  const contrasena = document.getElementById("reg-password").value;
  const rol = document.getElementById("reg-role").value;
  registrarUsuario(nombreUsuario, contrasena, rol);
});

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombreUsuario = document.getElementById("login-username").value;
  const contrasena = document.getElementById("login-password").value;
  iniciarSesion(nombreUsuario, contrasena);
});

btnCerrarSesion.addEventListener("click", cerrarSesion);

btnCancelarEdicion.addEventListener("click", () => {
  modalEditar.classList.add("hidden");
});

formEditarUsuario.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombreOriginal = inputEditarNombreOriginal.value;
  const nuevoNombre = inputEditarNombre.value;
  guardarEdicionUsuario(nombreOriginal, nuevoNombre);
});

// Métodos de Ayuda (Helpers) Reutilizables
// Se han movido a DOMBuilder.js

// Funciones de Autenticación
function registrarUsuario(nombre, contrasena, rol) {
  if (usuarios.find((u) => u.username === nombre)) {
    alert("El usuario ya existe");
    return;
  }

  const nuevoUsuario = {
    username: nombre,
    password: contrasena,
    role: rol,
  };

  usuarios.push(nuevoUsuario);
  guardarUsuarios();
  alert("Registro exitoso. Por favor inicia sesión.");
  mostrarLogin();
  formRegistro.reset();
}

function iniciarSesion(nombre, contrasena) {
  const usuario = usuarios.find(
    (u) => u.username === nombre && u.password === contrasena
  );
  if (usuario) {
    usuarioActual = usuario;
    localStorage.setItem("currentUser", JSON.stringify(usuarioActual));
    mostrarDashboard();
    formLogin.reset();
  } else {
    alert("Credenciales incorrectas");
  }
}

function cerrarSesion() {
  usuarioActual = null;
  localStorage.removeItem("currentUser");
  mostrarLogin();
}

// Funciones de Navegación
function mostrarLogin() {
  contenedorAuth.classList.remove("hidden");
  formularioLogin.classList.add("active");
  formularioLogin.classList.remove("hidden");
  formularioRegistro.classList.add("hidden");
  formularioRegistro.classList.remove("active");
  dashboard.classList.add("hidden");
}

function mostrarRegistro() {
  formularioLogin.classList.add("hidden");
  formularioLogin.classList.remove("active");
  formularioRegistro.classList.add("active");
  formularioRegistro.classList.remove("hidden");
}

function mostrarDashboard() {
  contenedorAuth.classList.add("hidden");
  dashboard.classList.remove("hidden");
  mostradorUsuarioActual.textContent = `Hola, ${usuarioActual.username} (${usuarioActual.role})`;

  renderizarUsuarios();
}

// Gestión de Datos
function guardarUsuarios() {
  localStorage.setItem("users", JSON.stringify(usuarios));
  // Actualizar usuario actual si es el que se modificó
  if (usuarioActual) {
    const actualActualizado = usuarios.find(
      (u) => u.username === usuarioActual.username
    );
    if (actualActualizado) {
      usuarioActual = actualActualizado;
      localStorage.setItem("currentUser", JSON.stringify(usuarioActual));
    }
  }
}

// Renderizado
function renderizarUsuarios() {
  DOMBuilder.limpiarContenedor(rejillaUsuarios);

  usuarios.forEach((usuario) => {
    // No mostrarse a uno mismo
    if (usuario.username === usuarioActual.username) return;

    const tarjeta = DOMBuilder.crearElemento("div", "user-card");

    const inicial = usuario.username.charAt(0).toUpperCase();

    // Cabecera de la tarjeta
    const cabecera = DOMBuilder.crearElemento("div", "user-card-header");
    const avatar = DOMBuilder.crearElemento("div", "avatar", inicial);
    const infoUsuario = DOMBuilder.crearElemento("div", "user-info");
    const nombreH4 = DOMBuilder.crearElemento("h4", [], usuario.username);
    const rolSpan = DOMBuilder.crearElemento("span", "user-role", usuario.role);

    infoUsuario.appendChild(nombreH4);
    infoUsuario.appendChild(rolSpan);
    cabecera.appendChild(avatar);
    cabecera.appendChild(infoUsuario);

    // Acciones de la tarjeta
    const acciones = DOMBuilder.crearElemento("div", "card-actions");

    if (usuarioActual.role === "admin") {
      const btnEditar = DOMBuilder.crearElemento(
        "button",
        ["btn-sm", "btn-edit"],
        "Editar",
        {
          "data-action": "editar",
          "data-username": usuario.username,
        }
      );

      const btnEliminar = DOMBuilder.crearElemento(
        "button",
        ["btn-sm", "btn-delete"],
        "Eliminar",
        {
          "data-action": "eliminar",
          "data-username": usuario.username,
        }
      );

      acciones.appendChild(btnEditar);
      acciones.appendChild(btnEliminar);
    } else {
      const mensaje = DOMBuilder.crearElemento("span", [], "Usuario del sistema");
      mensaje.style.fontSize = "0.8rem";
      mensaje.style.color = "var(--text-secondary)";
      acciones.appendChild(mensaje);
    }

    tarjeta.appendChild(cabecera);
    tarjeta.appendChild(acciones);

    rejillaUsuarios.appendChild(tarjeta);
  });
}

// Delegación de Eventos
rejillaUsuarios.addEventListener("click", (e) => {
  const boton = e.target.closest("button");
  if (!boton) return;

  const accion = boton.dataset.action;
  const nombreUsuario = boton.dataset.username;

  if (accion === "eliminar") {
    eliminarUsuario(nombreUsuario);
  } else if (accion === "editar") {
    abrirModalEdicion(nombreUsuario);
  }
});

// Acciones de Administrador
function eliminarUsuario(nombreUsuario) {
  if (confirm(`¿Estás seguro de eliminar a ${nombreUsuario}?`)) {
    usuarios = usuarios.filter((u) => u.username !== nombreUsuario);
    guardarUsuarios();
    renderizarUsuarios();
  }
}

function abrirModalEdicion(nombreUsuario) {
  inputEditarNombreOriginal.value = nombreUsuario;
  inputEditarNombre.value = nombreUsuario;
  modalEditar.classList.remove("hidden");
}

function guardarEdicionUsuario(nombreOriginal, nuevoNombre) {
  if (nombreOriginal === nuevoNombre) {
    modalEditar.classList.add("hidden");
    return;
  }

  if (usuarios.find((u) => u.username === nuevoNombre)) {
    alert("El nombre de usuario ya está en uso");
    return;
  }

  const indiceUsuario = usuarios.findIndex(
    (u) => u.username === nombreOriginal
  );
  if (indiceUsuario !== -1) {
    usuarios[indiceUsuario].username = nuevoNombre;

    guardarUsuarios();
    renderizarUsuarios();
    modalEditar.classList.add("hidden");
  }
}
