import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
// import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'app';
  ngOnInit(): void {
    // initFlowbite();
  }
}
