import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Observable, map, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatOptionSelectionChange } from '@angular/material/core';

import { Well } from '../models/well';
import { Customer } from '../models/customer';
import { WellType } from '../models/well-type';
import { Basin } from '../models/basin';
import { GeoUnit } from '../models/geo-unit';
import { Country } from '../models/country';
import { Field } from '../models/field';
import { Environment } from '../models/environment';
import { TrackRecord } from '../models/track-record';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { MaxDeviation } from '../models/max-deviation';
import { MdUnit } from '../models/md-unit';
import { TvdUnit } from '../models/tvd-unit';
import { UppercompletionType } from '../models/uppercompletion-type';
import { ArtificialliftType } from '../models/artificiallift-type';
import { Multilateral } from '../models/multilateral';
import { LinerhangerSystem } from '../models/linerhanger-system';
import { MultistageSimulation } from '../models/multistage-simulation';
import { StringType } from '../models/string-type';
import { Thread } from '../models/thread';
import { Material } from '../models/material';
import { CompletionType } from '../models/completion-type';
import { ProducedfluidType } from '../models/producedfluid-type';
import { InjectedfluidType } from '../models/injectedfluid-type';
import { CompletionClass } from '../models/completion-class';
import { SandControl } from '../models/sand-control';
import { RockType } from '../models/rock-type';
import { ToolType } from '../models/tool-type';
import { ToolsCompany } from '../models/tools-company';
import { PumpingCompany } from '../models/pumping-company';
import { ScreenProvider } from '../models/screen-provider';
import { FluidType } from '../models/fluid-type';
import { FilterType } from '../models/filter-type';
import { TubeType } from '../models/tube-type';
import { ScreenType } from '../models/screen-type';
import { CompletionpulledReason } from '../models/completionpulled-reason';
import { CdkStepper } from '@angular/cdk/stepper';
import { MeassuredFrom } from '../models/meassured-from';
import { Size } from '../models/size';
import { Weight } from '../models/weight';
import { Stem } from '../models/stem';
import { MatTable } from '@angular/material/table';
import { TypesService } from '../services/types.service';
import { TrackrecordService } from '../services/trackrecord.service';

@Component({
  selector: 'app-well-view',
  templateUrl: './well-view.component.html',
  styleUrl: './well-view.component.css'
})
export class WellViewComponent {
  /*
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  @ViewChild(MatTable)
  table!: MatTable<Stem>; 

  @Output() projectEvent=new EventEmitter<string>();
  @Output() operationtEvent=new EventEmitter<string>();
  @Output() operationActivityEvent=new EventEmitter<string>();
  @Output() trackRecordEvent=new EventEmitter<number>();

  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  isSearchFinisehd:boolean=false;
  isCustomerFinished: boolean = false;
  isWellFinished: boolean = false;
  isManagementInfoFinished: boolean = false;
  isWellStemFinished: boolean = false;
  isCompletionFinished: boolean = false;
  isSandFinished: boolean = false;
  isToolsFinished: boolean = false;
  isICDFinished: boolean = false;

  trackRecord: TrackRecord;
  well: Well;
  stem:Stem;

  stemList:Stem[]=[];
  customerList: Customer[] = [];
  wellList: Well[] = [];

  wellTypeList: WellType[] = [];
  basinList: Basin[] = [];
  geoUnitList: GeoUnit[] = [];
  countryList: Country[] = [];
  fieldList: Field[] = [];
  environmentList: Environment[] = [];

  public constructor(private router: Router
                   , private dialogRef: MatDialog
                   ,private typesService:TypesService
                   ,private trackRecordService:TrackrecordService) {
    this.well = new Well();
    this.trackRecord = new TrackRecord();
    this.stem=new Stem();

    this.customerList = [
      { id: 1, name: "ALLEDER, INC.",accountName:'salesAccount' },
     
    ];

    this.wellList = [
      new Well()    

    ];  

    this.wellTypeList = [];

    this.basinList = [];

    this.geoUnitList = [];

    this.countryList = [];

    this.fieldList = [];

    this.environmentList = [];

    //this.PopulateWellData();
  }
  //Customer data lists

  maxDeviationList: MaxDeviation[] = [];

  meassuredFromList: MeassuredFrom[] = [];

  completionPulledReasonList: CompletionpulledReason[] = [];

  mdUnitList: MdUnit[] = [];

  tvdUnitList: TvdUnit[] = [];

  upperCompletionList: UppercompletionType[] = [];

  artificialLiftList: ArtificialliftType[] = [];

  multiLateralList: Multilateral[] = [];

  linerHangerSystemList: LinerhangerSystem[] = [];

  multiStageSimulationList: MultistageSimulation[] = [];

  stringTypeList: StringType[] = [];

  sizeList: Size[] = [];

  weightList: Weight[] = [];

  threadList: Thread[] = [];

  materialList: Material[] = [];

  // Completion lists
  completionTypeList: CompletionType[] = [];

  producedFluidList: ProducedfluidType[] = [];

  injectedFluidList: InjectedfluidType[] = [];

  completionClassList: CompletionClass[] = [];

  sandControlTypeList: SandControl[] = [];

  rockTypeList: RockType[] = [];


  toolsCompanyList: ToolsCompany[] = [];

  pumpingCompanyList: PumpingCompany[] = [];

  screenProviderList: ScreenProvider[] = [];

  fluidTypeList: FluidType[] = [];

  screenToolsTypeList: ScreenType[] = [];

  toolsTypeList: ToolType[] = [];

  filterTypeList: FilterType[] = [];

  tubeTypeList: TubeType[] = [];

  sandControlFlag = false;
  step = 0;

  filteredCustomers!: Observable<Customer[]>;
  filteredWells!: Observable<Well[]>;

  filteredFields!: Observable<Field[]>;
  filteredWeights!:Observable<Weight[]>;

  // Searching Data Form Controls
  projectFormControl=new FormControl('');
  operationFormControl=new FormControl('');
  operationActivityFormControl=new FormControl('');
  // Customer Data Form Controls
  wellFormControl = new FormControl('');
  wellTypeFormControl = new FormControl('');
  customerFormControl = new FormControl('');
  accountFormControl = new FormControl('');
  countryFormControl = new FormControl('');
  basinFormControl = new FormControl('');
  fieldFormControl = new FormControl('');
  geoUnitFormControl = new FormControl('');
  environmentFormControl = new FormControl('');
  //Well Data Form Controls
  waterDepthFormControl = new FormControl('');
  maxDeviationFormControl = new FormControl('');
  mdMeasuredFormControl = new FormControl('');
  tvdMeasuredFormControl = new FormControl('');
  mdDistanceFormControl = new FormControl('');
  tvdDistanceFormControl = new FormControl('');
  mdUnitsFormControl = new FormControl('');
  tvdUnitsFormControl = new FormControl('');
  upperCompletionFormControl = new FormControl('');
  artificalLiftFormControl = new FormControl('');
  multiLateralFormControl = new FormControl('');
  linerHangerFormControl = new FormControl('');
  multiStageFormControl = new FormControl('');
  //Management Form Controls
  supervisorFormControl = new FormControl('');
  validatorUserFormControl = new FormControl('');
  dataEntryUserFormControl = new FormControl('');
  assignedUserFormControl = new FormControl('');
  //Well Stem Form Controls
  stringNumberFormControl = new FormControl('');
  stringTypeFormControl = new FormControl('');
  stemSizeFormControl = new FormControl('');
  stemWeightFormControl = new FormControl('');
  stemThreadFormControl = new FormControl('');
  stemMaterialFormControl = new FormControl('');
  stemMDTopFormControl = new FormControl('');
  stemMDBottomFormControl = new FormControl('');
  //Completion History Form Controls
  initialCompletionFormControl = new FormControl('');
  completionPulledFormControl = new FormControl('');
  ipmWellFormControl = new FormControl('');
  linerHangerInstallFormControl = new FormControl('');
  completionPulledDate = new FormControl('');
  pulledReasonFormControl = new FormControl('');
  equipmentValidatedFormControl = new FormControl('');
  //Completion Data Form Control
  completionNumberFormControl = new FormControl('');
  completionTypeFormControl = new FormControl('');
  producedFluidTypeFormControl = new FormControl('');
  injectedfluidTypeFormControl = new FormControl('');
  completionClassFormControl = new FormControl('');
  sandControlFormControl = new FormControl('');
  rockTypeFormControl = new FormControl('');
  reservoirTempFormControl = new FormControl('');
  corrosiveCCO2FormControl = new FormControl('');
  corrosiveH25FormControl = new FormControl('');

  columns:string[]=["String-Number","String-Type","Size",
        "Weight","Thread","Material","MD-Top","MD-Bottom",
        "Action"];


  ngOnInit(): void {
    this.typesService.GetArtificialLiftTypes().subscribe(response =>{this.artificialLiftList=response});    
    this.typesService.GetBasins().subscribe(response =>{this.basinList=response});
    this.typesService.GetCompletionClasses().subscribe(response =>{this.completionClassList=response});
    this.typesService.GetCompletionPulledReasons().subscribe(response =>{this.completionPulledReasonList=response});
    this.typesService.GetCompletionTypes().subscribe(response =>{this.completionTypeList=response});
    this.typesService.GetCountries().subscribe(response =>{this.countryList=response});
    this.typesService.GetEnvironments().subscribe(response =>{this.environmentList=response});
    this.typesService.GetFields().subscribe(response =>{this.fieldList=response});
    this.typesService.GetFilterTypes().subscribe(response =>{this.filterTypeList=response});
    this.typesService.GetFluidTypes().subscribe(response =>{this.fluidTypeList=response});
    this.typesService.GetGeoUnits().subscribe(response =>{this.geoUnitList=response});
    this.typesService.GetInjectedFluidTypes().subscribe(response =>{this.injectedFluidList=response});
    this.typesService.GetLinerHangerSystems().subscribe(response =>{this.linerHangerSystemList=response});
    this.typesService.GetMaterials().subscribe(response =>{this.materialList=response});
    this.typesService.GetMaxDeviations().subscribe(response =>{this.maxDeviationList=response});
    this.typesService.GetMdUnits().subscribe(response =>{this.mdUnitList=response});
    this.typesService.GetMeassuredFroms().subscribe(response =>{this.meassuredFromList=response});
    this.typesService.GetMultiLateralTypes().subscribe(response =>{this.multiLateralList=response});
    this.typesService.GetMultiStageTypes().subscribe(response =>{this.multiStageSimulationList=response});
    this.typesService.GetProducedFluidTypes().subscribe(response =>{this.producedFluidList=response});
    this.typesService.GetPumpingCompanies().subscribe(response =>{this.pumpingCompanyList=response});
    this.typesService.GetSandControlTypes().subscribe(response =>{this.sandControlTypeList=response});
    this.typesService.GetScreenProviders().subscribe(response =>{this.screenProviderList=response});
    this.typesService.GetScreenTypes().subscribe(response =>{this.screenToolsTypeList=response});
    this.typesService.GetStemSizes().subscribe(response =>{this.sizeList=response});
    this.typesService.GetStemWeights().subscribe(response =>{this.weightList=response});
    this.typesService.GetStringTypes().subscribe(response =>{this.stringTypeList=response});
    this.typesService.GetThreadTypes().subscribe(response =>{this.threadList=response});
    this.typesService.GetToolTypes().subscribe(response =>{this.toolsTypeList=response});
    this.typesService.GetToolsCompanies().subscribe(response =>{this.toolsCompanyList=response});
    this.typesService.GetTubeTypes().subscribe(response =>{this.tubeTypeList=response});
    this.typesService.GetTvdUnits().subscribe(response =>{this.tvdUnitList=response});
    this.typesService.GetUpperCompletionTypes().subscribe(response =>{this.upperCompletionList=response});
    this.typesService.GetWellTypes().subscribe(response =>{this.wellTypeList=response});    

    // Form controls for autocomplete behaivour
    this.filteredCustomers = this.customerFormControl.valueChanges.pipe(
      startWith(''), map(value => this.FilterCustomers(value || ''))
    );
    this.filteredWells = this.wellFormControl.valueChanges.pipe(
      startWith(''), map(value => this.FilterWells(value || ''))
    );

    this.filteredFields = this.fieldFormControl.valueChanges.pipe(
      startWith(''), map(value => this.FilterFields(value || ''))
    );
    this.filteredWeights = this.stemWeightFormControl.valueChanges.pipe(
      startWith(''), map(value => this.FilterWeights(value || ''))
    );
  }

  //Filter functions for autocomplete behaviour
  private FilterCustomers(value: string): Customer[] {
    let searchValue = value.toLocaleLowerCase();
    return this.customerList.filter(option => option.name.toLocaleLowerCase().includes(searchValue));
  }
  private FilterWells(value: string): Well[] {
    let searchValue = value.toLocaleLowerCase();
    return this.wellList.filter(option => option.name.toLocaleLowerCase().includes(searchValue));
  }


  private FilterFields(value: string): Field[] {
    let searchValue = value.toLocaleLowerCase();
    return this.fieldList.filter(option => option.name.toLocaleLowerCase().includes(searchValue));
  }

  private FilterWeights(value: string): Weight[] {
    let searchValue = value.toLocaleLowerCase();
    return this.weightList.filter(option => option.weightInLb.toLocaleLowerCase().includes(searchValue));
  }
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }

  public ClearSearchingdata(){
    this.projectFormControl.setValue('');
    this.operationFormControl.setValue('');
    this.operationActivityFormControl.setValue('');

    this.PopulateFormControls(new Well());
    this.ClearManagementData();

    this.EmitProjectEvent('');
    this.EmitOperationtEvent('');
    this.EmitOperationtActivityEvent('');
  }

  public ClearCustomerData() {     
    this.PopulateCustomerFormControls(new Well());
  }
  ClearManagementData(){
    this.PopulateManagmentFormControls(new TrackRecord());
  }
  ClearWellDetailedData(){
    this.PopulateWellDetailedFormControls(new Well());
  }
  public ClearStemData(){    
    this.PopulateStemData(new Stem());
  }
  ClearCompletionData(){
    this.PopulateCompletionFormControls(new Well());
  }

  private PopulateWellData() {
    for (let i = 0; i < this.wellList.length; i++) {

      this.wellList[i].customer = this.customerList[i];
      this.wellList[i].account = this.salesAccountList[i];
      this.wellList[i].field = this.fieldList[i];
      this.wellList[i].geoUnit = this.geoUnitList[1];
      this.wellList[i].environment = this.environmentList[1];
      this.wellList[i].type = this.wellTypeList[1];
      this.wellList[i].country = this.countryList[1];
      this.wellList[i].basin = this.basinList[1];
    }
    this.wellList[71].customer = this.customerList[53];
    this.wellList[71].account = this.salesAccountList[53];
    this.wellList[71].field = this.fieldList[71];
    this.wellList[71].geoUnit = this.geoUnitList[1];
    this.wellList[71].environment = this.environmentList[1];
    this.wellList[71].type = this.wellTypeList[1];
    this.wellList[71].country = this.countryList[9];
    this.wellList[71].basin = this.basinList[1];
    
    this.PopulateTestScenario();
  }
  
  private PopulateTestScenario(){
    let wellIndex = this.wellList.findIndex(b => b.name === 'TPTA-031');

    this.well=this.wellList[wellIndex];

    this.well.projectId ='P.NWY.000030';
    this.well.operationId ='O.NWY.000030.01';
    this.well.operationActivityId ='O.NWY.000001.01.01';
 
    //CUSTOMER DATA
    this.well.customer = this.customerList.find(
      p => p.name === 'PAM') ?? new Customer();
  
    this.well.type = this.wellTypeList.find(
      p => p.name === 'Oil Production') ?? new WellType();
    this.well.basin = this.basinList.find(
      p => p.name === 'AML') ?? new Basin();
    this.well.geoUnit = this.geoUnitList.find(
      p => p.name === 'ECP') ?? new GeoUnit();
    this.well.country = this.countryList.find(
      p => p.name === 'Ecuador') ?? new Country();
    this.well.field = this.fieldList.find(
      p => p.name === 'TIPUTINI') ?? new Field();
    this.well.environment = this.environmentList.find(
      p => p.name === 'Land') ?? new Environment();

    //MANAGAMENET DATA
    this.trackRecord.supervisorUser='XMENDOZA';
    this.trackRecord.validatorUser='XMENDOZA';
    this.trackRecord.dataEntryUser='XMENDOZA';
    this.trackRecord.assignedUser='XMENDOZA';

    //WELL DETAILED DATA
    this.well.maxDeviation=this.maxDeviationList[2];
    this.well.mdMeasuredFrom=this.meassuredFromList[2];
    this.well.mdDistance=5416.00;
    this.well.mdUnits=this.mdUnitList[1];
    this.well.tvdMeasuredFrom=this.meassuredFromList[2];
    this.well.tvdDistance=4819.00;
    this.well.tvdUnits=this.tvdUnitList[1];
    this.well.upperCompletion=this.upperCompletionList[0];
    this.well.artificialLift=this.artificialLiftList[1];
    this.well.multiLateral=this.multiLateralList[0];
    this.well.linerHanger=this.linerHangerSystemList[0];
    this.well.multiStage=this.multiLateralList[0];

    //WELL STEM DATA
    this.stemList=[
      {stringNumber:1,
        stringType:this.stringTypeList[1],
        size:this.sizeList[20],
        weight:this.weightList[20],
        thread:this.threadList[2],
        material:this.materialList[2],
        mdTop:0,
        mdBottom:3877
      },
      {stringNumber:2,
        stringType:this.stringTypeList[2],
        size:this.sizeList[25],
        weight:this.weightList[25],
        thread:this.threadList[2],
        material:this.materialList[2],
        mdTop:0,
        mdBottom:4830
      },
      {stringNumber:3,
        stringType:this.stringTypeList[3],
        size:this.sizeList[30],
        weight:this.weightList[30],
        thread:this.threadList[2],
        material:this.materialList[2],
        mdTop:4687,
        mdBottom:5414
      }
    ];
    this.well.stemList=this.stemList;

    //COMPLETION DATA
    this.well.completion.number=1
    this.well.completion.type=this.completionTypeList[0];
    this.well.completion.producedFluid=this.producedFluidList[0];
    //this.wellList[wellIndex].completion.injectedFluid=this.injectedFluidList[1];
    this.well.completion.completionClass=this.completionClassList[0];
    this.well.completion.sandControl=this.sandControlTypeList[0];
    this.well.completion.reservoirRockType=this.rockTypeList[0];
    this.well.completion.reservoirTemperature=950;
    this.well.completion.corrosiveCCO2=0;
    this.well.completion.corrosiveH25=0;

    this.PopulateFormControls(this.well);    
    this.PopulateManagmentFormControls(this.trackRecord);
  }

  private PopulateFormControls(well:Well){
    this.PopulateCustomerFormControls(well);
    this.PopulateWellDetailedFormControls(well);    
    this.PopulateCompletionFormControls(well);   

    let stem=new Stem();
    this.PopulateStemData(stem);
  }

  PopulateCustomerFormControls(well:Well){        
        this.wellFormControl.setValue(well.name);
        this.wellTypeFormControl.setValue(well.type.name);
        this.customerFormControl.setValue(well.customer.name);
   
        this.countryFormControl.setValue(well.country.name);
        this.basinFormControl.setValue(well.basin.name);
        this.fieldFormControl.setValue(well.field);
        this.geoUnitFormControl.setValue(well.geoUnit.name);
        this.environmentFormControl.setValue(well.environment.name);
  }

  PopulateManagmentFormControls(trackRecord:TrackRecord){
    this.supervisorFormControl.setValue(trackRecord.supervisorUser);
    this.validatorUserFormControl.setValue(trackRecord.validatorUser);
    this.dataEntryUserFormControl.setValue(trackRecord.dataEntryUser);
    this.assignedUserFormControl.setValue(trackRecord.assignedUser);
  }

  PopulateWellDetailedFormControls(well:Well){   
    this.maxDeviationFormControl.setValue(well.maxDeviation.name);
    this.mdMeasuredFormControl.setValue(well.mdMeasuredFrom.name);
    this.mdDistanceFormControl.setValue(well.mdDistance.toString());
    this.mdUnitsFormControl.setValue(well.mdUnits.name);
    this.tvdMeasuredFormControl.setValue(well.tvdMeasuredFrom.name);
    this.tvdDistanceFormControl.setValue(well.tvdDistance.toString());
    this.tvdUnitsFormControl.setValue(well.tvdUnits.name);
    this.upperCompletionFormControl.setValue(well.upperCompletion.name);
    this.artificalLiftFormControl.setValue(well.artificialLift.name);
    this.multiLateralFormControl.setValue(well.multiLateral.name);
    this.linerHangerFormControl.setValue(well.linerHanger.name);
    this.multiStageFormControl.setValue(well.multiStage.name);
  }
  PopulateStemData(stem:Stem){
    this.stringNumberFormControl.setValue(stem.stringNumber.toString());
    this.stringTypeFormControl.setValue(stem.stringType.name);
    this.stemSizeFormControl.setValue(stem.size.sizeInMm.toString());
    this.stemWeightFormControl.setValue(stem.weight.weightInLb);
    this.stemThreadFormControl.setValue(stem.thread.name);
    this.stemMaterialFormControl.setValue(stem.material.name);
    this.stemMDTopFormControl.setValue(stem.mdTop.toString());
    this.stemMDBottomFormControl.setValue(stem.mdBottom.toString());
   }
  PopulateCompletionFormControls(well:Well){     
     this.completionNumberFormControl.setValue(well.completion.number.toString());
     this.completionTypeFormControl.setValue(well.completion.type.name);
     this.producedFluidTypeFormControl.setValue(well.completion.producedFluid.name);
     this.injectedfluidTypeFormControl.setValue(well.completion.injectedFluid.name);
     this.completionClassFormControl.setValue(well.completion.completionClass.name);
     this.sandControlFormControl.setValue(well.completion.sandControl.name);
     this.rockTypeFormControl.setValue(well.completion.reservoirRockType.name);   
     this.reservoirTempFormControl.setValue(well.completion.reservoirTemperature.toString());
     this.corrosiveCCO2FormControl.setValue(well.completion.corrosiveCCO2.toString());
     this.corrosiveH25FormControl.setValue(well.completion.corrosiveH25.toString());
  }

  public SaveCustomerData() {

    this.well.name = this.wellFormControl.value ?? '' 
   
    this.SendPopupNotification('The Trackrecord ' + this.trackRecord.id + ' has been created');
    //this.router.navigate(['/track-record',this.trackRecord.id])     
    //this.router.navigate(['/record-list']);    
    this.isCustomerFinished = true;
    this.nextStep();
  }

  public SaveManagementData() {
    this.trackRecord.supervisorUser = this.supervisorFormControl.value ?? '';
    this.trackRecord.validatorUser = this.validatorUserFormControl.value ?? '';
    this.trackRecord.dataEntryUser = this.dataEntryUserFormControl.value ?? '';
    this.trackRecord.assignedUser = this.assignedUserFormControl.value ?? '';
    
    this.trackRecordService.CreateTrackRecord(this.trackRecord)
        .subscribe(response => {
          this.trackRecord=response,
          this.EmitTrackRecordEvent(this.trackRecord.id), 
          this.SendPopupNotification('The TrackRecord has been created with the Id: '
                                      + this.trackRecord.id),
            this.isManagementInfoFinished = true,
            this.nextStep();
        });
    
    this.EmitTrackRecordEvent(this.trackRecord.id);                       

    this.SendPopupNotification('The TrackRecord has been created with the Id: '
      + this.trackRecord.id);

    this.isManagementInfoFinished = true;
    this.nextStep();
    
  }

  public SaveWellDetailedData() {
    this.well.waterDepth = parseFloat(this.waterDepthFormControl.value ?? '');
    this.well.mdDistance = parseFloat(this.mdDistanceFormControl.value ?? '');
    this.well.tvdDistance = parseFloat(this.tvdDistanceFormControl.value ?? '');  

    this.SendPopupNotification('The Well detailed data has been added to the record: '
      + this.trackRecord.id);

    this.isWellFinished = true;
    this.nextStep();
  }

  public SaveWellStemData() {
    let stemIndex:number=this.stemList.findIndex(
        p=>p.stringNumber===parseInt(this.stringNumberFormControl.value?? ''));

    if(stemIndex==-1){
      this.stem.stringNumber = parseInt(this.stringNumberFormControl.value ?? '', 0); 
      this.stem.mdTop = parseFloat(this.stemMDTopFormControl.value ?? '');
      this.stem.mdBottom = parseFloat(this.stemMDBottomFormControl.value ?? '');
  
      this.stemList.push(this.stem);   
      this.well.stemList=this.stemList;
      this.stem=new Stem();
  
      this.SendPopupNotification('The Well stem data has been added to the record: '
        + this.trackRecord.id);
    }
    else{
      this.stemList[stemIndex].stringNumber=parseInt(this.stringNumberFormControl.value?? '');
      this.stemList[stemIndex].stringType.name=this.stringTypeFormControl.value?? '';
      this.stemList[stemIndex].size.sizeInMm=parseFloat(this.stemSizeFormControl.value?? '');
      this.stemList[stemIndex].weight.weightInLb=this.stemWeightFormControl.value?? '';
      this.stemList[stemIndex].thread.name=this.stemThreadFormControl.value?? '';
      this.stemList[stemIndex].material.name=this.stemMaterialFormControl.value?? '';
      this.stemList[stemIndex].mdTop=parseFloat(this.stemMDTopFormControl.value?? '');
      this.stemList[stemIndex].mdBottom=parseFloat(this.stemMDBottomFormControl.value?? '');

      this.well.stemList=this.stemList;
      this.stem=new Stem();
      this.SendPopupNotification('The  stem data has been updated');

    }
    this.ClearStemData();  
    this.isWellStemFinished = true;
    this.table.renderRows();
    //this.nextStep();
  }

  public SaveCompletionData() {
    this.well.completion.number = parseFloat(this.completionNumberFormControl.value ?? '');
    this.well.completion.reservoirTemperature = parseFloat(this.reservoirTempFormControl.value ?? '');
    this.well.completion.corrosiveCCO2 = parseFloat(this.corrosiveCCO2FormControl.value ?? '');
    this.well.completion.corrosiveH25 = parseFloat(this.corrosiveH25FormControl.value ?? '');

    this.SendPopupNotification('The Completion data has been added to the record: '
      + this.trackRecord.id);
    this.isCompletionFinished = true;
    this.nextStep();
  }

  public SaveSandControlData() {
    this.SendPopupNotification('The Sand control and pumping data have been added to the record: '
      + this.trackRecord.id);
    this.isSandFinished = true;
    this.nextStep();
  }

  public SaveToolsData() {
    this.SendPopupNotification('The tools and screen data have been added to the record: '
      + this.trackRecord.id);
    this.isToolsFinished = true;
    this.nextStep();
  }

  public SaveICDData() {
    this.SendPopupNotification('The ICD, APS and fluid data have been added to the record: '
      + this.trackRecord.id);
    this.isICDFinished = true;
    this.nextStep();
  }

  private SendPopupNotification(message: string) {
    this.dialogRef.open(PopupViewComponent, {
      data: {
        message: message
      }
    }
    );
  }

  private GetWell(name: string): Well {
    const objWell = this.wellList.find(option => option.name === name);
    return objWell ? objWell : new Well();
  }

  //EVENTS

  public OnChangeWellEvent(event: MatOptionSelectionChange, well: Well) {
    if (event.source.selected == true) {
      this.well = well;   
    }
  }
  public OnChangeWellTypeEvent(event: MatOptionSelectionChange, wellType: WellType) {
    if (event.source.selected == true)
      this.well.type = wellType;
  }
  public OnChangeCustomerEvent(event: MatOptionSelectionChange, customer: Customer) {
    if (event.source.selected == true)
      this.well.customer = customer;
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
  public OnChangeMaxDeviationEvent(event: MatOptionSelectionChange, maxDeviation: MaxDeviation) {
    if (event.source.selected == true)
      this.well.maxDeviation = maxDeviation;
  }
  public OnChangeMDMeassuredFrom(event: MatOptionSelectionChange, meassured: MeassuredFrom) {
    if (event.source.selected == true)
      this.well.mdMeasuredFrom = meassured;
  }
  public OnChangeTVDMeassuredFrom(event: MatOptionSelectionChange, meassured: MeassuredFrom) {
    if (event.source.selected == true)
      this.well.tvdMeasuredFrom = meassured;
  }
  public OnChangeMDUnitEvent(event: MatOptionSelectionChange, mdUnit: MdUnit) {
    if (event.source.selected == true)
      this.well.mdUnits = mdUnit;
  }
  public OnChangeTVDUnitEvent(event: MatOptionSelectionChange, tvdUnit: TvdUnit) {
    if (event.source.selected == true)
      this.well.tvdUnits = tvdUnit;
  }
  public OnChangeUpperCompletionEvent(event: MatOptionSelectionChange, upperCompletion: UppercompletionType) {
    if (event.source.selected == true)
      this.well.upperCompletion = upperCompletion;
  }
  public OnChangeArtificialLiftEvent(event: MatOptionSelectionChange, artificialLift: ArtificialliftType) {
    if (event.source.selected == true)
      this.well.artificialLift = artificialLift;
  }
  public OnChangeMultiLateralEvent(event: MatOptionSelectionChange, multiLateral: Multilateral) {
    if (event.source.selected == true)
      this.well.multiLateral = multiLateral;
  }
  public OnChangeLinerHangerEvent(event: MatOptionSelectionChange, linerHanger: LinerhangerSystem) {
    if (event.source.selected == true)
      this.well.linerHanger = linerHanger;
  }
  public OnChangeMultiStageEvent(event: MatOptionSelectionChange, multiStage: MultistageSimulation) {
    if (event.source.selected == true)
      this.well.multiStage = multiStage;
  }
  public OnChangeStringTypetEvent(event: MatOptionSelectionChange, stringType: StringType) {
    if (event.source.selected == true)
      this.stem.stringType = stringType;
  }
  public OnChangeSizeEvent(event: MatOptionSelectionChange, size: Size) {
    if (event.source.selected == true)
      this.stem.size = size;
  }
  public OnChangeWeightEvent(event: MatOptionSelectionChange, weight: Weight) {
    if (event.source.selected == true)
      this.stem.weight = weight;
  }
  public OnChangeThreadEvent(event: MatOptionSelectionChange, thread: Thread) {
    if (event.source.selected == true)
      this.stem.thread = thread;
  }
  public OnChangeStemMaterialEvent(event: MatOptionSelectionChange, material: Material) {
    if (event.source.selected == true)
      this.stem.material = material;
  }
  public OnChangeCompletionTypeEvent(event: MatOptionSelectionChange, type: CompletionType) {
    if (event.source.selected == true)
      this.well.completion.type = type;
  }
  public OnChangeProducedFluidEvent(event: MatOptionSelectionChange, producedFluid: ProducedfluidType) {
    if (event.source.selected == true)
      this.well.completion.producedFluid = producedFluid;
  }
  public OnChangeInjectedFluidEvent(event: MatOptionSelectionChange, injectedFluid: InjectedfluidType) {
    if (event.source.selected == true)
      this.well.completion.injectedFluid = injectedFluid;
  }
  public OnChangeCompletionClassEvent(event: MatOptionSelectionChange, completionClass: CompletionClass) {
    if (event.source.selected == true)
      this.well.completion.completionClass = completionClass;
  }
  public OnChangeSandControl(event: MatOptionSelectionChange, sandControl: SandControl) {
    if (event.source.selected == true)
      this.well.completion.sandControl = sandControl;
  }
  public OnChangeRockTypeEvent(event: MatOptionSelectionChange, rockType: InjectedfluidType) {
    if (event.source.selected == true)
      this.well.completion.reservoirRockType = rockType;
  }
  public OnClickStemItem(stringNumber:number){
    let stem:Stem;

    stem=this.stemList.find(p=>p.stringNumber===stringNumber)?? new Stem();
    this.PopulateStemData(stem);
 
  }

  SearchData(){   
    if(this.projectFormControl.value!='' ){
      if (this.projectFormControl.value=='P.NWY.000030'){
        this.PopulateTestScenario();
        this.SendPopupNotification('The data have been pre-loaded');
        this.isSearchFinisehd = true;
        this.nextStep();
        this.EmitProjectEvent(this.projectFormControl.value);
      }
      else{
        this.SendPopupNotification('The Project Id indicated does not exist');
      }  
    }
    else if(this.operationFormControl.value!='' ){
      if (this.operationFormControl.value=='O.NWY.000030.01'){
        this.PopulateTestScenario();
        this.SendPopupNotification('The data have been pre-loaded');
        this.isSearchFinisehd = true;
        this.nextStep();
        this.EmitOperationtEvent(this.operationFormControl.value);
      }
      else{
        this.SendPopupNotification('The Operation Id indicated does not exist');
      }  
    }
    else if(this.operationActivityFormControl.value!='' ){
      if (this.operationActivityFormControl.value=='O.NWY.000001.01.01'){
        this.PopulateTestScenario();
        this.SendPopupNotification('The data have been pre-loaded');
        this.isSearchFinisehd = true;
        this.nextStep();
        this.EmitOperationtActivityEvent(this.operationActivityFormControl.value);
      }
      else{
        this.SendPopupNotification('The Operation Activity Id indicated does not exist');
      }  
    }   
    else{
      this.SendPopupNotification('No searching criteria ');
    }      
  }

  EmitProjectEvent(data:string){
    this.projectEvent.emit(data);
  }
  EmitOperationtEvent(data:string){
    this.operationtEvent.emit(data);
  }
  EmitOperationtActivityEvent(data:string){
    this.operationActivityEvent.emit(data);
  }
  EmitTrackRecordEvent(data:number){
    this.trackRecordEvent.emit(data);
  }
  */

}
