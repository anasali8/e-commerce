import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../interfaces/Iproduct';
import { ProductServiceService } from '../../../core/services/products/product-service.service';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../../../shared/UI/product-card/product-card.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CartServiceService } from '../../../core/services/cart/cart-service.service';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-recent-products',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    RouterModule,
    ProductCardComponent,
    NgxSpinnerModule,
    RippleModule, 
    ToastModule
  ],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.scss',
  providers: [MessageService],
})
export class RecentProductsComponent {
  products!: IProduct[];
  loading = true;

  constructor(
    private productService: ProductServiceService,
    private spinner: NgxSpinnerService,
    private cartService: CartServiceService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
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
    this.spinner.show();
    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        this.spinner.hide();
        this.show('success', 'Success', 'Product added to cart successfully');
      },
      error: (err) => {
        this.spinner.hide();
        this.show('error', 'Error', 'Failed to add product to cart');
      },
    });
  }

  show(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
