import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchTabComponent } from './search-tab/search-tab.component';
import { FinancialDetialsComponent } from './financial-detials/financial-detials.component';
import { ApprovalDetialsComponent } from './approval-detials/approval-detials.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { SharedModule } from '../../_sharedModule/SharedModule';
import { SortPipe } from '../Pipes/sort.pipe';



@NgModule({
  declarations: [
    SearchTabComponent,
    FinancialDetialsComponent,
    ApprovalDetialsComponent,
    ContactDetailsComponent,
    SortPipe
  ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    
  ],
  exports: [
    SearchTabComponent,
    FinancialDetialsComponent,
    ApprovalDetialsComponent,
    ContactDetailsComponent,
    SortPipe
  ]
})
export class SearchTabModule { }
