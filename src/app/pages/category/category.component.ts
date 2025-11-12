import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CategoryService } from '../../core/services/category/category.service';
import { ProductServiceService } from '../../core/services/products/product-service.service';
import { CartServiceService } from '../../core/services/cart/cart-service.service';
import { IProduct } from '../../interfaces/Iproduct';
import { ProductCardComponent } from '../../shared/UI/product-card/product-card.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    NgxSpinnerModule,
    ToastModule,
    ButtonModule,
    SkeletonModule
  ],
  providers: [MessageService],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  products: IProduct[] = [];
  selectedCategory: Category | null = null;
  isLoadingCategories = true;
  isLoadingProducts = false;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductServiceService,
    private cartService: CartServiceService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoadingCategories = true;
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data || res;
        this.isLoadingCategories = false;
        
        // Load all products initially
        if (this.categories.length > 0) {
          this.loadAllProducts();
        }
      },
      error: (err) => {
        console.error('Error loading categories', err);
        this.isLoadingCategories = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load categories',
          life: 3000
        });
      }
    });
  }

  loadAllProducts(): void {
    this.selectedCategory = null;
    this.isLoadingProducts = true;
    this.spinner.show();
    
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        this.products = res.data || res;
        this.isLoadingProducts = false;
        this.spinner.hide();
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.isLoadingProducts = false;
        this.spinner.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load products',
          life: 3000
        });
      }
    });
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
    this.isLoadingProducts = true;
    this.spinner.show();
    
    this.productService.getProducts(category._id).subscribe({
      next: (res: any) => {
        this.products = res.data || res;
        this.isLoadingProducts = false;
        this.spinner.hide();
      },
      error: (err) => {
        console.error('Error loading products for category', err);
        this.isLoadingProducts = false;
        this.spinner.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load products for this category',
          life: 3000
        });
      }
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
      }
    });
  }

  viewCart(): void {
    this.router.navigate(['/user/cart']);
  }
}
