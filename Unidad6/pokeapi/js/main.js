import { DOMFacade } from "./DomFacade.js";

const tabla = DOMFacade.get("tabla-pokemon");

tabla.addEventListener("click", (e) => {
  if (e.target.id == "battle") {
    window.location.href = "../html/battle.html";
  } else if (e.target.id == "historic") {
    window.location.href = "../html/historic.html";
  } else if (e.target.id == "import") {
    window.location.href = "../html/import.html";
  } else if (e.target.id == "team") {
    window.location.href = "../html/team.html";
  }
});
