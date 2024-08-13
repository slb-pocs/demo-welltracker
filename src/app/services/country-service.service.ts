import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryServiceService {
  apiUrl:string="https://welltracker-backend.azurewebsites.net/api/country/";

  constructor(private httpClient:HttpClient) { }

  public GetCountries():Observable<Country[]>{
    return this.httpClient.get<Country[]>(this.apiUrl);
  }
  public GetCountry(id:number):Observable<Country>{
    return this.httpClient.get<Country>(this.apiUrl+"id?id="+id);
  }
  public GetCountryByName(name:string):Observable<Country>{
    return this.httpClient.get<Country>(this.apiUrl+"name?name="+name);
  }
  public GetCountryByCode(code:string):Observable<Country>{
    return this.httpClient.get<Country>(this.apiUrl+"code?code="+code);
  }


}
