import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../apiRoot/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(private httpClient: HttpClient) {}

  getProducts(categoryID? : string): Observable<any> {
    let url = categoryID? `${API_BASE_URL}/products?category[in]=${categoryID}` : `${API_BASE_URL}/products`;
    return this.httpClient.get(url);
  }

  getProductById(id: string): Observable<any> {
    return this.httpClient.get(`${API_BASE_URL}/products/${id}`);
  }

  getProductsByBrand(brandId: string, limit: number = 4): Observable<any> {
    return this.httpClient.get(
      `${API_BASE_URL}/products?brand=${brandId}&limit=${limit}`
    );
  }

  getProductsByCategory(categoryId: string, limit: number = 4): Observable<any> {
    return this.httpClient.get(
      `${API_BASE_URL}/products?category=${categoryId}&limit=${limit}`
    );
  }

  getProductsBySubcategory(subcategoryId: string, limit: number = 4): Observable<any> {
    return this.httpClient.get(
      `${API_BASE_URL}/products?subcategory=${subcategoryId}&limit=${limit}`
    );
  }
}
