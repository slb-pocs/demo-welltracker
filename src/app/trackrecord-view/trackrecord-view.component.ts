import { Component, Input, OnInit } from '@angular/core';
import { TrackRecord } from '../models/track-record';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trackrecord-view',
  templateUrl: './trackrecord-view.component.html',
  styleUrl: './trackrecord-view.component.css'
})
export class TrackrecordViewComponent {
  trackRecord:TrackRecord;  
  @Input() id:string='';
  
  projectId:string='';
  operationId:string='';
  operationActivityId:string='';
  trackRecordId:number=0;

  isSurfaceEquipmentFinished:boolean=false;
  isInstalledEquipmentFinished:boolean=false;

  message:string='Track Record';  

  constructor(private route: ActivatedRoute){
    this.trackRecord=new TrackRecord();       
  }
    
  ngOnInit() {          
    
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
  ReceiveTrackRecordData(data:number){
    this.trackRecordId=data;
  }
  ReceiveSurfaceEquipmentEvent(data:boolean){
    this.isSurfaceEquipmentFinished=true;
  }
  ReceiveInstalledEquipmentEvent(data:boolean){
    this.isInstalledEquipmentFinished=true;
  }
}
