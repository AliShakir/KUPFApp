import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupRoutingModule } from './setup-routing.module';
import { ReferenceDetailsComponent } from './reference-details/reference-details.component';
import { AddUniversityTenantComponent } from './add-university-tenant/add-university-tenant.component';
import { AddEmployeeDiscountComponent } from './add-employee-discount/add-employee-discount.component';
import { EmployeeDiscountDetailsComponent } from './employee-discount-details/employee-discount-details.component';
import { AddEmployeeCertificateComponent } from './add-employee-certificate/add-employee-certificate.component';
import { EmployeeCertificateDetailsComponent } from './employee-certificate-details/employee-certificate-details.component';
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component';
import { SubscriptionDetailsComponent } from './subscription-details/subscription-details.component';
import { SearchTabModule } from '../_partials/search-tab.module';
import { SearchTabComponent } from '../_partials/search-tab/search-tab.component';



@NgModule({
  declarations: [
    ReferenceDetailsComponent,
    AddUniversityTenantComponent,
    AddEmployeeDiscountComponent,
    EmployeeDiscountDetailsComponent,
    AddEmployeeCertificateComponent,
    EmployeeCertificateDetailsComponent,
    AddSubscriptionComponent,
    SubscriptionDetailsComponent
    
  ],
  imports: [
    CommonModule,
    SetupRoutingModule,
    SearchTabModule
  ]
})
export class SetupModule { }
