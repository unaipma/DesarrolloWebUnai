import { DOMFacade } from "./DomFacade.js";
import { UserSingleton } from "./userSingleton.js";
import { Usuario } from "./Usuario.js";

const form = DOMFacade.get("formRegister");
const nombre = DOMFacade.get("name");
const email = DOMFacade.get("email");
const phone = DOMFacade.get("phone");
const username = DOMFacade.get("username");
const password = DOMFacade.get("password");

const USERS = ["rafa", "jorge", "ignacio", "pedro"];

DOMFacade.on(form, "submit", (e) => {
  validateName();
  validateEmail();
  validatePhone();
  validateUsername();
  validatePassword();

  if (!form.checkValidity()) {
    e.preventDefault();
    form.reportValidity();
    return;
  }

  const user = new Usuario(
    nombre.value,
    email.value,
    phone.value,
    username.value,
    password.value
  );

  UserSingleton.setUser(user);

  alert("Registrado correctamente");
  window.location.href = "index.html";
});

// VALIDACIONES
function validateUsername() {
  if (username.value.length === 0) {
    username.setCustomValidity("Introduce nombre usuario");
  } else if (USERS.includes(username.value.toLowerCase())) {
    username.setCustomValidity("El usuario existe en nuestra BBDD");
  } else {
    username.setCustomValidity("");
  }
}

function validateName() {
  nombre.value.length < 3
    ? nombre.setCustomValidity("Al menos 3 caracteres")
    : nombre.setCustomValidity("");
}

function validateEmail() {
  const regex = /^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$/;
  !regex.test(email.value)
    ? email.setCustomValidity("Email no válido")
    : email.setCustomValidity("");
}

function validatePhone() {
  const phoneRegex = /^(?:\\+34\\s?)?[6789]\\d{2}\\s?\\d{3}\\s?\\d{3}$/;

  !phoneRegex.test(phone.value)
    ? phone.setCustomValidity("Introduce un teléfono español válido (9 cifras)")
    : phone.setCustomValidity("");
}

function validatePassword() {
  password.value.length < 4
    ? password.setCustomValidity("La contraseña debe tener al menos 4 caracteres")
    : password.setCustomValidity("");
}
