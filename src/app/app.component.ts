import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupViewComponent } from './popup-view/popup-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demo-welltracker';

  public constructor(private dialogRef:MatDialog){}

  ShowMessage(){
    this.SendPopupNotification('This option is not available in this demo');
  }

  private SendPopupNotification(message: string) {
    this.dialogRef.open(PopupViewComponent, {
      data: {
        message: message
      }
    });
  }
}
