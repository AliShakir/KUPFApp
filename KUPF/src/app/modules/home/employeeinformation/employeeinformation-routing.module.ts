import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddemployeeinformationComponent } from './addemployeeinformation/addemployeeinformation.component';
import { ViewContactComponent } from './view-contact/view-contact.component';
import { ViewemployeeinformationComponent } from './viewemployeeinformation/viewemployeeinformation.component';
const routes: Routes = [
  { path: 'add-employee', component: AddemployeeinformationComponent },
  { path: 'view-employee', component: ViewemployeeinformationComponent },
  { path: 'view-contact', component: ViewContactComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeinformationRoutingModule { }
