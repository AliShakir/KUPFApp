import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeinformationRoutingModule } from './employeeinformation-routing.module';
import { AddemployeeinformationComponent } from './addemployeeinformation/addemployeeinformation.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DropdownMenusModule, WidgetsModule } from 'src/app/_metronic/partials';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../_forms/text-input/text-input.component';
import { ImportEmployeeMasterComponent } from './import-employee-master/import-employee-master.component';
import { FilterLabelsPipe } from '../Pipes/filter-labels.pipe';
import { SharedModule } from '../../_sharedModule/SharedModule';
import { ViewemployeeinformationComponent } from './viewemployeeinformation/viewemployeeinformation.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    AddemployeeinformationComponent,
    TextInputComponent,
    ImportEmployeeMasterComponent,
    ViewemployeeinformationComponent  

  ],
  imports: [
    CommonModule,
    EmployeeinformationRoutingModule,
    InlineSVGModule,
    DropdownMenusModule,
    WidgetsModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  exports:[
    BsDatepickerModule,
    BsDropdownModule
  ]
})
export class EmployeeinformationModule { }
