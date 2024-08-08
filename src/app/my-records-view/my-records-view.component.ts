import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TrackRecord } from '../models/track-record';
import { Init } from 'v8';
import { TrackrecordService } from '../services/trackrecord.service';
import { Router } from '@angular/router'; 
import { MatDialog } from '@angular/material/dialog';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-records-view',
  templateUrl: './my-records-view.component.html',
  styleUrl: './my-records-view.component.css'
})
export class MyRecordsViewComponent implements OnInit, AfterViewInit{
  trackRecordList:TrackRecord[]=[];
  dataSource:MatTableDataSource<TrackRecord>;
  @ViewChild(MatPaginator)paginator!: MatPaginator;  

  columns: string[]=["Id", "Supervisor",  "Well", "Field", "Country"
    , "Action"]   

  public constructor(private trackRecordService: TrackrecordService
                    ,private router: Router
                    ,private dialogRef: MatDialog
  ){
    this.dataSource=new MatTableDataSource<TrackRecord>();
   
  }
  
  ngOnInit(): void {    
    this.trackRecordService.GetTrackRecords()
    .subscribe(response=>{      
      console.log(response),
      this.trackRecordList=response,      
      this.dataSource=new MatTableDataSource<TrackRecord>(this.trackRecordList),
      this.dataSource.paginator=this.paginator;       
    });   
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;       
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
