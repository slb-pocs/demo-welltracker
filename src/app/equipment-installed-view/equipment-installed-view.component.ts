import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { CatalogNode } from '../models/catalog-node';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { InstalledEquipment } from '../models/installed-equipment';
import { TypesService } from '../services/types.service';
import { InstalledEquipmentService } from '../services/installed-equipment.service';
import { TrackRecord } from '../models/track-record';
import { CatalogPartService } from '../services/catalog-part.service';
import { IsolationValveJob } from '../models/isolation-valve-job';
import { IsolationValveKeyComponent } from '../models/isolation-valve-key-component';
import { IsolationValveKeyComponentService } from '../services/isolation-valve-key-component.service';
import { response } from 'express';

@Component({
  selector: 'app-equipment-installed-view',
  templateUrl: './equipment-installed-view.component.html',
  styleUrl: './equipment-installed-view.component.css'
})
export class EquipmentInstalledViewComponent implements OnChanges {
  @ViewChild(MatTable)
  table!: MatTable<InstalledEquipment>; 

  @Input() projectId:string='';
  @Input() operationId:string='';
  @Input() operationActivityId:string='';

  @Input() trackRecordFromParent:TrackRecord=new TrackRecord;

  @Output() installedEquimentEvent= new EventEmitter<TrackRecord>();

  installedEquipment:InstalledEquipment=new InstalledEquipment();   
  

  isInstalledEquipmentFinished:boolean=false;

  filteredCatalogNodes!:Observable<CatalogNode[]>;

  step:number=0;

  installedEquipmentList:InstalledEquipment[]=[];  

  columns: string[] = ['Product-Number', 'Catalog-Node',
    'Serial', 'Deviation', 'MD', 'TVD', 'Is-Key-Component', 'Is-Third-Part', 'Action'];

  //Form Controls
  partNumberFormControl:FormControl = new FormControl('');
  catalogNodeFormControl:FormControl = new FormControl('');
  descriptionFormControl:FormControl = new FormControl('');
  serialFormControl:FormControl = new FormControl('');
  deviationFormControl:FormControl = new FormControl(0);
  mdFormControl:FormControl = new FormControl(0);
  tvdFormControl:FormControl = new FormControl(0);
  isKeyComponentFormControl:FormControl = new FormControl(false);
  isThirdPartComponentFormControl:FormControl = new FormControl(false);

  public constructor(private catalogPartService: CatalogPartService
                    ,private installedEquipmentService: InstalledEquipmentService
                    ,private isolationValveKeyComponentService: IsolationValveKeyComponentService
                    ,private dialogWindow: MatDialog){
   
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.trackRecordFromParent?.id!=0 && this.installedEquipmentList?.length==0){
      this.installedEquipmentService.GetInstalledEquipmentsByTrackRecord(this.trackRecordFromParent.id)
        .subscribe(response => {
          this.installedEquipmentList=response,
          this.table?.renderRows();
        });
    }
  }

  ngOnInit(): void {      
    this.installedEquipment.trackRecordId=this.trackRecordFromParent.id;  
   
  }  
  //Save Events
  Save(){    
    this.installedEquipment.serial=this.serialFormControl.value ;
    this.installedEquipment.deviation=this.deviationFormControl.value;
    this.installedEquipment.md=this.mdFormControl.value;
    this.installedEquipment.tvd=this.tvdFormControl.value;
    this.installedEquipment.isThirdPart=this.isThirdPartComponentFormControl.value;
    this.installedEquipment.isKeyComponent=this.isKeyComponentFormControl.value;

    if(this.trackRecordFromParent.id==0)
      this.SendPopupNotification
      ('The Well data need to be created first');

    else{
      this.installedEquipment.trackRecordId=this.trackRecordFromParent.id; 
      if(this.installedEquipment.id==0)            
        this.Create();
      else
        this.Update();            
    }   
  }
  NextStep(){
    this.installedEquimentEvent.emit(this.trackRecordFromParent);
  }
  Create(){
    this.installedEquipmentService.CreateInstalledEquipment(this.installedEquipment)
    .subscribe(response=> {
      this.installedEquipment=response,
      this.SendPopupNotification
          ('The installed equipment has been created with the id: '
            +this.installedEquipment.id)
            if(this.installedEquipment.isKeyComponent){
              this.CreateKeyComponent(this.installedEquipment);     
            } 
            this.ClearFields(),     
            this.RefreshInstalledEquipmentList()                       
    });
  }  
  Update(){
    this.installedEquipmentService.UpdateInstalledEquipment(this.installedEquipment)
    .subscribe(response=> {
      this.installedEquipment=response,
      this.SendPopupNotification
          ('The Installed Equipment with id: '+this.installedEquipment.id+' has been updated '),   
      this.ClearFields(),
      this.RefreshInstalledEquipmentList()                  
    });
  }

  CreateKeyComponent(installedEquipment:InstalledEquipment){     
    let isolationValveKeyComponent: IsolationValveKeyComponent=new IsolationValveKeyComponent();
    this.isolationValveKeyComponentService.GetByInstalledEquipment(this.installedEquipment.id)
    .subscribe(response=> {
      isolationValveKeyComponent=response
    
      if(isolationValveKeyComponent==null){       
        isolationValveKeyComponent=new IsolationValveKeyComponent();
        isolationValveKeyComponent.installedEquipment=installedEquipment
        isolationValveKeyComponent.trackRecordId=this.trackRecordFromParent.id;

        this.isolationValveKeyComponentService.Create(isolationValveKeyComponent)
          .subscribe(response2=> {
              this.SendPopupNotification("The Key Component Information has been created");
              this.NextStep();
      });
      }        
    });    
  }

  RefreshInstalledEquipmentList(){
    this.installedEquipmentService.GetInstalledEquipmentsByTrackRecord
      (this.installedEquipment.trackRecordId)
    .subscribe(response => {
      console.log(response);
      this.installedEquipmentList=response,
      this.table.renderRows()      
    });  
  }   
  FillFields(equipment:InstalledEquipment){
    
    this.partNumberFormControl.setValue(equipment.catalogPart.partNumber);
    this.catalogNodeFormControl.setValue(equipment.catalogPart.nodeLevel1.name);
    this.descriptionFormControl.setValue(equipment.catalogPart.name);
    this.serialFormControl.setValue(equipment.serial);
    this.deviationFormControl.setValue(equipment.deviation);
    this.mdFormControl.setValue(equipment.md);
    this.tvdFormControl.setValue(equipment.tvd);
    this.isThirdPartComponentFormControl.setValue(equipment.isThirdPart); 
    this.isKeyComponentFormControl.setValue(equipment.isKeyComponent); 
  }  
  ClearFields(){
    this.installedEquipment=new InstalledEquipment();
    this.installedEquipment.trackRecordId=this.trackRecordFromParent.id;

    this.partNumberFormControl=new FormControl('');
    this.catalogNodeFormControl.setValue('');
    this.descriptionFormControl=new FormControl('');
    this.serialFormControl=new FormControl('');
    this.deviationFormControl=new FormControl('');
    this.mdFormControl=new FormControl('');
    this.tvdFormControl=new FormControl('');
    this.isThirdPartComponentFormControl=new FormControl(false);
    this.isKeyComponentFormControl=new FormControl(false);   
  }
  /*
  OnCatalogChangeEvent(event:MatOptionSelectionChange, catalogNode:CatalogNode){
    if(event.source.selected==true){
      this.installedEquipment.catalogNode=catalogNode;
      this.productNumberFormControl.setValue(catalogNode.id.toString());
    }      
  }
*/
  OnClickEquipmentItem(id:number){   
    this.installedEquipment=this.installedEquipmentList
          .find(p=>p.id===id)?? new InstalledEquipment();
    this.FillFields(this.installedEquipment);
  }  
  private SendPopupNotification(message:string){
    this.dialogWindow.open(PopupViewComponent,{
      data:{
        message:message
      }
    });
  }  
  OnPartNumberKeyDown(event: KeyboardEvent){
    this.catalogNodeFormControl.setValue('');
    this.descriptionFormControl=new FormControl('');

    this.catalogPartService.GetCatalogPart(this.partNumberFormControl.value)
      .subscribe(response =>{
        this.installedEquipment.catalogPart=response,
        this.catalogNodeFormControl.setValue(this.installedEquipment?.catalogPart?.nodeLevel3?.name
                                        +'/'+this.installedEquipment?.catalogPart?.nodeLevel4?.name
                                        +'/'+this.installedEquipment?.catalogPart?.nodeLevel5?.name
        ),
        this.descriptionFormControl.setValue(this.installedEquipment.catalogPart.name);
      });
  }
}
