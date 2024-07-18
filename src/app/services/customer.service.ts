import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl:string='http://localhost:5124/api/customer';
  constructor(private http:HttpClient) { }

  public GetCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.apiUrl);
  }
}
