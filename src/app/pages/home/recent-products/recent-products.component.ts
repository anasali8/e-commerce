import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../interfaces/Iproduct';
import { ProductServiceService } from '../../../core/services/products/product-service.service';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from "../../../shared/UI/product-card/product-card.component";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { CartServiceService } from '../../../core/services/cart/cart-service.service';

@Component({
  selector: 'app-recent-products',
  standalone: true,
  imports: [CardModule, ButtonModule, RouterModule, ProductCardComponent, NgxSpinnerModule],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.scss',
})
export class RecentProductsComponent {
  
    products!: IProduct[];
    loading = true;

      constructor(
        private productService: ProductServiceService, 
        private spinner: NgxSpinnerService,
        private cartService: CartServiceService
      ) 
      {}
    
      ngOnInit(){
        this.getproducts();
      }   
    
  getproducts(): void {
    this.spinner.show();
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data || res;
        this.loading = false;
        this.spinner.hide();
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.loading = false;
        this.spinner.hide();
      },
    }); 
  }

  addToCart(productId: string): void {
    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log('Product added to cart successfully', res);
      },
      error: (err) => {
        console.error('Error adding product to cart', err);
      },
    });
  }
}
