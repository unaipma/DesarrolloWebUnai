import { Routes } from "@angular/router";
import { Details } from "./pages/details/details";
import { Home } from "./pages/home/home";
import { Formulario } from "./components/formulario/formulario";
import { Admin } from "./components/admin/admin";

import { Editar } from "./components/editar/editar";

const routeConfig: Routes = [
  {
    path: "",
    component: Home,
    title: "Home page",
  },
  {
    path: "details/:id",
    component: Details,
    title: "Home details",
  },
  {
    path: "formulario",
    component: Formulario,
    title: "Formulario",
  },
  {
    path: "edit/:id",
    component: Editar,
    title: "Edit Housing Location",
  },
  {
    path: "admin",
    component: Admin,
    title: "Admin",
  },
];
export default routeConfig;
