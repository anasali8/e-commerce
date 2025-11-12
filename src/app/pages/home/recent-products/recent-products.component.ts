import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  styleUrl: './recent-products.component.scss'
})
export class RecentProductsComponent implements OnInit {
  products!: IProduct[];
  loading = true;

  constructor(
    private productService: ProductServiceService,
    private spinner: NgxSpinnerService,
    private cartService: CartServiceService,
    private messageService: MessageService,
    private router: Router
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
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load products',
          life: 3000
        });
      },
    });
  }

  addToCart(productId: string): void {
    this.spinner.show();
    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        this.spinner.hide();
        console.log('Product added to cart:', res);
        
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product added to cart successfully',
          life: 3000
        });
      },
      error: (err) => {
        this.spinner.hide();
        console.error('Error adding to cart:', err);
        
        if (err.status === 401) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Authentication Required',
            detail: 'Please login to add items to cart',
            life: 3000
          });
        } else if (err.status === 400) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Invalid Request',
            detail: 'This product cannot be added to cart',
            life: 3000
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add product to cart. Please try again.',
            life: 3000
          });
        }
      },
    });
  }

  viewCart(): void {
    this.router.navigate(['/user/cart']);
  }
}
