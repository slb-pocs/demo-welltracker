import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ArtificialliftType } from '../models/artificiallift-type';
import { LinerhangerSystem } from '../models/linerhanger-system';
import { MaxDeviation } from '../models/max-deviation';
import { MdUnit } from '../models/md-unit';
import { MeassuredFrom } from '../models/meassured-from';
import { Multilateral } from '../models/multilateral';
import { MultistageSimulation } from '../models/multistage-simulation';
import { TrackRecord } from '../models/track-record';
import { TvdUnit } from '../models/tvd-unit';
import { UppercompletionType } from '../models/uppercompletion-type';
import { Well } from '../models/well';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { TypesService } from '../services/types.service';
import { WellService } from '../services/well.service';

@Component({
  selector: 'app-well-options-view',
  templateUrl: './well-options-view.component.html',
  styleUrl: './well-options-view.component.css'
})
export class WellOptionsViewComponent {
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  @Output() wellOptionsEvent =new EventEmitter<TrackRecord>();

  @Input() trackRecordFromParent:TrackRecord=new TrackRecord();

  upperCompletionFormControl:FormControl=new FormControl('');
  artificalLiftFormControl:FormControl=new FormControl('');
  multiLateralFormControl:FormControl=new FormControl('');
  linerHangerFormControl:FormControl=new FormControl('');
  multiStageFormControl:FormControl=new FormControl('');

  upperCompletionList: UppercompletionType[] = [];
  artificialLiftList: ArtificialliftType[] = [];
  multiLateralList: Multilateral[] = [];
  linerHangerSystemList: LinerhangerSystem[] = [];
  multiStageSimulationList: MultistageSimulation[] = [];


  public constructor(private typesService: TypesService           
                    ,private wellService:WellService
                    ,private dialogWindow:MatDialog
  ){

  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.trackRecordFromParent.well?.id!=0 && this.trackRecordFromParent.well!.artificialLiftType!=null){
      this.FillFields(this.trackRecordFromParent.well);
    }
  }

  ngOnInit(){
    if(this.trackRecordFromParent.well!=null){
      this.trackRecordFromParent.well.trackRecordId=this.trackRecordFromParent.id;    
    
      if (this.trackRecordFromParent.well.id!=0){    
        this.wellService.GetWell(this.trackRecordFromParent.well.id).subscribe(response => {
                this.trackRecordFromParent.well=response
              });
      }
    } 
    
    this.typesService.GetUpperCompletionTypes()
    .subscribe(response=>{
      this.upperCompletionList=response
    });
    this.typesService.GetArtificialLiftTypes()
        .subscribe(response=>{
          this.artificialLiftList=response
        });
    this.typesService.GetMultiStageTypes()
        .subscribe(response=>{
          this.multiStageSimulationList=response
        });
    this.typesService.GetLinerHangerSystems()
        .subscribe(response=>{
          this.linerHangerSystemList=response
        });   
    this.typesService.GetMultiLateralTypes()
        .subscribe(response=>{
          this.multiLateralList=response
        });
  }
  
  Save(){

    if(this.trackRecordFromParent.well.id==0)
      this.SendPopupNotification
      ('The customer information needs to be added first.');

    else{                  
      this.Update();             
    }   
  } 

  Update(){
    let updatedWell:Well=new Well();
    
    this.wellService.GetWell(this.trackRecordFromParent.well.id).subscribe(
      response=> {
        updatedWell=response,
        updatedWell.upperCompletionType=this.trackRecordFromParent.well.upperCompletionType,
        updatedWell.artificialLiftType=this.trackRecordFromParent.well.artificialLiftType,
        updatedWell.multiLateralType=this.trackRecordFromParent.well.multiLateralType,
        updatedWell.multiStageType=this.trackRecordFromParent.well.multiStageType,
        updatedWell.linerHangerSystem=this.trackRecordFromParent.well.linerHangerSystem,        

        this.wellService.UpdateWell(updatedWell)
        .subscribe(response=> {
          this.trackRecordFromParent.well=updatedWell,
          this.SendPopupNotification('The Well options have been updated '),
          this.wellOptionsEvent.emit(this.trackRecordFromParent)              
        });        
      }
        
    );    
   
  }
  ClearFields(){
    this.trackRecordFromParent.well.upperCompletionType=new UppercompletionType();
    this.trackRecordFromParent.well.artificialLiftType=new ArtificialliftType();
    this.trackRecordFromParent.well.multiLateralType=new Multilateral();
    this.trackRecordFromParent.well.linerHangerSystem=new LinerhangerSystem();
    this.trackRecordFromParent.well.multiStageType=new MultistageSimulation();

    this.upperCompletionFormControl=new FormControl('');
    this.artificalLiftFormControl=new FormControl('');
    this.multiLateralFormControl=new FormControl('');
    this.linerHangerFormControl=new FormControl('');
    this.multiStageFormControl=new FormControl('');
  }
  FillFields(well:Well){

    this.upperCompletionFormControl.setValue(well.upperCompletionType?.name);
    this.artificalLiftFormControl.setValue(well.artificialLiftType?.name);
    this.linerHangerFormControl.setValue(well.linerHangerSystem?.name);
    this.multiLateralFormControl.setValue(well.multiLateralType?.name);
    this.multiStageFormControl.setValue(well.multiStageType?.name);   
  }   
  
  public OnChangeUpperCompletionEvent(event: MatOptionSelectionChange, upperCompletion: UppercompletionType) {
    if (event.source.selected == true)
      this.trackRecordFromParent.well.upperCompletionType = upperCompletion;
  }
  public OnChangeArtificialLiftEvent(event: MatOptionSelectionChange, artificialLift: ArtificialliftType) {
    if (event.source.selected == true)
      this.trackRecordFromParent.well.artificialLiftType = artificialLift;
  }
  public OnChangeMultiLateralEvent(event: MatOptionSelectionChange, multiLateral: Multilateral) {
    if (event.source.selected == true)
      this.trackRecordFromParent.well.multiLateralType = multiLateral;
  }
  public OnChangeLinerHangerEvent(event: MatOptionSelectionChange, linerHanger: LinerhangerSystem) {
    if (event.source.selected == true)
      this.trackRecordFromParent.well.linerHangerSystem = linerHanger;
  }
  public OnChangeMultiStageEvent(event: MatOptionSelectionChange, multiStage: MultistageSimulation) {
    if (event.source.selected == true)
      this.trackRecordFromParent.well.multiStageType = multiStage;
  }
  private SendPopupNotification(message: string) {
    this.dialogWindow.open(PopupViewComponent, {
      data: {message: message}
    }
    );
  }
}
