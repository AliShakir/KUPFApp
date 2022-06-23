import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { SpecialOfferMaintenaceComponent } from './special-offer-maintenace/special-offer-maintenace.component';
import { OfferReceivedMaintenaceComponent } from './offer-received-maintenace/offer-received-maintenace.component';
import { AddCarousalComponent } from './add-carousal/add-carousal.component';
import { CarousalDetailsComponent } from './carousal-details/carousal-details.component';


@NgModule({
  declarations: [
    SpecialOfferMaintenaceComponent,
    OfferReceivedMaintenaceComponent,
    AddCarousalComponent,
    CarousalDetailsComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule
  ]
})
export class WebsiteModule { }
