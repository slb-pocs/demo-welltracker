import { Component, ElementRef, ViewChild } from '@angular/core';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-file-management-view',
  templateUrl: './file-management-view.component.html',
  styleUrl: './file-management-view.component.css'
})
export class FileManagementViewComponent {
  @ViewChild('fileInput') fileInput!:
    ElementRef;

  public constructor(private fileService: FileService) { }

  ngOnInit(): void {

  }

  SaveFile() {
    const fileInput = this.fileInput.nativeElement;
    const file = fileInput.files[0];
   
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.fileService.UploadFile(formData,49).subscribe(response => {
        alert('tetsing the upload event2');
      });
    }
  }
}
