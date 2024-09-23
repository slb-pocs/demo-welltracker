import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecordFile } from '../models/record-file';
import { environment } from '../../environments/environment';
import { RecordFileDto } from '../apiDtos/record-file-dto';

@Injectable({
  providedIn: 'root'
})
export class FileService {
 apiUrl:string=environment.apiUrl+'file';
  constructor(private http: HttpClient) { }

  public UploadFile(formData:FormData, trackrecordId:number):Observable<RecordFile>{    
    return this.http.post<RecordFile>(this.apiUrl+'?trackrecordId='+trackrecordId,formData);
  }
  public GetFileListByTrackRecord(trackrecordId:number):Observable<RecordFile[]>{
    return this.http.get<RecordFile[]>(this.apiUrl+'?trackrecordId='+trackrecordId);
  }
  public DownloadFile(fileId:number){
    return this.http.get(this.apiUrl+'/fileId?fileId='+fileId,{
      responseType:'blob'
    });
  }
  public GetRecordFile(fileId:number):Observable<RecordFile>{
    return this.http.get<RecordFile>(this.apiUrl+'/recordFileId?recordFileId='+fileId);
  }
  public DeleteFile(fileId:number){
    return this.http.delete(this.apiUrl+'?fileId='+fileId,{
      responseType:'text'
    });
  }

  public UpdateRecordFile(recordFile:RecordFile):Observable<RecordFile>{
    let recordFileDto:RecordFileDto=this.GetFileDto(recordFile);
    return this.http.put<RecordFile>(this.apiUrl,recordFileDto);
  }

  GetFileDto(recordFile:RecordFile):RecordFileDto{
    let recordFileDto:RecordFileDto=new RecordFileDto();
    recordFileDto.id=recordFile.id;
    recordFileDto.trackRecordId=recordFile.trackRecordId;
    recordFileDto.description=recordFile.description;
    
    return recordFileDto;
  
  }

}
