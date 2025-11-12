import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Header } from 'primeng/api';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../apiRoot/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  token: string = JSON.stringify(localStorage.getItem('userToken')); //get token from local storage
  constructor(private httpClient: HttpClient) { }

  addProductToCart(productId: string) : Observable<any> {
    return this.httpClient.post(`${API_BASE_URL}/cart`, {productId}, {
      headers: {
        'token': JSON.parse(this.token)? JSON.parse(this.token) : ''
      }
    });
  }

  updateteProductQuantity(productId: string, count: string) : Observable<any> {
    return this.httpClient.put(`${API_BASE_URL}/cart/${productId}`, {count} , {
      headers: {
        'token': JSON.parse(this.token)
      }
    });
  }

  getCartProducts() : Observable<any> {
    return this.httpClient.get(`${API_BASE_URL}/cart`, {
      headers: {
        'token':  JSON.parse(this.token)  
      }
    });
  }
  removeProductFromCart(productId: string) : Observable<any> {
    return this.httpClient.delete(`${API_BASE_URL}/cart/${productId}`, {
      headers: {
        'token': JSON.parse(this.token)
      }
    });
  }
  clearCart() : Observable<any> {
    return this.httpClient.delete(`${API_BASE_URL}/cart`, {
      headers: {
        'token': JSON.parse(this.token)
      }
    });
  }
}
