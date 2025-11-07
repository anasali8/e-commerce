import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ILoginUser, IRegisterUser } from '../../../interfaces/auth-user';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../apiRoot/baseUrl';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  constructor(private httpClient: HttpClient) {}
  
  registerUser(userData: IRegisterUser): Observable<any> {
    return this.httpClient.post(`${API_BASE_URL}/auth/signup`, userData);
  }

  loginUser(userData: ILoginUser): Observable<any> {
    return this.httpClient.post(`${API_BASE_URL}/auth/signin`, userData);
  }
  authorized(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('userToken')) {
        return true;
      }
      return false;
    } else return false;
  }
}
