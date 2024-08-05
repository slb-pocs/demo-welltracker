import { Component } from '@angular/core';
import { TrackRecord } from '../models/track-record';
import { Init } from 'v8';
import { TrackrecordService } from '../services/trackrecord.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-my-records-view',
  templateUrl: './my-records-view.component.html',
  styleUrl: './my-records-view.component.css'
})
export class MyRecordsViewComponent {

  trackRecordList:TrackRecord[]=[];
  

  columns: string[]=["Id", "Supervisor",  "Well", "Field", "Country"
    , "Action"]

  public constructor(private trackRecordService: TrackrecordService
                    ,private router: Router
  ){
    trackRecordService.GetTrackRecords()
    .subscribe(response=>{      
      console.log(response),
      this.trackRecordList=response
    });
  }

  OnClickItem(id:number){
    this.router.navigate(['/track-record',id]);
  }

  CleanTableNullValues(){
    
  }

}
