import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../apiRoot/baseUrl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private httpClient: HttpClient) { }

  getProducts() : Observable<any>{ 
    return this.httpClient.get(`${API_BASE_URL}/api/v1/products`);
  }
}
  