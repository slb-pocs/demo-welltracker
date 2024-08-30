import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { OperationActivityService } from '../services/operation-activity.service';
import { OperationActivityDto } from '../apiDtos/operation-activity-dto';
import { Customer } from '../models/customer';
import { response } from 'express';
import { Well } from '../models/well';
import { MatDialog } from '@angular/material/dialog';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { TrackRecord } from '../models/track-record';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrl: './searching.component.css'
})
export class SearchingComponent {
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  @Output() projectEvent = new EventEmitter<string>();
  @Output() operationtEvent = new EventEmitter<string>();
  @Output() operationActivityEvent = new EventEmitter<TrackRecord>();


  operationActivityFormControl: FormControl = new FormControl('');

  eventCount: number = 1;
  operationActivity: OperationActivityDto = new OperationActivityDto();
  trackRecord: TrackRecord = new TrackRecord();
  fdpMessageList: string[] = [];

  public constructor(private operationService: OperationActivityService,
    private dialogRef: MatDialog,
    private _snackBar:MatSnackBar
  ) { }

  ngOnInit() {

  }

  async SearchData() {
    this.eventCount++;

    if (this.operationActivityFormControl.value != '') {
      this.SendPopupNotification('We are prepopulating your data from Field Delivery Platform <br>'
        + ' to enhance your experience and save you time. Please review and <br>'
        + ' confirm the information to ensure accuracy. ');

      this.trackRecord = await this.operationService
        .GetTrackRecordByOperationActivity(this.operationActivityFormControl.value);

      if ((this.trackRecord.well.name == '' || this.trackRecord.well.name == null)
        && (this.trackRecord.well.customer?.name == '' || this.trackRecord.well.customer?.name == null)) {
        this.SendPopupNotification('There is no data associated with the operational activity');
      }
      else {
        this.ShowFDPIssues();
        this.trackRecord.id = -1;
        this.operationActivityEvent.emit(this.trackRecord);
      }
    }
  }
  ClearFields() {
    this.operationActivityFormControl = new FormControl('');
  }
  private SendPopupNotification(message: string) {
    this.dialogRef.open(PopupViewComponent, {
      data: {
        message: message
      }
    });
  }
  SetTrackRecordResults() {
    this.fdpMessageList = [];

    if (this.trackRecord.dataEntryUser === null ||
      this.trackRecord.dataEntryUser === undefined ||
      this.trackRecord.dataEntryUser.trim() === '') {
      this.fdpMessageList.push('Creator user');
    }
    if (this.trackRecord.validatorUser === null ||
      this.trackRecord.validatorUser === undefined ||
      this.trackRecord.validatorUser.trim() === '') {
      this.fdpMessageList.push('Updater user');
    }
    if (this.trackRecord.installationStartDate === null ||
      this.trackRecord.installationStartDate === undefined) {
      this.fdpMessageList.push('Installation start date');
    }
    if (this.trackRecord.installationEndDate === null ||
      this.trackRecord.installationEndDate === undefined) {
      this.fdpMessageList.push('Installation end date');
    }
    if (this.trackRecord.managementCountry === null ||
      this.trackRecord.installationEndDate === undefined) {
      this.fdpMessageList.push('Management country');
    }
    if (this.trackRecord.well?.name === null ||
      this.trackRecord.well?.name === undefined ||
      this.trackRecord.well?.name.trim() === '') {
      this.fdpMessageList.push('Well name');
    }
    if (this.trackRecord.well?.wellType === null ||
      this.trackRecord.well?.wellType === undefined ||
      this.trackRecord.well?.wellType?.name.trim() === '') {
      this.fdpMessageList.push('Well type');
    }
    if (this.trackRecord.well?.customer === null ||
      this.trackRecord.well?.customer === undefined||
      this.trackRecord.well?.customer?.name.trim() === '') {
      this.fdpMessageList.push('Customer');
    }
    if (this.trackRecord.well?.country === null ||
      this.trackRecord.well?.country === undefined||
      this.trackRecord.well?.country?.name.trim() === '') {
      this.fdpMessageList.push('Country');
    }
    if (this.trackRecord.well?.field === null ||
      this.trackRecord.well?.field === undefined ||
      this.trackRecord.well?.field.trim() === '') {
      this.fdpMessageList.push('Field');
    }
    if (this.trackRecord.well?.environment === null ||
      this.trackRecord.well?.environment === undefined ||
      this.trackRecord.well?.environment?.name.trim() === '') {
      this.fdpMessageList.push('Environment');
    }

  }

  ShowFDPIssues() {
    this.SetTrackRecordResults();
    if (this.fdpMessageList.length > 0) {
      let fdpMessage: string = 'The following data is undefined in the FDP System: ';

      this.fdpMessageList.forEach((message) => {
        fdpMessage = fdpMessage+ message + ', ';        
      });
      //this.SendPopupNotification(fdpMessage);
      this.openSnackBar(fdpMessage,'Close');
      
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      panelClass:'multiline-snackbar'
    });
  }


}




