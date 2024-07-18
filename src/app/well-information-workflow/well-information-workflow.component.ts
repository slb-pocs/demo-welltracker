import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-well-information-workflow',
  templateUrl: './well-information-workflow.component.html',
  styleUrl: './well-information-workflow.component.css'
})
export class WellInformationWorkflowComponent implements OnInit { 

  step:number=0;
  trackRecordId:number=0;
  wellId:number=0;

  isSearchingFinished:boolean=false;  
  isManagementInfoFinished:boolean=false;
  isCustomerDataFinished:boolean=false;
  isWellDataFinished:boolean=false;
  isStemDataFinished:boolean=false;
  isCompletionHistoryFinished:boolean=false;
  isCompletionDataFinished=false;

  ngOnInit(): void {
    
  }

  SetStep(step:number){
    this.step=step;
  }

  OnManagementInfoEvent(message:number){
    this.trackRecordId=message;
    this.isManagementInfoFinished=true;
    this.step=2;
  } 
  OnCustomerInfoEvent(message:number){
    this.wellId=message;
    this.isCustomerDataFinished=true;
    this.step=3;
  } 
  OnWellInfoEvent(message:number){   
    this.isWellDataFinished=true;
    this.step=4;
  }
  OnStemInfoEvent(message:number){   
    this.isStemDataFinished=true;
    this.step=5;
  }


}
