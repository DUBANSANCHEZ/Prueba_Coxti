import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personas } from '../models/persona';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  API_URL = 'http://localhost:3000/api/register';
  constructor(private http: HttpClient) {}

  getRegister(){
    return this.http.get(this.API_URL+"/Persona");
  }
  createRegisterPersona(user:Personas){
    return this.http.post(this.API_URL+'/Persona/Create',user);
  }
  usuarioDuplicado(user:Personas){
    return this.http.post(this.API_URL+'/Persona/usuarioDuplicado',user);
  }
  getRegisterByIdPersona(id:number){
    return this.http.get(this.API_URL+`/Persona/${id}`);
  }
}
