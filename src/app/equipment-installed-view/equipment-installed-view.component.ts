import { Component, Input, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { SurfaceRunningEquipment } from '../models/surface-running-equipment';
import { Well } from '../models/well';
import { CatalogNode } from '../models/catalog-node';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupViewComponent } from '../popup-view/popup-view.component';
import { EquipmentInstalled } from '../models/equipment-installed';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-equipment-installed-view',
  templateUrl: './equipment-installed-view.component.html',
  styleUrl: './equipment-installed-view.component.css'
})
export class EquipmentInstalledViewComponent {
  @ViewChild(MatTable)
  table!: MatTable<EquipmentInstalled>;

  @Input()projectId:string='';
  @Input() operationId:string='';
  @Input() operationActivityId:string='';

  well: Well = new Well();

  catalogNodeList: CatalogNode[] = [
    { id: 103354908, name: "CLAMP" }
  ];

  isEquipmentFinished: boolean = false;


  filteredCatalogNodes!: Observable<CatalogNode[]>;

  step: number = 0;

  equipmentList: EquipmentInstalled[] = [
  ];

  columns: string[] = ['Product-Number', 'Catalog-Node',
    'Serial', 'Deviation', 'MD', 'TVD', 'Is-Key-Component', 'Is-Third-Part', 'Action'];

  //Form Controls
  productNumberFormControl = new FormControl('');
  catalogNodeFormControl = new FormControl('');
  descriptionFormControl = new FormControl('');
  serialFormControl = new FormControl('');
  deviationFormControl = new FormControl('');
  mdFormControl = new FormControl('');
  tvdFormControl = new FormControl('');
  keyComponentFormControl = new FormControl('');
  thirdPartComponentFormControl = new FormControl('');

  public constructor(private dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.filteredCatalogNodes = this.catalogNodeFormControl.valueChanges.pipe(
      startWith(''), map(value => this.GetFilteredCatalogNodes(value || '')));
 
  }

  setStep(index: number) { this.step = index; }
  nextStep() { this.step++; }
  prevStep() { this.step--; }

  private GetFilteredCatalogNodes(filter: string): CatalogNode[] {
    let searchValue = filter.toLocaleLowerCase();
    return this.catalogNodeList.filter(option =>
      option.name.toLocaleLowerCase().includes(searchValue));
  }

  //Event methods
  onChangeCatalogNodeEvent(event: MatOptionSelectionChange, CatalogNode: CatalogNode) {
    if (event.source.selected == true) {
    }
  }
  //Save Events

  SaveEquipment() {
    let index = this.equipmentList.findIndex(
      e => e.productNumber == parseInt(this.productNumberFormControl.value ?? ''));

    if (index !== -1) {
      this.equipmentList[index].productNumber =
        parseFloat(this.productNumberFormControl.value ?? '');
      this.equipmentList[index].catalogNode.name =
        this.catalogNodeFormControl.value ?? '';
      this.equipmentList[index].description =
        this.descriptionFormControl.value ?? '';
      this.equipmentList[index].deviation =
        parseFloat(this.deviationFormControl.value ?? '');
      this.equipmentList[index].md =
        parseFloat(this.mdFormControl.value ?? '');
      this.equipmentList[index].tvd =
        parseFloat(this.tvdFormControl.value ?? '');
      this.equipmentList[index].isThirdPart =
        this.thirdPartComponentFormControl.value?.toString() == 'true';
      this.equipmentList[index].isKeyComponent =
        this.keyComponentFormControl.value?.toString() == 'true';

      this.SendPopupNotification('The equipmnet has been updated');
    }
    else {
      let equipment: EquipmentInstalled = new EquipmentInstalled();
      equipment.productNumber = parseFloat(this.productNumberFormControl.value ?? '');
      equipment.catalogNode.name = this.catalogNodeFormControl.value ?? '';
      equipment.description = this.descriptionFormControl.value ?? '';
      equipment.serial = this.serialFormControl.value ?? '';
      equipment.deviation = parseFloat(this.deviationFormControl.value ?? '');
      equipment.md = parseFloat(this.mdFormControl.value ?? '');
      equipment.tvd = parseFloat(this.tvdFormControl.value ?? '');
      equipment.isThirdPart = this.thirdPartComponentFormControl.value?.toString() == 'true';
      equipment.isKeyComponent = this.keyComponentFormControl.value?.toString() == 'true';

      this.equipmentList.push(equipment);
      this.SendPopupNotification('The equipmet has been added to the record');

    }
    this.isEquipmentFinished = true;
    this.ClearEquipment();
    this.table.renderRows();
  }

  ClearEquipment() {
    this.catalogNodeFormControl.setValue('');
    this.productNumberFormControl.setValue('');
    this.serialFormControl.setValue('');
    this.deviationFormControl.setValue('');
    this.descriptionFormControl.setValue('');
    this.mdFormControl.setValue('');
    this.tvdFormControl.setValue('');
  }

  EditEquipment(productNumber: number, toggleKeyComponet: MatSlideToggle,
    toggleThirdComponent: MatSlideToggle) {
    let equipment: EquipmentInstalled;

    equipment = this.equipmentList.find
      (b => b.productNumber === productNumber) ?? new EquipmentInstalled();

    this.productNumberFormControl.setValue(equipment.productNumber.toString());
    this.catalogNodeFormControl.setValue(equipment.catalogNode.name);
    this.descriptionFormControl.setValue(equipment.description);
    this.serialFormControl.setValue(equipment.serial);
    this.deviationFormControl.setValue(equipment.deviation.toString());
    this.mdFormControl.setValue(equipment.md.toString());
    this.tvdFormControl.setValue(equipment.tvd.toString());
    toggleKeyComponet.checked = equipment.isKeyComponent;
    toggleThirdComponent.checked = equipment.isThirdPart;
  }

  private SendPopupNotification(message: string) {
    this.dialogRef.open(PopupViewComponent, {
      data: {
        message: message
      }
    });
  }

  OnCatalogChange(event: MatOptionSelectionChange, catalogNode: CatalogNode) {
    if (event.source.selected == true) {
      this.productNumberFormControl.setValue(catalogNode.id.toString());
    }
  }
}
