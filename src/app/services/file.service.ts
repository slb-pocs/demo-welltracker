import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecordFile } from '../models/record-file';

@Injectable({
  providedIn: 'root'
})
export class FileService {
 apiUrl:string='https://localhost:7107/api/file';
  constructor(private http: HttpClient) { }

  public UploadFile(formData:FormData, trackrecordId:number):Observable<RecordFile>{    
    return this.http.post<RecordFile>(this.apiUrl+'?trackrecordId='+trackrecordId,formData);
  }
  public GetFileListByTrackRecord(trackrecordId:number):Observable<RecordFile[]>{
    return this.http.get<RecordFile[]>(this.apiUrl+'?trackrecordId='+trackrecordId);
  }
  public GetFile(fileId:number){
    return this.http.get(this.apiUrl+'/fileId?fileId='+fileId,{
      responseType:'blob'
    });
  }
  public DeleteFile(fileId:number){
    return this.http.delete(this.apiUrl+'?fileId='+fileId,{
      responseType:'text'
    });
  }

}
