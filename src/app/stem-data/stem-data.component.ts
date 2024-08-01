import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Stem } from '../models/stem';
import { StringType } from '../models/string-type';
import { Thread } from '../models/thread';
import { Material } from '../models/material';
import { map, Observable, startWith } from 'rxjs';
import { TypesService } from '../services/types.service';
import { StemService } from '../services/stem.service';
import { Size } from '../models/size';
import { Weight } from '../models/weight';
import { MatOptionSelectionChange } from '@angular/material/core';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { MatTable } from '@angular/material/table';
import { TrackRecord } from '../models/track-record';

@Component({
  selector: 'app-stem-data',
  templateUrl: './stem-data.component.html',
  styleUrl: './stem-data.component.css'
})
export class StemDataComponent implements OnChanges{
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  @ViewChild(MatTable)
  table!: MatTable<Stem>; 

  @Output() stemInfoEvent=new EventEmitter<TrackRecord>();
  @Input() trackRecordFromParent:TrackRecord=new TrackRecord();

  stem:Stem=new Stem();

  stringNumberFormControl:FormControl=new FormControl('');
  stringTypeFormControl:FormControl=new FormControl('');
  stemSizeFormControl:FormControl=new FormControl('');
  stemWeightFormControl:FormControl=new FormControl('');
  stemThreadFormControl:FormControl=new FormControl('');
  stemMaterialFormControl:FormControl=new FormControl('');
  stemMDTopFormControl:FormControl=new FormControl('');
  stemMDBottomFormControl:FormControl=new FormControl('');

  stringTypeList: StringType[] = [];
  sizeList: Size[] = [];
  weightList:Weight[]=[];
  threadList: Thread[] = [];
  materialList: Material[] = [];
  stemList:Stem[]=[];
 
  filteredSizes!:Observable<Size[]>;
  filteredWeights!:Observable<Weight[]>;

  isStemInfoFinished:boolean=false;

  columns:string[]=["Id","String-Number","String-Type","Size",
    "Weight","Thread","Material","MD-Top","MD-Bottom",
    "Action"];

  public constructor(private typesService: TypesService
                    ,private stemService: StemService
                    ,private dialogWindow: MatDialog
  ){}
  ngOnChanges(changes: SimpleChanges): void {    
    
    if(this.trackRecordFromParent.well.id!=0){
    
      this.stemService.GetStemsByWell(this.trackRecordFromParent.well.id)
      .subscribe(response => {
        this.stemList=response,
        this.table?.renderRows();
            });     
    }
      
  }

  ngOnInit(){  
    this.stem.wellId=this.trackRecordFromParent.well.id;    
    
    this.typesService.GetStringTypes()
                             .subscribe(response =>{
                              this.stringTypeList=response
                             });
    this.typesService.GetStemSizes()
                             .subscribe(response =>{
                              this.sizeList=response
                             });
    this.typesService.GetStemWeights()
                             .subscribe(response =>{
                              this.weightList=response
                             });
    this.typesService.GetThreadTypes()
                             .subscribe(response =>{
                              this.threadList=response
                             });
    this.typesService.GetMaterials()
                             .subscribe(response =>{
                              this.materialList=response
                             });    
  } 
 
  Save(){
    this.stem.mdBottom=parseFloat(this.stemMDBottomFormControl.value);
    this.stem.mdTop=parseFloat(this.stemMDTopFormControl.value);
    this.stem.stringNumber=parseFloat(this.stringNumberFormControl.value);

    if(this.trackRecordFromParent.well.id==0)
      this.SendPopupNotification
      ('The well information has not been created');

    else{
      this.stem.wellId=this.trackRecordFromParent.well.id; 
      if(this.stem.id==0)            
        this.Create();
      else
        this.Update();            
    }   
  }
  NextStep(){
    this.stemInfoEvent.emit(this.trackRecordFromParent)
  }
  Create(){
    this.stemService.CreateStem(this.stem)
    .subscribe(response=> {
      this.stem=response,
      this.SendPopupNotification
          ('The stem has been created with the id: '
            +this.stem.id),    
      this.ClearFields(),    
      this.RefreshStemList()               
    });
  }
  Update(){
    this.stemService.UpdateStem(this.stem)
    .subscribe(response=> {
      this.stem=response,
      this.SendPopupNotification
          ('The Well with id: '+this.stem.id+' has been updated '),      
      this.ClearFields(),
      this.RefreshStemList()
    });
  }
  RefreshStemList(){
    this.stemService.GetStemsByWell(this.stem.wellId)
    .subscribe(response2 => {
      this.stemList=response2,
      this.table.renderRows()      
    });              
  }
  ClearFields(){
  this.stem=new Stem();
  this.stem.wellId=this.trackRecordFromParent.well.id;
  this.stringNumberFormControl=new FormControl('');
  this.stringTypeFormControl=new FormControl('');
  this.stemSizeFormControl=new FormControl('');
  this.stemWeightFormControl=new FormControl('');
  this.stemThreadFormControl=new FormControl('');
  this.stemMaterialFormControl=new FormControl('');
  this.stemMDTopFormControl=new FormControl('');
  this.stemMDBottomFormControl=new FormControl('');

  }
  FillFields(stem:Stem){
    this.stringNumberFormControl.setValue(stem.stringNumber.toString());
    this.stringTypeFormControl.setValue(stem.stringType.name);
    this.stemSizeFormControl.setValue(stem.size.sizeInMm);
    this.stemWeightFormControl.setValue(stem.weight.weightInLb);
    this.stemThreadFormControl.setValue(stem.thread.name);
    this.stemMaterialFormControl.setValue(stem.material.name);
    this.stemMDTopFormControl.setValue(stem.mdTop.toString());
    this.stemMDBottomFormControl.setValue(stem.mdBottom.toString());
  }  

  public OnChangeStringTypetEvent(event: MatOptionSelectionChange, stringType: StringType) {
    if (event.source.selected == true)
      this.stem.stringType = stringType;
  }
  public OnChangeSizeEvent(event: MatOptionSelectionChange, size: Size) {
    if (event.source.selected == true)
      this.stem.size = size;
  }
  public OnChangeWeightEvent(event: MatOptionSelectionChange, weight: Weight) {
    if (event.source.selected == true)
      this.stem.weight = weight;
  }
  public OnChangeThreadEvent(event: MatOptionSelectionChange, thread: Thread) {
    if (event.source.selected == true)
      this.stem.thread = thread;
  }
  public OnChangeStemMaterialEvent(event: MatOptionSelectionChange, material: Material) {
    if (event.source.selected == true)
      this.stem.material = material;
  }
  public OnClickStemItem(stemId:number){
    this.stem=this.stemList.find(p=>p.id===stemId)?? new Stem();
    this.FillFields(this.stem); 
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
