import { Component } from '@angular/core';
import { TrackRecord } from '../models/track-record';
import { Init } from 'v8';
import { TrackrecordService } from '../services/trackrecord.service';

@Component({
  selector: 'app-my-records-view',
  templateUrl: './my-records-view.component.html',
  styleUrl: './my-records-view.component.css'
})
export class MyRecordsViewComponent {

  trackRecordList:TrackRecord[]=[];

  columns: string[]=["Id", "Supervisor", "Validator", "Data Entry User", "Action"]

  public constructor(private trackRecordService: TrackrecordService){
    trackRecordService.GetTrackRecords()
    .subscribe(response=>{      
      console.log(response),
      this.trackRecordList=response
    });
  }

  OnClickItem(id:number){

  }

}
