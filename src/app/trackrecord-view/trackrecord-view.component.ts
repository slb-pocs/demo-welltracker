import { Component, Input, OnInit } from '@angular/core';
import { TrackRecord } from '../models/track-record';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trackrecord-view',
  templateUrl: './trackrecord-view.component.html',
  styleUrl: './trackrecord-view.component.css'
})
export class TrackrecordViewComponent {
  trackRecord:TrackRecord;  
  @Input() id:string='';
  
  projectId:string='';


  message:string='New Record';
  

  constructor(private route: ActivatedRoute){
    this.trackRecord=new TrackRecord();       
  }
    
  ngOnInit() {          
    if(this.id!='0'){
      this.message='Record Id: '+this.id;
    }
  }
  ReceiveProjectData(data:string){
      this.projectId=data;
  }    
  
    

}
