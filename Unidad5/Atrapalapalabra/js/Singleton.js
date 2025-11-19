export class Singleton {
  constructor() {
    if (!this.instance) {
      this.instance = this;
    }
    return this.instance;
  }

  static getusuarios() {
    const data = localStorage.getItem("usuarios");
    return data ? JSON.parse(data) : [];
  }

  static setusuarios(data) {
    localStorage.setItem("usuarios", JSON.stringify(data));
  }
}
