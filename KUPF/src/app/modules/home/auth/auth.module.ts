import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { SharedModule } from '../../_sharedModule/SharedModule';


@NgModule({
  declarations: [
    AddUserComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
