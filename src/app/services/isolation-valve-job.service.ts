import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IsolationValveJob } from '../models/isolation-valve-job';
import { IsolationValveJobDto } from '../apiDtos/isolation-valve-job-dto';

@Injectable({
  providedIn: 'root'
})
export class IsolationValveJobService {

  apiUrl='https://localhost:7107/api/isolationvalvejob';

  constructor(private http: HttpClient) { }

  public Create(isolationValveJob:IsolationValveJob)
    :Observable<IsolationValveJob>{
    let isolationvalveKCDto:IsolationValveJobDto
    =this.GetDtoFromIsolationValveJob(isolationValveJob);    
    return this.http.post<IsolationValveJob>(this.apiUrl,isolationvalveKCDto);
  }

  public Update(isolationValveJob:IsolationValveJob)
    :Observable<IsolationValveJob>{
    let isolationvalveKCDto:IsolationValveJobDto
    =this.GetDtoFromIsolationValveJob(isolationValveJob);    
    return this.http.put<IsolationValveJob>(this.apiUrl,isolationvalveKCDto);
  }  

  public GetAll():Observable<IsolationValveJob[]>{
    return this.http.get<IsolationValveJob[]>(this.apiUrl);
  }

  public GetAllByTrackRecord(trackRecordId:number):Observable<IsolationValveJob[]>{
    return this.http.get<IsolationValveJob[]>(this.apiUrl+'/trackRecordId?trackRecordId='+trackRecordId);
  }

  public GetByInstalledEquipment(installedEquipmentId:number):Observable<IsolationValveJob>{  
    return this.http.get<IsolationValveJob>
    (this.apiUrl+'/installedEquipmentId?installedEquipmentId='+installedEquipmentId);  
  }
  
  public Get(id:number):Observable<IsolationValveJob>{  
    return this.http.get<IsolationValveJob>(this.apiUrl+'/id?id='+id);  }

  private GetDtoFromIsolationValveJob
    (isolationValveJob:IsolationValveJob):IsolationValveJobDto{
    let isolationValveJobDto:IsolationValveJobDto=new IsolationValveJobDto();
    isolationValveJobDto.id=isolationValveJob.id;
    isolationValveJobDto.trackRecordId=isolationValveJob.trackRecordId;
    isolationValveJobDto.isolationValveJobTypeId=isolationValveJob.isolationValveJobType.id;
    isolationValveJobDto.triggerTypeId=isolationValveJob.triggerType.id;
    isolationValveJobDto.surfaceAppliedTubbingPressureLimit=
          isolationValveJob.surfaceAppliedTubbingPressureLimit;
    isolationValveJobDto.surfaceTempAtN2Changing=
            isolationValveJob.surfaceTempAtN2Changing;
    isolationValveJobDto.contingencyMechanicalAvailableId=isolationValveJob.contingencyMechanicalAvailable.id;
    isolationValveJobDto.isolationValveKeyComponentId=isolationValveJob.isolationValveKeyComponent.id;   
   
    
    return isolationValveJobDto;
  }
}
