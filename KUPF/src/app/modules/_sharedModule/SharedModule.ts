import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FilterLabelsPipe } from "../home/Pipes/filter-labels.pipe";
import { ImportEmployeeMonthlyPaymentComponent } from "../home/service-setup/import-employee-monthly-payment/import-employee-monthly-payment.component";

@NgModule({
    declarations:[
        FilterLabelsPipe
    ],

    exports: [FilterLabelsPipe]
})

export class SharedModule{
}