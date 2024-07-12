import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackRecord } from '../models/track-record';
import { Observable } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class TrackrecordService {
  apiUrl:string='http://localhost:5124/api/trackrecord';
  trackRecord:TrackRecord=new TrackRecord();

  constructor(private httpClient:HttpClient) { }

  public CreateTrackRecord(trackRecord:TrackRecord):Observable<TrackRecord>{    
    return this.httpClient.post<TrackRecord>(this.apiUrl,trackRecord);     
  }
}
