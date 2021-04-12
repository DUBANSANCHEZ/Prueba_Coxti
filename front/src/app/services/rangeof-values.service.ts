import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RangeofValuesService {

  API_URL = 'http://localhost:3000/api/rangeofValues';
  constructor(private http: HttpClient) {}

  getSalario(salario:number){
    console.log(salario);
    return this.http.get(this.API_URL+`/${salario}`);
  }
}
