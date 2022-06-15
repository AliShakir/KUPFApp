import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddReferenceComponent } from './add-reference/add-reference.component';
import { ReferenceDetailsComponent } from './reference-details/reference-details.component';


const routes: Routes = [
  { path: 'add-reference', component: AddReferenceComponent },
  { path: 'reference-details', component: ReferenceDetailsComponent }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
