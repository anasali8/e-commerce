import { Component,  EventEmitter,  Input, Output } from '@angular/core';
import { IProduct } from '../../../interfaces/Iproduct';
import { SlicePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [SlicePipe, CardModule, ButtonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  
  @Input() product!: IProduct;
  @Output() fireAddToCart: EventEmitter<string> = new EventEmitter();

  ngOnInit(){
    console.log(this.product);
  }

  handleAddToCart(id:string){  
    console.log('hiiiii');
    this.fireAddToCart.emit(id);
  }
}