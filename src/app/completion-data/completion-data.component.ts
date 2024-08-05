import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatTable } from '@angular/material/table';
import { Completion } from '../models/completion';
import { FormControl } from '@angular/forms';
import { CompletionType } from '../models/completion-type';
import { ProducedFluidType } from '../models/producedfluid-type';
import { InjectedFluidType } from '../models/injected-fluid-type';
import { CompletionClass } from '../models/completion-class';
import { SandControl } from '../models/sand-control';
import { RockType } from '../models/rock-type';
import { TypesService } from '../services/types.service';
import { CompletionService } from '../services/completion.service';
import { MatDialog } from '@angular/material/dialog';
import { MatOptionSelectionChange } from '@angular/material/core';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { TrackRecord } from '../models/track-record';
import { response } from 'express';

@Component({
  selector: 'app-completion-data',
  templateUrl: './completion-data.component.html',
  styleUrl: './completion-data.component.css'
})
export class CompletionDataComponent implements OnChanges {
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  @ViewChild(MatTable)
  table!: MatTable<Completion>; 

  @Output() completionDataEvent=new EventEmitter<TrackRecord>();
  @Input() trackRecordFromParent:TrackRecord=new TrackRecord();

  completion:Completion=new Completion();

  completionNumberFormControl = new FormControl('');
  completionTypeFormControl = new FormControl('');
  producedFluidTypeFormControl = new FormControl('');
  injectedFluidTypeFormControl = new FormControl('');
  completionClassFormControl = new FormControl('');
  sandControlFormControl = new FormControl('');
  rockTypeFormControl = new FormControl('');
  reservoirTempFormControl = new FormControl('');
  corrosiveCCO2FormControl = new FormControl('');
  corrosiveH25FormControl = new FormControl('');

  completionList:Completion[]=[];

  completionTypeList: CompletionType[] = [];
  producedFluidList: ProducedFluidType[] = [];
  injectedFluidList: InjectedFluidType[] = [];
  completionClassList: CompletionClass[] = [];
  sandControlTypeList: SandControl[] = [];
  rockTypeList: RockType[] = [];

  isCompletionInfoFinished:boolean=false;

  columns:string[]=["Id","Completion Number","Completion Type","Produced Fluid",
    "Injected Fluid","Completion Class","Action"];

  public constructor(private typesService: TypesService
                    ,private completionService: CompletionService
                    ,private dialogWindow: MatDialog
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if(this.trackRecordFromParent.well!=null && this.trackRecordFromParent.well.id!=0){
      this.completionService.GetCompletionsByWell(this.trackRecordFromParent.well.id)
      .subscribe(response => {
        this.completionList=response,
        this.table?.renderRows();
      });
    }
  }

  ngOnInit(){ 
    if(this.trackRecordFromParent.well!=null)
      this.completion.wellId=this.trackRecordFromParent.well.id;    
    
    this.typesService.GetCompletionTypes()
                             .subscribe(response =>{
                              this.completionTypeList=response
                             });
    this.typesService.GetProducedFluidTypes()
                             .subscribe(response =>{
                              this.producedFluidList=response
                             });
    this.typesService.GetInjectedFluidTypes()
                             .subscribe(response =>{
                              this.injectedFluidList=response
                             });
    this.typesService.GetCompletionClasses()
                             .subscribe(response =>{
                              this.completionClassList=response
                             });
    this.typesService.GetSandControlTypes()
                             .subscribe(response =>{
                              this.sandControlTypeList=response
                             });    
    this.typesService.GetReservoirRockTypes()
                             .subscribe(response =>{
                              this.rockTypeList=response
                             });  
  } 
 
  Save(){
    this.completion.number=parseInt(this.completionNumberFormControl.value ?? '');
    this.completion.reservoirTemperature=parseInt(this.reservoirTempFormControl.value ?? '');
    this.completion.corrosiveCompCCO2=parseInt(this.corrosiveCCO2FormControl.value ?? '');
    this.completion.corrosiveCompH25=parseInt(this.corrosiveH25FormControl.value ?? '');

    if(this.trackRecordFromParent.well.id==0)
      this.SendPopupNotification
      ('You need to enter the customer data first');

    else{
      this.completion.wellId=this.trackRecordFromParent.well.id; 
      if(this.completion.id==0)            
        this.Create();
      else
        this.Update();            
    }   
  }
  NextStep(){
    this.completionDataEvent.emit(this.trackRecordFromParent);
  }
  Create(){
    this.completionService.CreateCompletion(this.completion)
    .subscribe(response=> {
      this.completion=response,
      this.SendPopupNotification
          ('The completion has been created with the id: '
            +this.completion.id),     
      this.completion=new Completion(),
      this.completion.wellId=this.trackRecordFromParent.well.id,
      this.ClearFields(),     
      this.RefreshCompletionList()          
    });
  }  
  Update(){
    this.completionService.UpdateCompletion(this.completion)
    .subscribe(response=> {
      this.completion=response,
      this.SendPopupNotification
          ('The Completion with id: '+this.completion.id+' has been updated '),      
      this.completion=new Completion(),
      this.completion.wellId=this.trackRecordFromParent.well.id,
      this.ClearFields(),
      this.RefreshCompletionList()                  
    });
  }
  RefreshCompletionList(){
    this.completionService.GetCompletionsByWell(this.completion.wellId)
    .subscribe(response => {
      this.completionList=response,
      this.table.renderRows()      
    })  
  }

  ClearFields(){
    this.completion=new Completion();
    this.completion.wellId=this.trackRecordFromParent.well.id;
    this.completionNumberFormControl = new FormControl('');
    this.completionTypeFormControl = new FormControl('');
    this.producedFluidTypeFormControl = new FormControl('');
    this.injectedFluidTypeFormControl = new FormControl('');
    this.completionClassFormControl = new FormControl('');
    this.sandControlFormControl = new FormControl('');
    this.rockTypeFormControl = new FormControl('');
    this.reservoirTempFormControl = new FormControl('');
    this.corrosiveCCO2FormControl = new FormControl('');
    this.corrosiveH25FormControl = new FormControl('');
  }
  FillFields(completion:Completion){
    this.completionNumberFormControl.setValue(completion.number.toString());
    this.completionTypeFormControl.setValue(completion.completionType.name);
    this.producedFluidTypeFormControl.setValue(completion.producedFluidType.name);
    this.injectedFluidTypeFormControl.setValue(completion.injectedFluidType.name);
    this.completionClassFormControl.setValue(completion.completionClass.name);
    this.sandControlFormControl.setValue(completion.sandControlType.name);
    this.rockTypeFormControl.setValue(completion.reservoirRockType.name);
    this.reservoirTempFormControl.setValue(completion.reservoirTemperature.toString());
    this.corrosiveCCO2FormControl.setValue(completion.corrosiveCompCCO2.toString());
    this.corrosiveH25FormControl.setValue(completion.corrosiveCompH25.toString());
  }  

  public OnChangeCompletionTypeEvent(event: MatOptionSelectionChange, type: CompletionType) {
    if (event.source.selected == true)
      this.completion.completionType = type;
  }
  public OnChangeProducedFluidEvent(event: MatOptionSelectionChange, producedFluid: ProducedFluidType) {
    if (event.source.selected == true)
      this.completion.producedFluidType = producedFluid;
  }
  public OnChangeInjectedFluidEvent(event: MatOptionSelectionChange, injectedFluid: InjectedFluidType) {
    if (event.source.selected == true)
      this.completion.injectedFluidType = injectedFluid;
  }
  public OnChangeCompletionClassEvent(event: MatOptionSelectionChange, completionClass: CompletionClass) {
    if (event.source.selected == true)
      this.completion.completionClass = completionClass;
  }
  public OnChangeSandControl(event: MatOptionSelectionChange, sandControl: SandControl) {
    if (event.source.selected == true)
      this.completion.sandControlType = sandControl;
  }
  public OnChangeRockTypeEvent(event: MatOptionSelectionChange, rockType: InjectedFluidType) {
    if (event.source.selected == true)
      this.completion.reservoirRockType = rockType;
  }
  public OnClickCompletionItem(completionId:number){
    this.completion=this.completionList.find(p=>p.id===completionId)?? new Completion();
    this.FillFields(this.completion);
 
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
