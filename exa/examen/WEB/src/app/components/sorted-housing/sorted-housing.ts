import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationInfo } from '../../../interfaces/housinglocation';
import { HousingService } from '../../../service/housing-service';
import { HousingLocation } from '../housing-location/housing-location';

@Component({
    selector: 'app-sorted-housing',
    standalone: true,
    imports: [CommonModule, HousingLocation],
    templateUrl: './sorted-housing.html',
    styleUrl: './sorted-housing.css'
})
export class SortedHousingComponent {
    housingLocationList: HousingLocationInfo[] = [];
    housingService: HousingService = inject(HousingService);

    constructor() {
        this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocationInfo[]) => {
            // Create a copy and sort it to avoid mutating original if shared reference (though usually it's a new array from fetch)
            this.housingLocationList = [...housingLocationList].sort((a, b) => b.availableUnits - a.availableUnits);
        });
    }
}
