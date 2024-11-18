import { NgClass, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CountryInterface } from '../../types/country.interface';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { NavComponent } from '../../UI/shared-UI/nav/nav.component';
import { FooterComponent } from '../../UI/shared-UI/footer/footer.component';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgClass, NavComponent, FooterComponent, RouterLink, LoaderComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit {
  
  countries: CountryInterface[] = [];
  countryName: string | null = null
  isLoading = true

  constructor(private countryService: CountryService, private route: ActivatedRoute, private router: Router) {
    setTimeout(() =>{
      this.isLoading = false}, 1000
    )
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); 
      }
    });
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.countryName = params.get('contry_name')!;
    });

    this.getSingleCountry(this.countryName)


  }

  getSingleCountry(countryName: string | null) {
    if (countryName) {
      this.countryService.getCountryByName(countryName).subscribe((countries) => {
        if (countries.length === 1) {
          this.countries = countries;
        } else {
          const country = countries.find(c => c.name.common.toLowerCase() === countryName.toLowerCase());

          if (country) {
            this.countries = [country];
          } else {
            const fallbackCountry = countries.find(c => c.cca2 === 'IN'); 
            if (fallbackCountry) {
              this.countries = [fallbackCountry];
            } else {
              console.error('Country not found!');
              this.countries = []; 
            }
          }
        }
        console.log(this.countries);
      });
    }
  }


  displayLanguage(languages: any) {
    let text = '';

    if (typeof languages === 'object' && languages !== null) {
      let arr = Object.entries(languages);

      for (let i = 0; i < arr.length; i++) {
        text += arr[i][1] + ', ';
      }
    }

    return text;
  }

  displayCurrency(currencies: any) {
    let text = '';

    if (typeof currencies === 'object' && currencies !== null) {
      let arr2 = Object.entries(currencies);

      for (let i = 0; i < arr2.length; i++) {
        const value = arr2[i][1];

        if (typeof value === 'object' && value !== null && 'name' in value) {
          text += (value as { name: string}).name + ' ';
        } else {
          text += value + ' ';
        }
      }
    }

    return text;
  }
}