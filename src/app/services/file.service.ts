import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  public UploadFile(formData:FormData, trackrecordId:number):Observable<any>{    
    return this.http.post('https://localhost:7107/api/file?trackrecordId='+trackrecordId,formData);

  }
}
