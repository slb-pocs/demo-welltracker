import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FileService } from '../services/file.service';
import { RecordFile } from '../models/record-file';
import { TrackRecord } from '../models/track-record';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-file-management-view',
  templateUrl: './file-management-view.component.html',
  styleUrl: './file-management-view.component.css'
})
export class FileManagementViewComponent implements OnChanges, OnInit {
  @ViewChild('fileInput') fileInput!:
    ElementRef;

  @ViewChild(MatTable)
  table!: MatTable<RecordFile>;

  @Input() trackRecordFromParent: TrackRecord = new TrackRecord;
  @Output() fileManagementEvent = new EventEmitter<TrackRecord>();

  decriptionFormControl:FormControl=new FormControl('');

  recordFile:RecordFile=new RecordFile();

  fileList: RecordFile[] = [];

  columns: string[] = ['Name', 'Extension','Description', 'Action'];

  public constructor(private fileService: FileService
    , private dialogWindow: MatDialog
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.recordFile.trackRecordId=this.trackRecordFromParent.id;
    if (this.trackRecordFromParent?.id != 0 && this.fileList?.length == 0) {
      this.fileService.GetFileListByTrackRecord(this.trackRecordFromParent.id)
        .subscribe(response => {
          this.fileList = response,
            this.table?.renderRows();
        });
    }
  }

  ngOnInit(): void {
    this.recordFile.trackRecordId=this.trackRecordFromParent.id;

    if (this.trackRecordFromParent.id != 0)
      this.fileService.GetFileListByTrackRecord(this.trackRecordFromParent.id)
        .subscribe(response => {
          this.fileList = response,
            this.table?.renderRows();
        });
  }

  SaveFile() {
    if (this.trackRecordFromParent.id <= 0) {
      this.SendPopupNotification("The Well information needs to be created first");
    }
    else {      

      const fileInput = this.fileInput.nativeElement;
      const file = fileInput.files[0];

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        this.fileService.UploadFile(formData, this.trackRecordFromParent.id)
          .subscribe(response => {
            this.recordFile=response
            this.SendPopupNotification('The file has been uploaded'),
            this.recordFile.description=this.decriptionFormControl.value;
            this.fileService.UpdateRecordFile(this.recordFile).subscribe(response2 =>{
              this.fileService.GetFileListByTrackRecord(this.trackRecordFromParent.id)
                .subscribe(response2 => {
                  this.fileList = response2,
                    this.table?.renderRows();
                    this.decriptionFormControl=new FormControl('');
                });
            });
              
          });
      }
    }


  }
  OnClickEditDescription(id:number){
    this.fileService.GetRecordFile(id).subscribe(response =>{
      this.recordFile=response,
      this.decriptionFormControl.setValue(this.recordFile.description);
    });
  }

  OnClickDownloadItem(fileId: number, fileName: string) {
    this.Download(fileId, fileName);
  }
  OnClickDeleteItem(fileId: number) {
    this.DeleteFile(fileId);
  }

  Download(fileId: number, fileName: string) {
    this.fileService.DownloadFile(fileId).subscribe((blob) => {
      this.DownloadFile(blob, fileName);
    }
    );
  }

  private DownloadFile(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  private DeleteFile(fileId: number) {
    this.fileService.DeleteFile(fileId).subscribe((response) => {
      this.SendPopupNotification(response),
        this.fileService.GetFileListByTrackRecord(this.trackRecordFromParent.id)
          .subscribe(response => {
            this.fileList = response,
              this.table?.renderRows();
          })
    });
  }

  private SendPopupNotification(message: string) {
    this.dialogWindow.open(PopupViewComponent, {
      data: {
        message: message
      }
    }
    );
  }
}
