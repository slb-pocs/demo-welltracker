import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Well } from '../models/well';
@Component({
  selector: 'app-well-information-workflow',
  templateUrl: './well-information-workflow.component.html',
  styleUrl: './well-information-workflow.component.css'
})
export class WellInformationWorkflowComponent implements OnInit { 
  step:number=0;
  trackRecordId:number=0;
  wellId:number=0;
  well:Well=new Well();

  @Output() trackRecordEvent=new EventEmitter<number>();

  isSearchingFinished:boolean=false;  
  isManagementInfoFinished:boolean=false;
  isCustomerDataFinished:boolean=false;
  isWellDataFinished:boolean=false;
  isStemDataFinished:boolean=false;
  isCompletionHistoryFinished:boolean=false;
  isCompletionDataFinished:boolean=false;

  ngOnInit(): void {
    
  }

  SetStep(step:number){
    this.step=step;
  }
  OnManagementInfoEvent(message:number){
    this.trackRecordId=message;
    this.trackRecordEvent.emit(this.trackRecordId);
    this.isManagementInfoFinished=true;
    this.step=2;
  } 
  OnCustomerInfoEvent(message:number){
    this.wellId=message;
    this.isCustomerDataFinished=true;
    this.step=3;
  } 
  OnWellInfoEvent(message:number){   
    this.isWellDataFinished=true;
    this.step=4;
  }
  OnStemInfoEvent(message:number){   
    this.isStemDataFinished=true;
    this.step=5;
  }
  OnHistoryDataCompletion(message:number){   
    this.isCompletionHistoryFinished=true;
    this.step=6;
  }
  OnCompletionInfo(message:number){   
    this.isCompletionDataFinished=true;
    this.step=7;
  }
  OnSearchingEvent(well:Well){
    this.UpdateWell(well);  
    console.log('OnSearchingEvent: '+ well.name);      
    this.step=1;
  }
  private UpdateWell(well:Well){
    this.well={
      id:well.id,
      name:well.name,
      wellType:well.wellType,
      customer:well.customer,
      country:well.country,
      basin:well.basin,
      field:well.field,
      environment:well.environment,
      geoUnit:well.geoUnit,
      waterDepth:well.waterDepth,
      maxDeviation:well.maxDeviation,
      mdMeasuredFrom:well.mdMeasuredFrom,
      tvdMeasuredFrom:well.tvdMeasuredFrom,
      mdDistance:well.mdDistance,
      tvdDistance:well.tvdDistance,
      mdUnits:well.mdUnits,
      tvdUnits:well.tvdUnits,
      upperCompletionType:well.upperCompletionType,
      artificialLiftType:well.artificialLiftType,
      multiLateralType:well.multiLateralType,
      linerHangerSystem:well.linerHangerSystem,
      multiStageType:well.multiStageType,
      trackRecordId:well.trackRecordId,
      projectId:well.projectId,
      operationId:well.operationId,
      operationActivityId:well.operationActivityId,
      activityJob:well.activityJob
    }
  }


}
