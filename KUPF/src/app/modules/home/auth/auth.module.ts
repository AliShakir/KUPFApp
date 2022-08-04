import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { SharedModule } from '../../_sharedModule/SharedModule';
import { UserFunctionsComponent } from './users/user-functions/user-functions.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserMstComponent } from './users/user-mst/user-mst.component';


@NgModule({
  declarations: [
    AddUserComponent,
    UserDetailsComponent,
    UserFunctionsComponent,
    UserMstComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    NgbModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
