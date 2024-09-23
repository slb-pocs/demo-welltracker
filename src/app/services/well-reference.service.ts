import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WellReference } from '../models/well-reference';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WellReferenceService {

  wellReferences:WellReference[]=[];
  apiUrl=environment.apiUrl+'wellreference';

  constructor(private http: HttpClient) { }

  public GetWellReferences():Observable<WellReference[]>{
    return this.http.get<WellReference[]>(this.apiUrl);
  }
}
