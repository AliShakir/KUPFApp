import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDocumentsComponent } from './add-documents/add-documents.component';
import { AddEmployeeMovementComponent } from './add-employee-moment/add-employee-movement.component';
import { AddServiceSetupComponent } from './add-service-setup/add-service-setup.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { ApprovalManagementComponent } from './approval-management/approval-management.component';
import { EmployeeMovementDetailsComponent } from './employee-moment-details/employee-movement-details.component';
import { ImportEmployeeMonthlyPaymentComponent } from './import-employee-monthly-payment/import-employee-monthly-payment.component';
import { ManageFormLabelsComponent } from '../setup/manage-form-labels/manage-form-labels.component';


import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceSetupDetailsComponent } from './service-setup-details/service-setup-details.component';

const routes: Routes = [
  { path: 'service-setup-details', component: ServiceSetupDetailsComponent },
  { path: 'add-service-setup', component: AddServiceSetupComponent },
  { path: 'add-service-setup/:serviceId', component: AddServiceSetupComponent },
  { path: 'add-service', component: AddServiceComponent },
  { path: 'service-details', component: ServiceDetailsComponent },
  { path: 'add-documents', component: AddDocumentsComponent },
  { path: 'manage-approvals', component: ApprovalManagementComponent },
  { path: 'import-emplyee-monthly-payment', component: ImportEmployeeMonthlyPaymentComponent },
  { path: 'add-employee-movement', component: AddEmployeeMovementComponent },
  { path: 'employee-movement-details', component: EmployeeMovementDetailsComponent }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceSetupRoutingModule { }
