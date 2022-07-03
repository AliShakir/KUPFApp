import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceSetupRoutingModule } from './service-setup-routing.module';
import { ServiceSetupDetailsComponent } from './service-setup-details/service-setup-details.component';
import { AddServiceSetupComponent } from './add-service-setup/add-service-setup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddServiceComponent } from './add-service/add-service.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { AddDocumentsComponent } from './add-documents/add-documents.component';
import { ApprovalManagementComponent } from './approval-management/approval-management.component';
import { ImportEmployeeMonthlyPaymentComponent } from './import-employee-monthly-payment/import-employee-monthly-payment.component';
import { EmployeeMomentDetailsComponent } from './employee-moment-details/employee-moment-details.component';
import { AddEmployeeMomentComponent } from './add-employee-moment/add-employee-moment.component';
import { SearchTabModule } from '../_partials/search-tab.module';
import { FilterLabelsPipe } from '../Pipes/filter-labels.pipe';
@NgModule({
  declarations: [
    ServiceSetupDetailsComponent,
    AddServiceSetupComponent,
    AddServiceComponent,
    ServiceDetailsComponent,
    AddDocumentsComponent,
    ApprovalManagementComponent,
    ImportEmployeeMonthlyPaymentComponent,
    EmployeeMomentDetailsComponent,
    AddEmployeeMomentComponent,
    
  ],
  imports: [
    CommonModule,
    ServiceSetupRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SearchTabModule,
    
  ]
})
export class ServiceSetupModule { }
