import { Component } from '@angular/core';


import { CarouselModule } from 'primeng/carousel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { IProduct } from '../../../interfaces/Iproduct';


@Component({
  selector: 'app-home-carousel',
  standalone: true,
  imports: [CarouselModule, ProgressSpinnerModule],
  templateUrl: './home-carousel.component.html',
  styleUrl: './home-carousel.component.scss'
})
export class HomeCarouselComponent {

  products: IProduct[] = [];

    slides = [
    { image: 'banner1.jpg', title: 'New Arrivals', subtitle: 'Check the latest products!' },
    { image: 'banner2.png', title: 'Hot Deals', subtitle: 'Up to 50% off selected items' },
    { image: 'banner3.jpg', title: 'Top Rated', subtitle: 'Discover our best-selling items' }
  ];

}
