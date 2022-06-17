import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchieveComponent } from './archieve/archieve.component';
import { CommunicationDetailsComponent } from './communication-details/communication-details.component';
import { CommunicationComponent } from './communication/communication.component';
import { PrintLabelsComponent } from './print-labels/print-labels.component';

const routes: Routes = [
  { path: 'communication', component: CommunicationComponent },
  { path: 'communication-details', component: CommunicationDetailsComponent },
  { path: 'print-labels', component: PrintLabelsComponent },
  { path: 'archieve', component: ArchieveComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunicationRoutingModule { }
