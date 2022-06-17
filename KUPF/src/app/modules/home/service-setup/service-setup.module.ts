import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceSetupRoutingModule } from './service-setup-routing.module';
import { ServiceSetupDetailsComponent } from './service-setup-details/service-setup-details.component';
import { AddServiceSetupComponent } from './add-service-setup/add-service-setup.component';
import { TextInputComponent } from '../../_forms/text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddServiceComponent } from './add-service/add-service.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { AddDocumentsComponent } from './add-documents/add-documents.component';
import { ApprovalManagementComponent } from './approval-management/approval-management.component';
import { ImportEmployeeMonthlyPaymentComponent } from './import-employee-monthly-payment/import-employee-monthly-payment.component';


@NgModule({
  declarations: [
    ServiceSetupDetailsComponent,
    AddServiceSetupComponent,
    AddServiceComponent,
    ServiceDetailsComponent,
    AddDocumentsComponent,
    ApprovalManagementComponent,
    ImportEmployeeMonthlyPaymentComponent,
  ],
  imports: [
    CommonModule,
    ServiceSetupRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ServiceSetupModule { }
