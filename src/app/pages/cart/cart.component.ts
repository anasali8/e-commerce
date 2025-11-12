import { Component } from '@angular/core';
import { CartServiceService } from '../../core/services/cart/cart-service.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  productQty:string='';

  constructor(private cartService: CartServiceService) { }

  getCartItems() {
    this.cartService.getCartProducts().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  

  removeItem(productId: string) {
    this.cartService.removeProductFromCart(productId).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  clearCart() {
    this.cartService.clearCart().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateItemQuantity(productId: string, quantity: string) {
    this.cartService.updateteProductQuantity(productId, quantity).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
