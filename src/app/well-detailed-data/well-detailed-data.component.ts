import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
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
import { TrackRecord } from '../models/track-record';

@Component({
  selector: 'app-well-detailed-data',
  templateUrl: './well-detailed-data.component.html',
  styleUrl: './well-detailed-data.component.css'
})
export class WellDetailedDataComponent implements OnChanges {
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  @Output() welldDetailedDataEvent =new EventEmitter<TrackRecord>();

  @Input() trackRecordFromParent:TrackRecord=new TrackRecord();

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
  ngOnChanges(changes: SimpleChanges): void {
    if(this.trackRecordFromParent.well?.id!=0 && this,this.trackRecordFromParent.well!=null){
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
    this.trackRecordFromParent.well.waterDepth=this.waterDepthFormControl.value;
    this.trackRecordFromParent.well.mdDistance=this.mdDistanceFormControl.value;
    this.trackRecordFromParent.well.tvdDistance=this.tvdDistanceFormControl.value;

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
        updatedWell.waterDepth=this.trackRecordFromParent.well.waterDepth,
        updatedWell.maxDeviation=this.trackRecordFromParent.well.maxDeviation,
        updatedWell.mdMeassuredFrom=this.trackRecordFromParent.well.mdMeassuredFrom,
        updatedWell.mdDistance=this.trackRecordFromParent.well.mdDistance,
        updatedWell.mdUnit=this.trackRecordFromParent.well.mdUnit,
        updatedWell.tvdMeassuredFrom=this.trackRecordFromParent.well.tvdMeassuredFrom,
        updatedWell.tvdUnit=this.trackRecordFromParent.well.tvdUnit,
        updatedWell.tvdDistance=this.trackRecordFromParent.well.tvdDistance,
        updatedWell.upperCompletionType=this.trackRecordFromParent.well.upperCompletionType,
        updatedWell.artificialLiftType=this.trackRecordFromParent.well.artificialLiftType,
        updatedWell.multiLateralType=this.trackRecordFromParent.well.multiLateralType,
        updatedWell.multiStageType=this.trackRecordFromParent.well.multiStageType,
        updatedWell.linerHangerSystem=this.trackRecordFromParent.well.linerHangerSystem,
        console.log(updatedWell),
        this.wellService.UpdateWell(updatedWell)
        .subscribe(response=> {
          this.trackRecordFromParent.well=updatedWell,
          this.SendPopupNotification
              ('The Well with id: '+this.trackRecordFromParent.well.id+' has been updated '),
          this.welldDetailedDataEvent.emit(this.trackRecordFromParent)              
        });        
      }
        
    );
    
   
  }
  ClearFields(){
    this.trackRecordFromParent.well.waterDepth=0;
    this.trackRecordFromParent.well.maxDeviation=new MaxDeviation();
    this.trackRecordFromParent.well.mdMeassuredFrom=new MeassuredFrom();
    this.trackRecordFromParent.well.mdDistance=0;
    this.trackRecordFromParent.well.mdUnit=new MdUnit();
    this.trackRecordFromParent.well.tvdMeassuredFrom=new MeassuredFrom();
    this.trackRecordFromParent.well.tvdDistance=0;
    this.trackRecordFromParent.well.tvdUnit=new TvdUnit();
    this.trackRecordFromParent.well.upperCompletionType=new UppercompletionType();
    this.trackRecordFromParent.well.artificialLiftType=new ArtificialliftType();
    this.trackRecordFromParent.well.multiLateralType=new Multilateral();
    this.trackRecordFromParent.well.linerHangerSystem=new LinerhangerSystem();
    this.trackRecordFromParent.well.multiStageType=new MultistageSimulation();

    this.waterDepthFormControl=new FormControl('');
    this.maxDeviationFormControl=new FormControl('');
    this.mdMeasuredFormControl=new FormControl('');
    this.mdDistanceFormControl=new FormControl('');
    this.mdUnitsFormControl=new FormControl('');
    this.tvdMeasuredFormControl=new FormControl('');
    this.tvdDistanceFormControl=new FormControl('');
    this.tvdUnitsFormControl=new FormControl('');
    this.upperCompletionFormControl=new FormControl('');
    this.artificalLiftFormControl=new FormControl('');
    this.multiLateralFormControl=new FormControl('');
    this.linerHangerFormControl=new FormControl('');
    this.multiStageFormControl=new FormControl('');
  }
  FillFields(well:Well){
    this.waterDepthFormControl.setValue(well.waterDepth);
    this.maxDeviationFormControl.setValue(well.maxDeviation?.name);
    this.mdMeasuredFormControl.setValue(well.mdMeassuredFrom?.name);
    this.mdDistanceFormControl.setValue(well.mdDistance);
    this.mdUnitsFormControl.setValue(well.mdUnit?.name);
    this.tvdMeasuredFormControl.setValue(well.tvdMeassuredFrom?.name);
    this.tvdDistanceFormControl.setValue(well.tvdDistance);
    this.tvdUnitsFormControl.setValue(well.tvdUnit?.name);
    this.upperCompletionFormControl.setValue(well.upperCompletionType?.name);
    this.artificalLiftFormControl.setValue(well.artificialLiftType?.name);
    this.linerHangerFormControl.setValue(well.linerHangerSystem?.name);
    this.multiLateralFormControl.setValue(well.multiLateralType?.name);
    this.multiStageFormControl.setValue(well.multiStageType?.name);   
  }  

  public OnChangeMaxDeviationEvent(event: MatOptionSelectionChange, maxDeviation: MaxDeviation) {
    if (event.source.selected == true)
      this.trackRecordFromParent.well.maxDeviation = maxDeviation;
  }
  public OnChangeMDMeassuredFrom(event: MatOptionSelectionChange, meassured: MeassuredFrom) {
    if (event.source.selected == true)
      this.trackRecordFromParent.well.mdMeassuredFrom = meassured;
  }
  public OnChangeTVDMeassuredFrom(event: MatOptionSelectionChange, meassured: MeassuredFrom) {
    if (event.source.selected == true)
      this.trackRecordFromParent.well.tvdMeassuredFrom = meassured;
  }
  public OnChangeMDUnitEvent(event: MatOptionSelectionChange, mdUnit: MdUnit) {
    if (event.source.selected == true)
      this.trackRecordFromParent.well.mdUnit = mdUnit;
  }
  public OnChangeTVDUnitEvent(event: MatOptionSelectionChange, tvdUnit: TvdUnit) {
    if (event.source.selected == true)
      this.trackRecordFromParent.well.tvdUnit = tvdUnit;
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
      this.trackRecordFromParent.well.multiLateralType = multiStage;
  }
  private SendPopupNotification(message: string) {
    this.dialogWindow.open(PopupViewComponent, {
      data: {message: message}
    }
    );
  }
}
