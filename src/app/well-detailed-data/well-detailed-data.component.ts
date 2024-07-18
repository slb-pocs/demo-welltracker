import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Well } from '../models/well';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaxDeviation } from '../models/max-deviation';
import { MeassuredFrom } from '../models/meassured-from';
import { MdUnit } from '../models/md-unit';
import { TvdUnit } from '../models/tvd-unit';
import { UppercompletionType } from '../models/uppercompletion-type';
import { ArtificialliftType } from '../models/artificiallift-type';
import { Multilateral } from '../models/multilateral';
import { LinerhangerSystem } from '../models/linerhanger-system';
import { MultistageSimulation } from '../models/multistage-simulation';
import { WellReferenceService } from '../services/well-reference.service';
import { TypesService } from '../services/types.service';
import { WellService } from '../services/well.service';
import { MatDialog } from '@angular/material/dialog';
import { MatOptionSelectionChange } from '@angular/material/core';
import { PopupViewComponent } from '../popup-view/popup-view.component';

@Component({
  selector: 'app-well-detailed-data',
  templateUrl: './well-detailed-data.component.html',
  styleUrl: './well-detailed-data.component.css'
})
export class WellDetailedDataComponent {
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  @Output() wellEvent =new EventEmitter<number>();

  @Input() projectEvent:string='';
  @Input() operationtEvent:string='';
  @Input() operationActivityEvent:string='';
  @Input() trackRecordIdFromParent:number=0;
  @Input() wellIdFromParent:number=0;

  well:Well=new Well();

  waterDepthFormControl:FormControl=new FormControl('');
  maxDeviationFormControl:FormControl=new FormControl('');
  mdMeasuredFormControl:FormControl=new FormControl('');
  mdDistanceFormControl:FormControl=new FormControl('');
  mdUnitsFormControl:FormControl=new FormControl('');
  tvdMeasuredFormControl:FormControl=new FormControl('');
  tvdDistanceFormControl:FormControl=new FormControl('');
  tvdUnitsFormControl:FormControl=new FormControl('');
  upperCompletionFormControl:FormControl=new FormControl('');
  artificalLiftFormControl:FormControl=new FormControl('');
  multiLateralFormControl:FormControl=new FormControl('');
  linerHangerFormControl:FormControl=new FormControl('');
  multiStageFormControl:FormControl=new FormControl('');

  maxDeviationList: MaxDeviation[] = [];
  meassuredFromList: MeassuredFrom[] = [];
  mdUnitList:MdUnit[]=[];
  tvdUnitList: TvdUnit[] = [];
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

  ngOnInit(){
    this.well.trackRecordId=this.trackRecordIdFromParent;
    
    if (this.wellIdFromParent!=0){    
      this.wellService.GetWell(this.wellIdFromParent).subscribe(response => {
            this.well=response
          });
    }
   
    this.typesService.GetMaxDeviations()
                    .subscribe(response=>{
                      this.maxDeviationList=response
                    });
    this.typesService.GetMeassuredFroms()
                    .subscribe(response=>{
                      this.meassuredFromList=response
                    });
    this.typesService.GetMdUnits()
                    .subscribe(response=>{
                      this.mdUnitList=response
                    });
    this.typesService.GetTvdUnits()
                    .subscribe(response=>{
                      this.tvdUnitList=response
                    });
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
    this.well.waterDepth=this.waterDepthFormControl.value;
    this.well.mdDistance=this.mdDistanceFormControl.value;
    this.well.tvdDistance=this.tvdDistanceFormControl.value;

    if(this.wellIdFromParent==0)
      this.SendPopupNotification
      ('The customer information needs to be added first.');

    else{                  
      this.UpdateWell();             
    }   
  } 

  UpdateWell(){
    let updatedWell:Well=new Well();
    
    this.wellService.GetWell(this.wellIdFromParent).subscribe(
      response=> {
        updatedWell=response,
        updatedWell.waterDepth=this.well.waterDepth,
        updatedWell.maxDeviation=this.well.maxDeviation,
        updatedWell.mdMeasuredFrom=this.well.mdMeasuredFrom,
        updatedWell.mdDistance=this.well.mdDistance,
        updatedWell.mdUnits=this.well.mdUnits,
        updatedWell.tvdMeasuredFrom=this.well.tvdMeasuredFrom,
        updatedWell.tvdUnits=this.well.tvdUnits,
        updatedWell.tvdDistance=this.well.tvdDistance,
        updatedWell.upperCompletionType=this.well.upperCompletionType,
        updatedWell.artificialLiftType=this.well.artificialLiftType,
        updatedWell.multiLateralType=this.well.multiLateralType,
        updatedWell.multiLateralType=this.well.multiLateralType,
        updatedWell.linerHangerSystem=this.well.linerHangerSystem,
        console.log(updatedWell),
        this.wellService.UpdateWell(updatedWell)
        .subscribe(response=> {
          this.well=response,
          this.SendPopupNotification
              ('The Well with id: '+this.well.id+' has been updated '),
          this.wellEvent.emit(this.well.id)              
        });        
      }
        
    );
    
   
  }
  ClearFields(){
    let well:Well=new Well();
    this.FillFields(well);
  }
  FillFields(well:Well){
    this.waterDepthFormControl.setValue(well.waterDepth);
    this.maxDeviationFormControl.setValue(well.maxDeviation.name);
    this.mdMeasuredFormControl.setValue(well.mdMeasuredFrom.name);
    this.mdDistanceFormControl.setValue(well.mdDistance);
    this.mdUnitsFormControl.setValue(well.mdUnits.name);
    this.tvdMeasuredFormControl.setValue(well.tvdMeasuredFrom.name);
    this.tvdDistanceFormControl.setValue(well.tvdDistance);
    this.tvdUnitsFormControl.setValue(well.tvdUnits.name);
    this.upperCompletionFormControl.setValue(well.upperCompletionType.name);
    this.artificalLiftFormControl.setValue(well.artificialLiftType.name);
    this.linerHangerFormControl.setValue(well.linerHangerSystem.name);
    this.multiLateralFormControl.setValue(well.multiLateralType.name);
    this.multiStageFormControl.setValue(well.multiLateralType.name);   
  }  

  public OnChangeMaxDeviationEvent(event: MatOptionSelectionChange, maxDeviation: MaxDeviation) {
    if (event.source.selected == true)
      this.well.maxDeviation = maxDeviation;
  }
  public OnChangeMDMeassuredFrom(event: MatOptionSelectionChange, meassured: MeassuredFrom) {
    if (event.source.selected == true)
      this.well.mdMeasuredFrom = meassured;
  }
  public OnChangeTVDMeassuredFrom(event: MatOptionSelectionChange, meassured: MeassuredFrom) {
    if (event.source.selected == true)
      this.well.tvdMeasuredFrom = meassured;
  }
  public OnChangeMDUnitEvent(event: MatOptionSelectionChange, mdUnit: MdUnit) {
    if (event.source.selected == true)
      this.well.mdUnits = mdUnit;
  }
  public OnChangeTVDUnitEvent(event: MatOptionSelectionChange, tvdUnit: TvdUnit) {
    if (event.source.selected == true)
      this.well.tvdUnits = tvdUnit;
  }
  public OnChangeUpperCompletionEvent(event: MatOptionSelectionChange, upperCompletion: UppercompletionType) {
    if (event.source.selected == true)
      this.well.upperCompletionType = upperCompletion;
  }
  public OnChangeArtificialLiftEvent(event: MatOptionSelectionChange, artificialLift: ArtificialliftType) {
    if (event.source.selected == true)
      this.well.artificialLiftType = artificialLift;
  }
  public OnChangeMultiLateralEvent(event: MatOptionSelectionChange, multiLateral: Multilateral) {
    if (event.source.selected == true)
      this.well.multiLateralType = multiLateral;
  }
  public OnChangeLinerHangerEvent(event: MatOptionSelectionChange, linerHanger: LinerhangerSystem) {
    if (event.source.selected == true)
      this.well.linerHangerSystem = linerHanger;
  }
  public OnChangeMultiStageEvent(event: MatOptionSelectionChange, multiStage: MultistageSimulation) {
    if (event.source.selected == true)
      this.well.multiLateralType = multiStage;
  }
  private SendPopupNotification(message: string) {
    this.dialogWindow.open(PopupViewComponent, {
      data: {message: message}
    }
    );
  }
}
