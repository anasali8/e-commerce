import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../interfaces/Iproduct';
import { SlicePipe, CommonModule, DecimalPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    SlicePipe,
    DecimalPipe,
    CardModule,
    ButtonModule,
    RouterModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  
  @Input() product!: IProduct;
  @Output() fireAddToCart: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
    console.log(this.product);
  }

  hasDiscount(): boolean {
    return !!(
      this.product.priceAfterDiscount && 
      this.product.priceAfterDiscount < this.product.price
    );
  }

  calculateDiscountPercentage(): number {
    if (!this.hasDiscount()) return 0;
    
    const discount = this.product.price - (this.product.priceAfterDiscount || 0);
    const percentage = (discount / this.product.price) * 100;
    return Math.round(percentage);
  }

  handleAddToCart(id: string) {
    if (this.product.quantity > 0) {
      this.fireAddToCart.emit(id);
    }
  }
}
