import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ArtificialliftType } from '../models/artificiallift-type';
import { LinerhangerSystem } from '../models/linerhanger-system';
import { MaxDeviation } from '../models/max-deviation';
import { MdUnit } from '../models/md-unit';
import { MeassuredFrom } from '../models/meassured-from';
import { Multilateral } from '../models/multilateral';
import { MultistageSimulation } from '../models/multistage-simulation';
import { TrackRecord } from '../models/track-record';
import { TvdUnit } from '../models/tvd-unit';
import { UppercompletionType } from '../models/uppercompletion-type';
import { Well } from '../models/well';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { TypesService } from '../services/types.service';
import { WellService } from '../services/well.service';

@Component({
  selector: 'app-well-data-workflow-view',
  templateUrl: './well-data-workflow-view.component.html',
  styleUrl: './well-data-workflow-view.component.css'
})
export class WellDataWorkflowViewComponent {
  step:number=0;  

  @Output() wellDataEvent=new EventEmitter<TrackRecord>();
  @Input() wellDataFlowTrackRecord:TrackRecord=new TrackRecord();

  temporalUse:boolean=true;

  isWellOptionsFinished:boolean=false; 
  isStemEventFinished:boolean=false; 
  isCompletionEventFinished:boolean=false; 

  ngOnChanges(changes: SimpleChanges): void {   
    if (this.wellDataFlowTrackRecord.id>0 && this.step===0){      
      this.SetStep(1); 
    }   
  } 

  ngOnInit(): void {  
    if (this.wellDataFlowTrackRecord.id!=0 ){    
      this.SetStep(1);
    }     
  }

  SetStep(step:number){
    this.step=step;
  }
  OnManagementWellOptionsEvent(trackRecord:TrackRecord){   
    this.UpdateTrackRecord(trackRecord);
    this.wellDataEvent.emit(this.wellDataFlowTrackRecord);
    this.isWellOptionsFinished=true;
    this.step=2;
  } 

  OnStemEvent(trackRecord:TrackRecord){   
    this.UpdateTrackRecord(trackRecord);
    this.wellDataEvent.emit(this.wellDataFlowTrackRecord);
    this.isStemEventFinished=true;
    this.step=3;
  } 
  OnCompletionEvent(trackRecord:TrackRecord){   
    this.UpdateTrackRecord(trackRecord);
    this.wellDataEvent.emit(this.wellDataFlowTrackRecord);
    this.isCompletionEventFinished=true;    
  } 
 
 
  private UpdateTrackRecord(trackRecord:TrackRecord){
    this.wellDataFlowTrackRecord={
      id:trackRecord.id,
      supervisorUser:trackRecord.supervisorUser,
      assignedUser:trackRecord.assignedUser,
      validatorUser:trackRecord.validatorUser,
      dataEntryUser:trackRecord.dataEntryUser,
      managementCountry:trackRecord.managementCountry,
      installationStartDate:trackRecord.installationEndDate,
      installationEndDate:trackRecord.installationEndDate,
      validationDate:trackRecord.validationDate,
      well:trackRecord.well ,
      surfaceEquipment:trackRecord.surfaceEquipment,
      installedEquipment:trackRecord.installedEquipment     
    }
  }

}
