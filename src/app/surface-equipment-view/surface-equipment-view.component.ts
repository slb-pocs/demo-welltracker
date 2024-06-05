import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { CatalogNode } from '../models/catalog-node';
import { Well } from '../models/well';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { MatDialog } from '@angular/material/dialog';
import { SurfaceRunningEquipment, } from '../models/surface-running-equipment';
import { Observable, map, startWith} from 'rxjs';
import { MatTable } from '@angular/material/table';
@Component({
  selector: 'app-surface-equipment-view',
  templateUrl: './surface-equipment-view.component.html',
  styleUrl: './surface-equipment-view.component.css'
})
export class SurfaceEquipmentViewComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<SurfaceRunningEquipment>; 

  well:Well=new Well(0,'');
    
  surfaceCatalogNodeList:CatalogNode[]=[
    {id:103354908,name:"CLAMP"},
    {id:103391817,name:"CLAMP 7E-8516"},
    {id:103374844,name:"CLAMP, STRIP-DOWN MANARA, CA6NM"},
    {id:103264045,name:"CLAMP, V-BAND, EXHAUST 4966454"},
    {id:103374162,name:"CLAMP, WELD MOUNT, 2 1/2 IN PIPE, DAMPING"},
    {id:103374170,name:"CLAMP, WELD MOUNT, 4 IN PIPE, DAMPING"},
    {id:100831263,name:"CLAMP: ASSY, 9-5/8 X 2-7/8 BYPASS UNIVERSAL, CA6NM, 2.632 X 0.672 MLE, LOOSE DESIGN CONTROL LINE."},
    {id:102848575,name:"KIT FOR MOUNTED LADDER DRIVER BOARD, SPNG"},
    {id:102848576,name:"KIT FOR SPNG-E HARNESS"},
    {id:103338998,name:"KIT OF 2 ROLLER CASES FOR CLAMP KIT"},
    {id:103346605,name:"KIT, CABLE, COMPUTER, IB905 FOR IB905F,906F, ROHS COMPLIANT IB63"},
    {id:103281132,name:"KIT, CMP-756 LOCAL MODE TOGGLE SWITCH"},
    {id:103346560,name:"KIT, CPL, ASSY, ELECTRONICS, DENSITY"},
    {id:103388880,name:"KIT, CPL, TBIT COIL PACKAGING"},
    {id:103339031,name:"KIT, ENGINE GASKET WATER PUMP 468-7363"},
    {id:103281518,name:"KIT, FILTER ASSEMBLY, UPM"},
    {id:103389049,name:"KIT, INTEGRATION, FCACS, 35K"},
    {id:103389057,name:"KIT, INTEGRATION, PROBE, 20K"},
    {id:102865412,name:"KIT, LOWER END CAP, PSP 150C BATTERY (H350965)"},
    {id:102865488,name:"KIT, LOWER END CAP, UNIGAGE BATTERY (H524791)"},
    {id:103245474,name:"KIT, M20 NUT, BOLT AND WASHER"},
    {id:103281141,name:"KIT, MECHANICAL SCS ZONE II FLAME PROTECTION, CAT C9 ENGINE, CBS-955"},
    {id:103346746,name:"KIT, MRHY, XP3 BIC REPLACEMENTS, QTY. ROUNDED"},
    {id:103346747,name:"KIT, MRPA, XP3 BIC REPLACEMENTS, QTY. ROUNDED"},
    {id:103346739,name:"KIT, MRPO, XP3 BIC REPLACEMENTS, QTY. ROUNDED"},
    {id:103346736,name:"KIT, MRPQ, XP3 BIC REPLACEMENTS, QTY. ROUNDED"},
    {id:103281347,name:"KIT, PYROBAN SCS PROTECTION SYSTEM FOR C9 ENGINE CBS958/GBS858"},
    {id:103346781,name:"KIT, REDRESS 9-5/8 X 6.00 QUANTUM MAX  MULTIPORT-BALL SEAT MODULE HNBR (W/BACKUPS)"},
    {id:103346758,name:"KIT, REDRESS 9-5/8 X 6.00 QUANTUM MAX SERVICE TOOL FLOATER MODULE, HNBR (WITH BACKUP RINGS)"},
    {id:103346793,name:"KIT, REDRESS 9-5/8 X 6.000  QUANTUM MAX FBSD MODULE, HNBR (WITHOUT BACKUP RINGS)"},
    {id:103346759,name:"KIT, REDRESS 9-5/8 X 6.000 QUANTUM MAX FBSD MODULE, HNBR (WITH BACKUP RINGS)"},
    {id:103346794,name:"KIT, REDRESS 9-5/8 X 6.000 QUANTUM MAX FLOATER SERVICE TOOL, HNBR(WITHOUT BACKUP RINGS)"},
    {id:103374305,name:"KIT, REDRESS, 7 MFIV-II-3X, 5.500 X 2.940 (VITON)(COMPLETE)"},
    {id:103374335,name:"KIT, REDRESS, 7 MFIV-II-3X, 5.500 X 2.940 (VITON)(CONSUMABLES)"},
    {id:103263791,name:"KIT, REDRESS, 7 RFIV, 5.515 X 2.940 (CONSUMABLES)"},
    {id:103245981,name:"KIT, REDRESS, 9-5/8 IN HD PKR 32.3-43.5, 615596050"},
    {id:103374264,name:"KIT, REDRESS, 9-5/8 X 6.000 MODIFIED QUANTUM MAX TYPE III SERVICE TOOL, VITON, BACKUP RINGS ONLY"},
    {id:103346755,name:"KIT, REDRESS, 9-5/8 X 6.000 QUANTUM MAX ANTI-SWAB MUDSOLV FULL BORE SETDOWN SERVICE TOOL, HNBR"},
    {id:103346754,name:"KIT, REDRESS, 9-5/8 X 6.000 QUANTUM MAX ANTI-SWAB MUDSOLV FULL BORE SETDOWN SERVICE TOOL, HNBR (WITH BACKUPS)"},
    {id:103346752,name:"KIT, REDRESS, 9-5/8 X 6.000 QUANTUM MAX FULL BORE SETDOWN SERVICE TOOL, MULTIPORT, HNBR (WITH BACKUP RINGS)"},
    {id:103346753,name:"KIT, REDRESS, 9-5/8 X 6.000 QUANTUM MAX FULL BORE SETDOWN SERVICE TOOL, MULTIPORT, HNBR (WITHOUT BACKUP RINGS)"},
    {id:103346791,name:"KIT, REDRESS, 9-5/8 X 6.000 QUANTUM MAX SERVICE TOOL TOP SECTION, MULTIPORT, HNBR (WITHOUT BACK UP RINGS)"},
    {id:103263548,name:"KIT, REDRESS, 9-5/8 X 7 XHP-BB (47-53.5) FOR PN 103263513"},
    {id:103346478,name:"KIT, REDRESS,1.25 CT PIPE CLEANER"},
    {id:103346475,name:"KIT, REDRESS,1.50 CT PIPE CLEANER"},
    {id:103346472,name:"KIT, REDRESS,1.75 CT PIPE CLEANER"},
    {id:103346469,name:"KIT, REDRESS,2.00 CT PIPE CLEANER"},
    {id:103346465,name:"KIT, REDRESS,2.375 CT PIPE CLEANER"},
    {id:103346460,name:"KIT, REDRESS,2.625 CT PIPE CLEANER"},
    {id:103373898,name:"KIT, REPAIR QUICK C FF082?16"},
    {id:103339271,name:"KIT, REPAIR, LEVEL GAUGE, KRUEGER H-KIT"},
    {id:102865641,name:"KIT, REPAIR, SWIVEL JOINT, 3 IN 1502"},
    {id:103389246,name:"KIT, RETROFIT UPPER TENSIONER 3RD GEN CATENARY 200023177"},
    {id:102849210,name:"KIT, ROPE SOCKET, 2-37KA-2E-SSC CABLE"},
    {id:103389240,name:"KIT, RUPTURE DISC, PAD-I"},
    {id:103263686,name:"KIT, SAH-JB, SLS-1, HIGH TEMP"},
    {id:103381794,name:"KIT, SEAL, ASSEMBLY, PRESSURE TEST, FNRU, FTNG"},
    {id:103339318,name:"KIT, SEAL, MOTOR, VITON 60545-000"},
    {id:103373853,name:"KIT, SEAL, SLS-3, FNFM-BAA/CAA/PAA/RAA, HOSTILE ENVIRONMENT"},
    {id:103373854,name:"KIT, SEAL, SLS-3, FNFM-BAA/PAA, HOSTILE ENVIRONMENT"},
    {id:103373859,name:"KIT, SEAL, SLS-3, FPAS-BAA/PAA, HOSTILE ENVIRONMENT"},
    {id:103391821,name:"KIT, SERVICE, 2 7/8 IN CARSAC, C169-030-04/KS"},
    {id:103346453,name:"KIT, SPARE PARTS FOR CT PIPE CLEANER"},
    {id:103245428,name:"KIT, TRANSMITTER: TEMP, PT100, 0...+100C, 4-20MA OUTPUT, METRAN, 2700-(0...+100)C-0.25-(4-20)MA-PT100-A06-80-120-H10-1EXDIICT6X, W/INSTALLATION COMPONENTS"},
    {id:102865478,name:"KIT, UPPER END CAP, UNIGAGE BATTERY (H524791)"},
    {id:103382221,name:"KIT: REDRESS, SPECIAL, 1-1/2 IN, O2-30R, NITRILE, QCP GBHP-2"},
    {id:103382228,name:"KIT: REDRESS, SPECIAL, 1-1/2 IN, SO2-30R SHEAR, NITRILE, QCP GBHP-2"},
    {id:103382215,name:"KIT: REPAIR 1-1/2 IN, O2-30R, 16/64, NITRILE/VITON, TUNGSTEN CARBIDE"},
    {id:103382214,name:"KIT: REPAIR 1-1/2 IN, O2-30R, 24/64, NITRILE/VITON, TUNGSTEN CARBIDE"},
    {id:103382227,name:"KIT: REPAIR 1-1/2 IN, SO2-30R SHEAR, 16/64, NITRILE/VITON, MONEL, DAP (AMB) 2062 PSI"},
    {id:103382226,name:"KIT: REPAIR 1-1/2 IN, SO2-30R SHEAR, 32/64, NITRILE/VITON, MONEL, DAP (AMB) 2062 PSI"},
    {id:100571555,name:"KIT;REDRESS,2.312 IN PL BLANKING PLG"},
    {id:103281186,name:"PLUG ADAPTOR F250C"},
    {id:103339522,name:"PLUG ASSY, EXTERNAL PRESSURE, NPT ADAPT, CTD-MWD"},
    {id:103281332,name:"PLUG FOR UNUSED CABLE GLANDS"},
    {id:103389224,name:"PLUG MALE 2.00 PTP00019"},
    {id:102865695,name:"PLUG, 13-3/8 IN-14 IN, BOTTOM, DEEPSEA EXPRES"},
    {id:103263807,name:"PLUG, 19S, BASKETWEAVE, 3G, 16-312"},
    {id:103263770,name:"PLUG, 1P, CABLE GLAND, 10P5-22-BS-BK"},
    {id:103263773,name:"PLUG, 1P, CABLE GLAND, 10P5-22-BS-G"},
    {id:103263768,name:"PLUG, 1P, CABLE GLAND, 10P5-22-BS-R"},
    {id:103263789,name:"PLUG, 20S, BASKETWEAVE, 3G, 20-387"},
    {id:103339565,name:"PLUG, ANNULAR, 3/8 MP PORT, TEST 15K"},
    {id:103346531,name:"PLUG, BORE SEAL TEST, MDS-7, 5.500, 17.00, TENARIS HYDRIL BLUE"},
    {id:103346586,name:"PLUG, DRAIN (718)(NDE)(EQUINOR)"},
    {id:103339524,name:"PLUG, EXTERNAL PRESSURE, NPT ADAPTER, CTD-MWD"},
    {id:103339570,name:"PLUG, FEMALE, GO-PIN, 1-3/16-12 UN"},
    {id:103339151,name:"PLUG, HIGH PRESSURE TEST (3-1/2, 14.7 PPF, VAM TOP, PIN), WORKING PRESSURE 18860, SAFETY FACTOR 1.19"},
    {id:103373989,name:"PLUG, HP - DUAL PORT TEST (4130/4140/4145)(4.500, 12.6, VAM TOP, PIN)"},
    {id:103388959,name:"PLUG, HYDRAULIC TEST, 9-5/8 X 6.000 QUANTUM, F250-C AUTOCLAVE, 41XX (125)"},
    {id:103346583,name:"PLUG, ISOLATION, NITROGEN PORT (13CR)(NDE)(EQUINOR)"},
    {id:103246325,name:"PLUG, ISOLATION, NITROGEN PORT (718)(XOM-HPP)"},
    {id:103281728,name:"PLUG, STEEL, HP, 1/4-18 NTP"},
    {id:103245775,name:"PLUG, SUPPORTED, MAX015"},
    {id:103374904,name:"PLUG,VOID .280 DIA X .243 DIA X 1.00 LG (H2S)"},
    {id:102848596,name:"PLUG,WIRE WRAP LEAK-OFF,316L CAST"},
    {id:101654120,name:"PLUG: ASSY, BLANKING PL, 13CR, 2.312 SEAL, AFL"},
    {id:103374353,name:"TUBING HANGER INTERFACE"},
    {id:103246792,name:"TUBING PRESSURE TEST CONFIGURATION, SCAR-MTH"},
    {id:80055419,name:"TUBING SEAL ASSEMBLY, 04.750 OD, 5 SETS V-PKG, 2 DEBRIS BARRIER (V/T/R) SETS (1 ON TOP & 1 ON BOTTOM) & 3 CHEMRAZ SETS, 03.50/12.95 (12.70) STL BOX, 13CR 80KSI"},
    {id:80055420,name:"TUBING, 2-7/8 6.4# PTJ B X P, 15FT, L8"},
    {id:103374232,name:"TUBING, TAPERED, HEAT SHRINK, STRAIGHT, 1.22 IN ID"},
    {id:103300171,name:"WIRELINE ENTRY GUIDE (WEG) 2.875 IN (6.4) TSH BLUE BOX P110:SPN-10004138,SUPPLIER-COMPLETION PRODUCTS PTE LTD."},
    {id:103388862,name:"WIRELINE RE-ENTRY GUIDE W/ 2-3/8 EUE BOX X HALF MULE SHOE, 4130-4140 L80, MAX OD 3.063, MIN ID 1.995:SPN-238WEG5331,SUPPLIER-GIANT OIL TOOLS (PRODUCTS)."},
    {id:103388863,name:"WIRELINE RE-ENTRY GUIDE, 2 7/8IN 6.4PPF"}

    ];  

  isSurfaceEquipmentFinished:boolean=false;
  isEquipmentInstalledFinished:boolean=false;

  filteredCatalogNodes!:Observable<CatalogNode[]>;

  step:number=0;

  surfaceEquipmentList:SurfaceRunningEquipment[]=[    
  ];  

  columns:string[]=['Product-Number','Catalog-Node','Serial','Quantity', 'Is Key Component','Action'];

  //Form Controls
  surfaceProductNumberFormControl=new FormControl('');
  surfaceCatalogNodeFormControl=new FormControl('');
  surfaceDescriptionFormControl=new FormControl('');
  surfaceSerialFormControl=new FormControl('');
  surfaceQuantityFormControl=new FormControl('');
  surfaceKeyComponentFormControl=new FormControl(''); 

  public constructor(private dialogRef:MatDialog){}

  ngOnInit(): void {    
    this.filteredCatalogNodes=this.surfaceCatalogNodeFormControl.valueChanges.pipe(
      startWith(''), map(value => this.GetFilteredCatalogNodes(value||'')));
  } 

  setStep(index: number) {this.step = index;}
  nextStep() {this.step++;}
  prevStep() {this.step--;}  

  private GetFilteredCatalogNodes(filter:string):CatalogNode[]{
    let searchValue=filter.toLocaleLowerCase();    
    return this.surfaceCatalogNodeList.filter(option =>
       option.name.toLocaleLowerCase().includes(searchValue));
  }

  //Event methods
  OnCatalogChangeEvent(event:MatOptionSelectionChange, catalogNode:CatalogNode){
    if(event.source.selected==true)
      this.surfaceProductNumberFormControl.setValue(catalogNode.id.toString());
  }

  //Save Events

  SaveSurfaceEquipmentEvent(){
    let index=this.surfaceEquipmentList.findIndex(
      e => e.serial==parseInt(this.surfaceSerialFormControl.value??''));  

    if(index!==-1){
      this.surfaceEquipmentList[index].productNumber=
                parseInt(this.surfaceProductNumberFormControl.value??'',0);
      this.surfaceEquipmentList[index].catalogNode.name=
                this.surfaceCatalogNodeFormControl.value??'';
      this.surfaceEquipmentList[index].description=
                this.surfaceDescriptionFormControl.value??'';      
      this.surfaceEquipmentList[index].quantity=
                parseInt(this.surfaceQuantityFormControl.value??'',0);

      this.SendPopupNotification('The equipmnet has been updated'); 
    }   
    else{
      let surfaceEquipment:SurfaceRunningEquipment=new SurfaceRunningEquipment();
      surfaceEquipment.productNumber=parseInt(this.surfaceProductNumberFormControl.value??'',0);
      surfaceEquipment.catalogNode.name=this.surfaceCatalogNodeFormControl.value??'';
      surfaceEquipment.description=this.surfaceDescriptionFormControl.value??'';
      surfaceEquipment.serial=parseInt(this.surfaceSerialFormControl.value??'',0);
      surfaceEquipment.quantity=parseInt(this.surfaceQuantityFormControl.value??'',0);
  
      this.surfaceEquipmentList.push(surfaceEquipment);      
      this.SendPopupNotification('The Well stem data has been added to the record: '                             );        
      
    }
    this.isSurfaceEquipmentFinished=true;   
      this.ClearSurfaceEquipmentEvent(); 
      this.table.renderRows();
  }

  ClearSurfaceEquipmentEvent(){
    this.surfaceCatalogNodeFormControl.setValue('');
    this.surfaceProductNumberFormControl.setValue('');
    this.surfaceSerialFormControl.setValue('');
    this.surfaceQuantityFormControl.setValue('');
    this.surfaceDescriptionFormControl.setValue('');  
  }

  EditSurfaceEquipment(productNumber:number){   
    let equipment:SurfaceRunningEquipment;
    
    equipment=this.surfaceEquipmentList.find
    (b => b.productNumber===productNumber)??new SurfaceRunningEquipment();  

    this.surfaceProductNumberFormControl.setValue(equipment.productNumber.toString());
    this.surfaceCatalogNodeFormControl.setValue(equipment.catalogNode.name);
    this.surfaceDescriptionFormControl.setValue(equipment.description);
    this.surfaceSerialFormControl.setValue(equipment.serial.toString());
    this.surfaceQuantityFormControl.setValue(equipment.quantity.toString());   
  }

  private SendPopupNotification(message:string){
    this.dialogRef.open(PopupViewComponent,{
      data:{
        message:message
      }
    });
  }
}


