import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeinformationRoutingModule } from './employeeinformation-routing.module';
import { AddemployeeinformationComponent } from './addemployeeinformation/addemployeeinformation.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DropdownMenusModule, WidgetsModule } from 'src/app/_metronic/partials';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../_forms/text-input/text-input.component';
import { ImportEmployeeMasterComponent } from './import-employee-master/import-employee-master.component';

@NgModule({
  declarations: [
    AddemployeeinformationComponent,
    TextInputComponent,
    ImportEmployeeMasterComponent    
  ],
  imports: [
    CommonModule,
    EmployeeinformationRoutingModule,
    InlineSVGModule,
    DropdownMenusModule,
    WidgetsModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class EmployeeinformationModule { }
