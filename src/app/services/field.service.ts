import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Field } from '../models/field';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  apiUrl:string=environment.apiUrl+'types/fields';

  constructor(private http:HttpClient) { }

  public GetFields():Observable<Field[]>{
    return this.http.get<Field[]>(this.apiUrl);
  }
}
