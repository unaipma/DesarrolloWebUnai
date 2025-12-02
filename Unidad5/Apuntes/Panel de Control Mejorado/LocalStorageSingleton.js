export class LocalStorageSingleton {
  constructor() {
    if (LocalStorageSingleton.instance) {
      return LocalStorageSingleton.instance;
    }

    // Default keys for this application
    this.keyUsers = "pcm_users";
    this.keyCurrentUser = "pcm_current_user";

    // Initialize users array if not exists
    if (!localStorage.getItem(this.keyUsers)) {
      localStorage.setItem(this.keyUsers, JSON.stringify([]));
    }

    LocalStorageSingleton.instance = this;
  }

  // Generic methods to match the pattern but adapted for multiple keys
  obtenerUsuarios() {
    return JSON.parse(localStorage.getItem(this.keyUsers)) || [];
  }

  guardarUsuarios(lista) {
    localStorage.setItem(this.keyUsers, JSON.stringify(lista));
  }

  obtenerUsuarioActual() {
    return JSON.parse(localStorage.getItem(this.keyCurrentUser));
  }

  guardarUsuarioActual(usuario) {
    localStorage.setItem(this.keyCurrentUser, JSON.stringify(usuario));
  }

  eliminarUsuarioActual() {
    localStorage.removeItem(this.keyCurrentUser);
  }
}
