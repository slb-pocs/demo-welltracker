import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { CompletionInitialData } from '../models/completion-initial-data';
import { CompletionpulledReason } from '../models/completionpulled-reason';
import { TypesService } from '../services/types.service';
import { CompletionInitialDataService } from '../services/completion-initial-data.service';
import { MatDialog } from '@angular/material/dialog';
import { response } from 'express';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { MatOptionSelectionChange } from '@angular/material/core';
import { TrackRecord } from '../models/track-record';

@Component({
  selector: 'app-completion-history',
  templateUrl: './completion-history.component.html',
  styleUrl: './completion-history.component.css'
})
export class CompletionHistoryComponent implements OnChanges{

  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  @Output() initialCompletionDataEvent =new EventEmitter<TrackRecord>();

  @Input() TrackRecordFromParent:TrackRecord=new TrackRecord();
  
  isCompletionPulledFormControl:FormControl=new FormControl('');
  isInitialCompletionFormControl:FormControl=new FormControl('');
  completionPulledDateFormControl:FormControl=new FormControl('');
  completionPulledReasonFormControl:FormControl=new FormControl('');
  lastValidatedFormControl:FormControl=new FormControl('');  
  hasIpmWellFormControl:FormControl=new FormControl('');
  hasLinerHangerInstallationFormControl:FormControl=new FormControl('');  

  completionPulledReasonList: CompletionpulledReason[] = [];  
 

  public constructor(private completionInitialService: CompletionInitialDataService
                    ,private typesService: TypesService                    
                    ,private dialogWindow:MatDialog
  ){

  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.TrackRecordFromParent.well.completionInitialData.id!=0)
      this.FillFields(this.TrackRecordFromParent.well.completionInitialData);
  }

  ngOnInit(){
    this.TrackRecordFromParent.well.completionInitialData.wellId
                            =this.TrackRecordFromParent.well.id;    

    this.isCompletionPulledFormControl.setValue(false);
    this.isInitialCompletionFormControl.setValue(false);
    this.completionPulledReasonFormControl.setValue(false);
    this.hasIpmWellFormControl.setValue(false);
    this.hasLinerHangerInstallationFormControl.setValue(false);
    
    
    this.typesService.GetCompletionPulledReasons()
                    .subscribe(response=>{
                      this.completionPulledReasonList=response
                    });     
  }
 
  Save(){
    this.TrackRecordFromParent.well.completionInitialData.isInitialCompletion=this.isInitialCompletionFormControl.value==='true';
    this.TrackRecordFromParent.well.completionInitialData.isCompletionPulled=this.isCompletionPulledFormControl.value;
    this.TrackRecordFromParent.well.completionInitialData.hasIpmWell=this.hasIpmWellFormControl.value;
    this.TrackRecordFromParent.well.completionInitialData.hasLinerHangerInstallation=this.hasLinerHangerInstallationFormControl.value;    
    this.TrackRecordFromParent.well.completionInitialData.wellId=this.TrackRecordFromParent.well.id;

    if(this.TrackRecordFromParent.well.completionInitialData.id==0){
      this.Create();
    }
    else{
      this.Update();
    }        
  }
  Create(){
    this.completionInitialService.CreateCompletionInitialData(this.TrackRecordFromParent.well.completionInitialData)
      .subscribe(response =>{
        this.TrackRecordFromParent.well.completionInitialData=response,
        this.SendPopupNotification
        ('The completion history data has been saved with the id: '
          +this.TrackRecordFromParent.well.completionInitialData.id),
        this.initialCompletionDataEvent.emit(this.TrackRecordFromParent)  
      });
  }
  Update(){
    this.completionInitialService.UpdateCompletionInitialData(this.TrackRecordFromParent.well.completionInitialData)
    .subscribe(response =>{
      this.TrackRecordFromParent.well.completionInitialData=response,
      this.SendPopupNotification
      ('The completion history data has been updated: '
        +this.TrackRecordFromParent.well.completionInitialData.id),
        this.initialCompletionDataEvent.emit(this.TrackRecordFromParent) 
    });
  }
  ClearFields(){
    this.TrackRecordFromParent.well.completionInitialData=new CompletionInitialData();
    this.TrackRecordFromParent.well.completionInitialData.wellId=this.TrackRecordFromParent.well.id

    this.isCompletionPulledFormControl=new FormControl('');
    this.isInitialCompletionFormControl=new FormControl('');
    this.completionPulledDateFormControl=new FormControl('');
    this.completionPulledReasonFormControl=new FormControl('');
    this.lastValidatedFormControl=new FormControl('');  
    this.hasIpmWellFormControl=new FormControl('');
    this.hasLinerHangerInstallationFormControl=new FormControl('');  
  }
  FillFields(completionInitialData:CompletionInitialData){
    this.isCompletionPulledFormControl.setValue
            (this.TrackRecordFromParent.well.completionInitialData.isCompletionPulled==true);
    this.isInitialCompletionFormControl.setValue
            (this.TrackRecordFromParent.well.completionInitialData.isInitialCompletion==true);
    this.completionPulledDateFormControl.setValue
            (this.TrackRecordFromParent.well.completionInitialData.completionPulledDate);
    this.completionPulledReasonFormControl.setValue
            (this.TrackRecordFromParent.well.completionInitialData.completionPulledReason.name);
    this.lastValidatedFormControl.setValue
            (this.TrackRecordFromParent.well.completionInitialData.equipmentLastValidated);
    this.hasIpmWellFormControl.setValue
            (this.TrackRecordFromParent.well.completionInitialData.hasIpmWell);
    this.hasLinerHangerInstallationFormControl.setValue
            (this.TrackRecordFromParent.well.completionInitialData.hasLinerHangerInstallation);  
  }  
 

  public OnChangeWellEvent(event: MatOptionSelectionChange, completionPulledReason: CompletionpulledReason) {
    if (event.source.selected == true) 
      this.TrackRecordFromParent.well.completionInitialData.completionPulledReason = completionPulledReason;       
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
