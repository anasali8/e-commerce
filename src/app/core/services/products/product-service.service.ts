import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private httpClient: HttpClient) { }

  getProducts() : Observable<any>{ 
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
}
  