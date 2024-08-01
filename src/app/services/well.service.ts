import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Well } from '../models/well';
import { Observable } from 'rxjs';
import { WellDto } from '../apiDtos/well-dto';

@Injectable({
  providedIn: 'root'
})
export class WellService {

  apiUrl='https://welltracker-backend.azurewebsites.net/api/well';

  constructor(private http:HttpClient) { }

  public CreateWell(well:Well):Observable<Well>{
    let wellDto:WellDto=this.GetWellDtoFromWell(well);    
    return this.http.post<Well>(this.apiUrl,wellDto);
  }
  public UpdateWell(well:Well):Observable<Well>{
    let wellDto:WellDto=this.GetWellDtoFromWell(well); 
    return this.http.put<Well>(this.apiUrl,wellDto);
  }
  public GetAllWells():Observable<Well[]>{
    return this.http.get<Well[]>(this.apiUrl);
  }
  public GetWell(id:number):Observable<Well>{  
    return this.http.get<Well>(this.apiUrl+'/id?id='+id);;
  }

  private GetWellDtoFromWell(well:Well):WellDto{
    let wellDto:WellDto=new WellDto();
    wellDto.id=well.id;
    wellDto.name=well.name;
    wellDto.field=well.field;
    wellDto.wellTypeId=well.wellType.id;
    wellDto.trackRecordId=well.trackRecordId;
    wellDto.customerId=well.customer.id;
    wellDto.countryId=well.country.id;
    wellDto.basinId=well.basin.id;
    wellDto.environmentId=well.environment.id;
    wellDto.geoUnitId=well.geoUnit.id;
    
    wellDto.waterDepth=well.waterDepth;
    wellDto.maxDeviationId=well.maxDeviation.id;
    wellDto.mdMeassuredFromId=well.mdMeassuredFrom.id;
    wellDto.tvdMeassuredFromId=well.tvdMeassuredFrom.id;
    wellDto.mdDistance=well.mdDistance;
    wellDto.tvdDistance=well.tvdDistance;
    wellDto.mdUnitId=well.mdUnit.id;
    wellDto.tvdUnitId=well.tvdUnit.id;
    wellDto.upperCompletionTypeId=well.upperCompletionType.id;
    wellDto.artificialLiftTypeId=well.artificialLiftType.id;
    wellDto.multiLateralTypeId=well.multiLateralType.id;
    wellDto.multiStageTypeId=well.multiStageType.id;   

    return wellDto;
  }
}
