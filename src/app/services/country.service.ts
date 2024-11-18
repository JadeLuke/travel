import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CountryInterface } from '../types/country.interface';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
private favouritedItem: any[] = []

  constructor(private http: HttpClient, private notification: NotificationService
  ) { }

  getAllCountries() {
    return this.http.get<CountryInterface[]>(environment.COUNTRY.ALL)
  }

  getCountryByName(countryName: string) {
    return this.http.get<CountryInterface[]>(`${environment.COUNTRY.NAME}${countryName}`)
  }


  getCountryByCapitalCity(capitalCity: string) {
    return this.http.get<CountryInterface[]>(`${environment.COUNTRY.CAPITAL_CITY}${capitalCity}`)
  }

  isFavourited(items:any):boolean{
//  return this.favouritedItem.some(item => item.countryName === items.countryName)
return this.favouritedItem.some(fav => fav.name.common === items.name.common); // Use a unique identifier like 'name.common'

  }

addFavourite(item:any):void{
this.favouritedItem.push(item)
this.notification.showSuccess(`Added ${item.name.common} to likes!`)
}

removeFavourite(items:any):void{
  const index = this.favouritedItem.findIndex(item => item.name.common == items.name.common)
  if(index !== -1){
    this.favouritedItem.splice(index,1)
    this.notification.showError(`Removed ${items.name.common} from likes.`)
  }
}
 
getFavourites(): any[] {
  return this.favouritedItem; // Return the list of favourited countries
}
 
}
