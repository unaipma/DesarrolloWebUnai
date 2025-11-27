import Storage from "./storagePattern.js";
import * as V from "./validator.js";

document.addEventListener("DOMContentLoaded", () => {
  const storage = Storage.getInstance();
  const form = document.getElementById("regForm");
  const username = document.getElementById("username");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const password = document.getElementById("password");
  const isAdmin = document.getElementById("isAdmin");
  const err = document.getElementById("err");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // validations
    const u = username.value.trim();
    const n = name.value.trim();
    const em = email.value.trim();
    const ph = phone.value.trim();
    const pw = password.value;

    const vu = V.validateUsernameValue(
      u,
      storage.getAllUsers().map((x) => x.username)
    );
    const vn = V.validateNameValue(n);
    const ve = V.validateEmailValue(em);
    const vp = V.validatePhoneValue(ph);
    const vpw = V.validatePasswordValue(pw);

    if (!vu.ok) {
      username.setCustomValidity(vu.message);
      username.reportValidity();
      return;
    }
    if (!vn.ok) {
      name.setCustomValidity(vn.message);
      name.reportValidity();
      return;
    }
    if (!ve.ok) {
      email.setCustomValidity(ve.message);
      email.reportValidity();
      return;
    }
    if (!vp.ok) {
      phone.setCustomValidity(vp.message);
      phone.reportValidity();
      return;
    }
    if (!vpw.ok) {
      password.setCustomValidity(vpw.message);
      password.reportValidity();
      return;
    }

    const userObj = {
      username: u,
      password: pw,
      name: n,
      email: em,
      phone: ph,
      role: isAdmin.checked ? "admin" : "user",
    };
    const res = storage.addUser(userObj);
    if (!res.ok) {
      err.textContent = res.message;
      return;
    }

    alert("Registro correcto. Ahora inicia sesión.");
    location.href = "login.html";
  });
});
