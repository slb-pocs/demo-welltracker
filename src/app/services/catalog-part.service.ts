import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogPart } from '../models/catalog-part';

@Injectable({
  providedIn: 'root'
})
export class CatalogPartService {
 apiUrl='https://localhost:7107/api/catalogpart/';

  constructor(private htppClient:HttpClient) { }

  public GetCatalogPart(partNumber:string):Observable<CatalogPart>{
    return this.htppClient.get<CatalogPart>(this.apiUrl+"partnumber?partnumber="+partNumber);
  }
}
