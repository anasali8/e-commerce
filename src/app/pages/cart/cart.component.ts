import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartServiceService } from '../../core/services/cart/cart-service.service';
import { ProductServiceService } from '../../core/services/products/product-service.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    ToastModule,
    TagModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  isLoading: boolean = false;

  constructor(
    private cartService: CartServiceService,
    private productService: ProductServiceService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.isLoading = true;
    this.cartService.getCartProducts().subscribe({
      next: (response: any) => {
        console.log('Cart response:', response);
        
        let productsArray = [];
        if (response.data?.products) {
          productsArray = response.data.products;
        } else if (response.products) {
          productsArray = response.products;
        } else if (Array.isArray(response.data)) {
          productsArray = response.data;
        } else if (Array.isArray(response)) {
          productsArray = response;
        }

        // Fetch full product details for each cart item
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
      return;
    }

    // Create array of product detail requests
    const productRequests = cartItems.map(item => 
      this.productService.getProductById(item.product._id || item.product.id)
    );

    // Fetch all product details in parallel
    forkJoin(productRequests).subscribe({
      next: (productResponses: any[]) => {
        // Map cart items with full product details
        this.cartItems = cartItems.map((cartItem, index) => {
          const fullProduct = productResponses[index].data || productResponses[index];
          return this.mapCartItemWithFullProduct(cartItem, fullProduct);
        });
        
        console.log('Cart items with full product details:', this.cartItems);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching product details:', err);
        // Fallback to cart items without full details
        this.cartItems = cartItems.map(item => this.mapCartItem(item));
        this.isLoading = false;
      }
    });
  }

  private mapCartItemWithFullProduct(cartItem: any, fullProduct: any): any {
    // Use the full product details which has priceAfterDiscount
    const actualPrice = fullProduct.priceAfterDiscount || fullProduct.price || cartItem.price || 0;
    const originalPrice = fullProduct.price || cartItem.price || 0;
    
    console.log(`Product: ${fullProduct.title}`);
    console.log(`Original price: ${originalPrice}, Discount price: ${actualPrice}`);
    
    return {
      _id: cartItem._id,
      productId: fullProduct._id || fullProduct.id,
      name: fullProduct.title || fullProduct.name || 'Unknown Product',
      price: actualPrice,
      originalPrice: originalPrice,
      quantity: cartItem.count || cartItem.quantity || 1,
      image: fullProduct.imageCover || fullProduct.image || fullProduct.images?.[0] || 'assets/placeholder.png',
      hasDiscount: actualPrice < originalPrice && originalPrice > 0
    };
  }

  // Fallback mapping without full product details
  private mapCartItem(item: any): any {
    const product = item.product || {};
    const actualPrice = item.price || 0;
    
    return {
      _id: item._id,
      productId: product._id || product.id,
      name: product.title || product.name || 'Unknown Product',
      price: actualPrice,
      originalPrice: actualPrice,
      quantity: item.count || item.quantity || 1,
      image: product.imageCover || product.image || product.images?.[0] || 'assets/placeholder.png',
      hasDiscount: false
    };
  }

  getProductId(item: any): string {
    return item.productId || item._id;
  }

  getProductName(item: any): string {
    return item.name || 'Unknown Product';
  }

  getProductPrice(item: any): number {
    return item.price || 0;
  }

  getProductOriginalPrice(item: any): number {
    return item.originalPrice || 0;
  }

  hasDiscount(item: any): boolean {
    return item.hasDiscount || false;
  }

  getProductQuantity(item: any): number {
    return item.quantity || 1;
  }

  getProductImage(item: any): string {
    return item.image || 'assets/placeholder.png';
  }

  navigateToProduct(productId: string): void {
    this.router.navigate(['/user/productDetails', productId]);
  }

  incrementQuantity(item: any) {
    const currentQty = this.getProductQuantity(item);
    const newQuantity = (currentQty + 1).toString();
    const productId = this.getProductId(item);
    
    this.updateItemQuantity(productId, newQuantity);
  }

  decrementQuantity(item: any) {
    const currentQty = this.getProductQuantity(item);
    if (currentQty > 1) {
      const newQuantity = (currentQty - 1).toString();
      const productId = this.getProductId(item);
      
      this.updateItemQuantity(productId, newQuantity);
    }
  }

  updateItemQuantity(productId: string, quantity: string) {
    this.cartService.updateteProductQuantity(productId, quantity).subscribe({
      next: (response) => {
        console.log('Update response:', response);
        
        const item = this.cartItems.find(i => this.getProductId(i) === productId);
        if (item) {
          item.quantity = parseInt(quantity);
        }
        
        this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: 'Quantity updated successfully',
          life: 2000
        });
      },
      error: (err) => {
        console.error('Update error:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message || 'Failed to update quantity'
        });
        
        this.loadCartItems();
      }
    });
  }

  removeItem(productId: string) {
    this.cartService.removeProductFromCart(productId).subscribe({
      next: (response) => {
        console.log('Remove response:', response);
        this.cartItems = this.cartItems.filter(item => this.getProductId(item) !== productId);
        
        this.messageService.add({
          severity: 'success',
          summary: 'Removed',
          detail: 'Item removed from cart',
          life: 2000
        });
      },
      error: (err) => {
        console.error('Remove error:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to remove item'
        });
      }
    });
  }

  clearCart() {
    if (this.cartItems.length === 0) {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Cart is already empty'
      });
      return;
    }

    this.cartService.clearCart().subscribe({
      next: (response) => {
        console.log('Clear cart response:', response);
        this.cartItems = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Cleared',
          detail: 'Cart cleared successfully',
          life: 2000
        });
      },
      error: (err) => {
        console.error('Error clearing cart:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to clear cart'
        });
      }
    });
  }

  calculateSubtotal(): number {
    return this.cartItems.reduce((total, item) => {
      const price = this.getProductPrice(item);
      const quantity = this.getProductQuantity(item);
      return total + (price * quantity);
    }, 0);
  }

  calculateOriginalTotal(): number {
    return this.cartItems.reduce((total, item) => {
      const price = this.getProductOriginalPrice(item);
      const quantity = this.getProductQuantity(item);
      return total + (price * quantity);
    }, 0);
  }

  calculateTotalSavings(): number {
    return this.calculateOriginalTotal() - this.calculateSubtotal();
  }

  proceedToCheckout() {
    if (this.cartItems.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Your cart is empty'
      });
      return;
    }
    
    this.router.navigate(['/user/checkout']);
  }


  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'assets/placeholder.png';
    }
  }
}
