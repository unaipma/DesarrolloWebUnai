export class Singleton {
  constructor() {
    if (!this.instance) {
      this.instance = this;
    }
    return this.instance;
  }

  static getTrainData() {
    const data = localStorage.getItem("trenes");
    return data ? JSON.parse(data) : [];
  }

  static setTrainData(data) {
    localStorage.setItem("trenes", JSON.stringify(data));
  }
}
