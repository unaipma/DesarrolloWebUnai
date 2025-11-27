// Storage singleton (Module + Singleton pattern)
// Ahora maneja varios usuarios y sesiones; guarda lista en localStorage key 'users'
const Storage = (function () {
  let instance;

  function loadUsers() {
    try {
      const raw = localStorage.getItem("users");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveUsers(arr) {
    localStorage.setItem("users", JSON.stringify(arr));
  }

  function create() {
    return {
      // users are objects: { username, password, name, email, phone, role }
      addUser(userObj) {
        const arr = loadUsers();
        if (arr.find((u) => u.username === userObj.username))
          return { ok: false, message: "Usuario ya existe" };
        arr.push(userObj);
        saveUsers(arr);
        return { ok: true };
      },
      getUser(username) {
        const arr = loadUsers();
        return arr.find((u) => u.username === username) || null;
      },
      updateUser(username, data) {
        const arr = loadUsers();
        const i = arr.findIndex((u) => u.username === username);
        if (i === -1) return { ok: false, message: "Usuario no existe" };
        arr[i] = Object.assign({}, arr[i], data);
        saveUsers(arr);
        return { ok: true };
      },
      deleteUser(username) {
        let arr = loadUsers();
        arr = arr.filter((u) => u.username !== username);
        saveUsers(arr);
        return { ok: true };
      },
      getAllUsers() {
        return loadUsers();
      },
      // session helpers
      setLogged(username) {
        localStorage.setItem("mulweb_logged", username);
      },
      getLogged() {
        return localStorage.getItem("mulweb_logged");
      },
      clearLogged() {
        localStorage.removeItem("mulweb_logged");
      },
      // admin flag
      setAdminLogged(username) {
        localStorage.setItem("mulweb_admin_logged", username);
      },
      getAdminLogged() {
        return localStorage.getItem("mulweb_admin_logged");
      },
      clearAdminLogged() {
        localStorage.removeItem("mulweb_admin_logged");
      },
      // convenience
      hasAnyUser() {
        return loadUsers().length > 0;
      },
    };
  }

  return {
    getInstance() {
      if (!instance) instance = create();
      return instance;
    },
  };
})();

export default Storage;
