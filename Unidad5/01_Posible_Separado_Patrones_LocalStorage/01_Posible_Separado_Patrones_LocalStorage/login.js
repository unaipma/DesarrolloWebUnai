// Login con validación inspirada en ApiValidation/main.js
import Storage from "./storagePattern.js";
import * as V from "./validator.js";

// Login simple: solo email + contraseña. Registro está en register.html
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const title = document.getElementById("title");
  const storage = Storage.getInstance();

  // si no hay usuarios, redirigir al registro
  if (!storage.hasAnyUser()) {
    location.href = "register.html";
    return;
  }

  title.textContent = "Iniciar sesión";
  container.innerHTML = `
    <form id="loginForm" novalidate>
      <label for="email">Correo</label>
      <input id="email" name="email" type="email" required autocomplete="username" />
      <label for="password">Contraseña</label>
      <input id="password" name="password" type="password" required autocomplete="current-password" />
      <div class="actions">
        <button type="submit">Entrar</button>
      </div>
      <p id="err" class="error" aria-live="polite"></p>
    </form>`;

  const form = document.getElementById("loginForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const err = document.getElementById("err");

  // limpiar validities al escribir
  email.addEventListener("input", () => {
    email.setCustomValidity("");
    err.textContent = "";
  });
  password.addEventListener("input", () => {
    password.setCustomValidity("");
    err.textContent = "";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const em = email.value.trim();
    const pw = password.value;
    const users = storage.getAllUsers();
    const found = users.find((u) => u.email === em);
    if (!found) {
      email.setCustomValidity("No existe una cuenta con ese correo");
      email.reportValidity();
      return;
    }
    if (found.password !== pw) {
      password.setCustomValidity("Correo o contraseña incorrectos");
      password.reportValidity();
      setTimeout(() => password.setCustomValidity(""), 1500);
      return;
    }
    // iniciar sesión: guardamos nombre de usuario como sesión
    storage.setLogged(found.username);
    // si es admin, redirigir al panel de administrador
    if (found.role && found.role === "admin") {
      storage.setAdminLogged(found.username);
      location.href = "admin.html";
      return;
    }
    location.href = "dashboard.html";
  });
});
