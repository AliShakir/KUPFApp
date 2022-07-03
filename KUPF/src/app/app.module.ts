import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';
// #fake-start#
import { FakeAPIService } from './_fake/fake-api.service';
import { ViewContactComponent } from './modules/home/employeeinformation/view-contact/view-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ViewemployeeinformationComponent } from './modules/home/employeeinformation/viewemployeeinformation/viewemployeeinformation.component';
import { AddReferenceComponent } from './modules/home/setup/add-reference/add-reference.component';
import { LoginComponent } from './modules/home/auth/login/login.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SearchTabComponent } from './modules/home/_partials/search-tab/search-tab.component';
import { SearchTabModule } from './modules/home/_partials/search-tab.module';
import { SetupModule } from './modules/home/setup/setup.module';
import { ServiceSetupModule } from './modules/home/service-setup/service-setup.module';
import { FilterLabelsPipe } from './modules/home/Pipes/filter-labels.pipe';
// #fake-end#

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [
    AppComponent, 
    ViewContactComponent,
    ViewemployeeinformationComponent, 
    AddReferenceComponent, 
    LoginComponent, FilterLabelsPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    // #fake-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        })
      : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,    
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({  
      loader: {  
         provide: TranslateLoader,  
         useFactory: httpTranslateLoader,  
         deps: [HttpClient]  
         }  
      }),
      BsDatepickerModule.forRoot(),
      
  ],
  exports:[
  BsDatepickerModule,
 
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
// AOT compilation support  
export function httpTranslateLoader(http: HttpClient) {  
  return new TranslateHttpLoader(http);  
}