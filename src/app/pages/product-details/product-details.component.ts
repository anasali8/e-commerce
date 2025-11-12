import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../interfaces/Iproduct';
import { ProductServiceService } from '../../core/services/products/product-service.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartServiceService } from '../../core/services/cart/cart-service.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Subject, takeUntil } from 'rxjs';

// PrimeNG Imports
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../shared/UI/product-card/product-card.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxSpinnerModule,
    RippleModule,
    ToastModule,
    GalleriaModule,
    ButtonModule,
    DividerModule,
    TagModule,
    RatingModule,
    FormsModule,
    ProductCardComponent
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product!: IProduct;
  relatedProducts: IProduct[] = [];
  images: any[] = [];
  loading: boolean = true;
  productId: string = '';
  
  private destroy$ = new Subject<void>();

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(
    private productService: ProductServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private cartService: CartServiceService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Subscribe to route params to handle navigation between product details
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.productId = params['id'];
        if (this.productId) {
          this.getDetails(this.productId);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getDetails(id: string): void {
    this.loading = true;
    this.spinner.show();

    this.productService.getProductById(id).subscribe({
      next: (response) => {
        console.log('Product details:', response);
        this.product = response.data;
        
        // Prepare images for gallery
        this.prepareImages();
        
        // Load related products by category
        if (this.product.category && typeof this.product.category === 'object') {
          this.getRelatedProducts(this.product.category._id);
        } else if (typeof this.product.category === 'string') {
          this.getRelatedProducts(this.product.category);
        }

        this.loading = false;
        this.spinner.hide();
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.loading = false;
        this.spinner.hide();
        this.show('error', 'Error', 'Failed to load product details');
      }
    });
  }

  prepareImages() {
    this.images = [];
    
    // Add main cover image
    if (this.product.imageCover) {
      this.images.push({
        itemImageSrc: this.product.imageCover,
        thumbnailImageSrc: this.product.imageCover,
        alt: this.product.title
      });
    }
    
    // Add additional images if available
    if (this.product.images && Array.isArray(this.product.images)) {
      this.product.images.forEach((img: string) => {
        this.images.push({
          itemImageSrc: img,
          thumbnailImageSrc: img,
          alt: this.product.title
        });
      });
    }

    console.log('Gallery images:', this.images);
  }

  getRelatedProducts(categoryID: string): void {
    this.productService.getProducts(categoryID).subscribe({
      next: (response) => {
        console.log('Related products response:', response);
        const allProducts = response.data || response;
        
        // Filter out current product
        this.relatedProducts = allProducts
          .filter((p: IProduct) => p._id !== this.productId)
          .slice(0, 4); // Limit to 4 products
        
        console.log('Filtered related products:', this.relatedProducts);
      },
      error: (err) => {
        console.error('Error loading related products:', err);
      }
    });
  }

  addToCart(productId: string): void {
    this.spinner.show();
    this.cartService.addProductToCart(productId).subscribe({
      next: (response) => {
        this.spinner.hide();
        this.show('success', 'Success', 'Product added to cart successfully');
      },
      error: (err) => {
        this.spinner.hide();
        console.error('Add to cart error:', err);
        
        if (err.status === 401) {
          this.show('warn', 'Authentication Required', 'Please login to add items to cart');
        } else {
          this.show('error', 'Error', err.error?.message || 'Failed to add product to cart');
        }
      }
    });
  }

  handleRelatedProductAddToCart(productId: string): void {
    this.addToCart(productId);
  }

  goBack(): void {
    this.router.navigate(['/user/home']);
  }

  show(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 3000
    });
  }
}
