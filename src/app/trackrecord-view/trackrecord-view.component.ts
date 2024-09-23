import { Component, Input, OnInit } from '@angular/core';
import { TrackRecord } from '../models/track-record';
import { ActivatedRoute } from '@angular/router';
import { TrackrecordService } from '../services/trackrecord.service';
import { response } from 'express';
import { StemService } from '../services/stem.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-trackrecord-view',
  templateUrl: './trackrecord-view.component.html',
  styleUrl: './trackrecord-view.component.css',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ]
})
export class TrackrecordViewComponent implements OnInit{
  trackRecord:TrackRecord=new TrackRecord();

  step1Completed=true;
  
  @Input() id:string='';
  
  projectId:string='';
  operationId:string='';
  operationActivityId:string='';
  trackRecordId:number=0;


  isSurfaceEquipmentFinished:boolean=false;
  isInstalledEquipmentFinished:boolean=false;

  message:string='Track Record';  

  constructor(private route: ActivatedRoute
            ,private trackrecordService: TrackrecordService
            ,private stemService: StemService
  ){
    this.trackRecord=new TrackRecord(); 
    this.trackRecord.well.stems=[];      
  }
    
  ngOnInit() {          
    this.trackRecordId=parseInt(this.route.snapshot.paramMap.get('id')?? '0');
    if (this.trackRecordId!=0){
      this.trackrecordService.GetTrackRecord(this.trackRecordId)
      .subscribe(response =>{
      this.trackRecord=response
      });     
    }
  }
  ReceiveProjectData(data:string){
      this.projectId=data;
  }  
  ReceiveOperationtData(data:string){
    this.operationId=data;
  }
 

  ReceiveOperationActivityData(data:string){
    this.operationActivityId=data;
  }
  ReceiveTrackRecordData(trackRecord:TrackRecord){
    this.UpdateTrackRecord(trackRecord);    
  }
  ReceiveWellDataWorkflowEvent(trackRecord:TrackRecord){
    this.UpdateTrackRecord(trackRecord);
  }
  ReceiveSurfaceEquipmentEvent(trackRecord:TrackRecord){
    this.trackRecord=trackRecord;
    this.isSurfaceEquipmentFinished=true;
  }
  ReceiveInstalledEquipmentEvent(trackRecord:TrackRecord){
    this.trackRecord=trackRecord;
    this.isInstalledEquipmentFinished=true;
  }
  ReceiveFileManagementEvent(trackRecord:TrackRecord){
    this.trackRecord=trackRecord;    
  }
  ReceiveQuestionnaireEvent(trackRecord:TrackRecord){
    this.trackRecord=trackRecord;    
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
