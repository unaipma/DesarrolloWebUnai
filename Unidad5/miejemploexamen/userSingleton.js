export class UserSingleton {
  constructor() {
    if (UserSingleton.instance) {
      return UserSingleton.instance;
    }
    UserSingleton.instance = this;
  }

  static getUser() {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  }

  static setUser(data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  static removeUser() {
    localStorage.removeItem("user");
  }
}
