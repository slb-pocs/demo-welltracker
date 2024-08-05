import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { TrackRecord } from '../models/track-record';

@Component({
  selector: 'app-equipment-workflow',
  templateUrl: './equipment-workflow.component.html',
  styleUrl: './equipment-workflow.component.css'
})
export class EquipmentWorkflowComponent {

  step:number=0;

  isSurfaceEquipmentFinished:boolean=false;
  isInstalledEquipmentFinished:boolean=false;

  @Input() trackRecordFromParent:TrackRecord=new TrackRecord();
  @Output() surfaceEquipmentEvent=new EventEmitter<TrackRecord>();
  @Output() installedEquipmentEvent=new EventEmitter<TrackRecord>();

  SetStep(step:number){
    this.step=step;
  }
  ReceiveSurfaceEquipmentEvent(trackRecord:TrackRecord){
    this.UpdateTrackRecord(trackRecord);
    this.isSurfaceEquipmentFinished=true;    
    this.step++;
    this.surfaceEquipmentEvent.emit(this.trackRecordFromParent);
  }
  ReceiveInstalledEquipmentEvent(trackRecord:TrackRecord){
    this.UpdateTrackRecord(trackRecord);
    this.isInstalledEquipmentFinished=true;
    this.step++;
    this.installedEquipmentEvent.emit(this.trackRecordFromParent);
    
  }

  UpdateTrackRecord(trackRecord:TrackRecord){
    this.trackRecordFromParent={
      id:trackRecord.id,
      supervisorUser:trackRecord.supervisorUser,
      assignedUser:trackRecord.assignedUser,
      validatorUser:trackRecord.validatorUser,
      dataEntryUser:trackRecord.dataEntryUser,
      installationStartDate:trackRecord.installationEndDate,
      installationEndDate:trackRecord.installationEndDate,
      validationDate:trackRecord.validationDate,
      well:trackRecord.well,
      surfaceEquipment:trackRecord.surfaceEquipment,
      installedEquipment:trackRecord.installedEquipment            
    }
  }


}
