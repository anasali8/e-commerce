import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ILoginUser, IRegisterUser } from '../../../interfaces/auth-user';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../apiRoot/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  registerUser(userData: IRegisterUser) :Observable<any> {
    return this.httpClient.post(`${API_BASE_URL}/auth/signup`, userData);
  }

  loginUser(userData: ILoginUser) :Observable<any> {
    return this.httpClient.post(`${API_BASE_URL}/auth/signin`, userData);
  }
}
