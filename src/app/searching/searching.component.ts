import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { OperationActivityService } from '../services/operation-activity.service';
import { OperationActivityDto } from '../apiDtos/operation-activity-dto';
import { Customer } from '../models/customer';
import { response } from 'express';
import { Well } from '../models/well';
import { MatDialog } from '@angular/material/dialog';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { TrackRecord } from '../models/track-record';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrl: './searching.component.css'
})
export class SearchingComponent {
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  @Output() projectEvent=new EventEmitter<string>();
  @Output() operationtEvent=new EventEmitter<string>();
  @Output() operationActivityEvent=new EventEmitter<TrackRecord>();

  projectFormControl:FormControl=new FormControl('');
  operationFormControl:FormControl=new FormControl('');
  operationActivityFormControl:FormControl=new FormControl('');

  eventCount:number=1;

  operationActivity:OperationActivityDto=new OperationActivityDto();

  customer:Customer=new Customer();

  trackRecord:TrackRecord=new TrackRecord();

  public constructor(private operationService: OperationActivityService,
                     private dialogRef: MatDialog
  ){}

  ngOnInit(){
    
  }

  async SearchData(){   
    this.eventCount++;       

    if (this.operationActivityFormControl.value!=''){
    this.SendPopupNotification('We are prepopulating your data from Field Delivery Platform <br>' 
      +' to enhance your experience and save you time. Please review and <br>'
      +' confirm the information to ensure accuracy. '); 

     this.trackRecord=await this.operationService
              .GetTrackRecordByOperationActivity(this.operationActivityFormControl.value); 
     
     if((this.trackRecord.well.name=='' || this.trackRecord.well.name==null)
      && (this.trackRecord.well.customer?.name=='' || this.trackRecord.well.customer?.name==null)){
      this.SendPopupNotification('There is no data associated with the operational activity');
     }
      
     else{    
      this.trackRecord.id=-1;
      this.operationActivityEvent.emit(this.trackRecord);             
     }
     
    } 
  }
  ClearFields(){
    this.projectFormControl=new FormControl('');
    this.operationFormControl=new FormControl('');
    this.operationActivityFormControl=new FormControl('');  
  }
  private SendPopupNotification(message: string) {
    this.dialogRef.open(PopupViewComponent, {
      data: {
        message: message
      }
    });
  }


}




