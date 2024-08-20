import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupViewComponent } from './popup-view/popup-view.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demo-welltracker';

  public constructor(private dialogRef:MatDialog
                    ,private router:Router
  ){}

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
  GoToMyRecords(){
    window.location.href='/my-records';
  }
  GoToNewRecord(){
    this.router.navigate(['/temp-url']);
    window.location.href='/track-record/0';
  }
}
