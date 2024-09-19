import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackRecord } from '../models/track-record';
import { Observable } from 'rxjs';
import { response } from 'express';
import { TrackRecordDto } from '../apiDtos/track-record-dto';

@Injectable({
  providedIn: 'root'
})
export class TrackrecordService {
  apiUrl:string='https://localhost:7107/api/trackrecord';
  trackRecord:TrackRecord=new TrackRecord();

  constructor(private httpClient:HttpClient) { }

  public CreateTrackRecord(trackRecord:TrackRecord):Observable<TrackRecord>{ 
    let trackRecordDto:TrackRecordDto=new TrackRecordDto();
    trackRecordDto=this.GetTrackRecordDto(trackRecord);
    return this.httpClient.post<TrackRecord>(this.apiUrl,trackRecordDto);     
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
  private GetTrackRecordDto(trackRecord:TrackRecord):TrackRecordDto{
    let trackRecordDto:TrackRecordDto=new TrackRecordDto();

    trackRecordDto.assignedUser=trackRecord.assignedUser;
    trackRecordDto.dataEntryUser=trackRecord.dataEntryUser;
    trackRecordDto.validatorUser=trackRecord.validatorUser;
    trackRecordDto.supervisorUser=trackRecord.supervisorUser;
    trackRecordDto.validationDate=trackRecord.validationDate;
    trackRecordDto.installationStartDate=trackRecord.installationStartDate;
    trackRecordDto.installationEndDate=trackRecord.installationEndDate;
    trackRecordDto.managementCountryId=trackRecord.managementCountry.id;
    return trackRecordDto
  }

}
