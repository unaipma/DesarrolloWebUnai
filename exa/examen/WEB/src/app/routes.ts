import { Routes } from "@angular/router";
import { Details } from "./pages/details/details";
import { Home } from "./pages/home/home";
import { Formulario } from "./components/formulario/formulario";
import { Admin } from "./components/admin/admin";
import { Login } from "./components/login/login";
import { Register } from "./components/register/register";

import { Editar } from "./components/editar/editar";
import { adminGuard, authGuard } from "./guards/auth.guard";

const routeConfig: Routes = [
  {
    path: "login",
    component: Login,
    title: "Login",
  },
  {
    path: "register",
    component: Register,
    title: "Register",
  },
  {
    path: "",
    component: Home,
    title: "Home page",
    canActivate: [authGuard],
  },
  {
    path: "details/:id",
    component: Details,
    title: "Home details",
    canActivate: [authGuard],
  },
  {
    path: "formulario",
    component: Formulario,
    title: "Formulario",
    canActivate: [adminGuard],
  },
  {
    path: "edit/:id",
    component: Editar,
    title: "Edit Housing Location",
    canActivate: [adminGuard],
  },
  {
    path: "admin",
    component: Admin,
    title: "Admin",
    canActivate: [adminGuard],
  },
];
export default routeConfig;
