import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingLocationInfo } from '../../interfaces/housinglocation';
import { HousingService } from '../../service/housing-service';

@Component({
  selector: 'app-editar',
  imports: [ReactiveFormsModule],
  templateUrl: './editar.html',
  styleUrl: './editar.css',
})
export class Editar {
  housingService: HousingService = inject(HousingService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  housingLocationId = "";

  applyForm = new FormGroup({
    name: new FormControl(""),
    city: new FormControl(""),
    state: new FormControl(""),
    photo: new FormControl(""),
    availableUnits: new FormControl(""),
    wifi: new FormControl(false),
    laundry: new FormControl(false),
  });

  constructor() {
    this.housingLocationId = this.route.snapshot.params["id"];
    this.housingService.getHousingLocationById(this.housingLocationId).then(house => {
      if (house) {
        this.applyForm.patchValue({
          name: house.name,
          city: house.city,
          state: house.state,
          photo: house.photo,
          availableUnits: String(house.availableUnits),
          wifi: house.wifi,
          laundry: house.laundry
        });
      }
    });
  }

  async submitApplication() {
    const dataRequest: HousingLocationInfo = {
      id: Number(this.housingLocationId), // Keep the same ID
      name: this.applyForm.value.name ?? "",
      city: this.applyForm.value.city ?? "",
      state: this.applyForm.value.state ?? "",
      photo: this.applyForm.value.photo ?? "",
      availableUnits: Number(this.applyForm.value.availableUnits),
      wifi: Boolean(this.applyForm.value.wifi),
      laundry: Boolean(this.applyForm.value.laundry),
    };

    await this.housingService.updateHousingLocation(this.housingLocationId, dataRequest);
    alert("House updated successfully!");
    this.router.navigate(['/admin']);
  }
}
