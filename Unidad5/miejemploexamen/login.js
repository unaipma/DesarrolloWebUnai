import { DOMFacade } from "./DomFacade.js";
import { UserSingleton } from "./userSingleton.js";

const formLogin = DOMFacade.get("formLogin");
const userLogin = DOMFacade.get("userLogin");
const passLogin = DOMFacade.get("passLogin");

DOMFacade.on(formLogin, "submit", (e) => {
  e.preventDefault();

  const user = UserSingleton.getUser();

  if (!user) {
    alert("No hay usuarios registrados.");
    return;
  }

  if (user.username === userLogin.value && user.password === passLogin.value) {
    window.location.href = "main.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});
