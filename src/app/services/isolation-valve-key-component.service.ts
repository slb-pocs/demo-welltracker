import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IsolationValveKeyComponent } from '../models/isolation-valve-key-component';
import { Observable } from 'rxjs';
import { IsolationValveKeyComponentDto } from '../apiDtos/isolation-valve-key-component-dto';

@Injectable({
  providedIn: 'root'
})
export class IsolationValveKeyComponentService {
  apiUrl='https://welltracker-backend.azurewebsites.net/api/isolationvalvekeycomponent';

  constructor(private http: HttpClient) { }

  public Create(isolationValveKeyComponent:IsolationValveKeyComponent)
    :Observable<IsolationValveKeyComponent>{
    let isolationvalveKCDto:IsolationValveKeyComponentDto
    =this.GetDtoFromIsolationValveKeyComponent(isolationValveKeyComponent);    
    return this.http.post<IsolationValveKeyComponent>(this.apiUrl,isolationvalveKCDto);
  }

  public Update(isolationValveKeyComponent:IsolationValveKeyComponent)
    :Observable<IsolationValveKeyComponent>{
    let isolationvalveKCDto:IsolationValveKeyComponentDto
    =this.GetDtoFromIsolationValveKeyComponent(isolationValveKeyComponent);    
    return this.http.put<IsolationValveKeyComponent>(this.apiUrl,isolationvalveKCDto);
  }  

  public GetAll():Observable<IsolationValveKeyComponent[]>{
    return this.http.get<IsolationValveKeyComponent[]>(this.apiUrl);
  }
  public GetAllByTrackRecord(trackRecordId:number):Observable<IsolationValveKeyComponent[]>{
    return this.http.get<IsolationValveKeyComponent[]>(this.apiUrl+'/trackrecordid?trackrecordid='+trackRecordId);
  }

  public Get(id:number):Observable<IsolationValveKeyComponent>{  
    return this.http.get<IsolationValveKeyComponent>(this.apiUrl+'/id?id='+id);  
  }
  public GetByInstalledEquipment(installedEquipmentId:number):Observable<IsolationValveKeyComponent>{  
    return this.http.get<IsolationValveKeyComponent>
    (this.apiUrl+'/installedEquipmentId?installedEquipmentId='+installedEquipmentId);  
  }

  private GetDtoFromIsolationValveKeyComponent
    (isolationValveKeyComponent:IsolationValveKeyComponent):IsolationValveKeyComponentDto{
    let isolationValveKCDto:IsolationValveKeyComponentDto=new IsolationValveKeyComponentDto();
    isolationValveKCDto.id=isolationValveKeyComponent.id;
    isolationValveKCDto.trackRecordId=isolationValveKeyComponent.trackRecordId;
    isolationValveKCDto.installedEquipmentId=isolationValveKeyComponent.installedEquipment.id;
    isolationValveKCDto.temperature=isolationValveKeyComponent.temperature;
    isolationValveKCDto.pressure=isolationValveKeyComponent.pressure;
    isolationValveKCDto.openFluidWeight=isolationValveKeyComponent.openFluidWeight;
    isolationValveKCDto.failureIncident=isolationValveKeyComponent.failureIncident;
    
    return isolationValveKCDto;
  }
}
