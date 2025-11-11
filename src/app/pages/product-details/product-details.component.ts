import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/Iproduct';
import { ProductServiceService } from '../../core/services/products/product-service.service';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product!: IProduct;
  relatedProducts: IProduct[] = [];
  constructor(
    private productService: ProductServiceService,
    private activatedRoute: ActivatedRoute
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
}
