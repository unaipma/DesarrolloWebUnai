const form = document.getElementById("formRegister");
const nombre = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const username = document.getElementById("username");
const password = document.getElementById("password");

const USERS = ["rafa", "jorge", "ignacio", "pedro"]; // usuarios ya existentes

form.addEventListener("submit", (e) => {
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

  // Guardar usuario
  localStorage.setItem("user", JSON.stringify({
    name: nombre.value,
    email: email.value,
    phone: phone.value,
    username: username.value,
    password: password.value    // ← ahora sí guardamos la contraseña real
  }));

  alert("Registrado correctamente");
  window.location.href = "index.html";
});

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
  if (nombre.value.length < 3) {
    nombre.setCustomValidity("Al menos 3 caracteres");
  } else {
    nombre.setCustomValidity("");
  }
}

function validateEmail() {
  const regex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email.value)) {
    email.setCustomValidity("Email no válido");
  } else {
    email.setCustomValidity("");
  }
}

function validatePhone() {
  const phoneRegex = /^(?:\+34\s?)?[6789]\d{2}\s?\d{3}\s?\d{3}$/;

  if (!phoneRegex.test(phone.value)) {
    phone.setCustomValidity("Introduce un teléfono español válido (9 cifras). Ej: 612345678");
  } else {
    phone.setCustomValidity("");
  }
}

function validatePassword() {
  if (password.value.length < 4) {
    password.setCustomValidity("La contraseña debe tener al menos 4 caracteres");
  } else {
    password.setCustomValidity("");
  }
}
