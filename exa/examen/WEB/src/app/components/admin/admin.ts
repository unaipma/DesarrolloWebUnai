import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HousingService } from '../../service/housing-service';
import { HousingLocationInfo } from '../../interfaces/housinglocation';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  housingLocationList: HousingLocationInfo[] = [];
  housingService: HousingService = inject(HousingService);
  changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocationInfo[]) => {
        this.housingLocationList = housingLocationList;
        this.changeDetectorRef.markForCheck();
      });
  }

  deleteHousingLocation(id: number) {
    // TODO: Implement delete logic if needed
  }
}
