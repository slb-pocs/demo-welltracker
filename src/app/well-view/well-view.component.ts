import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Observable, map, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatOptionSelectionChange } from '@angular/material/core';

import { Well } from '../models/well';
import { Customer } from '../models/customer';
import { SalesAccount } from '../models/sales-account';
import { WellType } from '../models/well-type';
import { Basin } from '../models/basin';
import { GeoUnit } from '../models/geo-unit';
import { Country } from '../models/country';
import { Field } from '../models/field';
import { Enviroment } from '../models/enviroment';
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

@Component({
  selector: 'app-well-view',
  templateUrl: './well-view.component.html',
  styleUrl: './well-view.component.css'
})
export class WellViewComponent {
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  @ViewChild(MatTable)
  table!: MatTable<Stem>; 

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
  salesAccountList: SalesAccount[] = [];
  wellTypeList: WellType[] = [];
  basinList: Basin[] = [];
  geoUnitList: GeoUnit[] = [];
  mgtCountryList: Country[] = [];
  fieldList: Field[] = [];
  enviromentList: Enviroment[] = [];

  public constructor(private router: Router, private dialogRef: MatDialog) {
    this.well = new Well(0, '');
    this.trackRecord = new TrackRecord();
    this.stem=new Stem();

    this.customerList = [
      { id: 1, name: "ALLEDER, INC." },
      { id: 2, name: "AMERIND OIL" },
      { id: 3, name: "AMTEX" },
      { id: 4, name: "ANADARKO - BRAZIL" },
      { id: 5, name: "ANP - AGENCIA NACIONAL DO PETROLEO" },
      { id: 6, name: "APACHE CORPORATION" },
      { id: 7, name: "APACHE CORPORATION" },
      { id: 8, name: "AVRA OIL AND GAS" },
      { id: 9, name: "BENSON & SCHOEN OIL COMPANY INC" },
      { id: 10, name: "BILL J. GRAHAM OIL AND GAS CORPORATION" },
      { id: 11, name: "BIRDWELL" },
      { id: 12, name: "BITECH PETROLEUM CORP." },
      { id: 13, name: "BLS PRODUCTION COMPANY" },
      { id: 14, name: "BOWERMAN OIL AND GAS" },
      { id: 15, name: "BP" },
      { id: 16, name: "BROTHERS PRODUCTION" },
      { id: 17, name: "BRUCE A. WILBANKS" },
      { id: 18, name: "BT OIL FIELD SUPPLY" },
      { id: 19, name: "BUCKWHEAT RESOURCES" },
      { id: 20, name: "BYRD OPERATING COMPANY" },
      { id: 21, name: "C.E. JACOBS" },
      { id: 22, name: "C.F. QUALIA OPERATING COMPANY" },
      { id: 23, name: "CAPATAZ OPERATING" },
      { id: 24, name: "CARAWAY OPERATING" },
      { id: 25, name: "CENTRAL ENERGY PRODUCTION" },
      { id: 26, name: "CERTIFIED PETROLEUM" },
      { id: 27, name: "CHESTER UPHAM, JR." },
      { id: 28, name: "CITATION OIL & GAS CORPORATION - WEST TEXAS AREA" },
      { id: 29, name: "CLAY GRAY" },
      { id: 30, name: "COCKRELL PRODUCTION" },
      { id: 31, name: "COOPER OIL AND GAS, INC" },
      { id: 32, name: "COTTONWOOD PETROLEUM" },
      { id: 33, name: "D GAIL LATIMER" },
      { id: 34, name: "D.C. TANKERSLEY" },
      { id: 35, name: "DAKOTA RESOURCES" },
      { id: 36, name: "DBO OIL" },
      { id: 37, name: "DENTON EXPLORATION" },
      { id: 38, name: "DEVON ENERGY DO BRASIL LTDA" },
      { id: 39, name: "DINERO OPERATING COMPANY" },
      { id: 40, name: "DISCOVERY OPERATING" },
      { id: 41, name: "DRACO ENERGY, INC." },
      { id: 42, name: "DUBLIN INTERNATIONAL PETROLEUM TANZANIA LIMITED" },
      { id: 43, name: "DURANGO OPERATING" },
      { id: 44, name: "E.D. ANDERSON" },
      { id: 45, name: "E.G.L. RESOURCES" },
      { id: 46, name: "ESSO EXPLORATION & PRODUCTION CHAD, INC." },
      { id: 47, name: "F W OIL INTERESTS, INC" },
      { id: 48, name: "IPC" },
      { id: 49, name: "KOCH PETROLEO DO BRASIL LTDA" },
      { id: 50, name: "KUWAIT DRILLING COMPANY K.S.C" },
      { id: 51, name: "NAM" },
      { id: 52, name: "NOBLE ENERGY, INC." },
      { id: 53, name: "ORMAT" },
      { id: 54, name: "OXY" },
      { id: 1111, name: "PAM" },
      { id: 55, name: "PEP-SRN-ACTIVO BURGOS" },
      { id: 56, name: "PEP-SRN-ACTIVO POZA RICA-ALTAMIRA - PROYECTO ALTAMIRA" },
      { id: 57, name: "PEP-SRN-ACTIVO REGIONAL DE EXPLORACION REGION NORTE" },
      { id: 58, name: "PERFORADORA CENTRAL" },
      { id: 59, name: "PETROBRAS - E&P NNE - UN BA" },
      { id: 60, name: "PETROBRAS - E&P NNE - UN SEAL" },
      { id: 61, name: "PETROBRAS - E&P SSE - UN RIO" },
      { id: 62, name: "PETROBRAS INTERNACIONAL" },
      { id: 63, name: "PETROSERV" },
      { id: 64, name: "PITSA" },
      { id: 65, name: "REPSOL  BRASIL S.A." },
      { id: 66, name: "ROC OIL COMPANY LIMITED" },
      { id: 67, name: "ROMTEX INTERNATIONAL, LLC" },
      { id: 68, name: "SIPETROL" },
      { id: 69, name: "SITE OIL TOOLS" },
      { id: 70, name: "TOTAL E&P MYANMAR" },
      { id: 71, name: "W. DALE MORRIS, INC." },
      { id: 72, name: "YORKTON SECURITIES Inc." }
    ];

    this.wellList = [
      new Well(1, "543P2-29"),
      new Well(2, "AB-1613"),
      new Well(3, "AK-10441"),
      new Well(4, "AL-10341"),
      new Well(5, "AL-766"),
      new Well(6, "Albarakah-41"),
      new Well(7, "AP-0566"),
      new Well(8, "AP1101"),
      new Well(9, "AP1664"),
      new Well(10, "AQ 1802"),
      new Well(11, "AQ-1421"),
      new Well(12, "AQ-1812"),
      new Well(13, "AR-1569"),
      new Well(14, "AR-1663"),
      new Well(15, "AR-1666"),
      new Well(16, "AR-3102"),
      new Well(17, "AS 1665"),
      new Well(18, "AS-1762"),
      new Well(19, "AS-1803"),
      new Well(20, "AS-1812"),
      new Well(21, "AS-1813"),
      new Well(22, "AT-1765"),
      new Well(23, "AT-1882"),
      new Well(24, "Buah A-1P"),
      new Well(25, "CM-235"),
      new Well(26, "Cosecha-CNW"),
      new Well(27, "DB-1"),
      new Well(28, "Infantas 3609"),
      new Well(29, "ITAYA-A11"),
      new Well(30, "Khuff A-1P"),
      new Well(31, "LT-18z"),
      new Well(32, "MKN AR1669"),
      new Well(33, "MKN AS1821"),
      new Well(34, "MKNAL0445-K74"),
      new Well(35, "MKNAN1617-K66"),
      new Well(36, "MKNAN1637-K64"),
      new Well(37, "MKNAQ1662"),
      new Well(38, "MKNAQ1663"),
      new Well(39, "MKNAR 3002"),
      new Well(40, "MKNAR 3003"),
      new Well(41, "MKNAR 3004"),
      new Well(42, "MKNAR 3012"),
      new Well(43, "MKNAR 3012S1"),
      new Well(44, "MKNAR1464"),
      new Well(45, "MKNAR1464S1"),
      new Well(46, "MKNAR1661"),
      new Well(47, "MKNAR1669"),
      new Well(48, "MKNAR1763"),
      new Well(49, "MKNAR2065-K69"),
      new Well(50, "MKNAR3165"),
      new Well(51, "MKNAR3167"),
      new Well(52, "MKNAS 3062"),
      new Well(53, "MKNAS3264"),
      new Well(54, "MKNAT 1572"),
      new Well(55, "MKNAT1567"),
      new Well(56, "MKNAT1615-K68"),
      new Well(57, "MKNAU1568"),
      new Well(58, "MKNAU1666"),
      new Well(59, "MKNAU1766"),
      new Well(60, "MUKH-077"),
      new Well(61, "PAINTBRUSH"),
      new Well(62, "Phase II - Pad 201 P2"),
      new Well(63, "Phase II - Pad 202 I3"),
      new Well(64, "PRUDHOE BAY18-26A"),
      new Well(65, "PY3 D4"),
      new Well(66, "QuaIboe-4"),
      new Well(67, "Reham West 9"),
      new Well(68, "Szentlorinckata-1"),
      new Well(69, "Szolnok ENY-1"),
      new Well(11111, "TPTA-031"),
      new Well(70, "WAE-12"),
      new Well(71, "WASSERBURGER 2"),
      new Well(72, "WRKM 101")

    ];

    this.salesAccountList = [
      { id: 1, name: "ALLEDER, INC." },
      { id: 2, name: "AMERIND OIL" },
      { id: 3, name: "AMTEX" },
      { id: 4, name: "ANADARKO - BRAZIL" },
      { id: 5, name: "ANP - AGENCIA NACIONAL DO PETROLEO" },
      { id: 6, name: "APACHE CORPORATION" },
      { id: 7, name: "APACHE CORPORATION" },
      { id: 8, name: "AVRA OIL AND GAS" },
      { id: 9, name: "BENSON & SCHOEN OIL COMPANY INC" },
      { id: 10, name: "BILL J. GRAHAM OIL AND GAS CORPORATION" },
      { id: 11, name: "BIRDWELL" },
      { id: 12, name: "BITECH PETROLEUM CORP." },
      { id: 13, name: "BLS PRODUCTION COMPANY" },
      { id: 14, name: "BOWERMAN OIL AND GAS" },
      { id: 15, name: "BP" },
      { id: 16, name: "BROTHERS PRODUCTION" },
      { id: 17, name: "BRUCE A. WILBANKS" },
      { id: 18, name: "BT OIL FIELD SUPPLY" },
      { id: 19, name: "BUCKWHEAT RESOURCES" },
      { id: 20, name: "BYRD OPERATING COMPANY" },
      { id: 21, name: "C.E. JACOBS" },
      { id: 22, name: "C.F. QUALIA OPERATING COMPANY" },
      { id: 23, name: "CAPATAZ OPERATING" },
      { id: 24, name: "CARAWAY OPERATING" },
      { id: 25, name: "CENTRAL ENERGY PRODUCTION" },
      { id: 26, name: "CERTIFIED PETROLEUM" },
      { id: 27, name: "CHESTER UPHAM, JR." },
      { id: 28, name: "CITATION OIL & GAS CORPORATION - WEST TEXAS AREA" },
      { id: 29, name: "CLAY GRAY" },
      { id: 30, name: "COCKRELL PRODUCTION" },
      { id: 31, name: "COOPER OIL AND GAS, INC" },
      { id: 32, name: "COTTONWOOD PETROLEUM" },
      { id: 33, name: "D GAIL LATIMER" },
      { id: 34, name: "D.C. TANKERSLEY" },
      { id: 35, name: "DAKOTA RESOURCES" },
      { id: 36, name: "DBO OIL" },
      { id: 37, name: "DENTON EXPLORATION" },
      { id: 38, name: "DEVON ENERGY DO BRASIL LTDA" },
      { id: 39, name: "DINERO OPERATING COMPANY" },
      { id: 40, name: "DISCOVERY OPERATING" },
      { id: 41, name: "DRACO ENERGY, INC." },
      { id: 42, name: "DUBLIN INTERNATIONAL PETROLEUM TANZANIA LIMITED" },
      { id: 43, name: "DURANGO OPERATING" },
      { id: 44, name: "E.D. ANDERSON" },
      { id: 45, name: "E.G.L. RESOURCES" },
      { id: 46, name: "ESSO EXPLORATION & PRODUCTION CHAD, INC." },
      { id: 47, name: "F W OIL INTERESTS, INC" },
      { id: 48, name: "IPC" },
      { id: 49, name: "KOCH PETROLEO DO BRASIL LTDA" },
      { id: 50, name: "KUWAIT DRILLING COMPANY K.S.C" },
      { id: 51, name: "NAM" },
      { id: 52, name: "NOBLE ENERGY, INC." },
      { id: 53, name: "ORMAT" },
      { id: 54, name: "OXY" },
      { id: 55, name: "PEP-SRN-ACTIVO BURGOS" },
      { id: 56, name: "PEP-SRN-ACTIVO POZA RICA-ALTAMIRA - PROYECTO ALTAMIRA" },
      { id: 57, name: "PEP-SRN-ACTIVO REGIONAL DE EXPLORACION REGION NORTE" },
      { id: 58, name: "PERFORADORA CENTRAL" },
      { id: 11111, name: "PETROAMAZONAS ECUADOR S.A." },
      { id: 59, name: "PETROBRAS - E&P NNE - UN BA" },
      { id: 60, name: "PETROBRAS - E&P NNE - UN SEAL" },
      { id: 61, name: "PETROBRAS - E&P SSE - UN RIO" },
      { id: 62, name: "PETROBRAS INTERNACIONAL" },
      { id: 63, name: "PETROSERV" },
      { id: 64, name: "PITSA" },
      { id: 65, name: "REPSOL  BRASIL S.A." },
      { id: 66, name: "ROC OIL COMPANY LIMITED" },
      { id: 67, name: "ROMTEX INTERNATIONAL, LLC" },
      { id: 68, name: "SIPETROL" },
      { id: 69, name: "SITE OIL TOOLS" },
      { id: 70, name: "TOTAL E&P MYANMAR" },
      { id: 71, name: "W. DALE MORRIS, INC." },
      { id: 72, name: "YORKTON SECURITIES Inc." }
    ];

    this.wellTypeList = [
      { id: 1, name: "Gas Production" },
      { id: 2, name: "Oil Production" },
      { id: 3, name: "Oil and Gas Production" },
      { id: 4, name: "Water Injection" },
      { id: 5, name: "Gas Injection" },
      { id: 6, name: "SAGD InjectOR" },
      { id: 7, name: "SAGD Producer" },
      { id: 8, name: "SAGD Observation" },
      { id: 9, name: "Disposal" },
      { id: 11, name: "Other" },
    ];

    this.basinList = [
      new Basin(1, "AML"), new Basin(2, "ASIA"), new Basin(3, "MENA"), new Basin(4, "OAT"),
      new Basin(5, "RCA")
    ];

    this.geoUnitList = [
      new GeoUnit(1, "ABC"), new GeoUnit(2, "CAL"), new GeoUnit(3, "ECP"),
      new GeoUnit(4, "USL")
    ];

    this.mgtCountryList = [
      new Country(1, "Angertina"), new Country(2, "Bolivia"), new Country(3, "Canada Land"),
      new Country(4, "Chile"), new Country(5, "Colombia"), new Country(6, "Ecuador"),
      new Country(7, "Paraguay"), new Country(8, "Peru"), new Country(9, "US Land California"),
      new Country(10, "US Land General"), new Country(11, "US Land South Texas"),
      new Country(12, "US Land Southeast"), new Country(13, "US Land West Texas"),
      new Country(14, "US Midcontinent"), new Country(15, "US Rockies")
    ];

    this.fieldList = [
      { id: 1, name: "Alvern" },
      { id: 2, name: "Aries" },
      { id: 3, name: "B-157C" },
      { id: 4, name: "Bahregan" },
      { id: 5, name: "Baram F" },
      { id: 6, name: "Bedong" },
      { id: 7, name: "Block 16.1" },
      { id: 8, name: "Block 3E" },
      { id: 9, name: "Central Azeri" },
      { id: 10, name: "Cerro Granito" },
      { id: 11, name: "CTOC" },
      { id: 12, name: "Dholka" },
      { id: 13, name: "Disraeli" },
      { id: 14, name: "Douglas" },
      { id: 15, name: "Dumbarton" },
      { id: 16, name: "EDEN-YUTURI" },
      { id: 17, name: "El Cordon" },
      { id: 18, name: "ERINMI" },
      { id: 19, name: "Gilbert" },
      { id: 20, name: "Guince" },
      { id: 21, name: "Highlander" },
      { id: 22, name: "In Salah" },
      { id: 23, name: "Jacuípe" },
      { id: 24, name: "kang-2" },
      { id: 25, name: "Kita Kuzuduka" },
      { id: 26, name: "kito gre" },
      { id: 27, name: "LD27-2" },
      { id: 28, name: "Lianzi" },
      { id: 29, name: "Likche" },
      { id: 30, name: "Limborda" },
      { id: 31, name: "MANGA" },
      { id: 32, name: "Manzali" },
      { id: 33, name: "Matapionche" },
      { id: 34, name: "MAWN" },
      { id: 35, name: "Max" },
      { id: 36, name: "Mazeres" },
      { id: 37, name: "MDRK" },
      { id: 38, name: "Megionskoe" },
      { id: 39, name: "Mekrang" },
      { id: 40, name: "Meretoyakhinskoe" },
      { id: 41, name: "Midfield" },
      { id: 42, name: "Mocarroca" },
      { id: 43, name: "Mort-98" },
      { id: 44, name: "Muravlenkovskoe" },
      { id: 45, name: "NEW COUNTRY" },
      { id: 46, name: "Octopus" },
      { id: 47, name: "Offshore" },
      { id: 48, name: "PAKA SUR" },
      { id: 49, name: "Pampa Sur" },
      { id: 50, name: "Perevoznoe" },
      { id: 51, name: "Pico Truncado" },
      { id: 52, name: "PL 19-3A" },
      { id: 53, name: "Pluto" },
      { id: 54, name: "PRU KRATHIAM" },
      { id: 55, name: "PRUDHOE BA" },
      { id: 56, name: "RANQUILCO NORTE" },
      { id: 57, name: "Rapak" },
      { id: 58, name: "RED SEE" },
      { id: 59, name: "San Martin" },
      { id: 60, name: "San Tai" },
      { id: 61, name: "SERRARIA" },
      { id: 62, name: "South Dabaa 4" },
      { id: 63, name: "Southern Gas Basin" },
      { id: 64, name: "TEG-KRECHBA-REG" },
      { id: 65, name: "Tetete" },
      { id: 66, name: "TGT" },
      { id: 1111, name: "TIPUTINI" },
      { id: 67, name: "Turkmenoy" },
      { id: 68, name: "Tyrihans" },
      { id: 69, name: "Ubari (NC186)" },
      { id: 70, name: "Viernes" },
      { id: 71, name: "Villafortuna" },
      { id: 72, name: "WRKM" }
    ];

    this.enviromentList = [
      new Enviroment(1, "Land"), new Enviroment(2, "Offshore Platform"), new Enviroment(3, "Offshore Subsea"),
      new Enviroment(5, "Offshore Shallow"), new Enviroment(4, "Swamp/inland Waters")
    ];

    this.PopulateWellData();
  }
  //Customer data lists

  maxDeviationList: MaxDeviation[] = [
    { id: 1, name: "Vertical (0 - < 15)" },
    { id: 2, name: "Deviated (15 - < 60)" },
    { id: 3, name: "High Deviation (60 - < 90)" },
    { id: 4, name: "Horizontal (90 and above)" }
  ];

  meassuredFromList: MeassuredFrom[] = [
    { id: 1, name: "Ground level" },
    { id: 2, name: "Mean Sea Level" },
    { id: 3, name: "Rig Kelly Bushing" },
    { id: 4, name: "Rotary Table" },
    { id: 5, name: "Seabed" },
    { id: 6, name: "Tubing Hanger" }
  ];

  completionPulledReasonList: CompletionpulledReason[] = [
    { id: 1, name: "Equipment Failure" },
    { id: 2, name: "Sidetracking Well" },
    { id: 3, name: "Abandoning Well" },
    { id: 4, name: "Change ESP" },
    { id: 5, name: "Other" }
  ];

  mdUnitList: MdUnit[] = [
    { id: 1, name: "m" },
    { id: 2, name: "ft" }

  ];

  tvdUnitList: TvdUnit[] = [
    { id: 1, name: "m" },
    { id: 2, name: "ft" }
  ];

  upperCompletionList: UppercompletionType[] = [
    { id: 5, name: "None" },
    { id: 1, name: "Single String" },
    { id: 2, name: "Dual String" },
    { id: 3, name: "Monobore" },
    { id: 4, name: "Other" }
  ];

  artificialLiftList: ArtificialliftType[] = [
    { id: 6, name: "None" },
    { id: 1, name: "ESP" },
    { id: 2, name: "Gas Lift" },
    { id: 3, name: "PCP" },
    { id: 4, name: "Rod Pump" },
    { id: 5, name: "Other" }
  ];

  multiLateralList: Multilateral[] = [
    { id: 1, name: "None" },
    { id: 2, name: "Stem + 1 Branch" },
    { id: 3, name: "Stem + 2 Branches" },
    { id: 4, name: "Stem + 3 Branches" },
    { id: 5, name: "Stem + 4 Branches" }

  ];

  linerHangerSystemList: LinerhangerSystem[] = [
    { id: 7, name: "None" },
    { id: 1, name: "Cemented Liner" },
    { id: 2, name: "Uncemented Liner" },
    { id: 3, name: "Tieback to Surface" },
    { id: 4, name: "Scab Liner" },
    { id: 5, name: "Tieback Packer" },
    { id: 6, name: "Steam Injection/Thermalr" }
  ];

  multiStageSimulationList: MultistageSimulation[] = [
    { id: 3, name: "None" },
    { id: 1, name: "Cemented" },
    { id: 2, name: "Uncemented" }
  ];

  stringTypeList: StringType[] = [
    { id: 1, name: "Conductor" },
    { id: 2, name: "Surface" },
    { id: 3, name: "Intermediate Casing" },
    { id: 4, name: "Drilling Liner" },  
    { id: 5, name: "Drilling Tieback" },
    { id: 6, name: "Production Casing" },
    { id: 7, name: "Production Liner" },
    { id: 7, name: "Production Tieback" },
    { id: 9, name: "Tubing" },
    { id: 10, name: "Short Dual Tubing" },
    { id: 11, name: "Open Hole" }
  ];

  sizeList: Size[] = [
    { id: 1, name: "1-1/20          |          1.050          |          26.7" },
    { id: 2, name: "1-5/16          |          1.315          |          33.4" },
    { id: 3, name: "1-2/3          |          1.660          |          42.2" },
    { id: 4, name: "1-9/10          |          1.900          |          48.3" },
    { id: 5, name: "2-1/16          |          2.063          |          52.4" },
    { id: 6, name: "2-3/8          |          2.375          |          60.3" },
    { id: 14, name: "2-7/8          |          2.875          |          73.0" },
    { id: 19, name: "3-1/2          |          3.500          |          88.9" },
    { id: 25, name: "4          |          4.000          |          101.6" },
    { id: 29, name: "4-1/2          |          4.500          |          114.3" },
    { id: 34, name: "5          |          5.000          |          127.0" },
    { id: 37, name: "5-1/2          |          5.500          |          139.7" },
    { id: 46, name: "6-5/8          |          6.625          |          168.3" },
    { id: 49, name: "7          |          7.000          |          177.8" },
    { id: 50, name: "7-5/8          |          7.625          |          193.7" },
    { id: 52, name: "7-3/4          |          7.750          |          196.9" },
    { id: 57, name: "8-5/8          |          8.625          |          219.1" },
    { id: 59, name: "8-3/4          |          8.750          |          222.3" },
    { id: 63, name: "9-5/8          |          9.625          |          244.5" },
    { id: 64, name: "9-3/4          |          9.750          |          247.7" },
    { id: 66, name: "9-7/8          |          9.875          |          250.8" },
    { id: 68, name: "10-3/4          |          10.750          |          273.1" },
    { id: 71, name: "11-3/4          |          11.750          |          298.5" },
    { id: 72, name: "11-7/8          |          11.875          |          301.6" },
    { id: 78, name: "13-3/8          |          13.375          |          339.7" },
    { id: 79, name: "13-1/2          |          13.500          |          342.9" },
    { id: 81, name: "13-5/8          |          13.625          |          346.1" },
    { id: 82, name: "14          |          14.000          |          355.6" },
    { id: 88, name: "16          |          16.000          |          406.4" },
    { id: 95, name: "18-5/8          |          18.625          |          473.1" },
    { id: 96, name: "20          |          20.000          |          508.0" },
    { id: 98, name: "21-1/2          |          21.500          |          546.1" },
    { id: 99, name: "22          |          22.000          |          558.8" },
    { id: 100, name: "24          |          24.000          |          609.6" },
    { id: 101, name: "26          |          26.000          |          660.4" },
    { id: 103, name: "28          |          28.000          |          711.2" },
    { id: 104, name: "30          |          30.000          |          762.0" },
    { id: 104, name: "32          |          32.000          |          812.8" },
    { id: 105, name: "32          |          32.000          |          812.8" },
    { id: 106, name: "34          |          34.000          |          863.6" },
    { id: 107, name: "36          |          36.000          |          914.4" },
    { id: 109, name: "38          |          38.000          |          965.2" },
    { id: 110, name: "40          |          40.000          |          1016.0" },
    { id: 111, name: "42          |          42.000          |          1066.8" },
    { id: 112, name: "44          |          44.000          |          1117.6" },
    { id: 113, name: "46          |          46.000          |          1168.4" },
    { id: 114, name: "48          |          48.000          |          1219.2" },
    { id: 115, name: "52          |          52.000          |          1320.8" },
    { id: 116, name: "56          |          56.000          |          1422.4" },
    { id: 117, name: "60          |          60.000          |          1524.0" },

  ];

  weightList: Weight[] = [
    { id: 1, name: "1.70 | 1.1" },
    { id: 2, name: "1.79 | 1.2" },
    { id: 3, name: "2.20 | 1.5" },
    { id: 4, name: "2.53 | 1.7" },
    { id: 5, name: "2.56 | 1.7" },
    { id: 6, name: "2.68 | 1.8" },
    { id: 7, name: "3.26 | 2.2" },
    { id: 8, name: "3.12 | 2.1" },
    { id: 9, name: "3.42 | 2.3" },
    { id: 10, name: "3.47 | 2.3" },
    { id: 11, name: "3.57 | 2.4" },
    { id: 12, name: "4.51 | 3.0" },
    { id: 13, name: "3.57 | 2.4" },
    { id: 14, name: "4.09 | 2.8" },
    { id: 15, name: "4.11 | 2.8" },
    { id: 16, name: "4.32 | 2.9" },
    { id: 17, name: "5.43 | 3.7" },
    { id: 18, name: "6.58 | 4.4" },
    { id: 19, name: "7.66 | 5.2" },
    { id: 20, name: "4.84 | 3.3" },
    { id: 21, name: "6.70 | 4.5" },
    { id: 22, name: "5.95 | 4.0" },
    { id: 23, name: "6.84 | 4.6" },
    { id: 24, name: "6.99 | 4.7" },
    { id: 25, name: "8.63 | 5.8" },
    { id: 26, name: "8.85 | 6.0" },
    { id: 27, name: "9.82 | 6.6" },
    { id: 28, name: "9.90 | 6.7" },
    { id: 29, name: "10.94 | 7.4" },
    { id: 30, name: "11.09 | 7.5" },
    { id: 31, name: "9.52 | 6.4" },
    { id: 32, name: "9.67 | 6.5" },
    { id: 33, name: "11.61 | 7.8" },
    { id: 34, name: "11.76 | 7.9" },
    { id: 35, name: "12.80 | 8.6" },
    { id: 36, name: "12.95 | 8.7" },
    { id: 37, name: "13.91 | 9.4" },
    { id: 38, name: "14.06 | 9.5" },
    { id: 39, name: "15.48 | 10.4" },
    { id: 40, name: "15.62 | 10.5" },
    { id: 41, name: "17.11 | 11.5" },
    { id: 42, name: "11.46 | 7.7" },
    { id: 43, name: "13.69 | 9.2" },
    { id: 44, name: "13.84 | 9.3" },
    { id: 45, name: "14.14 | 9.5" },
    { id: 46, name: "15.18 | 10.2" },
    { id: 47, name: "15.33 | 10.3" },
    { id: 48, name: "18.90 | 12.7" },
    { id: 49, name: "19.27 | 13.0" },
    { id: 50, name: "19.79 | 13.3" },
    { id: 51, name: "21.28 | 14.3" },
    { id: 52, name: "23.06 | 15.5" },
    { id: 53, name: "23.08 | 15.5" },
    { id: 54, name: "25.30 | 17.0" },
    { id: 55, name: "14.14 | 9.5" },
    { id: 56, name: "16.37 | 11.0" },
    { id: 57, name: "19.64 | 13.2" },
    { id: 58, name: "20.83 | 14.0" },
    { id: 59, name: "23.96 | 16.1" },
    { id: 60, name: "28.12 | 18.9" },
    { id: 61, name: "33.03 | 22.2" },
    { id: 62, name: "14.14 | 9.5" },
    { id: 63, name: "15.62 | 10.5" },
    { id: 64, name: "17.26 | 11.6" },
    { id: 65, name: "18.75 | 12.6" },
    { id: 66, name: "18.97 | 12.8" },
    { id: 67, name: "20.09 | 13.5" },
    { id: 68, name: "20.46 | 13.8" },
    { id: 69, name: "22.47 | 15.1" },
    { id: 70, name: "22.62 | 15.2" },
    { id: 71, name: "24.70 | 16.6" },
    { id: 72, name: "25.30 | 17.0" },
    { id: 73, name: "28.12 | 18.9" },
    { id: 74, name: "29.76 | 20.0" },
    { id: 75, name: "31.99 | 21.5" },
    { id: 76, name: "35.27 | 23.7" },
    { id: 77, name: "38.39 | 25.8" },
    { id: 78, name: "38.84 | 26.1" },
    { id: 79, name: "17.11 | 11.5" },
    { id: 80, name: "19.34 | 13.0" },
    { id: 81, name: "22.32 | 15.0" },
    { id: 82, name: "24.18 | 16.3" },
    { id: 83, name: "26.78 | 18.0" },
    { id: 84, name: "29.02 | 19.5" },
    { id: 85, name: "30.95 | 20.8" },
    { id: 86, name: "31.84 | 21.4" },
    { id: 87, name: "34.52 | 23.2" },
    { id: 88, name: "35.86 | 24.1" },
    { id: 89, name: "38.09 | 25.6" },
    { id: 90, name: "39.73 | 26.7" },
    { id: 91, name: "43.45 | 29.2" },
    { id: 92, name: "47.02 | 31.6" },
    { id: 93, name: "50.59 | 34.0" },
    { id: 94, name: "20.83 | 14.0" },
    { id: 95, name: "23.06 | 15.5" },
    { id: 96, name: "25.30 | 17.0" },
    { id: 97, name: "29.76 | 20.0" },
    { id: 98, name: "32.59 | 21.9" },
    { id: 99, name: "34.22 | 23.0" },
    { id: 100, name: "36.75 | 24.7" },
    { id: 101, name: "39.88 | 26.8" },
    { id: 102, name: "44.19 | 29.7" },
    { id: 103, name: "48.51 | 32.6" },
    { id: 104, name: "52.53 | 35.3" },
    { id: 105, name: "56.54 | 38.0" },
    { id: 106, name: "60.26 | 40.5" },
    { id: 107, name: "64.13 | 43.1" },
    { id: 108, name: "29.76 | 20.0" },
    { id: 109, name: "35.71 | 24.0" },
    { id: 110, name: "37.50 | 25.2" },
    { id: 111, name: "41.25 | 27.7" },
    { id: 112, name: "41.66 | 28.0" },
    { id: 113, name: "47.62 | 32.0" },
    { id: 114, name: "54.61 | 36.7" },
    { id: 115, name: "59.82 | 40.2" },
    { id: 116, name: "65.02 | 43.7" },
    { id: 117, name: "70.08 | 47.1" },
    { id: 118, name: "74.99 | 50.4" },
    { id: 119, name: "79.90 | 53.7" },
    { id: 120, name: "84.52 | 56.8" },
    { id: 121, name: "89.13 | 59.9" },
    { id: 122, name: "93.59 | 62.9" },
    { id: 123, name: "97.91 | 65.8" },
    { id: 124, name: "25.30 | 17.0" },
    { id: 125, name: "29.76 | 20.0" },
    { id: 126, name: "34.22 | 23.0" },
    { id: 127, name: "38.69 | 26.0" },
    { id: 128, name: "43.15 | 29.0" },
    { id: 129, name: "47.62 | 32.0" },
    { id: 130, name: "52.08 | 35.0" },
    { id: 131, name: "56.54 | 38.0" },
    { id: 132, name: "61.01 | 41.0" },
    { id: 133, name: "63.54 | 42.7" },
    { id: 134, name: "69.04 | 46.4" },
    { id: 135, name: "74.55 | 50.1" },
    { id: 136, name: "79.76 | 53.6" },
    { id: 137, name: "84.96 | 57.1" },
    { id: 138, name: "90.02 | 60.5" },
    { id: 139, name: "95.08 | 63.9" },
    { id: 140, name: "99.84 | 67.1" },
    { id: 141, name: "104.61 | 70.3" },
    { id: 142, name: "113.53 | 76.3" },
    { id: 143, name: "35.71 | 24.0" },
    { id: 144, name: "39.28 | 26.4" },
    { id: 145, name: "44.19 | 29.7" },
    { id: 146, name: "50.14 | 33.7" },
    { id: 147, name: "58.03 | 39.0" },
    { id: 148, name: "63.69 | 42.8" },
    { id: 149, name: "67.41 | 45.3" },
    { id: 150, name: "70.08 | 47.1" },
    { id: 151, name: "76.18 | 51.2" },
    { id: 152, name: "82.29 | 55.3" },
    { id: 153, name: "88.09 | 59.2" },
    { id: 154, name: "94.04 | 63.2" },
    { id: 155, name: "99.55 | 66.9" },
    { id: 156, name: "105.20 | 70.7" },
    { id: 157, name: "110.56 | 74.3" },
    { id: 158, name: "115.91 | 77.9" },
    { id: 159, name: "126.18 | 84.8" },
    { id: 160, name: "68.60 | 46.1" },
    { id: 161, name: "35.71 | 24.0" },
    { id: 162, name: "41.66 | 28.0" },
    { id: 163, name: "47.62 | 32.0" },
    { id: 164, name: "53.57 | 36.0" },
    { id: 165, name: "59.52 | 40.0" },
    { id: 166, name: "65.47 | 44.0" },
    { id: 167, name: "72.91 | 49.0" },
    { id: 168, name: "80.35 | 54.0" },
    { id: 169, name: "87.34 | 58.7" },
    { id: 170, name: "94.49 | 63.5" },
    { id: 171, name: "101.33 | 68.1" },
    { id: 172, name: "108.18 | 72.7" },
    { id: 173, name: "114.72 | 77.1" },
    { id: 174, name: "73.95 | 49.7" },
    { id: 175, name: "48.06 | 32.3" },
    { id: 176, name: "53.57 | 36.0" },
    { id: 177, name: "59.52 | 40.0" },
    { id: 178, name: "64.73 | 43.5" },
    { id: 179, name: "69.94 | 47.0" },
    { id: 180, name: "79.61 | 53.5" },
    { id: 181, name: "86.90 | 58.4" },
    { id: 182, name: "88.39 | 59.4" },
    { id: 183, name: "96.57 | 64.9" },
    { id: 184, name: "104.61 | 70.3" },
    { id: 185, name: "112.49 | 75.6" },
    { id: 186, name: "120.23 | 80.8" },
    { id: 187, name: "127.97 | 86.0" },
    { id: 188, name: "135.41 | 91.0" },
    { id: 189, name: "88.09 | 59.2" },
    { id: 190, name: "93.45 | 62.8" },
    { id: 191, name: "48.73 | 32.8" },
    { id: 192, name: "60.26 | 40.5" },
    { id: 193, name: "67.70 | 45.5" },
    { id: 194, name: "75.89 | 51.0" },
    { id: 195, name: "82.58 | 55.5" },
    { id: 196, name: "88.39 | 59.4" },
    { id: 197, name: "90.32 | 60.7" },
    { id: 198, name: "95.97 | 64.5" },
    { id: 199, name: "97.76 | 65.7" },
    { id: 200, name: "108.92 | 73.2" },
    { id: 201, name: "117.85 | 79.2" },
    { id: 202, name: "126.92 | 85.3" },
    { id: 203, name: "135.70 | 91.2" },
    { id: 204, name: "144.48 | 97.1" },
    { id: 205, name: "153.11 | 102.9" },
    { id: 206, name: "161.74 | 108.7" },
    { id: 207, name: "62.50 | 42.0" },
    { id: 208, name: "69.94 | 47.0" },
    { id: 209, name: "80.35 | 54.0" },
    { id: 210, name: "89.28 | 60.0" },
    { id: 211, name: "96.72 | 65.0" },
    { id: 212, name: "105.65 | 71.0" },
    { id: 213, name: "117.55 | 79.0" },
    { id: 214, name: "129.75 | 87.2" },
    { id: 215, name: "106.84 | 71.8" },
    { id: 216, name: "71.42 | 48.0" },
    { id: 217, name: "81.10 | 54.5" },
    { id: 218, name: "90.77 | 61.0" },
    { id: 219, name: "101.18 | 68.0" },
    { id: 220, name: "107.13 | 72.0" },
    { id: 221, name: "114.57 | 77.0" },
    { id: 222, name: "125.73 | 84.5" },
    { id: 223, name: "137.64 | 92.5" },
    { id: 224, name: "149.24 | 100.3" },
    { id: 225, name: "121.12 | 81.4" },
    { id: 226, name: "131.24 | 88.2" },
    { id: 227, name: "138.38 | 93.0" },
    { id: 228, name: "148.80 | 100.0" },
    { id: 229, name: "159.21 | 107.0" },
    { id: 230, name: "168.14 | 113.0" },
    { id: 231, name: "96.72 | 65.0" },
    { id: 232, name: "111.60 | 75.0" },
    { id: 233, name: "124.99 | 84.0" },
    { id: 234, name: "140.61 | 94.5" },
    { id: 235, name: "162.19 | 109.0" },
    { id: 236, name: "190.46 | 128.0" },
    { id: 237, name: "217.25 | 146.0" },
    { id: 238, name: "130.20 | 87.5" },
    { id: 239, name: "143.59 | 96.5" },
    { id: 240, name: "166.65 | 112.0" },
    { id: 241, name: "202.37 | 136.0" },
    { id: 242, name: "116.96 | 78.6" },
    { id: 243, name: "139.87 | 94.0" },
    { id: 244, name: "154.94 | 104.1" },
    { id: 245, name: "158.47 | 106.5" },
    { id: 246, name: "192.44 | 129.3" },
    { id: 247, name: "197.90 | 133.0" },
    { id: 248, name: "218.73 | 147.0" },
    { id: 249, name: "229.43 | 154.2" },
    { id: 250, name: "251.47 | 169.0" },
    { id: 251, name: "265.93 | 178.7" },
    { id: 252, name: "301.94 | 202.9" },
    { id: 253, name: "337.44 | 226.8" },
    { id: 254, name: "372.46 | 250.3" },
    { id: 255, name: "171.12 | 115.0" },
    { id: 256, name: "209.81 | 141.0" },
    { id: 257, name: "128.87 | 86.6" },
    { id: 258, name: "170.84 | 114.8" },
    { id: 259, name: "212.31 | 142.7" },
    { id: 260, name: "253.27 | 170.2" },
    { id: 261, name: "293.74 | 197.4" },
    { id: 262, name: "333.72 | 224.3" },
    { id: 263, name: "373.20 | 250.8" },
    { id: 264, name: "412.19 | 277.0" },
    { id: 265, name: "488.67 | 328.4" },
    { id: 266, name: "140.79 | 94.6" },
    { id: 267, name: "186.73 | 125.5" },
    { id: 268, name: "208.32 | 140.0" },
    { id: 269, name: "232.17 | 156.0" },
    { id: 270, name: "245.52 | 165.0" },
    { id: 271, name: "270.81 | 182.0" },
    { id: 272, name: "277.11 | 186.2" },
    { id: 273, name: "308.01 | 207.0" },
    { id: 274, name: "321.55 | 216.1" },
    { id: 275, name: "365.51 | 245.6" },
    { id: 276, name: "408.96 | 274.8" },
    { id: 277, name: "451.91 | 303.7" },
    { id: 278, name: "536.34 | 360.5" },
    { id: 279, name: "152.71 | 102.6" },
    { id: 280, name: "202.62 | 136.2" },
    { id: 281, name: "252.03 | 169.4" },
    { id: 282, name: "300.94 | 202.3" },
    { id: 283, name: "331.82 | 223.0" },
    { id: 284, name: "349.36 | 234.8" },
    { id: 285, name: "397.29 | 267.0" },
    { id: 286, name: "401.76 | 270.0" },
    { id: 287, name: "164.63 | 110.6" },
    { id: 288, name: "218.51 | 146.9" },
    { id: 289, name: "271.90 | 182.7" },
    { id: 290, name: "324.78 | 218.3" },
    { id: 291, name: "377.17 | 253.5" },
    { id: 292, name: "429.07 | 288.4" },
    { id: 293, name: "176.55 | 118.7" },
    { id: 294, name: "234.40 | 157.5" },
    { id: 295, name: "291.76 | 196.1" },
    { id: 296, name: "348.62 | 234.3" },
    { id: 297, name: "404.98 | 272.2" },
    { id: 298, name: "460.86 | 309.7" },
    { id: 299, name: "516.23 | 346.9" },
    { id: 300, name: "571.10 | 383.8" },
    { id: 301, name: "250.29 | 168.2" },
    { id: 302, name: "311.63 | 209.4" },
    { id: 303, name: "372.46 | 250.3" },
    { id: 304, name: "432.79 | 290.9" },
    { id: 305, name: "492.64 | 331.1" },
    { id: 306, name: "551.98 | 371.0" },
    { id: 307, name: "610.83 | 410.5" },
    { id: 308, name: "188.47 | 126.7" },
    { id: 309, name: "200.39 | 134.7" },
    { id: 310, name: "266.19 | 178.9" },
    { id: 311, name: "331.49 | 222.8" },
    { id: 312, name: "396.29 | 266.3" },
    { id: 313, name: "460.60 | 309.6" },
    { id: 314, name: "524.42 | 352.4" },
    { id: 315, name: "587.74 | 395.0" },
    { id: 316, name: "650.56 | 437.2" },
    { id: 317, name: "212.31 | 142.7" },
    { id: 318, name: "282.08 | 189.6" },
    { id: 319, name: "351.36 | 236.1" },
    { id: 320, name: "420.13 | 282.4" },
    { id: 321, name: "488.42 | 328.2" },
    { id: 322, name: "556.21 | 373.8" },
    { id: 323, name: "623.49 | 419.0" },
    { id: 324, name: "690.29 | 463.9" },
    { id: 325, name: "224.22 | 150.7" },
    { id: 326, name: "297.97 | 200.3" },
    { id: 327, name: "371.22 | 249.5" },
    { id: 328, name: "443.97 | 298.4" },
    { id: 329, name: "516.23 | 346.9" },
    { id: 330, name: "587.99 | 395.2" },
    { id: 331, name: "659.25 | 443.1" },
    { id: 332, name: "730.02 | 490.6" },
    { id: 333, name: "236.14 | 158.7" },
    { id: 334, name: "313.86 | 210.9" },
    { id: 335, name: "391.09 | 262.8" },
    { id: 336, name: "467.81 | 314.4" },
    { id: 337, name: "544.04 | 365.6" },
    { id: 338, name: "619.77 | 416.5" },
    { id: 339, name: "695.01 | 467.1" },
    { id: 340, name: "769.75 | 517.3" },
    { id: 341, name: "248.06 | 166.7" },
    { id: 342, name: "329.75 | 221.6" },
    { id: 343, name: "410.95 | 276.2" },
    { id: 344, name: "491.64 | 330.4" },
    { id: 345, name: "571.85 | 384.3" },
    { id: 346, name: "651.56 | 437.9" },
    { id: 347, name: "730.76 | 491.1" },
    { id: 348, name: "824.36 | 554.0" },
    { id: 349, name: "259.98 | 174.7" },
    { id: 350, name: "345.64 | 232.3" },
    { id: 351, name: "430.82 | 289.5" },
    { id: 352, name: "515.48 | 346.4" },
    { id: 353, name: "599.66 | 403.0" },
    { id: 354, name: "683.34 | 459.2" },
    { id: 355, name: "766.52 | 515.1" },
    { id: 356, name: "849.21 | 570.7" },
    { id: 357, name: "271.90 | 182.7" },
    { id: 358, name: "361.53 | 243.0" },
    { id: 359, name: "450.68 | 302.9" },
    { id: 360, name: "539.32 | 362.5" },
    { id: 361, name: "627.47 | 421.7" },
    { id: 362, name: "715.12 | 480.6" },
    { id: 363, name: "802.28 | 539.2" },
    { id: 364, name: "888.94 | 597.4" },
    { id: 365, name: "283.82 | 190.7" },
    { id: 366, name: "377.43 | 253.7" },
    { id: 367, name: "470.54 | 316.2" },
    { id: 368, name: "563.16 | 378.5" },
    { id: 369, name: "655.28 | 440.4" },
    { id: 370, name: "746.91 | 502.0" },
    { id: 371, name: "838.03 | 563.2" },
    { id: 372, name: "928.66 | 624.1" },
    { id: 373, name: "307.66 | 206.8" },
    { id: 374, name: "409.21 | 275.0" },
    { id: 375, name: "510.27 | 342.9" },
    { id: 376, name: "610.83 | 410.5" },
    { id: 377, name: "710.90 | 477.8" },
    { id: 378, name: "810.47 | 544.7" },
    { id: 379, name: "909.54 | 611.3" },
    { id: 380, name: "1008.12 | 677.5" },
    { id: 381, name: "331.49 | 222.8" },
    { id: 382, name: "440.99 | 296.4" },
    { id: 383, name: "550.00 | 369.6" },
    { id: 384, name: "658.51 | 442.6" },
    { id: 385, name: "766.52 | 515.1" },
    { id: 386, name: "874.04 | 587.4" },
    { id: 387, name: "981.06 | 659.3" },
    { id: 388, name: "1087.58 | 730.9" },
    { id: 389, name: "355.33 | 238.8" },
    { id: 390, name: "472.78 | 317.7" },
    { id: 391, name: "589.73 | 396.3" },
    { id: 392, name: "706.18 | 474.6" },
    { id: 393, name: "822.14 | 552.5" },
    { id: 394, name: "937.61 | 630.1" },
    { id: 395, name: "1052.57 | 707.4" },
    { id: 396, name: "1167.04 | 784.3" }

  ];

  threadList: Thread[] = [
    { id: 1, name: "AB TC-II" },
    { id: 2, name: "AMS-28" },
    { id: 3, name: "API BTC" },
    { id: 4, name: "API EUE" },
    { id: 5, name: "API FH" },
    { id: 6, name: "API IF" },
    { id: 7, name: "API NUE" },
    { id: 8, name: "API STC 8RD" },
    { id: 9, name: "BTC" },
    { id: 10, name: "BTC-6" },
    { id: 11, name: "BTC-8" },
    { id: 12, name: "BUTTWELD" },
    { id: 13, name: "HUNTING FOX" }
  ];

  materialList: Material[] = [
    { id: 1, name: "Carbon Steel" },
    { id: 2, name: "9CR" },
    { id: 3, name: "13CR" },
    { id: 4, name: "22CR" },
    { id: 5, name: "25CR" },
    { id: 6, name: "Other" }
  ];

  // Completion lists
  completionTypeList: CompletionType[] = [
    { id: 1, name: "Producer" },
    { id: 2, name: "Injector" },
    { id: 3, name: "Cyclic" },
    { id: 4, name: "Observation" },
    { id: 5, name: "Disposal" }
  ];

  producedFluidList: ProducedfluidType[] = [
    { id: 1, name: "Oil" },
    { id: 2, name: "Gas" },
    { id: 3, name: "Gas Condensate" },
    { id: 4, name: "Water" },
    { id: 5, name: "Other" }
  ];

  injectedFluidList: InjectedfluidType[] = [
    { id: 1, name: "Gas" },
    { id: 2, name: "Water" },
    { id: 3, name: "CO2" },
    { id: 4, name: "Steam" },
    { id: 5, name: "Water Alternating Gas" },
    { id: 6, name: "Other" }
  ];

  completionClassList: CompletionClass[] = [
    { id: 1, name: "Cased & Perfd" },
    { id: 2, name: "Slotter Liner" },
    { id: 3, name: "Open Hole" },
    { id: 4, name: "Sliding Sleeves" }
  ];

  sandControlType: SandControl[] = [
    { id: 7, name: "None" },
    { id: 1, name: "Gravel Pack" },
    { id: 2, name: "Stimpack" },
    { id: 3, name: "High Rate Water Pack" },
    { id: 4, name: "Standalone Screens" },
    { id: 5, name: "Expendables" },
    { id: 6, name: "Other" }
  ];

  rockTypeList: RockType[] = [
    { id: 1, name: "SandStone" },
    { id: 2, name: "Carbonate" },
    { id: 3, name: "Coal Bed Methane" },
    { id: 4, name: "Fractured Basement" },
    { id: 5, name: "Tar Sand" },
    { id: 6, name: "Shale" }
  ];


  toolsCompanyList: ToolsCompany[] = [
    { id: 1, name: "ABTC" },
    { id: 2, name: "AMS28" },
    { id: 3, name: "APIBTC" },
    { id: 4, name: "APIEUE" },
    { id: 5, name: "APIFH" },
    { id: 6, name: "APIIF" },
    { id: 7, name: "APINUE" },
    { id: 8, name: "APISTC8RD" },
    { id: 9, name: "BTC" },
    { id: 10, name: "BTC6" },
    { id: 11, name: "BTC8" },
    { id: 12, name: "BUTTWELD" },
    { id: 13, name: "HUNTINGFOX" }
  ];

  pumpingCompanyList: PumpingCompany[] = [
    { id: 1, name: "ABTC" },
    { id: 2, name: "AMS28" },
    { id: 3, name: "APIBTC" },
    { id: 4, name: "APIEUE" },
    { id: 5, name: "APIFH" },
    { id: 6, name: "APIIF" },
    { id: 7, name: "APINUE" },
    { id: 8, name: "APISTC8RD" },
    { id: 9, name: "BTC" },
    { id: 10, name: "BTC6" },
    { id: 11, name: "BTC8" },
    { id: 12, name: "BUTTWELD" },
    { id: 13, name: "HUNTINGFOX" }
  ];

  screenProviderList: ScreenProvider[] = [
    { id: 1, name: "ABTC" },
    { id: 2, name: "AMS28" },
    { id: 3, name: "APIBTC" },
    { id: 4, name: "APIEUE" },
    { id: 5, name: "APIFH" },
    { id: 6, name: "APIIF" },
    { id: 7, name: "APINUE" },
    { id: 8, name: "APISTC8RD" },
    { id: 9, name: "BTC" },
    { id: 10, name: "BTC6" },
    { id: 11, name: "BTC8" },
    { id: 12, name: "BUTTWELD" },
    { id: 13, name: "HUNTINGFOX" }
  ];

  fluidTypeList: FluidType[] = [
    { id: 1, name: "ABTC" },
    { id: 2, name: "AMS28" },
    { id: 3, name: "APIBTC" },
    { id: 4, name: "APIEUE" },
    { id: 5, name: "APIFH" },
    { id: 6, name: "APIIF" },
    { id: 7, name: "APINUE" },
    { id: 8, name: "APISTC8RD" },
    { id: 9, name: "BTC" },
    { id: 10, name: "BTC6" },
    { id: 11, name: "BTC8" },
    { id: 12, name: "BUTTWELD" },
    { id: 13, name: "HUNTINGFOX" }
  ];

  screenToolsTypeList: ScreenType[] = [
    { id: 1, name: "ABTC" },
    { id: 2, name: "AMS28" },
    { id: 3, name: "APIBTC" },
    { id: 4, name: "APIEUE" },
    { id: 5, name: "APIFH" },
    { id: 6, name: "APIIF" },
    { id: 7, name: "APINUE" },
    { id: 8, name: "APISTC8RD" },
    { id: 9, name: "BTC" },
    { id: 10, name: "BTC6" },
    { id: 11, name: "BTC8" },
    { id: 12, name: "BUTTWELD" },
    { id: 13, name: "HUNTINGFOX" }
  ];

  toolsTypeList: ToolType[] = [
    { id: 1, name: "ABTC" },
    { id: 2, name: "AMS28" },
    { id: 3, name: "APIBTC" },
    { id: 4, name: "APIEUE" },
    { id: 5, name: "APIFH" },
    { id: 6, name: "APIIF" },
    { id: 7, name: "APINUE" },
    { id: 8, name: "APISTC8RD" },
    { id: 9, name: "BTC" },
    { id: 10, name: "BTC6" },
    { id: 11, name: "BTC8" },
    { id: 12, name: "BUTTWELD" },
    { id: 13, name: "HUNTINGFOX" }
  ];

  filterTypeList: FilterType[] = [
    { id: 1, name: "ABTC" },
    { id: 2, name: "AMS28" },
    { id: 3, name: "APIBTC" },
    { id: 4, name: "APIEUE" },
    { id: 5, name: "APIFH" },
    { id: 6, name: "APIIF" },
    { id: 7, name: "APINUE" },
    { id: 8, name: "APISTC8RD" },
    { id: 9, name: "BTC" },
    { id: 10, name: "BTC6" },
    { id: 11, name: "BTC8" },
    { id: 12, name: "BUTTWELD" },
    { id: 13, name: "HUNTINGFOX" }
  ];

  tubeTypeList: TubeType[] = [
    { id: 1, name: "ABTC" },
    { id: 2, name: "AMS28" },
    { id: 3, name: "APIBTC" },
    { id: 4, name: "APIEUE" },
    { id: 5, name: "APIFH" },
    { id: 6, name: "APIIF" },
    { id: 7, name: "APINUE" },
    { id: 8, name: "APISTC8RD" },
    { id: 9, name: "BTC" },
    { id: 10, name: "BTC6" },
    { id: 11, name: "BTC8" },
    { id: 12, name: "BUTTWELD" },
    { id: 13, name: "HUNTINGFOX" }
  ];

  sandControlFlag = false;
  step = 0;

  filteredCustomers!: Observable<Customer[]>;
  filteredWells!: Observable<Well[]>;
  filteredAccounts!: Observable<SalesAccount[]>;
  filteredFields!: Observable<Field[]>;

  // Searching Data Form Controls
  projectFormControl=new FormControl('');
  operationFormControl=new FormControl('');
  operationActivityFormControl=new FormControl('');
  activityJobFormControl=new FormControl('');
  // Customer Data Form Controls
  wellFormControl = new FormControl('');
  wellTypeFormControl = new FormControl('');
  customerFormControl = new FormControl('');
  accountFormControl = new FormControl('');
  countryFormControl = new FormControl('');
  basinFormControl = new FormControl('');
  fieldFormControl = new FormControl('');
  geoUnitFormControl = new FormControl('');
  enviromentFormControl = new FormControl('');
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
    // Form controls for autocomplete behaivour
    this.filteredCustomers = this.customerFormControl.valueChanges.pipe(
      startWith(''), map(value => this.FilterCustomers(value || ''))
    );
    this.filteredWells = this.wellFormControl.valueChanges.pipe(
      startWith(''), map(value => this.FilterWells(value || ''))
    );
    this.filteredAccounts = this.accountFormControl.valueChanges.pipe(
      startWith(''), map(value => this.FilterAccounts(value || ''))
    );
    this.filteredFields = this.fieldFormControl.valueChanges.pipe(
      startWith(''), map(value => this.FilterFields(value || ''))
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
  private FilterAccounts(value: string): SalesAccount[] {
    let searchValue = value.toLocaleLowerCase();
    return this.salesAccountList.filter(option => option.name.toLocaleLowerCase().includes(searchValue));
  }

  private FilterFields(value: string): Field[] {
    let searchValue = value.toLocaleLowerCase();
    return this.fieldList.filter(option => option.name.toLocaleLowerCase().includes(searchValue));
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

  public ClearCustomerData() {
    this.well = new Well(0, "");
    this.PopulateCustomerData();
  }

  public ClearStemData(){
    this.stem=new Stem();
    this.PopulateStemData(this.stem);
  }

  public PopulateCustomerData() {
    this.wellFormControl.setValue(this.well.name);
    this.wellTypeFormControl.setValue(this.well.type.name);
    this.customerFormControl.setValue(this.well.customer.name);
    this.accountFormControl.setValue(this.well.account.name);
    this.countryFormControl.setValue(this.well.mgtCountry.name);
    this.basinFormControl.setValue(this.well.basin.name);
    this.fieldFormControl.setValue(this.well.field.name);
    this.geoUnitFormControl.setValue(this.well.geoUnit.name);
    this.enviromentFormControl.setValue(this.well.enviroment.name);
  }

  private PopulateWellData() {
    for (let i = 0; i < this.wellList.length; i++) {

      this.wellList[i].customer = this.customerList[i];
      this.wellList[i].account = this.salesAccountList[i];
      this.wellList[i].field = this.fieldList[i];
      this.wellList[i].geoUnit = this.geoUnitList[1];
      this.wellList[i].enviroment = this.enviromentList[1];
      this.wellList[i].type = this.wellTypeList[1];
      this.wellList[i].mgtCountry = this.mgtCountryList[1];
      this.wellList[i].basin = this.basinList[1];
    }
    this.wellList[71].customer = this.customerList[53];
    this.wellList[71].account = this.salesAccountList[53];
    this.wellList[71].field = this.fieldList[71];
    this.wellList[71].geoUnit = this.geoUnitList[1];
    this.wellList[71].enviroment = this.enviromentList[1];
    this.wellList[71].type = this.wellTypeList[1];
    this.wellList[71].mgtCountry = this.mgtCountryList[9];
    this.wellList[71].basin = this.basinList[1];

    this.PopulateTestScenario();
  }

  private PopulateTestScenario() {

    let wellIndex = this.wellList.findIndex(b => b.name === 'TPTA-031');

    this.wellList[wellIndex].projectId ='P.NWY.000030';
    this.wellList[wellIndex].operationId ='O.NWY.000030.01';
    this.wellList[wellIndex].operationActivityId ='O.NWY.000001.01.01';


    this.wellList[wellIndex].customer = this.customerList.find(
      p => p.name === 'PAM') ?? new Customer(0, '');
    this.wellList[wellIndex].account = this.salesAccountList.find(
      p => p.name === 'PETROAMAZONAS ECUADOR S.A.') ?? new SalesAccount(0, '');
    this.wellList[wellIndex].type = this.wellTypeList.find(
      p => p.name === 'Oil Production') ?? new WellType(0, '');
    this.wellList[wellIndex].basin = this.basinList.find(
      p => p.name === 'AML') ?? new Basin(0, '');
    this.wellList[wellIndex].geoUnit = this.geoUnitList.find(
      p => p.name === 'ECP') ?? new GeoUnit(0, '');
    this.wellList[wellIndex].mgtCountry = this.mgtCountryList.find(
      p => p.name === 'Ecuador') ?? new Country(0, '');
    this.wellList[wellIndex].field = this.fieldList.find(
      p => p.name === 'TIPUTINI') ?? new Field(0, '');
    this.wellList[wellIndex].enviroment = this.enviromentList.find(
      p => p.name === 'Land') ?? new Enviroment(0, '');

      
  }

  public SaveCustomerData() {

    this.well.name = this.wellFormControl.value ?? ''
    /*
    alert(' well: ' + this.well.name + 
          ' welltype: ' + this.well.type.name +
          ' customer: ' + this.well.customer.name +
          ' account: ' + this.well.account.name +
          ' basin: ' + this.well.basin.name +
          ' geoUnit: ' + this.well.geoUnit.name +
          ' country: ' + this.well.mgtCountry.name +
          ' field: ' + this.well.field.name +
          ' enviroment: ' + this.well.enviroment.name           
          );
    */

    this.trackRecord.well = this.well;
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

    this.SendPopupNotification('The management information has been added to the record: '
      + this.trackRecord.id);

    this.isManagementInfoFinished = true;
    this.nextStep();
  }

  public SaveWellDetailedData() {
    this.well.waterDepth = parseFloat(this.waterDepthFormControl.value ?? '');
    this.well.mdDistance = parseFloat(this.mdDistanceFormControl.value ?? '');
    this.well.tvdDistance = parseFloat(this.tvdDistanceFormControl.value ?? '');
    /*
    alert(' Water depth: ' + this.well.waterDepth + 
    ' Max deviation: ' + this.well.maxDeviation.name +
    ' Md meassured from: ' + this.well.mdMeasuredFrom +
    ' tvd meassured from: ' + this.well.tvdMeasuredFrom +
    ' md distance: ' + this.well.mdDistance +
    ' tvd distance: ' + this.well.tvdDistance +
    ' md units: ' + this.well.mdUnits.name +
    ' tvd units: ' + this.well.tvdUnits.name +
    ' upper completion: ' + this.well.upperCompletion.name + 
    ' Artificial lift: ' + this.well.artificialLift.name +
    ' Multi-lateral: ' + this.well.multiLateral.name +
    ' Liner hanger system: ' + this.well.linerHanger.name +
    ' Multistage simulation: ' + this.well.multiStage.name    
    );     
    */

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
      this.stemList[stemIndex].size.name=this.stemSizeFormControl.value?? '';
      this.stemList[stemIndex].weight.name=this.stemWeightFormControl.value?? '';
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
    return objWell ? objWell : new Well(0, '');
  }

  //EVENTS

  public OnChangeWellEvent(event: MatOptionSelectionChange, well: Well) {
    if (event.source.selected == true) {
      this.well = well;
      this.PopulateCustomerData();
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
  public OnChangeSalesAccountEvent(event: MatOptionSelectionChange, salesAccount: SalesAccount) {
    if (event.source.selected == true)
      this.well.account = salesAccount;
  }
  public OnChangeBasinEvent(event: MatOptionSelectionChange, basin: Basin) {
    if (event.source.selected == true)
      this.well.basin = basin;
  }
  public OnChangeGeoUnitEvent(event: MatOptionSelectionChange, geoUnit: GeoUnit) {
    if (event.source.selected == true)
      this.well.geoUnit = geoUnit;
  }
  public OnChangeMgtCountryEvent(event: MatOptionSelectionChange, mgtCountry: Country) {
    if (event.source.selected == true)
      this.well.mgtCountry = mgtCountry;
  }
  public OnChangeFieldEvent(event: MatOptionSelectionChange, field: Field) {
    if (event.source.selected == true)
      this.well.field = field;
  }
  public OnChangeEnviromentEvent(event: MatOptionSelectionChange, enviroment: Enviroment) {
    if (event.source.selected == true)
      this.well.enviroment = enviroment;
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
  private PopulateStemData(stem:Stem){

    this.stringNumberFormControl.setValue(stem.stringNumber.toString());
    this.stringTypeFormControl.setValue(stem.stringType.name);
    this.stemSizeFormControl.setValue(stem.size.name);
    this.stemWeightFormControl.setValue(stem.weight.name);
    this.stemThreadFormControl.setValue(stem.thread.name);
    this.stemMaterialFormControl.setValue(stem.material.name);
    this.stemMDTopFormControl.setValue(stem.mdTop.toString());
    this.stemMDBottomFormControl.setValue(stem.mdBottom.toString()); }

  SearchData(){
   

    if(this.projectFormControl.value!=''){
      this.well=this.wellList.find(p => p.projectId==this.projectFormControl.value)?? new Well(0,'');
      this.PopulateCustomerData();

      this.SendPopupNotification('The data have been pre-loaded');
      this.isSearchFinisehd = true;
      this.nextStep();
     
    }
    else if(this.operationFormControl.value!=''){
      this.well=this.wellList.find(p => p.operationId==this.operationFormControl.value)?? new Well(0,'');
      this.PopulateCustomerData();

      this.SendPopupNotification('The data have been pre-loaded');
      this.isSearchFinisehd = true;
      this.nextStep();
    }
    else if(this.operationActivityFormControl.value!=''){
      this.well=this.wellList.find(p => p.operationActivityId==this.operationActivityFormControl.value)?? new Well(0,'');
      this.PopulateCustomerData();

      this.SendPopupNotification('The data have been pre-loaded');
      this.isSearchFinisehd = true;
      this.nextStep();
    }
    else if(this.activityJobFormControl.value!=''){
      this.well=this.wellList.find(p => p.activityJob==this.activityJobFormControl.value)?? new Well(0,'');
      this.PopulateCustomerData();

      this.SendPopupNotification('The data have been pre-loaded');
      this.isSearchFinisehd = true;
      this.nextStep();
    }
    else{
      alert('No searching criteria ');
    }
      
  }
}
