import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../apiRoot/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getCategories() {
    return this.httpClient.get(`${API_BASE_URL}/categories`);
  }
  getSpeceficCategory(categoryID: string) {
    return this.httpClient.get(`${API_BASE_URL}/categories/${categoryID}`);
  }
}
