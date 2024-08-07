import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl:string='https://welltracker-backend.azurewebsites.net/api/customer';
  constructor(private http:HttpClient) { }

  public GetCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.apiUrl);
  }
  public GetCustomer(id:number):Observable<Customer>{
    return this.http.get<Customer>(this.apiUrl+'/id?id='+id);
  }
  public GetCustomerByName(name:string):Observable<Customer>{
    return this.http.get<Customer>(this.apiUrl+'/name?name='+name);
  }
}
