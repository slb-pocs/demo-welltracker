import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TrackRecord } from '../models/track-record';
import { Form, FormControl } from '@angular/forms';
import { IsolationValveKeyComponentService } from '../services/isolation-valve-key-component.service';
import { MatDialog } from '@angular/material/dialog';
import { TypesService } from '../services/types.service';
import { IsolationValveKeyComponentDto } from '../apiDtos/isolation-valve-key-component-dto';
import { IsolationValveKeyComponent } from '../models/isolation-valve-key-component';
import { MatTable } from '@angular/material/table';
import { PopupViewComponent } from '../popup-view/popup-view.component';

@Component({
  selector: 'app-key-component-view',
  templateUrl: './key-component-view.component.html',
  styleUrl: './key-component-view.component.css'
})
export class KeyComponentViewComponent {
  @ViewChild(MatTable)
  table!: MatTable<IsolationValveKeyComponent>; 

  @Output() keyComponentEvent =new EventEmitter<TrackRecord>();

  @Input() trackRecordFromParent:TrackRecord=new TrackRecord(); 

  isolationValveKeyComponent:IsolationValveKeyComponent=new IsolationValveKeyComponent();

  equipmentPartNumberFormControl:FormControl=new FormControl('');
  equipmentNameFormControl:FormControl=new FormControl('');
  temperatureFormControl:FormControl=new FormControl(0);
  pressureFormControl:FormControl=new FormControl(0);
  openFluidWeightFormControl:FormControl=new FormControl(0);
  failureIncidentFormControl:FormControl=new FormControl(false); 

  keyComponentList:IsolationValveKeyComponent[]=[];

  columns: string[] = ['Product-Number', 'Catalog-Node',
    'Temperature', 'Pressure', 'Open-Fluid-Weight', 'Failure-Incident', 'Action'];

  public constructor(private typesService: TypesService
                    ,private keyComponentService: IsolationValveKeyComponentService                
                    ,private dialogWindow:MatDialog
  ){

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.trackRecordFromParent?.id>0){
      this.keyComponentService.GetAllByTrackRecord(this.trackRecordFromParent.id)
        .subscribe(response => {
          this.keyComponentList=response,
          this.table?.renderRows();
        });
    }
  }

  ngOnInit(): void {      
    if (this.trackRecordFromParent.id>0){
      this.isolationValveKeyComponent.trackRecordId=this.trackRecordFromParent.id;     
      this.keyComponentService.GetAllByTrackRecord(this.trackRecordFromParent.id)
      .subscribe(response => {
        this.keyComponentList=response,
        this.table?.renderRows();
      });
    }   
  } 

  Save(){    
    if(this.isolationValveKeyComponent.id==0 || this.isolationValveKeyComponent==null){
      this.SendPopupNotification("You must first select a Key Component");
    }
    else{
      this.isolationValveKeyComponent.temperature=this.temperatureFormControl.value;
      this.isolationValveKeyComponent.pressure=this.pressureFormControl.value;
      this.isolationValveKeyComponent.openFluidWeight=this.openFluidWeightFormControl.value;
      this.isolationValveKeyComponent.failureIncident=this.failureIncidentFormControl.value; 
      /*
      if(this.trackRecordFromParent.id==0)
        this.SendPopupNotification('The Well data need to be created first');
  
      else{      
        this.Update();            
      }   
      */
      this.Update();   
    }

  
  }

  Update(){
    this.keyComponentService.Update(this.isolationValveKeyComponent).subscribe(response=>{
      this.isolationValveKeyComponent=response,
      this.SendPopupNotification
      ('The Isolation Valve Key Component with id: '+this.isolationValveKeyComponent.id+' has been updated '),
      this.RefreshKeyComponentList(),
      this.ClearFields();
    });
  }

  RefreshKeyComponentList(){
    this.keyComponentService.GetAllByTrackRecord(this.isolationValveKeyComponent.trackRecordId)
    .subscribe(response => { 
    this.keyComponentList=response,
    this.table.renderRows()      
    });  
  }

  FillFields(isolationValveKeyComponent:IsolationValveKeyComponent){
    this.equipmentPartNumberFormControl.setValue(isolationValveKeyComponent.installedEquipment.catalogPart.partNumber);
    this.equipmentNameFormControl.setValue(isolationValveKeyComponent.installedEquipment.catalogPart.nodeLevel3.name 
      +'/'+isolationValveKeyComponent.installedEquipment.catalogPart.nodeLevel4.name
      +'/'+isolationValveKeyComponent.installedEquipment.catalogPart.nodeLevel5.name
    );
    this.temperatureFormControl.setValue(isolationValveKeyComponent.temperature);
    this.pressureFormControl.setValue(isolationValveKeyComponent.pressure);
    this.openFluidWeightFormControl.setValue(isolationValveKeyComponent.openFluidWeight);
    this.failureIncidentFormControl.setValue(isolationValveKeyComponent.failureIncident);    
  }

  ClearFields(){
    this.isolationValveKeyComponent=new IsolationValveKeyComponent();
    this.equipmentNameFormControl=new FormControl('');
    this.equipmentPartNumberFormControl=new FormControl('');
    this.temperatureFormControl=new FormControl('');
    this.pressureFormControl=new FormControl('');
    this.openFluidWeightFormControl=new FormControl('');
    this.failureIncidentFormControl=new FormControl(false);
  }

  OnClickKeyComponentItem(id:number){   
    this.isolationValveKeyComponent=this.keyComponentList
          .find(p=>p.id===id)?? new IsolationValveKeyComponent();
    this.FillFields(this.isolationValveKeyComponent);
  }  

  private SendPopupNotification(message:string){
    this.dialogWindow.open(PopupViewComponent,{
      data:{
        message:message
      }
    });
  } 
  

}
