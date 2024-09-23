import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TrackRecord } from '../models/track-record';
import { Init } from 'v8';
import { TrackrecordService } from '../services/trackrecord.service';
import { Router } from '@angular/router'; 
import { MatDialog } from '@angular/material/dialog';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-records-view',
  templateUrl: './my-records-view.component.html',
  styleUrl: './my-records-view.component.css'
})
export class MyRecordsViewComponent implements OnInit, AfterViewInit{  
  @ViewChild(MatPaginator)paginator!: MatPaginator;  
  @ViewChild(MatTable)
  table!: MatTable<TrackRecord>; 

  trackRecordList:TrackRecord[]=[];
  dataSource:MatTableDataSource<TrackRecord>;

  skipRecords:number=0;
  takeRecords:number=10;
  clickCount:number=0;
  countTreshold:number=0;

  columns: string[]=["Id", "Supervisor",  "Well", "Field", "Country"
    , "Action"]   

  public constructor(private trackRecordService: TrackrecordService
                    ,private router: Router
                    ,private dialogRef: MatDialog
  ){
    this.dataSource=new MatTableDataSource<TrackRecord>();
   
  }
  
  ngOnInit(): void {    
    this.trackRecordService.GetTrackRecordsPaginated(this.skipRecords, this.takeRecords)
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

  OnClickNextRows(){ 
    if(this.countTreshold==0 || this.clickCount<this.countTreshold) {
      this.clickCount++;
      this.skipRecords+=this.takeRecords;
      this.trackRecordService.GetTrackRecordsPaginated(this.skipRecords,this.takeRecords)
            .subscribe(response=>{
              this.trackRecordList=response
              if(this.trackRecordList.length<this.takeRecords || this.trackRecordList.length==0 ){
                this.countTreshold=this.clickCount;
              }           
              this.table.renderRows();
            }); 
    } 
      
  }

  OnClickPreviousRows(){ 
    if(this.clickCount>0){
      this.clickCount--;
      this.skipRecords-=this.takeRecords;
      this.trackRecordService.GetTrackRecordsPaginated(this.skipRecords,this.takeRecords)
            .subscribe(response=>{
              this.trackRecordList=response
              if(this.trackRecordList.length<this.takeRecords || this.trackRecordList.length==0 ){
                this.countTreshold=this.clickCount;
              }           
              this.table.renderRows();
            }); 
    }
    
    
      
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
