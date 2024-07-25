import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { WellViewComponent } from './well-view/well-view.component';
import { TrackrecordViewComponent } from './trackrecord-view/trackrecord-view.component';
import { MyRecordsViewComponent } from './my-records-view/my-records-view.component';

const routes: Routes = [
  {path:'',component:TrackrecordViewComponent},
  {path:'home', component:TrackrecordViewComponent},
  {path:'create-well', component:WellViewComponent},
  {path:'track-record/:id', component:TrackrecordViewComponent},
  {path:'my-records', component: MyRecordsViewComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[
    provideRouter(routes,withComponentInputBinding())
  ]
})
export class AppRoutingModule { }