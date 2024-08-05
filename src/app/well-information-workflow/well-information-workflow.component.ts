import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Well } from '../models/well';
import { TrackRecord } from '../models/track-record';
import { Console } from 'console';
@Component({
  selector: 'app-well-information-workflow',
  templateUrl: './well-information-workflow.component.html',
  styleUrl: './well-information-workflow.component.css'
})
export class WellInformationWorkflowComponent implements OnInit, OnChanges {
  
  step:number=0;
  
  wellId:number=0;
  

  @Output() wellInfoEvent=new EventEmitter<TrackRecord>();

  @Input() trackRecordId:number=0;
  @Input() well:Well=new Well();
  @Input() trackRecord:TrackRecord=new TrackRecord();
  @Input() isQuery:boolean=false;


  isSearchingFinished:boolean=false;  
  isManagementInfoFinished:boolean=false;
  isCustomerDataFinished:boolean=false;
  isWellDataFinished:boolean=false;
  isStemDataFinished:boolean=false;
  isCompletionHistoryFinished:boolean=false;
  isCompletionDataFinished:boolean=false;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('trackrecordId in well-informatio:OnChanges= '+this.trackRecord.id); 
    
      
   
  } 

  ngOnInit(): void {
    if(this.isQuery)  {
      this.step=1;   
      this.isQuery=false;
    }
    
  }

  SetStep(step:number){
    this.step=step;
  }
  OnManagementInfoEvent(trackRecord:TrackRecord){   
    this.UpdateTrackRecord(trackRecord);
    this.wellInfoEvent.emit(this.trackRecord);
    this.isManagementInfoFinished=true;
    this.step=2;
  } 
  OnCustomerInfoEvent(trackRecord:TrackRecord){
    this.UpdateTrackRecord(trackRecord);
    this.wellInfoEvent.emit(this.trackRecord);
    this.isCustomerDataFinished=true;
    this.step=3;
  } 
  OnWellInfoEvent(trackRecord:TrackRecord){ 
    this.UpdateTrackRecord(trackRecord); 
    this.wellInfoEvent.emit(this.trackRecord);     
    this.isWellDataFinished=true;
    this.step=4;
  }
  OnStemInfoEvent(trackRecord:TrackRecord){   
    this.UpdateTrackRecord(trackRecord); 
    this.wellInfoEvent.emit(this.trackRecord);
    this.isStemDataFinished=true;
    this.step=5;
  }
  OnHistoryDataCompletion(trackRecord:TrackRecord){   
    this.UpdateTrackRecord(trackRecord); 
    this.wellInfoEvent.emit(this.trackRecord);
    this.isCompletionHistoryFinished=true;
    this.step=6;
  }
  OnCompletionInfo(trackRecord:TrackRecord){   
    this.UpdateTrackRecord(trackRecord);
    this.wellInfoEvent.emit(this.trackRecord);
    this.isCompletionDataFinished=true;
    this.step=7;
  }
  OnSearchingEvent(trackRecord:TrackRecord){
    this.UpdateTrackRecord(trackRecord);  
    this.wellInfoEvent.emit(this.trackRecord);
    console.log('OnSearchingEvent: '+ trackRecord.well.name);      
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
      mdMeassuredFrom:well.mdMeassuredFrom,
      tvdMeassuredFrom:well.tvdMeassuredFrom,
      mdDistance:well.mdDistance,
      tvdDistance:well.tvdDistance,
      mdUnit:well.mdUnit,
      tvdUnit:well.tvdUnit,
      upperCompletionType:well.upperCompletionType,
      artificialLiftType:well.artificialLiftType,
      multiLateralType:well.multiLateralType,
      linerHangerSystem:well.linerHangerSystem,
      multiStageType:well.multiStageType,
      trackRecordId:well.trackRecordId,
      projectId:well.projectId,
      operationId:well.operationId,
      operationActivityId:well.operationActivityId,
      activityJob:well.activityJob,
      stems:well.stems,
      completionInitialData:well.completionInitialData,
      completions:well.completions
    }
  }
  private UpdateTrackRecord(trackRecord:TrackRecord){
    this.trackRecord={
      id:trackRecord.id,
      supervisorUser:trackRecord.supervisorUser,
      assignedUser:trackRecord.assignedUser,
      validatorUser:trackRecord.validatorUser,
      dataEntryUser:trackRecord.dataEntryUser,
      installationStartDate:trackRecord.installationEndDate,
      installationEndDate:trackRecord.installationEndDate,
      validationDate:trackRecord.validationDate,
      well:trackRecord.well ,
      surfaceEquipment:trackRecord.surfaceEquipment,
      installedEquipment:trackRecord.installedEquipment     
    }
  }


}
