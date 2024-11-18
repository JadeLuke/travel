import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit {

  favouritedCountries: any[] = [];

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.favouritedCountries = this.countryService.getFavourites(); // Get the list of favourited countries
  }

}
