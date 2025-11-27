import Storage from "./storagePattern.js";
import * as V from "./validator.js";

document.addEventListener("DOMContentLoaded", () => {
  const storage = Storage.getInstance();
  const tbody = document.getElementById("tbodyUsers");
  const btnCreate = document.getElementById("btnCreate");
  const btnRefresh = document.getElementById("btnRefresh");
  const dlg = document.getElementById("dlgUser");
  const form = document.getElementById("userForm");
  const btnCancel = document.getElementById("btnCancel");

  const fields = {
    username: document.getElementById("u_username"),
    name: document.getElementById("u_name"),
    email: document.getElementById("u_email"),
    phone: document.getElementById("u_phone"),
    password: document.getElementById("u_password"),
    role: document.getElementById("u_role"),
  };

  let editing = null;

  function render() {
    const users = storage.getAllUsers();
    tbody.innerHTML = "";
    users.forEach((u) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${u.username}</td><td>${u.name}</td><td>${
        u.email
      }</td><td>${u.phone}</td><td>${u.role || "user"}</td><td>
        <button class="edit" data-username="${u.username}">Editar</button>
        <button class="del" data-username="${u.username}">Borrar</button>
      </td>`;
      tbody.appendChild(tr);
    });
  }

  tbody.addEventListener("click", (e) => {
    const t = e.target;
    if (t.matches("button.edit")) {
      const uname = t.dataset.username;
      const u = storage.getUser(uname);
      if (!u) return alert("Usuario no encontrado");
      editing = uname;
      fields.username.value = u.username;
      fields.name.value = u.name;
      fields.email.value = u.email;
      fields.phone.value = u.phone;
      fields.password.value = u.password;
      fields.role.value = u.role || "user";
      fields.username.disabled = true;
      dlg.showModal();
    }
    if (t.matches("button.del")) {
      const uname = t.dataset.username;
      if (!confirm("Borrar usuario " + uname + "?")) return;
      storage.deleteUser(uname);
      render();
    }
  });

  btnCreate.addEventListener("click", () => {
    editing = null;
    form.reset();
    fields.username.disabled = false;
    dlg.showModal();
  });

  btnRefresh.addEventListener("click", render);
  btnCancel.addEventListener("click", () => dlg.close());

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const u = fields.username.value.trim();
    const n = fields.name.value.trim();
    const em = fields.email.value.trim();
    const ph = fields.phone.value.trim();
    const pw = fields.password.value;
    const ro = fields.role.value;

    // validations
    // construir la lista de usernames bloqueados; si estamos editando, excluir
    // el username original para que no se considere duplicado cuando no cambia
    const allUsernames = storage.getAllUsers().map((x) => x.username);
    const blocked = editing
      ? allUsernames.filter((un) => un !== editing)
      : allUsernames;
    const vu = V.validateUsernameValue(u, blocked);
    const vn = V.validateNameValue(n);
    const ve = V.validateEmailValue(em);
    const vp = V.validatePhoneValue(ph);
    const vpw = V.validatePasswordValue(pw);
    if (!vu.ok) {
      fields.username.setCustomValidity(vu.message);
      fields.username.reportValidity();
      return;
    }
    if (!vn.ok) {
      fields.name.setCustomValidity(vn.message);
      fields.name.reportValidity();
      return;
    }
    if (!ve.ok) {
      fields.email.setCustomValidity(ve.message);
      fields.email.reportValidity();
      return;
    }
    if (!vp.ok) {
      fields.phone.setCustomValidity(vp.message);
      fields.phone.reportValidity();
      return;
    }
    if (!vpw.ok) {
      fields.password.setCustomValidity(vpw.message);
      fields.password.reportValidity();
      return;
    }

    const userObj = {
      username: u,
      password: pw,
      name: n,
      email: em,
      phone: ph,
      role: ro,
    };
    if (editing) {
      storage.updateUser(editing, userObj);
    } else {
      const res = storage.addUser(userObj);
      if (!res.ok) {
        alert(res.message);
        return;
      }
    }
    dlg.close();
    render();
  });

  render();
});
