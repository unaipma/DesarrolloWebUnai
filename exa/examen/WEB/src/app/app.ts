import { Component, inject } from "@angular/core";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "./service/auth.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: `./app.html`,
  styleUrls: ["./app.css"],
})
export class App {
  title = "default";
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
