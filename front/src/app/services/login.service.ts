import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  valueSesion : boolean;
  API_URL = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  authentication(usuario:login){
    return this.http.post(this.API_URL+'/login',usuario);
  }
  logout(){
    return this.http.get(this.API_URL+'/login/logout');
  }
}
