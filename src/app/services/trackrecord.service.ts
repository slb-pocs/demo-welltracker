import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackRecord } from '../models/track-record';
import { Observable } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class TrackrecordService {
  apiUrl:string='https://welltracker-backend.azurewebsites.net/api/trackrecord';
  trackRecord:TrackRecord=new TrackRecord();

  constructor(private httpClient:HttpClient) { }

  public CreateTrackRecord(trackRecord:TrackRecord):Observable<TrackRecord>{    
    return this.httpClient.post<TrackRecord>(this.apiUrl,trackRecord);     
  }
  public GetTrackRecord(id:number):Observable<TrackRecord>{
    return this.httpClient.get<TrackRecord>(this.apiUrl+'/id?id='+id);
  }
  public GetTrackRecords():Observable<TrackRecord[]>{
    return this.httpClient.get<TrackRecord[]>(this.apiUrl);
  }
  public UpdateTrackRecord(trackRecord:TrackRecord):Observable<TrackRecord>{
    return this.httpClient.put<TrackRecord>(this.apiUrl,trackRecord);
  }
}
