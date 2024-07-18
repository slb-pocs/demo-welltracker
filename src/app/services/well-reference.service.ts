import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WellReference } from '../models/well-reference';

@Injectable({
  providedIn: 'root'
})
export class WellReferenceService {

  wellReferences:WellReference[]=[];
  apiUrl='http://localhost:5124/api/wellreference';

  constructor(private http: HttpClient) { }

  public GetWellReferences():Observable<WellReference[]>{
    return this.http.get<WellReference[]>(this.apiUrl);
  }
}
