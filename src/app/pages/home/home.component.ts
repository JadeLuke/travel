import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../../UI/shared-UI/footer/footer.component';
import { NavComponent } from '../../UI/shared-UI/nav/nav.component';
import { RouterLink } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { CountryService } from '../../services/country.service';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule,FooterComponent, NavComponent,RouterLink, FormsModule, SearchComponent, NgIf, NgClass, NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
 
export class HomeComponent implements OnInit {
  public items: any[] = [];
  private http = inject(HttpClient);
  private api = inject(CountryService)
  private filteredItems: any[] = []
  paginatedFlags: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 27; 
  totalPages: number = 0;
  searchText: string = ''

  constructor(private notification: NotificationService){
    this.fetchDetails()
  }

  title = 'project';

  ngOnInit(): void {
    this.fetchDetails()
  }


public fetchDetails() {
  this.http.get<{items: any[ ] }>('https://restcountries.com/v3.1/all').subscribe((resp:any)=>{
  console.log(resp)
  this.items = resp;
  this.filteredItems = resp
  this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
  this.updatePaginatedProducts();

})
}
updatePaginatedProducts() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  this.paginatedFlags = this.filteredItems.slice(startIndex, startIndex + this.itemsPerPage);
}
nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updatePaginatedProducts();
  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updatePaginatedProducts();
  }
}

onSearchTextEntered(searchValue:string){
  this.searchText = searchValue
  this.currentPage = 1

  if (searchValue === ''){
    this.filteredItems = this.items
  }
  else{
    
    this.filteredItems = this.items.filter(item => 
      item.name.common.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.region.toLowerCase().includes(searchValue.toLowerCase())
    )
  }
  this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage)
  this.updatePaginatedProducts()
}

// toggleFavourite(item: any){
//  if(this.isFavourited(item)){
//   this.api.removeFavourite(item)
//  }
//  else{
//   this.api.addFavourite(item)
//  }

// }

toggleFavourite(item: any) {
  if (this.isFavourited(item)) {
    this.api.removeFavourite(item);
  } else {
    this.api.addFavourite(item);
  }
}
 
isFavourited(item:any):boolean{
return this.api.isFavourited(item)
}

}

