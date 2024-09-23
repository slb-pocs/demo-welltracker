import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  //Testing radiobuuton
  form: FormGroup;  

  INITIAL_COMPLETION_OPTION:string='Initial Completion';
  RECOMPLETION_OPTION:string='Recompletion';

  isPulled:boolean=false;

  initialCompletionOptionList:string[]=[this.INITIAL_COMPLETION_OPTION , this.RECOMPLETION_OPTION];  

  @Output() initialCompletionDataEvent =new EventEmitter<TrackRecord>();

  @Input() trackRecordFromParent:TrackRecord=new TrackRecord();
  
  isCompletionPulledFormControl:FormControl=new FormControl('');
  isInitialCompletionFormControl:FormControl=new FormControl(true);
  completionPulledDateFormControl:FormControl=new FormControl(new Date());
  completionPulledReasonFormControl:FormControl=new FormControl('');
  lastValidatedDateFormControl:FormControl=new FormControl(new Date());
  hasIpmWellFormControl:FormControl=new FormControl(false);
  hasLinerHangerInstallationFormControl:FormControl=new FormControl(false);  

  completionPulledReasonList: CompletionpulledReason[] = [];  
 

  public constructor(private completionInitialService: CompletionInitialDataService
                    ,private typesService: TypesService                    
                    ,private dialogWindow:MatDialog
  ){
    this.form = new FormGroup({
      selectedOption: new FormControl('Initial Completion')  // Default selection
    });
  } 

  ngOnChanges(changes: SimpleChanges): void {
    if(this.trackRecordFromParent?.well!=null && this.trackRecordFromParent?.well?.completionInitialData?.id!=0)
      this.FillFields(this.trackRecordFromParent?.well.completionInitialData);
  }

  ngOnInit(){
    if (this.trackRecordFromParent?.well!=null && 
      this.trackRecordFromParent.well?.completionInitialData!=null)
        this.trackRecordFromParent.well.completionInitialData.wellId
                                =this.trackRecordFromParent.well.id;  
                                
    this.completionPulledDateFormControl=new FormControl('');
    this.lastValidatedDateFormControl=new FormControl('');                            

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

    if (this.trackRecordFromParent.well.completionInitialData ==null){
      this.trackRecordFromParent.well.completionInitialData=new CompletionInitialData();
    }
    this.trackRecordFromParent.well.completionInitialData.isInitialCompletion=
                this.form.value.selectedOption==this.INITIAL_COMPLETION_OPTION;

    if(this.isCompletionPulledFormControl.value==true){
      this.trackRecordFromParent.well.completionInitialData.completionPulledDate=
                                      this.completionPulledDateFormControl.value;
      
    }            

    
    this.trackRecordFromParent.well.completionInitialData.equipmentLastValidated=
                                      this.lastValidatedDateFormControl.value;                                 
    this.trackRecordFromParent.well.completionInitialData.isCompletionPulled=
                                      this.isCompletionPulledFormControl.value;
    this.trackRecordFromParent.well.completionInitialData.hasIpmWell=
                                this.hasIpmWellFormControl.value==true;
    this.trackRecordFromParent.well.completionInitialData.hasLinerHangerInstallation
                              =this.hasLinerHangerInstallationFormControl.value==true;    
    this.trackRecordFromParent.well.completionInitialData.wellId
                                =this.trackRecordFromParent.well.id;    

    if(this.trackRecordFromParent.well.completionInitialData.id==0){
      this.Create();
    }
    else{
      this.Update();
    }        
  }
  Create(){
    this.completionInitialService.CreateCompletionInitialData(this.trackRecordFromParent.well.completionInitialData)
      .subscribe(response =>{
        this.trackRecordFromParent.well.completionInitialData=response,
        this.SendPopupNotification
        ('The completion history data has been saved with the id: '
          +this.trackRecordFromParent.well.completionInitialData.id),
        this.initialCompletionDataEvent.emit(this.trackRecordFromParent)  
      });
  }
  Update(){
    this.completionInitialService.UpdateCompletionInitialData(this.trackRecordFromParent.well.completionInitialData)
    .subscribe(response =>{
      this.trackRecordFromParent.well.completionInitialData=response,
      this.SendPopupNotification
      ('The completion history data has been updated: '
        +this.trackRecordFromParent.well.completionInitialData.id),
        this.initialCompletionDataEvent.emit(this.trackRecordFromParent) 
    });
  }
  ClearFields(){
    this.trackRecordFromParent.well.completionInitialData=new CompletionInitialData();
    this.trackRecordFromParent.well.completionInitialData.wellId=this.trackRecordFromParent.well.id

    this.form = new FormGroup({
      selectedOption: new FormControl(this.INITIAL_COMPLETION_OPTION)});

    this.isCompletionPulledFormControl=new FormControl('');   
    this.completionPulledDateFormControl=new FormControl('');
    this.completionPulledReasonFormControl=new FormControl('');
    this.lastValidatedDateFormControl=new FormControl('');  
    this.hasIpmWellFormControl=new FormControl('');
    this.hasLinerHangerInstallationFormControl=new FormControl('');  
  }
  FillFields(completionInitialData:CompletionInitialData){
    this.isCompletionPulledFormControl.setValue
            (this.trackRecordFromParent.well?.completionInitialData?.isCompletionPulled==true);
    
    this.isPulled=this.isCompletionPulledFormControl.value;
    
    if (completionInitialData.isInitialCompletion){
      this.form = new FormGroup({
        selectedOption: new FormControl(this.INITIAL_COMPLETION_OPTION)});
    }
    else{
      this.form = new FormGroup({
        selectedOption: new FormControl(this.RECOMPLETION_OPTION)});
    }    

    this.completionPulledDateFormControl.setValue
            (this.trackRecordFromParent.well?.completionInitialData?.completionPulledDate);
    this.completionPulledReasonFormControl.setValue
            (this.trackRecordFromParent.well?.completionInitialData?.completionPulledReason.name);
    this.lastValidatedDateFormControl.setValue
            (this.trackRecordFromParent.well?.completionInitialData?.equipmentLastValidated);
    this.hasIpmWellFormControl.setValue
            (this.trackRecordFromParent.well?.completionInitialData?.hasIpmWell);
    this.hasLinerHangerInstallationFormControl.setValue
            (this.trackRecordFromParent.well?.completionInitialData?.hasLinerHangerInstallation);  
  }  
 

  public OnChangeWellEvent(event: MatOptionSelectionChange, completionPulledReason: CompletionpulledReason) {
    if (event.source.selected == true) 
      this.trackRecordFromParent.well.completionInitialData.completionPulledReason = completionPulledReason;       
  }

  public OnClickPulledReason(event: MatOptionSelectionChange, reason: CompletionpulledReason) {
    if (event.source.selected == true)
      this.trackRecordFromParent.well.completionInitialData.completionPulledReason = reason;
  }

  OnClickIsPulled(){
    this.isPulled= !this.isPulled;
    if(this.isPulled==false){
      this.completionPulledDateFormControl=new FormControl('');
      this.completionPulledReasonFormControl=new FormControl('');
    }
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
