import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { TrackrecordService } from '../services/trackrecord.service';
import { TrackRecord } from '../models/track-record';
import { MatDialog } from '@angular/material/dialog';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { response } from 'express';
import { Well } from '../models/well';

@Component({
  selector: 'app-management-data',
  templateUrl: './management-data.component.html',
  styleUrl: './management-data.component.css'
})
export class ManagementDataComponent implements OnChanges{
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  @Output() trackRecordEvent=new EventEmitter<TrackRecord>(); 
  @Input() trackRecordFromParent:TrackRecord=new TrackRecord();

  supervisorFormControl:FormControl=new FormControl('');
  validatorUserFormControl:FormControl=new FormControl('');
  dataEntryUserFormControl:FormControl=new FormControl('');
  assignedUserFormControl:FormControl=new FormControl('');

  public constructor(private trackrecordService: TrackrecordService
                    ,private dialogWindow: MatDialog
  ){}

  ngOnChanges(changes: SimpleChanges): void {    
    if (this.trackRecordFromParent.id!=0)  
      this.FillFields(this.trackRecordFromParent);
  }

  ngOnInit(){  
   
  }

  SaveManagementData(){
    this.trackRecordFromParent.supervisorUser=this.supervisorFormControl.value;
    this.trackRecordFromParent.validatorUser=this.validatorUserFormControl.value;
    this.trackRecordFromParent.dataEntryUser=this.dataEntryUserFormControl.value;
    this.trackRecordFromParent.assignedUser=this.assignedUserFormControl.value;

    if (this.trackRecordFromParent.id<=0){
      this.CreateTrackRecord();
    }
    else{
      this.UpdateTrackRecord();
    }    
  }

  private CreateTrackRecord(){
    let populatedWell=new Well();
    populatedWell=this.trackRecordFromParent.well?? new Well();
    this.trackrecordService.CreateTrackRecord(this.trackRecordFromParent)
        .subscribe(response=> {
          this.trackRecordFromParent=response,
          this.trackRecordFromParent.well=populatedWell,
          this.SendPopupNotification
              ('The Trackrecord has been created with the id: '
                +this.trackRecordFromParent.id),
          this.trackRecordEvent.emit(this.trackRecordFromParent)
             
        });   
  }
  private UpdateTrackRecord(){
    this.trackrecordService.UpdateTrackRecord(this.trackRecordFromParent)
        .subscribe(response=> {          
          this.SendPopupNotification
              ('The Trackrecord with id: '
                +this.trackRecordFromParent+' has been updated')          
        });   
  }

  FillFields(trackrecord:TrackRecord){
    this.supervisorFormControl.setValue(trackrecord.supervisorUser);
    this.assignedUserFormControl.setValue(trackrecord.assignedUser);
    this.dataEntryUserFormControl.setValue(trackrecord.dataEntryUser);
    this.validatorUserFormControl.setValue(trackrecord.validatorUser);
  }

  ClearFields(){
    this.trackRecordFromParent=new TrackRecord();
    this.FillFields(this.trackRecordFromParent);
    this.trackRecordFromParent.id=this.trackRecordFromParent.id;
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
