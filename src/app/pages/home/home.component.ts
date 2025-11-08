import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductServiceService } from '../../core/services/products/product-service.service';
import { IProduct } from '../../interfaces/Iproduct';
import { RecentProductsComponent } from "./recent-products/recent-products.component";


import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RecentProductsComponent, CommonModule, CardModule, ButtonModule, ProgressSpinnerModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  loading = true;

    slides = [
    { image: 'banner1.jpg', title: 'New Arrivals', subtitle: 'Check the latest products!' },
    { image: 'banner2.png', title: 'Hot Deals', subtitle: 'Up to 50% off selected items' },
    { image: 'banner3.jpg', title: 'Top Rated', subtitle: 'Discover our best-selling items' }
  ];

  constructor(private productService: ProductServiceService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data || res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.loading = false;
      },
    });
  }
}
