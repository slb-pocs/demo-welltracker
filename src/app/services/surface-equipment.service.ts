import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SurfaceEquipment } from '../models/surface-equipment';
import { Observable } from 'rxjs';
import { SurfaceEquipmentDto } from '../apiDtos/surface-equipment-dto';

@Injectable({
  providedIn: 'root'
})
export class SurfaceEquipmentService {
  apiUrl='https://localhost:7107/api/surfaceequipment';

  constructor(private http: HttpClient) { }

  public CreateSurfaceEquipment(surfaceequipment:SurfaceEquipment)
  :Observable<SurfaceEquipment>{
    let surfaceequipmentDto:SurfaceEquipmentDto=this.GetSurfaceEquipmentDtoFromSurfaceEquipment(surfaceequipment);    
    return this.http.post<SurfaceEquipment>(this.apiUrl,surfaceequipmentDto);
  }
  public UpdateSurfaceEquipment(surfaceequipment:SurfaceEquipment)
  :Observable<SurfaceEquipment>{
    let surfaceequipmentDto:SurfaceEquipmentDto=
      this.GetSurfaceEquipmentDtoFromSurfaceEquipment(surfaceequipment); 
    return this.http.put<SurfaceEquipment>(this.apiUrl,surfaceequipmentDto);
  }
  public GetAllSurfaceEquipments():Observable<SurfaceEquipment[]>{
    return this.http.get<SurfaceEquipment[]>(this.apiUrl);
  }
  public GetSurfaceEquipmentsByTrackRecord(trackRecordId:number):Observable<SurfaceEquipment[]>{
    return this.http.get<SurfaceEquipment[]>(this.apiUrl+'/trackrecordid?trackRecordId='+trackRecordId);
  }
  public GetSurfaceEquipment(id:number):Observable<SurfaceEquipment>{  
    return this.http.get<SurfaceEquipment>(this.apiUrl+'/id?id='+id);
  }
  
  private GetSurfaceEquipmentDtoFromSurfaceEquipment(surfaceEquipment:SurfaceEquipment)
  :SurfaceEquipmentDto{
    let surfaceEquipmentDto:SurfaceEquipmentDto=new SurfaceEquipmentDto();
    
    surfaceEquipmentDto.trackRecordId=surfaceEquipment.trackRecordId;
    surfaceEquipmentDto.catalogPartNumber=surfaceEquipment.catalogPart.partNumber;    
    surfaceEquipmentDto.quantity=surfaceEquipment.quantity;
    surfaceEquipmentDto.serial=surfaceEquipment.serial;
    surfaceEquipmentDto.isKeyComponent=surfaceEquipment.isKeyComponent;    

    return surfaceEquipmentDto;
  }

}
