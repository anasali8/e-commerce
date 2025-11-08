import { Component } from '@angular/core';
import { RecentProductsComponent } from "./recent-products/recent-products.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RecentProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
