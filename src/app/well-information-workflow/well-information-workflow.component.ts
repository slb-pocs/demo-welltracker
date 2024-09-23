import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Well } from '../models/well';
import { TrackRecord } from '../models/track-record';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
@Component({
  selector: 'app-well-information-workflow',
  templateUrl: './well-information-workflow.component.html',
  styleUrl: './well-information-workflow.component.css'
})
export class WellInformationWorkflowComponent implements OnInit, OnChanges {

  step:number=0;
  
  wellId:number=0;  

  @Output() wellInfoEvent=new EventEmitter<TrackRecord>();

  @Input() well:Well=new Well();
  @Input() trackRecord:TrackRecord=new TrackRecord();

  isSearchingFinished:boolean=false;  
  isManagementInfoFinished:boolean=false;
  isCustomerDataFinished:boolean=false;
  isWellDataFinished:boolean=false;
  isStemDataFinished:boolean=false;
  isCompletionHistoryFinished:boolean=false;
  isCompletionDataFinished:boolean=false;

  ngOnChanges(changes: SimpleChanges): void {   
    if (this.trackRecord.id>0 && this.step===0){      
      this.SetStep(1); 
    }      
    /*
    else
      this.SetStep(0);       
    */
  } 

  ngOnInit(): void {  
    if (this.trackRecord.id!=0 ){    
      this.SetStep(1);
    }        
    
  }

  SetStep(step:number){
    this.step=step;
  }
  OnSearchingEvent(trackRecord:TrackRecord){
    this.UpdateTrackRecord(trackRecord);  
    this.wellInfoEvent.emit(this.trackRecord);       
    this.step=1;
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

  OnHistoryDataCompletion(trackRecord:TrackRecord){   
    this.UpdateTrackRecord(trackRecord); 
    this.wellInfoEvent.emit(this.trackRecord);
    this.isCompletionHistoryFinished=true;
    this.step=5;
  }
 
 
 
  private UpdateTrackRecord(trackRecord:TrackRecord){
    this.trackRecord={
      id:trackRecord.id,
      supervisorUser:trackRecord.supervisorUser,
      assignedUser:trackRecord.assignedUser,
      validatorUser:trackRecord.validatorUser,
      dataEntryUser:trackRecord.dataEntryUser,
      managementCountry:trackRecord.managementCountry,
      installationStartDate:trackRecord.installationEndDate,
      installationEndDate:trackRecord.installationEndDate,
      validationDate:trackRecord.validationDate,
      well:trackRecord.well ,
      surfaceEquipment:trackRecord.surfaceEquipment,
      installedEquipment:trackRecord.installedEquipment     
    }
  }


}
