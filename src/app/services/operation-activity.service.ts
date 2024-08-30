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
import { CountryServiceService } from './country-service.service';
import { ManagementCountryServiceService } from './management-country-service.service';
import { ManagementCountry } from '../models/management-country';
import { TrackRecord } from '../models/track-record';

@Injectable({
  providedIn: 'root'
})
export class OperationActivityService {
apiUrl:string='https://apigateway.evq.it.slb.com/fdp_operationalactivities/operationalactivities/';
apikey:string='?x-apikey=A5c73bVnAbgu5hRQzAUOl42x9Ayx3KId'

customer:Customer=new Customer();
well:Well=new Well();
trackRecord:TrackRecord=new TrackRecord();

  constructor(private http:HttpClient
              ,private customerService: CustomerService
              ,private countryService:CountryServiceService
              ,private managementCountryService:ManagementCountryServiceService
              ,private typesService:TypesService
  ) { }

  public GetOperationActivity(operationActivity:string):Observable<OperationActivityDto>{
    return this.http.get<OperationActivityDto>(this.apiUrl+operationActivity+this.apikey);
  }

  async GetTrackRecordByOperationActivity(operationActivityId:string):Promise<TrackRecord>{
    let oActivity=new OperationActivityDto();

    oActivity=await firstValueFrom(this.GetOperationActivity(operationActivityId));

    if((oActivity==null || oActivity?.value==null) &&
       (oActivity?.value?.wells[0]==null && oActivity?.value?.customer==null)){
      return this.trackRecord;
    }
    else{
      this.trackRecord.dataEntryUser=oActivity.value.createdby;
      this.trackRecord.assignedUser=oActivity.value.createdby;
      this.trackRecord.validatorUser=oActivity.value.lastmodifiedby;
      this.trackRecord.supervisorUser=oActivity.value.lastmodifiedby;
      this.trackRecord.installationStartDate=oActivity.value.createddate;
      this.trackRecord.installationEndDate=oActivity.value.lastmodifieddate;      

      let managementCountry:ManagementCountry=new ManagementCountry();    
      managementCountry=await firstValueFrom( this.managementCountryService.
            GetManagementCountryByName(oActivity.value?.managementcountryinfo.name))?? new Country();

      this.trackRecord.managementCountry=managementCountry;      

      this.trackRecord.well.name=oActivity.value.wells[0]?.name?? '';
      this.trackRecord.well.wellType=await this.GetWellTypeByName(oActivity.value.wells[0]?.drillfor?? 'OIL');
  
      this.trackRecord.well.customer=await firstValueFrom( this.customerService.
        GetCustomerByName(oActivity.value.customer?.name));     

      if (this.trackRecord.well.customer==null && oActivity.value.customer!=null && 
                                      oActivity.value.customer?.name!='' ){
        this.trackRecord.well.customer={
          id:0,
          name:oActivity.value.customer?.name.toUpperCase(),
          accountName:oActivity.value.customer?.name.toUpperCase()
        }
        this.trackRecord.well.customer=await firstValueFrom(this.customerService.CreateCustomer(this.well.customer));
      }        
      this.trackRecord.well.geoUnit=await firstValueFrom( this.typesService.
          GetGeoUnitByName(oActivity.value?.geounitinfo.code))?? new GeoUnit();

     
      this.trackRecord.well.country=managementCountry.country;
      this.trackRecord.well.field=oActivity.value.wells[0]?.field?? '';

      this.trackRecord.well.environment=await firstValueFrom( this.typesService.
                GetEnvironmentByName(oActivity.value.wells[0]?.wellenvironment))?? new Environment();
      
      return this.trackRecord;  
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
