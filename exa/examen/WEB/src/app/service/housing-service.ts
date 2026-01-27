import { Injectable } from "@angular/core";
import { HousingLocationInfo } from "../interfaces/housinglocation";

@Injectable({
  providedIn: "root",
})
export class HousingService {
  housingLocationList: HousingLocationInfo[] = [];
  url = "http://localhost:3000/housing-location";

  async getAllHousingLocations(): Promise<HousingLocationInfo[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
  async getHousingLocationById(
    id: string,
  ): Promise<HousingLocationInfo | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    const locationJson = await data.json();
    return locationJson[0] ?? {};
  }
  async addNewHouse(
    house: HousingLocationInfo | undefined,
  ): Promise<HousingLocationInfo | undefined> {
    let myHeaders = new Headers({
      "Content-Type": "application/json",
    });
    const requestLibros = new Request(`${this.url}`, {
      method: "POST",
      body: JSON.stringify(house),
      headers: myHeaders,
    });
    const requestPostLibros = await fetch(requestLibros);
    const dataCreatedBook = await requestPostLibros.json();
    return dataCreatedBook;
  }
  async updateHousingLocation(
    id: string,
    house: HousingLocationInfo,
  ): Promise<HousingLocationInfo | undefined> {
    let myHeaders = new Headers({
      "Content-Type": "application/json",
    });
    const request = new Request(`${this.url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(house),
      headers: myHeaders,
    });
    const response = await fetch(request);
    return (await response.json()) ?? {};
  }
  async deleteHousingLocation(id: number): Promise<void> {
    await fetch(`${this.url}/${id}`, {
      method: "DELETE",
    });
  }
}
