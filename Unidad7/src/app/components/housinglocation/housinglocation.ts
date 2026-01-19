import { Component, input } from '@angular/core';
import { HousinglocationInfo } from '../../interfaces/housinglocation';

@Component({
  selector: 'app-housinglocation',
  imports: [],
  templateUrl: './housinglocation.html',
  styleUrl: './housinglocation.css',
})
export class Housinglocation {
  housingLocation = input.required<HousinglocationInfo>();
}
