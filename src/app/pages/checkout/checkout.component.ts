import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CartServiceService } from '../../core/services/cart/cart-service.service';
import { ProductServiceService } from '../../core/services/products/product-service.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    DividerModule,
    RadioButtonModule,
    CheckboxModule,
    ToastModule,
    StepsModule,
    DropdownModule,
    NgxSpinnerModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  cartItems: any[] = [];
  isLoading: boolean = false;
  selectedPaymentMethod: string = 'cash';

  cities = [
    { name: 'Cairo', code: 'CAI' },
    { name: 'Alexandria', code: 'ALX' },
    { name: 'Giza', code: 'GIZ' },
    { name: 'Shubra El Kheima', code: 'SHU' },
    { name: 'Port Said', code: 'POR' }
  ];

  constructor(
    private fb: FormBuilder,
    private cartService: CartServiceService,
    private productService: ProductServiceService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadCartItems();
  }

  initForm() {
    this.checkoutForm = this.fb.group({
      // Shipping Information
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      
      // Payment Method
      paymentMethod: ['cash', Validators.required],
      
      // Additional
      notes: ['']
    });
  }

  loadCartItems() {
    this.isLoading = true;
    this.cartService.getCartProducts().subscribe({
      next: (response: any) => {
        let productsArray = response.data?.products || response.products || response.data || response || [];
        this.fetchProductDetails(productsArray);
      },
      error: (err) => {
        console.error('Error loading cart:', err);
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load cart items'
        });
      }
    });
  }

  fetchProductDetails(cartItems: any[]) {
    if (cartItems.length === 0) {
      this.cartItems = [];
      this.isLoading = false;
      this.router.navigate(['/user/cart']);
      return;
    }

    const productRequests = cartItems.map(item => 
      this.productService.getProductById(item.product._id || item.product.id)
    );

    forkJoin(productRequests).subscribe({
      next: (productResponses: any[]) => {
        this.cartItems = cartItems.map((cartItem, index) => {
          const fullProduct = productResponses[index].data || productResponses[index];
          const actualPrice = fullProduct.priceAfterDiscount || fullProduct.price || cartItem.price || 0;
          const originalPrice = fullProduct.price || cartItem.price || 0;
          
          return {
            _id: cartItem._id,
            productId: fullProduct._id,
            name: fullProduct.title,
            price: actualPrice,
            originalPrice: originalPrice,
            quantity: cartItem.count || cartItem.quantity || 1,
            image: fullProduct.imageCover,
            hasDiscount: actualPrice < originalPrice
          };
        });
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching product details:', err);
        this.isLoading = false;
      }
    });
  }

  calculateSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  calculateShipping(): number {
    return 50; // Fixed shipping fee
  }

  calculateTax(): number {
    return this.calculateSubtotal() * 0.1; // 10% tax
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateShipping() + this.calculateTax();
  }

  onSubmit() {
    if (this.checkoutForm.invalid) {
      Object.keys(this.checkoutForm.controls).forEach(key => {
        this.checkoutForm.get(key)?.markAsTouched();
      });
      
      this.messageService.add({
        severity: 'warn',
        summary: 'Incomplete Form',
        detail: 'Please fill in all required fields correctly'
      });
      return;
    }

    this.spinner.show();
    
    const orderData = {
      ...this.checkoutForm.value,
      items: this.cartItems,
      subtotal: this.calculateSubtotal(),
      shipping: this.calculateShipping(),
      tax: this.calculateTax(),
      total: this.calculateTotal()
    };

    console.log('Order data:', orderData);

    // Simulate order submission
    setTimeout(() => {
      this.spinner.hide();
      this.messageService.add({
        severity: 'success',
        summary: 'Order Placed',
        detail: 'Your order has been placed successfully!'
      });
      
      // Clear cart and redirect
      setTimeout(() => {
        this.cartService.clearCart().subscribe({
          next: () => {
            this.router.navigate(['/user/home']);
          }
        });
      }, 2000);
    }, 2000);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.checkoutForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.checkoutForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'This field is required';
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength']) return `Minimum ${field.errors['minlength'].requiredLength} characters required`;
      if (field.errors['pattern']) return 'Please enter a valid format';
    }
    return '';
  }

  goBack() {
    this.router.navigate(['/user/cart']);
  }
}
