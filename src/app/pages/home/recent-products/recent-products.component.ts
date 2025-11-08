import { Component } from '@angular/core';
import { IProduct } from '../../../interfaces/Iproduct';
import { ProductServiceService } from '../../../core/services/products/product-service.service';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterModule } from '@angular/router';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-recent-products',
  standalone: true,
  imports: [CardModule, ButtonModule, ProgressSpinnerModule, RouterModule, SlicePipe],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.scss'
})
export class RecentProductsComponent {
  
    products!: IProduct[];
    loading = true;

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

      addToCart(id: string) {
    console.log('Add to cart product id:', id);
  }

}
