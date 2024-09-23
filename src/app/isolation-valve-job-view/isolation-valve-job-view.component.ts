import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { IsolationValveJob } from '../models/isolation-valve-job';
import { TrackRecord } from '../models/track-record';
import { FormControl } from '@angular/forms';
import { TypesService } from '../services/types.service';
import { IsolationValveJobService } from '../services/isolation-valve-job.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { MatOptionSelectionChange } from '@angular/material/core';
import { IsolationValveJobType } from '../models/isolation-valve-job-type';
import { TriggerType } from '../models/trigger-type';
import { ContingencyMechanicalAvailable } from '../models/contingency-mechanical-available';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-isolation-valve-job-view',
  templateUrl: './isolation-valve-job-view.component.html',
  styleUrl: './isolation-valve-job-view.component.css'
})
export class IsolationValveJobViewComponent {

  @ViewChild(MatTable)
  table!: MatTable<IsolationValveJob>; 

  @Output() keyComponentEvent =new EventEmitter<TrackRecord>();
  @Input() trackRecordFromParent:TrackRecord=new TrackRecord(); 

  isolationValveJob:IsolationValveJob=new IsolationValveJob();
 
  equipmentPartNumberFormControl:FormControl=new FormControl('');
  equipmentNameFormControl:FormControl=new FormControl('');
  isolationValveJobTypeFormControl:FormControl=new FormControl('');
  triggerTypeFormControl:FormControl=new FormControl('');
  surfaceAppliedTubbingPressureLimitFormControl:FormControl=new FormControl(0);
  surfaceTempAtN2ChangingFormControl:FormControl=new FormControl(0);
  contingencyMechanicalAvailableFormControl:FormControl=new FormControl('');

  isolationValveJobList:IsolationValveJob[]=[];

  jobTypeList:IsolationValveJobType[]=[];
  triggerTypeList:TriggerType[]=[];
  contingencyMechanicalList:ContingencyMechanicalAvailable[]=[];

  columns: string[] = ['Part-Number','Job-Type', 'Trigger-Type'
    , 'Pressure-Limit', 'Temp-Changing'
    ,'Contingency-Mechanical', 'Action'];

    public constructor(private typesService: TypesService
      ,private isolationValveJobService: IsolationValveJobService                
      ,private dialogWindow:MatDialog){

    }

    ngOnChanges(changes: SimpleChanges): void {
      if(this.trackRecordFromParent?.id>0){
        this.isolationValveJobService.GetAllByTrackRecord(this.trackRecordFromParent.id)
          .subscribe(response => {
            this.isolationValveJobList=response,
            this.table?.renderRows();
          });
      }
    }

    ngOnInit(): void {      
      if (this.trackRecordFromParent.id>0){
        this.isolationValveJob.trackRecordId=this.trackRecordFromParent.id;     
        this.isolationValveJobService.GetAllByTrackRecord(this.trackRecordFromParent.id)
        .subscribe(response => {
          this.isolationValveJobList=response,
          this.table?.renderRows();
        });
      }   

      this.typesService.GetIsolationValveJobTypes().subscribe(response => {
        this.jobTypeList=response
      });

      this.typesService.GetTriggerTypes().subscribe(response => {
        this.triggerTypeList=response
      });

      this.typesService.GetContingencyMechanicalTypes().subscribe(response => {
        this.contingencyMechanicalList=response
      });
    } 

    Save(){
      if(this.isolationValveJob.id==0 || this.isolationValveJob==null){
        this.SendPopupNotification("You must first select a Job");
      }
      else{
        this.isolationValveJob.surfaceAppliedTubbingPressureLimit=
                    this.surfaceAppliedTubbingPressureLimitFormControl.value;
        this.isolationValveJob.surfaceTempAtN2Changing=
                    this.surfaceTempAtN2ChangingFormControl.value;      
        this.Update();   
      }
    }

    Update(){
      this.isolationValveJobService.Update(this.isolationValveJob).subscribe(response=>{
        this.isolationValveJob=response,
        this.SendPopupNotification
        ('The Isolation Valve Job with id: '+this.isolationValveJob.id+' has been updated '),
        this.RefreshIsolationValveJobList(),
        this.ClearFields();
      });
    }

    RefreshIsolationValveJobList(){
      this.isolationValveJobService.GetAllByTrackRecord(this.isolationValveJob.trackRecordId)
      .subscribe(response => { 
      this.isolationValveJobList=response,
      this.table.renderRows()      
      }); 
    }

    FillFields(isolationValveJob:IsolationValveJob){
      this.equipmentPartNumberFormControl.setValue(isolationValveJob.isolationValveKeyComponent.installedEquipment.catalogPart.partNumber);
      this.equipmentNameFormControl.setValue(isolationValveJob.isolationValveKeyComponent.installedEquipment.catalogPart.nodeLevel1.name);
      this.isolationValveJobTypeFormControl.setValue(isolationValveJob.isolationValveJobType.name);
      this.triggerTypeFormControl.setValue(isolationValveJob.triggerType.name);
      this.surfaceAppliedTubbingPressureLimitFormControl.setValue(isolationValveJob.surfaceAppliedTubbingPressureLimit);
      this.surfaceTempAtN2ChangingFormControl.setValue(isolationValveJob.surfaceTempAtN2Changing);
      this.contingencyMechanicalAvailableFormControl.setValue(isolationValveJob.contingencyMechanicalAvailable.name);     
    }

    ClearFields(){      
      this.isolationValveJob=new IsolationValveJob();
      this.equipmentPartNumberFormControl=new FormControl('');
      this.equipmentNameFormControl=new FormControl('');
      this.isolationValveJobTypeFormControl=new FormControl('');
      this.triggerTypeFormControl=new FormControl('');
      this.surfaceAppliedTubbingPressureLimitFormControl=new FormControl(0);
      this.surfaceTempAtN2ChangingFormControl=new FormControl(0);
      this.contingencyMechanicalAvailableFormControl=new FormControl('');
    }

    public OnChangeJobTypeEvent(event: MatOptionSelectionChange, isolationValveJobType: IsolationValveJobType) {
      if (event.source.selected == true)
        this.isolationValveJob.isolationValveJobType = isolationValveJobType;
    }
    public OnChangeTriggerTypeEvent(event: MatOptionSelectionChange, triggerType: TriggerType) {
      if (event.source.selected == true)
        this.isolationValveJob.triggerType = triggerType;
    }
    public OnChangeContingencyMechanicalEvent(event: MatOptionSelectionChange, contingency: ContingencyMechanicalAvailable) {
      if (event.source.selected == true)
        this.isolationValveJob.contingencyMechanicalAvailable = contingency;    
    }

    OnClickJobItem(id:number){   
      this.isolationValveJob=this.isolationValveJobList
            .find(p=>p.id===id)?? new IsolationValveJob();
      this.FillFields(this.isolationValveJob);
    }  

    private SendPopupNotification(message:string){
      this.dialogWindow.open(PopupViewComponent,{
        data:{
          message:message
        }
      });
    }
}
