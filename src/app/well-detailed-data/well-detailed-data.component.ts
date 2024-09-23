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

  maxDeviationList: MaxDeviation[] = [];
  meassuredFromList: MeassuredFrom[] = [];
  mdUnitList:MdUnit[]=[];
  tvdUnitList: TvdUnit[] = [];



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
   
        this.wellService.UpdateWellDetails(updatedWell)
        .subscribe(response=> {
          this.trackRecordFromParent.well=updatedWell,
          this.SendPopupNotification
              ('The Well details have been saved'),
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


    this.waterDepthFormControl=new FormControl('');
    this.maxDeviationFormControl=new FormControl('');
    this.mdMeasuredFormControl=new FormControl('');
    this.mdDistanceFormControl=new FormControl('');
    this.mdUnitsFormControl=new FormControl('');
    this.tvdMeasuredFormControl=new FormControl('');
    this.tvdDistanceFormControl=new FormControl('');
    this.tvdUnitsFormControl=new FormControl('');
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
  private SendPopupNotification(message: string) {
    this.dialogWindow.open(PopupViewComponent, {
      data: {message: message}
    }
    );
  }
}
