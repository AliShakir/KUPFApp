import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupRoutingModule } from './setup-routing.module';
import { TextInputComponent } from '../../_forms/text-input/text-input.component';
import { ReferenceDetailsComponent } from './reference-details/reference-details.component';



@NgModule({
  declarations: [
    ReferenceDetailsComponent
  ],
  imports: [
    CommonModule,
    SetupRoutingModule
  ]
})
export class SetupModule { }
