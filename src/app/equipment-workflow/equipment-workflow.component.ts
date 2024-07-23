import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-equipment-workflow',
  templateUrl: './equipment-workflow.component.html',
  styleUrl: './equipment-workflow.component.css'
})
export class EquipmentWorkflowComponent {

  step:number=0;

  isSurfaceEquipmentFinished:boolean=false;
  isInstalledEquipmentFinished:boolean=false;

  @Input() trackRecordId:number=0;
  @Output() surfaceEquipmentEvent=new EventEmitter<boolean>();
  @Output() installedEquipmentEvent=new EventEmitter<boolean>();

  SetStep(step:number){
    this.step=step;
  }
  ReceiveSurfaceEquipmentEvent(message:boolean){
    this.isSurfaceEquipmentFinished=message;    
    this.step++;
    this.surfaceEquipmentEvent.emit(this.isSurfaceEquipmentFinished);
  }
  ReceiveInstalledEquipmentEvent(message:boolean){
    this.isInstalledEquipmentFinished=message;
    this.step++;
    this.installedEquipmentEvent.emit(this.isInstalledEquipmentFinished);
    
  }


}
