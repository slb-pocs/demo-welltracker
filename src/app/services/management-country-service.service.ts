import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ManagementCountry } from '../models/management-country';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagementCountryServiceService {
  apiUrl:string=environment.apiUrl+"managementcountry/";

  constructor(private httpClient:HttpClient) { }

  public GetManagementCountries():Observable<ManagementCountry[]>{
    return this.httpClient.get<ManagementCountry[]>(this.apiUrl);
  }
  public GetManagementCountry(id:number):Observable<ManagementCountry>{
    return this.httpClient.get<ManagementCountry>(this.apiUrl+"id?id="+id);
  }
  public GetManagementCountryByName(name:string):Observable<ManagementCountry>{
    return this.httpClient.get<ManagementCountry>(this.apiUrl+"name?name="+name);
  }
  public GetManagementCountryByCode(code:string):Observable<ManagementCountry>{
    return this.httpClient.get<ManagementCountry>(this.apiUrl+"code?code="+code);
  }
}
