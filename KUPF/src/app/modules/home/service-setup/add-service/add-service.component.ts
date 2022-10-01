import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ServiceTypeAndSubTypeIdsDto } from 'src/app/modules/models/FinancialService/ServiceTypeAndSubTypeIdsDto';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { SelectRefTypeDto } from 'src/app/modules/models/ReferenceDetails/SelectRefTypeDto';
import { SelectServiceSubTypeDto } from 'src/app/modules/models/ServiceSetup/SelectServiceSubTypeDto';
import { SelectServiceTypeDto } from 'src/app/modules/models/ServiceSetup/SelectServiceTypeDto';
import { DbCommonService } from 'src/app/modules/_services/db-common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
// Getting base URL of Api from enviroment.
baseUrl = environment.KUPFApiUrl;

//#region 
    /*----------------------------------------------------*/

    // Language Type e.g. 1 = ENGLISH and 2 =  ARABIC
    languageType: any;

    // Selected Language
    language: any;

    // We will get form lables from lcale storage and will put into array.
    AppFormLabels: FormTitleHd[] = [];

    // We will filter form header labels array
    formHeaderLabels: any[] = [];

    // We will filter form body labels array
    formBodyLabels: any[] = [];

    // FormId
    formId: string;

    /*----------------------------------------------------*/  
  //#endregion
  
  formTitle:string;
  closeResult: string = '';
  
  selectServiceType$:Observable<SelectServiceTypeDto[]>;
  selectServiceSubType$:Observable<SelectServiceSubTypeDto[]>;
  serviceType:number[]=[];
  serviceSubType:any[]=[];
  constructor(private httpClient: HttpClient,private commonService: DbCommonService,) { }

  ngOnInit(): void {
    //#region TO SETUP THE FORM LOCALIZATION    
    // TO GET THE LANGUAGE ID e.g. 1 = ENGLISH and 2 =  ARABIC
    this.languageType = localStorage.getItem('langType');

    // To get the selected language...
    this.language = localStorage.getItem('lang');

    // To setup the form id so will will get form labels based on form Id
    this.formId = 'AddService';

    // Check if LocalStorage is Not NULL
    if (localStorage.getItem('AppLabels') != null) {

      // Get data from LocalStorage
      this.AppFormLabels = JSON.parse(localStorage.getItem('AppLabels') || '{}');

      for (let labels of this.AppFormLabels) {

        if (labels.formID == this.formId && labels.language == this.languageType) {

          this.formHeaderLabels.push(labels);

          this.formBodyLabels.push(labels.formTitleDTLanguage);

        }
      }
    }
    //#endregion
  
    //
    this.GetServiceTypeAndSubTypes();
    
    // Filling RefType...
    
    this.commonService.GetSelectedServiceType(this.serviceType).subscribe((response:any)=>{
      console.log(response);
      this.selectServiceType$ = response;
    },error=>{
      console.log(error);
    });
    //this.selectServiceSubType$ = this.commonService.GetSelectedServiceSubType(3);
  }
  GetServiceTypeAndSubTypes(){
    this.httpClient.get<ServiceTypeAndSubTypeIdsDto[]>(this.baseUrl + `FinancialService/GetServiceTypeAndSubType`).subscribe((response:any)=>{
     for(let i=0; i<response.length;i++){
        this.serviceType.push(response[i].serviceType);
        this.serviceSubType.push(response[i].serviceSubType);
      }
    },error=>{
      console.log(error);
    })
      
  }
}
