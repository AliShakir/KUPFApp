import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormTitleDt } from 'src/app/modules/models/formTitleDt';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { LocalizationService } from 'src/app/modules/_services/localization.service';

@Component({
  selector: 'app-import-employee-master',
  templateUrl: './import-employee-master.component.html',
  styleUrls: ['./import-employee-master.component.scss']
})
export class ImportEmployeeMasterComponent implements OnInit {
 
// /*********************/
//  formHeaderLabels$ :Observable<FormTitleHd[]>; 
//  formBodyLabels$ :Observable<FormTitleDt[]>; 
//  formBodyLabels :FormTitleDt[]=[]; 
//  id:string = '';
//  languageId:any;
//  // FormId to get form/App language
//  @ViewChild('ImportEmployeeMaster') hidden:ElementRef;
// /*********************/
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


  constructor() { }

  ngOnInit(): void {
    //#region TO SETUP THE FORM LOCALIZATION    
    // TO GET THE LANGUAGE ID e.g. 1 = ENGLISH and 2 =  ARABIC
    this.languageType = localStorage.getItem('langType');

    // To get the selected language...
    this.language = localStorage.getItem('lang');

    // To setup the form id so will will get form labels based on form Id
    this.formId = 'ImportEmployeeMaster';

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
  }
  
  // ngAfterViewInit() {
  //   // TO get the form id...
  //   this.id = this.hidden.nativeElement.value;
    
  //   // TO GET THE LANGUAGE ID
  //   this.languageId = localStorage.getItem('langType');
    
  //   // Get form header labels
  //   this.formHeaderLabels$ = this.localizationService.getFormHeaderLabels(this.id,this.languageId);
    
  //   // Get form body labels 
  //   this.formBodyLabels$= this.localizationService.getFormBodyLabels(this.id,this.languageId)
    
  //   // Get observable as normal array of items
  //   this.formBodyLabels$.subscribe((data)=>{
  //     this.formBodyLabels = data      
  //   },error=>{
  //     console.log(error);
  //   })  
    
  // }
}
