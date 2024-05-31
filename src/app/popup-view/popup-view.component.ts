import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-popup-view',
  templateUrl: './popup-view.component.html',
  styleUrl: './popup-view.component.css'
})
export class PopupViewComponent implements OnInit {
  message;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any){
    this.message=data.message;
  }

  ngOnInit(): void {    
  }
}
