import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Questionnaire } from '../models/questionnaire';
import { TrackRecord } from '../models/track-record';
import { FormControl } from '@angular/forms';
import { QuestionnaireService } from '../services/questionnaire.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-questionnaire-view',
  templateUrl: './questionnaire-view.component.html',
  styleUrl: './questionnaire-view.component.css'
})
export class QuestionnaireViewComponent {
  @ViewChild(MatTable)
  table!: MatTable<Questionnaire>;

  @Output() keyComquestionnaireEvent = new EventEmitter<TrackRecord>();
  @Input() trackRecordFromParent: TrackRecord = new TrackRecord();

  questionnaire: Questionnaire = new Questionnaire();

  question1FormControl: FormControl = new FormControl('');
  question2FormControl: FormControl = new FormControl('');
  question3FormControl: FormControl = new FormControl('');
  question4FormControl: FormControl = new FormControl('');
  question5FormControl: FormControl = new FormControl('');
  question6FormControl: FormControl = new FormControl('');
  question7FormControl: FormControl = new FormControl('');
  question8FormControl: FormControl = new FormControl('');
  question9FormControl: FormControl = new FormControl('');
  question10FormControl: FormControl = new FormControl('');
  question11FormControl: FormControl = new FormControl('');
  question12FormControl: FormControl = new FormControl('');

  questlink1FormControl: FormControl = new FormControl('');
  questlink2FormControl: FormControl = new FormControl('');
  questlink3FormControl: FormControl = new FormControl('');
  questlink4FormControl: FormControl = new FormControl('');
  questlink5FormControl: FormControl = new FormControl('');
  questlink6FormControl: FormControl = new FormControl('');
  questlink7FormControl: FormControl = new FormControl('');
  questlink8FormControl: FormControl = new FormControl('');
  questlink9FormControl: FormControl = new FormControl('');
  questlink10FormControl: FormControl = new FormControl('');
  questlink11FormControl: FormControl = new FormControl('');
  questlink12FormControl: FormControl = new FormControl('');

  questionnaireList: Questionnaire[] = [];

  answerList:string[]=[];


  columns: string[] = ['Key-Component', 'Part-Number', 'Serial'
    , 'Action'];

  public constructor(private questionnaireService: QuestionnaireService
    , private dialogWindow: MatDialog) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.trackRecordFromParent?.id > 0) {
      this.questionnaireService.GetAllByTrackRecord(this.trackRecordFromParent.id)
        .subscribe(response => {
          this.questionnaireList = response,
            this.table?.renderRows();
        });
    }
  }

  ngOnInit(): void {
    if (this.trackRecordFromParent.id > 0) {
      //this.isolationValveJob.trackRecordId=this.trackRecordFromParent.id;     
      this.questionnaireService.GetAllByTrackRecord(this.trackRecordFromParent.id)
        .subscribe(response => {
          this.questionnaireList = response,
            this.table?.renderRows();
        });
    }

    this.answerList=['Yes','No', 'Not Applicable'];
  }

  Save() {
    if (this.questionnaire.id == 0 || this.questionnaire == null) {
      this.SendPopupNotification("You must first select a questionnaire");
    }
    else {
      this.questionnaire.question1 = this.question1FormControl.value;
      this.questionnaire.question2 = this.question2FormControl.value;
      this.questionnaire.question3 = this.question3FormControl.value;
      this.questionnaire.question4 = this.question4FormControl.value;
      this.questionnaire.question5 = this.question5FormControl.value;
      this.questionnaire.question6 = this.question6FormControl.value;
      this.questionnaire.question7 = this.question7FormControl.value;
      this.questionnaire.question8 = this.question8FormControl.value;
      this.questionnaire.question9 = this.question9FormControl.value;
      this.questionnaire.question10 = this.question10FormControl.value;
      this.questionnaire.question11 = this.question11FormControl.value;
      this.questionnaire.question12 = this.question12FormControl.value;

      this.questionnaire.questLink1 = this.questlink1FormControl.value;
      this.questionnaire.questLink2 = this.questlink2FormControl.value;
      this.questionnaire.questLink3 = this.questlink3FormControl.value;
      this.questionnaire.questLink4 = this.questlink4FormControl.value;
      this.questionnaire.questLink5 = this.questlink5FormControl.value;
      this.questionnaire.questLink6 = this.questlink6FormControl.value;
      this.questionnaire.questLink7 = this.questlink7FormControl.value;
      this.questionnaire.questLink8 = this.questlink8FormControl.value;
      this.questionnaire.questLink9 = this.questlink9FormControl.value;
      this.questionnaire.questLink10 = this.questlink10FormControl.value;
      this.questionnaire.questLink11 = this.questlink11FormControl.value;
      this.questionnaire.questLink12 = this.questlink12FormControl.value;

      this.Update();
    }
  }
  Update() {
    this.questionnaireService.Update(this.questionnaire).subscribe(response => {
      this.questionnaire = response,
        this.SendPopupNotification
          ('The questionnaire has been updated '),
        this.RefreshQuestionnaireList(),
        this.ClearFields();
    });
  }
  RefreshQuestionnaireList() {
    this.questionnaireService.GetAllByTrackRecord(this.questionnaire.isolationValveKeyComponent.trackRecordId)
      .subscribe(response => {
        this.questionnaireList = response,
          this.table.renderRows()
      });
  }
  FillFields(questionnaire: Questionnaire) {
    this.question1FormControl.setValue(questionnaire.question1);
    this.question2FormControl.setValue(questionnaire.question2);
    this.question3FormControl.setValue(questionnaire.question3);
    this.question4FormControl.setValue(questionnaire.question4);
    this.question5FormControl.setValue(questionnaire.question5);
    this.question6FormControl.setValue(questionnaire.question6);
    this.question7FormControl.setValue(questionnaire.question7);
    this.question8FormControl.setValue(questionnaire.question8);
    this.question9FormControl.setValue(questionnaire.question9);
    this.question10FormControl.setValue(questionnaire.question10);
    this.question11FormControl.setValue(questionnaire.question11);
    this.question12FormControl.setValue(questionnaire.question12);

    this.questlink1FormControl.setValue(questionnaire.questLink1);
    this.questlink2FormControl.setValue(questionnaire.questLink2);
    this.questlink3FormControl.setValue(questionnaire.questLink3);
    this.questlink4FormControl.setValue(questionnaire.questLink4);
    this.questlink5FormControl.setValue(questionnaire.questLink5);
    this.questlink6FormControl.setValue(questionnaire.questLink6);
    this.questlink7FormControl.setValue(questionnaire.questLink7);
    this.questlink8FormControl.setValue(questionnaire.questLink8);
    this.questlink9FormControl.setValue(questionnaire.questLink9);
    this.questlink10FormControl.setValue(questionnaire.questLink10);
    this.questlink11FormControl.setValue(questionnaire.questLink11);
    this.questlink12FormControl.setValue(questionnaire.questLink12);
  }
  ClearFields() {
    this.questionnaire = new Questionnaire();

    this.question1FormControl = new FormControl('');
    this.question2FormControl = new FormControl('');
    this.question3FormControl = new FormControl('');
    this.question4FormControl = new FormControl('');
    this.question5FormControl = new FormControl('');
    this.question6FormControl = new FormControl('');
    this.question7FormControl = new FormControl('');
    this.question8FormControl = new FormControl('');
    this.question9FormControl = new FormControl('');
    this.question10FormControl = new FormControl('');
    this.question11FormControl = new FormControl('');
    this.question12FormControl = new FormControl('');

    this.questlink1FormControl = new FormControl('');
    this.questlink2FormControl = new FormControl('');
    this.questlink3FormControl = new FormControl('');
    this.questlink4FormControl = new FormControl('');
    this.questlink5FormControl = new FormControl('');
    this.questlink6FormControl = new FormControl('');
    this.questlink7FormControl = new FormControl('');
    this.questlink8FormControl = new FormControl('');
    this.questlink9FormControl = new FormControl('');
    this.questlink10FormControl = new FormControl('');
    this.questlink11FormControl = new FormControl('');
    this.questlink12FormControl = new FormControl('');

  }
  OnClickQuestionnaireItem(id: number) {
    this.questionnaire = this.questionnaireList
      .find(q => q.id === id) ?? new Questionnaire();
    this.FillFields(this.questionnaire);
  }

  onChangeQuestion1(event: MatOptionSelectionChange, answer: string){
   
  }

  private SendPopupNotification(message: string) {
    this.dialogWindow.open(PopupViewComponent, {
      data: {
        message: message
      }
    });
  }
}
