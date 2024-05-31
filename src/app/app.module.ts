import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EquipmentInstalledViewComponent } from './equipment-installed-view/equipment-installed-view.component';
import { PopupViewComponent } from './popup-view/popup-view.component';
import { SurfaceEquipmentViewComponent } from './surface-equipment-view/surface-equipment-view.component';
import { TrackrecordViewComponent } from './trackrecord-view/trackrecord-view.component';
import { WellViewComponent } from './well-view/well-view.component';

@NgModule({
  declarations: [
    AppComponent,
    EquipmentInstalledViewComponent,
    PopupViewComponent,
    SurfaceEquipmentViewComponent,
    TrackrecordViewComponent,
    WellViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
