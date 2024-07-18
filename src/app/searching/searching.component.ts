import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrl: './searching.component.css'
})
export class SearchingComponent {
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  @Output() projectEvent=new EventEmitter<string>();
  @Output() operationtEvent=new EventEmitter<string>();
  @Output() operationActivityEvent=new EventEmitter<string>();

  projectFormControl:FormControl=new FormControl('');
  operationFormControl:FormControl=new FormControl('');
  operationActivityFormControl:FormControl=new FormControl('');

  step:number=0;

  ngOnInit(){

  }

  SearchData(){

  }
  ClearFields(){

  }

  setStep(stepNumber:number){
    this.step=stepNumber;
  }



}
