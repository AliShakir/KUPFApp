import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunicationRoutingModule } from './communication-routing.module';
import { PrintLabelsComponent } from './print-labels/print-labels.component';
import { ArchieveComponent } from './archieve/archieve.component';


@NgModule({
  declarations: [
    PrintLabelsComponent,
    ArchieveComponent
  ],
  imports: [
    CommonModule,
    CommunicationRoutingModule
  ]
})
export class CommunicationModule { }
