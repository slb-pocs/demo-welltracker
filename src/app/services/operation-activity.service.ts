import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map, Observable } from 'rxjs';
import { OperationActivityDto } from '../apiDtos/operation-activity-dto';
import { Customer } from '../models/customer';
import { CustomerService } from './customer.service';
import { Well } from '../models/well';
import { response } from 'express';
import { TypesService } from './types.service';
import { WellType } from '../models/well-type';
import { subscribe } from 'diagnostics_channel';
import { GeoUnit } from '../models/geo-unit';
import { Country } from '../models/country';
import { Environment } from '../models/environment';

@Injectable({
  providedIn: 'root'
})
export class OperationActivityService {
apiUrl:string='https://apigateway.evq.it.slb.com/fdp_operationalactivities/operationalactivities/';
apikey:string='?x-apikey=A5c73bVnAbgu5hRQzAUOl42x9Ayx3KId'

customer:Customer=new Customer();
well:Well=new Well();

  constructor(private http:HttpClient
              ,private customerService: CustomerService
              ,private typesService:TypesService
  ) { }

  public GetOperationActivity(operationActivity:string):Observable<OperationActivityDto>{
    return this.http.get<OperationActivityDto>(this.apiUrl+operationActivity+this.apikey);
  }

  GetCustomerByName(name:string):Observable<Customer>{
    let customer:Observable<Customer>=new Observable<Customer>();
    if(name=='AGIP OIL ECUADOR B.V.'){
      customer=this.customerService.GetCustomer(3);    
    }
    return customer;
  }

  async GetWellByOperationActivity(operationActivityId:string):Promise<Well>{
    let oActivity=new OperationActivityDto();

    oActivity=await firstValueFrom(this.GetOperationActivity(operationActivityId));

    if(oActivity==null || oActivity?.value==null ||oActivity?.value?.wells[0]==null){
      return this.well;
    }
    else{
      this.well.name=oActivity.value.wells[0].name?? '';
      this.well.wellType=await this.GetWellTypeByName(oActivity.value.wells[0].drillfor?? 'OIL');
      this.well.customer=await firstValueFrom( this.customerService.
        GetCustomerByName(oActivity.value.customer.name))?? new Customer();
      this.well.geoUnit=await firstValueFrom( this.typesService.
          GetGeoUnitByName(oActivity.value.geounitinfo.code))?? new GeoUnit();
      this.well.country=await firstValueFrom( this.typesService.
            GetCountryByName(oActivity.value.managementcountryinfo.name))?? new Country();

      this.well.field=oActivity.value.wells[0].field?? '';

      this.well.environment=await firstValueFrom( this.typesService.
                GetEnvironmentByName(oActivity.value.wells[0].wellenvironment))?? new Environment();
      
      return this.well;  
    }      
  }

  async GetWellTypeByName(wellTypeName:string):Promise<WellType>{
    let wellType:WellType=new WellType();
    if(wellTypeName.toUpperCase()=='OIL'){
      wellType=await firstValueFrom(this.typesService.GetWellTypeByName('OIL PRODUCTION'));                     
    }
    else if (wellTypeName.toUpperCase()=='GAS'){
     wellType=await firstValueFrom(this.typesService.GetWellTypeByName('Gas Production'));                     
    }
    return wellType;                      
  }
    
  
  
}
