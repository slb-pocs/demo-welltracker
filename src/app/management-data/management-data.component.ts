import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { TrackrecordService } from '../services/trackrecord.service';
import { TrackRecord } from '../models/track-record';
import { MatDialog } from '@angular/material/dialog';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { response } from 'express';

@Component({
  selector: 'app-management-data',
  templateUrl: './management-data.component.html',
  styleUrl: './management-data.component.css'
})
export class ManagementDataComponent {
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  trackrecord:TrackRecord=new TrackRecord();

  @Output() trackRecordEvent=new EventEmitter<number>();
  @Input() trackRecordIdFromParent:number=0;

  supervisorFormControl:FormControl=new FormControl('');
  validatorUserFormControl:FormControl=new FormControl('');
  dataEntryUserFormControl:FormControl=new FormControl('');
  assignedUserFormControl:FormControl=new FormControl('');

  isManagementInfoFinished:boolean=false;

  public constructor(private trackrecordService: TrackrecordService
                    ,private dialogWindow: MatDialog
  ){}

  ngOnInit(){
    if (this.trackRecordIdFromParent!=0){
      this.trackrecordService.GetTrackRecord(this.trackRecordIdFromParent)
        .subscribe(response =>{
          this.trackrecord=response,
          this.FillFields(this.trackrecord)
        });
    }
  }

  SaveManagementData(){
    this.trackrecord.supervisorUser=this.supervisorFormControl.value;
    this.trackrecord.validatorUser=this.validatorUserFormControl.value;
    this.trackrecord.dataEntryUser=this.dataEntryUserFormControl.value;
    this.trackrecord.assignedUser=this.assignedUserFormControl.value;

    if (this.trackRecordIdFromParent==0){
      this.CreateTrackRecord();
    }
    else{
      this.UpdateTrackRecord();
    }    
  }

  private CreateTrackRecord(){
    this.trackrecordService.CreateTrackRecord(this.trackrecord)
        .subscribe(response=> {
          this.trackrecord=response,
          this.SendPopupNotification
              ('The Trackrecord has been created with the id: '
                +this.trackrecord.id),
          this.trackRecordEvent.emit(this.trackrecord.id),
          this.isManagementInfoFinished=true;         
        });   
  }
  private UpdateTrackRecord(){
    this.trackrecordService.UpdateTrackRecord(this.trackrecord)
        .subscribe(response=> {
          this.trackrecord=response,
          this.SendPopupNotification
              ('The Trackrecord with id: '
                +this.trackRecordIdFromParent+' has been updated')          
        });   
  }

  FillFields(trackrecord:TrackRecord){
    this.supervisorFormControl.setValue(trackrecord.supervisorUser);
    this.assignedUserFormControl.setValue(trackrecord.assignedUser);
    this.dataEntryUserFormControl.setValue(trackrecord.dataEntryUser);
    this.validatorUserFormControl.setValue(trackrecord.validatorUser);
  }

  ClearFields(){
    this.trackrecord=new TrackRecord();
    this.FillFields(this.trackrecord);
    this.trackrecord.id=this.trackRecordIdFromParent;
  }

  private SendPopupNotification(message: string) {
    this.dialogWindow.open(PopupViewComponent, {
      data: {
        message: message
      }
    }
    );
  }



}
