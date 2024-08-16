import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { CatalogNode } from '../models/catalog-node';
import { Well } from '../models/well';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { MatDialog } from '@angular/material/dialog';
import { SurfaceEquipment, } from '../models/surface-equipment';
import { Observable, map, startWith} from 'rxjs';
import { MatTable } from '@angular/material/table';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { TypesService } from '../services/types.service';
import { SurfaceEquipmentService } from '../services/surface-equipment.service';
import { TrackRecord } from '../models/track-record';
import { CatalogPart } from '../models/catalog-part';
import { CatalogPartService } from '../services/catalog-part.service';
import { response } from 'express';
@Component({
  selector: 'app-surface-equipment-view',
  templateUrl: './surface-equipment-view.component.html',
  styleUrl: './surface-equipment-view.component.css'
})
export class SurfaceEquipmentViewComponent implements OnInit, OnChanges {
  @ViewChild(MatTable)
  table!: MatTable<SurfaceEquipment>; 

  @Input() projectId:string='';
  @Input() operationId:string='';
  @Input() operationActivityId:string='';
  @Input() trackRecordFromParent:TrackRecord=new TrackRecord();

  @Output() surfaceEquimentEvent= new EventEmitter<TrackRecord>();

  surfaceEquipment:SurfaceEquipment=new SurfaceEquipment();
    
  catalogPart:CatalogPart=new CatalogPart();

  isSurfaceEquipmentFinished:boolean=false;

  filteredCatalogNodes!:Observable<CatalogNode[]>;

  step:number=0;

  surfaceEquipmentList:SurfaceEquipment[]=[];  

  columns:string[]=['Id','Product Number','Catalog Node','Serial','Quantity',
   'Is Key Component','Action'];

  //Form Controls
  partNumberFormControl:FormControl=new FormControl('');
  catalogNodeFormControl:FormControl=new FormControl('');
  descriptionFormControl:FormControl=new FormControl('');
  serialFormControl:FormControl=new FormControl('');
  quantityFormControl:FormControl=new FormControl('');
  isKeyComponentFormControl:FormControl=new FormControl(false);  

  public constructor(private catalogPartService: CatalogPartService
                    ,private surfaceEquipmentService: SurfaceEquipmentService
                    ,private dialogWindow: MatDialog){   

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.trackRecordFromParent?.id!=0 && this.surfaceEquipmentList?.length==0){
      this.surfaceEquipmentService.GetSurfaceEquipmentsByTrackRecord(this.trackRecordFromParent.id)
        .subscribe(response => {
          this.surfaceEquipmentList=response,
          this.table?.renderRows();
        });
    }
  }

  ngOnInit(): void {     
    if(this.trackRecordFromParent.id!=0)
      this.surfaceEquipment.trackRecordId=this.trackRecordFromParent.id;  
  
  }  

  


  //Save Events
  Save(){
    this.surfaceEquipment.catalogPart.partNumber=this.partNumberFormControl.value;
    //this.surfaceEquipment.catalogPart.name=this.descriptionFormControl.value;
    this.surfaceEquipment.serial=this.serialFormControl.value ;
    this.surfaceEquipment.quantity=parseInt(this.quantityFormControl.value);
    this.surfaceEquipment.isKeyComponent=this.isKeyComponentFormControl.value;

    if(this.trackRecordFromParent.id==0)
      this.SendPopupNotification
      ('The Well data need to be created first');

    else{
      this.surfaceEquipment.trackRecordId=this.trackRecordFromParent.id; 
      if(this.surfaceEquipment.id==0)            
        this.Create();
      else
        this.Update();            
    }   
  }
  
  Create(){
    this.surfaceEquipmentService.CreateSurfaceEquipment(this.surfaceEquipment)
    .subscribe(response=> {
      this.surfaceEquipment=response,
      this.SendPopupNotification
          ('The surface equipment has been created with the id: '
            +this.surfaceEquipment.id),     
      this.ClearFields(),     
      this.RefreshSurfaceEquipmentList()       
    });
  }  
  Update(){
    this.surfaceEquipmentService.UpdateSurfaceEquipment(this.surfaceEquipment)
    .subscribe(response=> {
      this.surfaceEquipment=response,
      this.SendPopupNotification
          ('The SurfaceEquipment with id: '+this.surfaceEquipment.id+' has been updated '),   
      this.ClearFields(),
      this.RefreshSurfaceEquipmentList()                    
    });
  }
  NextStep(){
    this.surfaceEquimentEvent.emit(this.trackRecordFromParent);    
  }
  RefreshSurfaceEquipmentList(){
    this.surfaceEquipmentService.GetSurfaceEquipmentsByTrackRecord
      (this.surfaceEquipment.trackRecordId)
    .subscribe(response => {
      console.log(response);
      this.surfaceEquipmentList=response,
      this.table.renderRows()      
    });  
  }   
  FillFields(equipment:SurfaceEquipment){
    
    this.partNumberFormControl.setValue(equipment.catalogPart.partNumber);
    this.catalogNodeFormControl.setValue(equipment.catalogPart.nodeLevel1.name);
    this.descriptionFormControl.setValue(equipment.catalogPart.name);
    this.serialFormControl.setValue(equipment.serial);
    this.quantityFormControl.setValue(equipment.quantity.toString());  
    this.isKeyComponentFormControl.setValue(equipment.isKeyComponent); 
  }  
  ClearFields(){
    this.surfaceEquipment=new SurfaceEquipment();
    this.surfaceEquipment.trackRecordId=this.trackRecordFromParent.id;

    this.partNumberFormControl=new FormControl('');
    this.catalogNodeFormControl.setValue('');
    this.descriptionFormControl=new FormControl('');
    this.serialFormControl=new FormControl('');
    this.quantityFormControl=new FormControl('');
    this.isKeyComponentFormControl=new FormControl(false);   
  }
/*
  OnCatalogChangeEvent(event:MatOptionSelectionChange, catalogNode:CatalogNode){
    if(event.source.selected==true){
      this.surfaceEquipment.catalogNode=catalogNode;
      this.partNumberFormControl.setValue(catalogNode.id.toString());
    }      
  }
    */

  OnClickEquipmentItem(id:number){   
    this.surfaceEquipment=this.surfaceEquipmentList
          .find(p=>p.id===id)?? new SurfaceEquipment();
    this.FillFields(this.surfaceEquipment);
  }  
  OnPartNumberKeyDown(event: KeyboardEvent){    
    this.catalogNodeFormControl.setValue('');
    this.descriptionFormControl=new FormControl('');

    this.catalogPartService.GetCatalogPart(this.partNumberFormControl.value)
      .subscribe(response =>{
        this.surfaceEquipment.catalogPart=response,
        this.catalogNodeFormControl.setValue(this.surfaceEquipment.catalogPart.nodeLevel1.name),
        this.descriptionFormControl.setValue(this.surfaceEquipment.catalogPart.name);
      });

  }

  private SendPopupNotification(message:string){
    this.dialogWindow.open(PopupViewComponent,{
      data:{
        message:message
      }
    });
  } 
}


