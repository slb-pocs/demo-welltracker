import { Component, Input, OnInit } from '@angular/core';
import { TrackRecord } from '../models/track-record';
import { ActivatedRoute } from '@angular/router';
import { TrackrecordService } from '../services/trackrecord.service';
import { response } from 'express';
import { StemService } from '../services/stem.service';

@Component({
  selector: 'app-trackrecord-view',
  templateUrl: './trackrecord-view.component.html',
  styleUrl: './trackrecord-view.component.css'
})
export class TrackrecordViewComponent {
  trackRecord:TrackRecord=new TrackRecord();
  
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
    this.trackRecord=trackRecord;
  }
  ReceiveSurfaceEquipmentEvent(trackRecord:TrackRecord){
    this.trackRecord=trackRecord;
    this.isSurfaceEquipmentFinished=true;
  }
  ReceiveInstalledEquipmentEvent(trackRecord:TrackRecord){
    this.trackRecord=trackRecord;
    this.isInstalledEquipmentFinished=true;
  }
}
