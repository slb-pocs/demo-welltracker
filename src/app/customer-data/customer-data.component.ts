import { Component, Input, OnInit, Output, ViewChild, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Well } from '../models/well';
import { WellType } from '../models/well-type';
import { Basin } from '../models/basin';
import { GeoUnit } from '../models/geo-unit';
import { Country } from '../models/country';
import { Field } from '../models/field';
import { Environment } from '../models/environment';
import { Customer } from '../models/customer';
import { MatOptionSelectionChange } from '@angular/material/core';
import { map, Observable, startWith } from 'rxjs';
import { WellReferenceService } from '../services/well-reference.service';
import { WellReference } from '../models/well-reference';
import { TypesService } from '../services/types.service';
import { CustomerService } from '../services/customer.service';
import { FieldService } from '../services/field.service';
import { WellService } from '../services/well.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { TrackRecord } from '../models/track-record';


@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrl: './customer-data.component.css'
})
export class CustomerDataComponent implements OnInit, OnChanges {
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  @Output() customerInfoEvent =new EventEmitter<TrackRecord>();


  @Input() trackRecordFromParent:TrackRecord=new TrackRecord(); 

  wellFormControl:FormControl=new FormControl('');
  wellTypeFormControl:FormControl=new FormControl('');
  customerFormControl:FormControl=new FormControl('');
  accountFormControl:FormControl=new FormControl('');
  basinFormControl:FormControl=new FormControl('');
  geoUnitFormControl:FormControl=new FormControl('');
  countryFormControl:FormControl=new FormControl('');
  fieldFormControl:FormControl=new FormControl('');
  environmentFormControl:FormControl=new FormControl('');

  wellReferenceList: WellReference[] = [];
  customerList: Customer[] = [];
  salesAccount:string='';
  wellTypeList: WellType[] = [];
  basinList: Basin[] = [];
  geoUnitList: GeoUnit[] = [];
  countryList: Country[] = [];
  fieldList: Field[] = [];
  environmentList: Environment[] = [];

  filteredWells!:Observable<WellReference[]>;
  filteredCustomers!:Observable<Customer[]>;
  filteredFields!:Observable<Field[]>;

  public constructor(private wellReferenceService: WellReferenceService
                    ,private typesService: TypesService
                    ,private customerService: CustomerService
                    ,private fieldService:FieldService
                    ,private wellService:WellService
                    ,private dialogWindow:MatDialog
  ){

  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.trackRecordFromParent.id!=0 && this.trackRecordFromParent.well !=null){
      this.FillFields(this.trackRecordFromParent.well)
    }
  }

  ngOnInit(){
    if (this.trackRecordFromParent.well!=null){
      this.trackRecordFromParent.well.trackRecordId=this.trackRecordFromParent.id;   
    
      if (this.trackRecordFromParent.well.id!!=0){    
        this.wellService.GetWell(this.trackRecordFromParent.well.id).subscribe(response => {
              this.trackRecordFromParent.well=response
            });
      }
    }
   
    this.wellReferenceService.GetWellReferences()
                             .subscribe(response =>{
                              this.wellReferenceList=response
                             });
    this.typesService.GetWellTypes()
                    .subscribe(response=>{
                      this.wellTypeList=response
                    });
    this.typesService.GetBasins()
                    .subscribe(response=>{
                      this.basinList=response
                    });
    this.typesService.GetGeoUnits()
                    .subscribe(response=>{
                      this.geoUnitList=response
                    });
    this.typesService.GetCountries()
                    .subscribe(response=>{
                      this.countryList=response
                    });
    this.typesService.GetEnvironments()
                    .subscribe(response=>{
                      this.environmentList=response
                    }); 
    this.customerService.GetCustomers()
                    .subscribe(response=>{
                      this.customerList=response
                    });   
    this.typesService.GetFields()
                    .subscribe(response=>{
                      this.fieldList=response
                    });      

    this.filteredCustomers = this.customerFormControl.valueChanges.pipe(
      startWith(''), map(value => this.FilterCustomers(value || '')));

    this.filteredWells = this.wellFormControl.valueChanges.pipe(
      startWith(''), map(value => this.FilterWells(value || '')));

    this.filteredFields = this.fieldFormControl.valueChanges.pipe(
      startWith(''), map(value => this.FilterFields(value || '')));      
  }

  private FilterWells(value:string): WellReference[]{
    let searchValue = value.toLocaleLowerCase();
    return this.wellReferenceList.filter(option => option.name.toLocaleLowerCase().includes(searchValue));
  }
  private FilterCustomers(value:string): Customer[]{
    let searchValue = value.toLocaleLowerCase();
    return this.customerList.filter(option => option.name.toLocaleLowerCase().includes(searchValue));
  }
  private FilterFields(value:string): Field[]{
    let searchValue = value.toLocaleLowerCase();
    return this.fieldList.filter(option => option.name.toLocaleLowerCase().includes(searchValue));
  }
  SaveCustomerData(){
    if(this.trackRecordFromParent.id==0 || this.trackRecordFromParent.id==-1)
      this.SendPopupNotification
      ('The management information has not been created');

    else{     
      this.trackRecordFromParent.well.trackRecordId=this.trackRecordFromParent.id;
      if (this.trackRecordFromParent.well.id>0){    
        this.wellService.GetWell(this.trackRecordFromParent.well.id)
            .subscribe(response => {
              this.trackRecordFromParent.well=response
            });
      }     
  
      if (this.trackRecordFromParent.well.id<=0)
        this.Create();      
      else
        this.Update();      
    }   
  }
  Create(){
    this.wellService.CreateWell(this.trackRecordFromParent.well)
    .subscribe(response=> {
      this.trackRecordFromParent.well=response,
      this.SendPopupNotification
          ('The Well has been created with the id: '
            +this.trackRecordFromParent.well.id),
      this.customerInfoEvent.emit(this.trackRecordFromParent)              
    });
  }
  Update(){
    this.wellService.UpdateWell(this.trackRecordFromParent.well)
    .subscribe(response=> {
      this.trackRecordFromParent.well=response,
      this.SendPopupNotification
          ('The Well with id: '+this.trackRecordFromParent.well.id+' has been updated '),
      this.customerInfoEvent.emit(this.trackRecordFromParent)              
    });
  }
  ClearFields(){
    this.trackRecordFromParent.well=new Well();
    this.trackRecordFromParent.well.trackRecordId=this.trackRecordFromParent.id;
    this.wellFormControl=new FormControl('');
    this.wellTypeFormControl=new FormControl('');
    this.customerFormControl=new FormControl('');
    this.accountFormControl=new FormControl('');
    this.basinFormControl=new FormControl('');
    this.geoUnitFormControl=new FormControl('');
    this.countryFormControl=new FormControl('');
    this.fieldFormControl=new FormControl('');
    this.environmentFormControl=new FormControl('');
  }
  FillFields(well:Well){
    this.wellFormControl.setValue(well?.name);
    this.wellTypeFormControl.setValue(well?.wellType?.name);
    this.customerFormControl.setValue(well?.customer?.name);
    this.accountFormControl.setValue(well?.customer?.accountName);

    this.countryFormControl.setValue(well?.country?.name);
    this.basinFormControl.setValue(well?.basin?.name);
    this.fieldFormControl.setValue(well?.field);
    this.geoUnitFormControl.setValue(well?.geoUnit?.name);
    this.environmentFormControl.setValue(well?.environment?.name);
  }  

  public OnChangeWellEvent(event: MatOptionSelectionChange, wellReference: WellReference) {
    if (event.source.selected == true) 
      this.trackRecordFromParent.well.name = wellReference.name;       
  }
  public OnChangeWellTypeEvent(event: MatOptionSelectionChange, wellType: WellType) {
    if (event.source.selected == true)
      this.trackRecordFromParent.well.wellType = wellType;
  }
  public OnChangeCustomerEvent(event: MatOptionSelectionChange, customer: Customer) {
    if (event.source.selected == true)
      this.trackRecordFromParent.well.customer = customer;
      this.accountFormControl.setValue(customer.name);
  } 
  public OnChangeBasinEvent(event: MatOptionSelectionChange, basin: Basin) {
    if (event.source.selected == true)
      this.trackRecordFromParent.well.basin = basin;
  }
  public OnChangeGeoUnitEvent(event: MatOptionSelectionChange, geoUnit: GeoUnit) {
    if (event.source.selected == true)
      this.trackRecordFromParent.well.geoUnit = geoUnit;
  }
  public OnChangeMgtCountryEvent(event: MatOptionSelectionChange, country: Country) {
    if (event.source.selected == true)
      this.trackRecordFromParent.well.country = country;
  }
  public OnChangeFieldEvent(event: MatOptionSelectionChange, field: Field) {
    if (event.source.selected == true)
      this.trackRecordFromParent.well.field = field.name;
  }
  public OnChangeEnvironmentEvent(event: MatOptionSelectionChange, environment: Environment) {
    if (event.source.selected == true)
      this.trackRecordFromParent.well.environment = environment;
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
