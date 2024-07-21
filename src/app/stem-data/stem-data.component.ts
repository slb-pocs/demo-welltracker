import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
import { StemSize } from '../models/stemSize';
import { StemWeight } from '../models/StemWeight';
import { MatOptionSelectionChange } from '@angular/material/core';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-stem-data',
  templateUrl: './stem-data.component.html',
  styleUrl: './stem-data.component.css'
})
export class StemDataComponent {
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  @ViewChild(MatTable)
  table!: MatTable<Stem>; 

  @Output() wellEvent=new EventEmitter<number>();
  @Input() wellIdFromParent:number=0;

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
  sizeList: StemSize[] = [];
  weightList:StemWeight[]=[];
  threadList: Thread[] = [];
  materialList: Material[] = [];
  stemList:Stem[]=[];
 
  filteredSizes!:Observable<StemSize[]>;
  filteredWeights!:Observable<StemWeight[]>;

  isStemInfoFinished:boolean=false;

  columns:string[]=["Id","String-Number","String-Type","Size",
    "Weight","Thread","Material","MD-Top","MD-Bottom",
    "Action"];

  public constructor(private typesService: TypesService
                    ,private stemService: StemService
                    ,private dialogWindow: MatDialog
  ){}

  ngOnInit(){
    this.stem.wellId=this.wellIdFromParent;    
    
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

    if(this.wellIdFromParent==0)
      this.SendPopupNotification
      ('The well information has not been created');

    else{
      this.stem.wellId=this.wellIdFromParent; 
      if(this.stem.id==0)            
        this.Create();
      else
        this.Update();            
    }   
  }
  Create(){
    this.stemService.CreateStem(this.stem)
    .subscribe(response=> {
      this.stem=response,
      this.SendPopupNotification
          ('The stem has been created with the id: '
            +this.stem.id),
      this.wellEvent.emit(this.stem.wellId),
      this.stemService.GetStemsByWell(this.stem.wellId)
        .subscribe(response2 => {
          this.stemList=response2,
          this.table.renderRows(),
          this.stem=new Stem(),
          this.stem.wellId=this.wellIdFromParent,
          this.ClearFields()
        })              
    });
  }
  Update(){
    this.stemService.UpdateStem(this.stem)
    .subscribe(response=> {
      this.stem=response,
      this.SendPopupNotification
          ('The Well with id: '+this.stem.id+' has been updated '),
      this.wellEvent.emit(this.stem.id),
      this.stemService.GetStemsByWell(this.stem.wellId)
      .subscribe(response2 => {
        this.stemList=response2,
        this.table.renderRows(),
        this.stem=new Stem(),
        this.stem.wellId=this.wellIdFromParent,
        this.ClearFields()
      })               
    });
  }
  ClearFields(){
  this.stem=new Stem();
  this.stem.wellId=this.wellIdFromParent;
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
    this.stemSizeFormControl.setValue(stem.size.sizeInMm.toString());
    this.stemWeightFormControl.setValue(stem.weight.weightInLb.toString());
    this.stemThreadFormControl.setValue(stem.thread.name);
    this.stemMaterialFormControl.setValue(stem.material.name);
    this.stemMDTopFormControl.setValue(stem.mdTop.toString());
    this.stemMDBottomFormControl.setValue(stem.mdBottom.toString());
  }  

  public OnChangeStringTypetEvent(event: MatOptionSelectionChange, stringType: StringType) {
    if (event.source.selected == true)
      this.stem.stringType = stringType;
  }
  public OnChangeSizeEvent(event: MatOptionSelectionChange, size: StemSize) {
    if (event.source.selected == true)
      this.stem.size = size;
  }
  public OnChangeWeightEvent(event: MatOptionSelectionChange, weight: StemWeight) {
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
