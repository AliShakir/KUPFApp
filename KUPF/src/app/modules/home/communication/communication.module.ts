import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunicationRoutingModule } from './communication-routing.module';
import { PrintLabelsComponent } from './print-labels/print-labels.component';
import { ArchieveComponent } from './archieve/archieve.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddOutgoingLettersComponent } from './add-outgoing-letters/add-outgoing-letters.component';
import { OutgoingLetterDetailsComponent } from './outgoing-letter-details/outgoing-letter-details.component';
import { AddIncomingLettersComponent } from './add-incoming-letters/add-incoming-letters.component';
import { IncomingLetterDetailsComponent } from './incoming-letter-details/incoming-letter-details.component';


@NgModule({
  declarations: [
    PrintLabelsComponent,
    ArchieveComponent,
    AddOutgoingLettersComponent,
    OutgoingLetterDetailsComponent,
    AddIncomingLettersComponent,
    IncomingLetterDetailsComponent
  ],
  imports: [
    CommonModule,
    CommunicationRoutingModule,  
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class CommunicationModule { }
