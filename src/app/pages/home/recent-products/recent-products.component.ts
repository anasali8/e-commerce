import { Component } from '@angular/core';
import { IProduct } from '../../../interfaces/Iproduct';
import { ProductServiceService } from '../../../core/services/products/product-service.service';

@Component({
  selector: 'app-recent-products',
  standalone: true,
  imports: [],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.scss'
})
export class RecentProductsComponent {
  products!: IProduct[] ;
  
  constructor(private _productService : ProductServiceService) { }

  ngOnInit(): void {
    this._productService.getProducts().subscribe({
      next: (res)=>{
        this.products = res.data;
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

}
