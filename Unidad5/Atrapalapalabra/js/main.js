"use strict";
import { DOMFacade } from "../js/DomFacade.js";
import { user } from "../js/user.js";
import { Singleton } from "./Singleton.js";

let formulario = DOMFacade.get("formulario");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  let nombre = DOMFacade.get("user").value;
  let pass = DOMFacade.get("pass").value;
  let data = Singleton.getusuarios();

  let usuarioEncontrado = false;

  if (data.length < 1) {
    data.push(new user(nombre, pass));
    DOMFacade.get("res").textContent = "Usuario registrado";
  } else {
    data.forEach((element) => {
      if (element.nombre === nombre) {
        usuarioEncontrado = true;
        if (element.password === pass) {
          window.location.href = "juego.html";
        } else {
          DOMFacade.get("res").textContent = "Incorrecto";
        }
      }
    });

    if (!usuarioEncontrado) {
      data.push(new user(nombre, pass));
      DOMFacade.get("res").textContent = "Usuario registrado";
    }
  }

  Singleton.setusuarios(data);
});
