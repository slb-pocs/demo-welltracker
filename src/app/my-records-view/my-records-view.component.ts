import { Component, OnInit } from '@angular/core';
import { TrackRecord } from '../models/track-record';
import { Init } from 'v8';
import { TrackrecordService } from '../services/trackrecord.service';
import { Router } from '@angular/router'; 
import { MatDialog } from '@angular/material/dialog';
import { PopupViewComponent } from '../popup-view/popup-view.component';

@Component({
  selector: 'app-my-records-view',
  templateUrl: './my-records-view.component.html',
  styleUrl: './my-records-view.component.css'
})
export class MyRecordsViewComponent implements OnInit{

  trackRecordList:TrackRecord[]=[];
  

  columns: string[]=["Id", "Supervisor",  "Well", "Field", "Country"
    , "Action"]

  public constructor(private trackRecordService: TrackrecordService
                    ,private router: Router
                    ,private dialogRef: MatDialog
  ){
 
  }
  ngOnInit(): void {
    this.trackRecordService.GetTrackRecords()
    .subscribe(response=>{      
      console.log(response),
      this.trackRecordList=response
    });
  }

  OnClickItem(id:number){
    this.router.navigate(['/track-record',id]);
  }

  OnDeleteItem(id:number){
   this.SendPopupNotification('This option is not available in this demo');
  }

  CleanTableNullValues(){
    
  }

  private SendPopupNotification(message: string) {
    this.dialogRef.open(PopupViewComponent, {
      data: {
        message: message
      }
    });
  }

}
