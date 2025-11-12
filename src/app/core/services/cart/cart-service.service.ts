import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_BASE_URL } from '../../apiRoot/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  
  // BehaviorSubject to track cart count
  private cartCountSubject = new BehaviorSubject<number>(0);
  public cartCount$ = this.cartCountSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    // Initialize cart count on service creation only if user is logged in
    const token = this.getToken();
    if (token) {
      this.updateCartCount();
    }
  }

  // Helper method to get token - FIXED VERSION
  private getToken(): string {
    const token = localStorage.getItem('userToken');
    // JWT tokens are already strings, no need to JSON.parse
    return token || '';
  }

  // Update cart count
  private updateCartCount(): void {
    this.getCartProducts().subscribe({
      next: (response: any) => {
        let count = 0;
        if (response.data?.products) {
          count = response.data.products.length;
        } else if (response.products) {
          count = response.products.length;
        } else if (Array.isArray(response.data)) {
          count = response.data.length;
        } else if (Array.isArray(response)) {
          count = response.length;
        }
        this.cartCountSubject.next(count);
      },
      error: (err) => {
        console.error('Error fetching cart count:', err);
        this.cartCountSubject.next(0);
      }
    });
  }

  addProductToCart(productId: string): Observable<any> {
    return this.httpClient.post(`${API_BASE_URL}/cart`, { productId }, {
      headers: {
        'token': this.getToken()
      }
    }).pipe(
      tap(() => this.updateCartCount())
    );
  }

  updateteProductQuantity(productId: string, count: string): Observable<any> {
    return this.httpClient.put(`${API_BASE_URL}/cart/${productId}`, { count }, {
      headers: {
        'token': this.getToken()
      }
    }).pipe(
      tap(() => this.updateCartCount())
    );
  }

  getCartProducts(): Observable<any> {
    return this.httpClient.get(`${API_BASE_URL}/cart`, {
      headers: {
        'token': this.getToken()
      }
    });
  }

  removeProductFromCart(productId: string): Observable<any> {
    return this.httpClient.delete(`${API_BASE_URL}/cart/${productId}`, {
      headers: {
        'token': this.getToken()
      }
    }).pipe(
      tap(() => this.updateCartCount())
    );
  }

  clearCart(): Observable<any> {
    return this.httpClient.delete(`${API_BASE_URL}/cart`, {
      headers: {
        'token': this.getToken()
      }
    }).pipe(
      tap(() => this.cartCountSubject.next(0))
    );
  }

  // Public method to manually refresh cart count
  refreshCartCount(): void {
    this.updateCartCount();
  }
}
