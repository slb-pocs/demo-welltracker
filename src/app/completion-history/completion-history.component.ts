import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { CompletionInitialData } from '../models/completion-initial-data';
import { CompletionpulledReason } from '../models/completionpulled-reason';
import { TypesService } from '../services/types.service';
import { CompletionInitialDataService } from '../services/completion-initial-data.service';
import { MatDialog } from '@angular/material/dialog';
import { response } from 'express';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-completion-history',
  templateUrl: './completion-history.component.html',
  styleUrl: './completion-history.component.css'
})
export class CompletionHistoryComponent {

  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  @Output() wellEvent =new EventEmitter<number>();

  @Input() wellIdFromParent:number=0;

  completionInitialData:CompletionInitialData=new CompletionInitialData();

  isCompletionPulledFormControl:FormControl=new FormControl('');
  isInitialCompletionFormControl:FormControl=new FormControl('');
  completionPulledDateFormControl:FormControl=new FormControl('');
  completionPulledReasonFormControl:FormControl=new FormControl('');
  lastValidatedFormControl:FormControl=new FormControl('');  
  hasIpmWellFormControl:FormControl=new FormControl('');
  hasLinerHangerInstallationFormControl:FormControl=new FormControl('');  

  completionPulledReasonList: CompletionpulledReason[] = [];  
 

  public constructor(private completionInitialService: CompletionInitialDataService
                    ,private typesService: TypesService                    
                    ,private dialogWindow:MatDialog
  ){

  }

  ngOnInit(){    

    this.isCompletionPulledFormControl.setValue(false);
    this.isInitialCompletionFormControl.setValue(false);
    this.completionPulledReasonFormControl.setValue(false);
    this.hasIpmWellFormControl.setValue(false);
    this.hasLinerHangerInstallationFormControl.setValue(false);
    
    
    this.typesService.GetCompletionPulledReasons()
                    .subscribe(response=>{
                      this.completionPulledReasonList=response
                    });     
  }
 
  Save(){
    this.completionInitialData.isInitialCompletion=this.isInitialCompletionFormControl.value==='true';
    this.completionInitialData.isCompletionPulled=this.isCompletionPulledFormControl.value;
    this.completionInitialData.hasIpmWell=this.hasIpmWellFormControl.value;
    this.completionInitialData.hasLinerHangerInstallation=this.hasLinerHangerInstallationFormControl.value;    
    this.completionInitialData.wellId=this.wellIdFromParent;

    if(this.completionInitialData.id==0){
      this.Create();
    }
    else{
      this.Update();
    }        
  }
  Create(){
    this.completionInitialService.CreateCompletionInitialData(this.completionInitialData)
      .subscribe(response =>{
        this.completionInitialData=response,
        this.SendPopupNotification
        ('The completion history data has been saved with the id: '
          +this.completionInitialData.id),
    this.wellEvent.emit(this.completionInitialData.id)  
      });
  }
  Update(){
    this.completionInitialService.UpdateCompletionInitialData(this.completionInitialData)
    .subscribe(response =>{
      this.completionInitialData=response,
      this.SendPopupNotification
      ('The completion history data has been updated: '
        +this.completionInitialData.id),
  this.wellEvent.emit(this.completionInitialData.id)  
    });
  }
  ClearFields(){
    let completionInitial:CompletionInitialData=new CompletionInitialData();
    this.FillFields(completionInitial);
  }
  FillFields(completionInitialData:CompletionInitialData){
    /*
    this.wellFormControl.setValue(well.name);
    this.wellTypeFormControl.setValue(well.wellType.name);
    this.customerFormControl.setValue(well.customer.name);

    this.countryFormControl.setValue(well.country.name);
    this.basinFormControl.setValue(well.basin.name);
    this.fieldFormControl.setValue(well.field);
    this.geoUnitFormControl.setValue(well.geoUnit.name);
    this.environmentFormControl.setValue(well.environment.name);
    */
  }  
  /*
  public OnChangeWellEvent(event: MatOptionSelectionChange, wellReference: WellReference) {
    if (event.source.selected == true) 
      this.well.name = wellReference.name;       
  }
  public OnChangeWellTypeEvent(event: MatOptionSelectionChange, wellType: WellType) {
    if (event.source.selected == true)
      this.well.wellType = wellType;
  }
  public OnChangeCustomerEvent(event: MatOptionSelectionChange, customer: Customer) {
    if (event.source.selected == true)
      this.well.customer = customer;
      this.accountFormControl.setValue(customer.name);
  } 
  public OnChangeBasinEvent(event: MatOptionSelectionChange, basin: Basin) {
    if (event.source.selected == true)
      this.well.basin = basin;
  }
  public OnChangeGeoUnitEvent(event: MatOptionSelectionChange, geoUnit: GeoUnit) {
    if (event.source.selected == true)
      this.well.geoUnit = geoUnit;
  }
  public OnChangeMgtCountryEvent(event: MatOptionSelectionChange, country: Country) {
    if (event.source.selected == true)
      this.well.country = country;
  }
  public OnChangeFieldEvent(event: MatOptionSelectionChange, field: Field) {
    if (event.source.selected == true)
      this.well.field = field.name;
  }
  public OnChangeEnvironmentEvent(event: MatOptionSelectionChange, environment: Environment) {
    if (event.source.selected == true)
      this.well.environment = environment;
  }
 
    */

  public OnChangeWellEvent(event: MatOptionSelectionChange, completionPulledReason: CompletionpulledReason) {
    if (event.source.selected == true) 
      this.completionInitialData.completionPulledReason = completionPulledReason;       
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
