import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/Iproduct';
import { ProductServiceService } from '../../core/services/products/product-service.service';
import { ActivatedRoute } from '@angular/router';
import { CartServiceService } from '../../core/services/cart/cart-service.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgxSpinnerModule, RippleModule, ToastModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  providers: [MessageService],
})
export class ProductDetailsComponent {
  product!: IProduct;
  relatedProducts: IProduct[] = [];
  constructor(
    private productService: ProductServiceService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private cartService: CartServiceService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const id = this.getID().id;
    this.getDetails(id);
  }

  getID(): any {
    return this.activatedRoute.snapshot.params;
  }

  getDetails(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data.data;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  getRelatedProducts(categoryID: string): void {
    this.productService.getProducts(categoryID).subscribe({
      next: (data) => {
        this.relatedProducts = data.data;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  addToCart(productId: string): void {
    this.spinner.show();
    this.cartService.addProductToCart(productId).subscribe({
      next: (data) => {
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
