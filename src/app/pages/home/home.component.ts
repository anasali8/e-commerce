import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { RecentProductsComponent } from './recent-products/recent-products.component';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HomeCarouselComponent, RecentProductsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent{
  
}
