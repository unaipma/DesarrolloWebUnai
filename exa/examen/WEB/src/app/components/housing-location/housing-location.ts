import { Component, input, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { HousingLocationInfo } from "src/app/interfaces/housinglocation";
import { HousingService } from "src/app/service/housing-service";
import { AuthService } from "src/app/service/auth.service";


@Component({
  selector: "app-housing-location",
  imports: [RouterLink],
  templateUrl: `./housing-location.html`,
  styleUrl: `./housing-location.css`,
})
export class HousingLocation {
  housingLocation = input.required<HousingLocationInfo>();
  housingService = inject(HousingService);
  authService = inject(AuthService);

  async deleteLocation(id: number, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (confirm("¿Estás seguro de que quieres borrar esta vivienda?")) {
      await this.housingService.deleteHousingLocation(id);
      window.location.reload();
    }
  }
}
