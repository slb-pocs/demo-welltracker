import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InstalledEquipment } from '../models/installed-equipment';
import { InstalledEquipmentDto } from '../apiDtos/installed-equipment-dto';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstalledEquipmentService {
  apiUrl=environment.apiUrl+'installedequipment';

  constructor(private http: HttpClient) { }

  public CreateInstalledEquipment(installedequipment:InstalledEquipment)
  :Observable<InstalledEquipment>{
    let installedequipmentDto:InstalledEquipmentDto=this.GetInstalledEquipmentDtoFromInstalledEquipment(installedequipment);    
    return this.http.post<InstalledEquipment>(this.apiUrl,installedequipmentDto);
  }
  public UpdateInstalledEquipment(installedequipment:InstalledEquipment)
  :Observable<InstalledEquipment>{
    let installedequipmentDto:InstalledEquipmentDto=
      this.GetInstalledEquipmentDtoFromInstalledEquipment(installedequipment); 
    return this.http.put<InstalledEquipment>(this.apiUrl,installedequipmentDto);
  }
  public GetAllInstalledEquipments():Observable<InstalledEquipment[]>{
    return this.http.get<InstalledEquipment[]>(this.apiUrl);
  }
  public GetInstalledEquipmentsByTrackRecord(trackRecordId:number):Observable<InstalledEquipment[]>{
    return this.http.get<InstalledEquipment[]>(this.apiUrl+'/trackrecordId?trackRecordId='+trackRecordId);
  }
  public GetInstalledEquipment(id:number):Observable<InstalledEquipment>{  
    return this.http.get<InstalledEquipment>(this.apiUrl+'/id?id='+id);
  }
  
  private GetInstalledEquipmentDtoFromInstalledEquipment(installedEquipment:InstalledEquipment)
  :InstalledEquipmentDto{
    let installedEquipmentDto:InstalledEquipmentDto=new InstalledEquipmentDto();
    installedEquipmentDto.id=installedEquipment.id;
    installedEquipmentDto.trackRecordId=installedEquipment.trackRecordId;
    installedEquipmentDto.catalogPartNumber=installedEquipment.catalogPart.partNumber;    
    installedEquipmentDto.serial=installedEquipment.serial;
    installedEquipmentDto.deviation=installedEquipment.deviation;
    installedEquipmentDto.md=installedEquipment.md;
    installedEquipmentDto.tvd=installedEquipment.tvd;
    installedEquipmentDto.isThirdPart=installedEquipment.isThirdPart;    
    installedEquipmentDto.isKeyComponent=installedEquipment.isKeyComponent;    

    return installedEquipmentDto;
  }

}
