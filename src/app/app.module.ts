import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EquipmentInstalledViewComponent } from './equipment-installed-view/equipment-installed-view.component';
import { PopupViewComponent } from './popup-view/popup-view.component';
import { SurfaceEquipmentViewComponent } from './surface-equipment-view/surface-equipment-view.component';
import { TrackrecordViewComponent } from './trackrecord-view/trackrecord-view.component';
import { WellViewComponent } from './well-view/well-view.component';

import{MatButtonModule} from '@angular/material/button'
import {MatIconModule, MatIconRegistry} from '@angular/material/icon'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import {
  
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {  MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { WellDetailedDataComponent } from './well-detailed-data/well-detailed-data.component';
import { StemDataComponent } from './stem-data/stem-data.component';
import { CompletionHistoryComponent } from './completion-history/completion-history.component';
import { CompletionDataComponent } from './completion-data/completion-data.component';
import { WellInformationWorkflowComponent } from './well-information-workflow/well-information-workflow.component';
import { ManagementDataComponent } from './management-data/management-data.component';
import { SearchingComponent } from './searching/searching.component';
import { CustomerDataComponent } from './customer-data/customer-data.component';
import { EquipmentWorkflowComponent } from './equipment-workflow/equipment-workflow.component';
import { MyRecordsViewComponent } from './my-records-view/my-records-view.component';
import { MatPaginator } from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FileManagementViewComponent } from './file-management-view/file-management-view.component';
import { KeyComponentViewComponent } from './key-component-view/key-component-view.component';
import { IsolationValveJobViewComponent } from './isolation-valve-job-view/isolation-valve-job-view.component';

@NgModule({
  declarations: [
    AppComponent,
    EquipmentInstalledViewComponent,
    PopupViewComponent,
    SurfaceEquipmentViewComponent,
    TrackrecordViewComponent,
    WellViewComponent,
    WellDetailedDataComponent,
    StemDataComponent,
    CompletionHistoryComponent,
    CompletionDataComponent,
    WellInformationWorkflowComponent,
    ManagementDataComponent,
    SearchingComponent,
    CustomerDataComponent,
    EquipmentWorkflowComponent,
    MyRecordsViewComponent,
    FileManagementViewComponent,
    KeyComponentViewComponent,
    IsolationValveJobViewComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatAccordion,
    MatExpansionModule,
    MatDatepickerModule,
    MatStepperModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatTableModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatPaginator,
    MatSnackBarModule   


  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    // Register the custom icon (can be in assets folder or any URL)
    this.matIconRegistry.addSvgIcon(
      'well_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/well-custom-blue.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'well-icon-white',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/well-custom-white.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'engineering-icon-white',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/engineering-white.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'repair-icon-white',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/repair-circle-white.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'file-icon-white',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/upload-file-white.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'valve-icon-white',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/valve-white.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'question-icon-white',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/question-white.svg')
    );
  }
 }
