import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FileService } from '../services/file.service';
import { RecordFile } from '../models/record-file';
import { TrackRecord } from '../models/track-record';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PopupViewComponent } from '../popup-view/popup-view.component';


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

  fileList: RecordFile[] = [];

  columns: string[] = ['Name', 'Extension', 'Action'];

  public constructor(private fileService: FileService
    , private dialogWindow: MatDialog
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.trackRecordFromParent?.id != 0 && this.fileList?.length == 0) {
      this.fileService.GetFileListByTrackRecord(this.trackRecordFromParent.id)
        .subscribe(response => {
          this.fileList = response,
            this.table?.renderRows();
        });
    }
  }

  ngOnInit(): void {
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
            this.SendPopupNotification('The file has been uploaded'),
              this.fileService.GetFileListByTrackRecord(this.trackRecordFromParent.id)
                .subscribe(response => {
                  this.fileList = response,
                    this.table?.renderRows();
                });
          });
      }
    }


  }
  OnClickDownloadItem(fileId: number, fileName: string) {
    this.GetFile(fileId, fileName);
  }
  OnClickDeleteItem(fileId: number) {
    this.DeleteFile(fileId);
  }

  GetFile(fileId: number, fileName: string) {
    this.fileService.GetFile(fileId).subscribe((blob) => {
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
