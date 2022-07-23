import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';

@Component({
  selector: 'app-add-service-setup',
  templateUrl: './add-service-setup.component.html',
  styleUrls: ['./add-service-setup.component.scss']
})
export class AddServiceSetupComponent implements OnInit {

  serviceSetupForm : FormGroup;
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
    this.initializeForm();
    
    //#region TO SETUP THE FORM LOCALIZATION    
    // TO GET THE LANGUAGE ID e.g. 1 = ENGLISH and 2 =  ARABIC
    this.languageType = localStorage.getItem('langType');

    // To get the selected language...
    this.language = localStorage.getItem('lang');

    // To setup the form id so will will get form labels based on form Id
    this.formId = 'AddServiceSetup';

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
  initializeForm(){
    this.serviceSetupForm = new FormGroup({
      employeeName: new FormControl('',Validators.required),
      monthlySalary: new FormControl('',Validators.required),
      landLine: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      kinName: new FormControl('',Validators.required),
      kinMobile: new FormControl('',Validators.required),
      membership: new FormControl('',Validators.required),
      membershipJoiningDate: new FormControl('',Validators.required),
      termination: new FormControl('',Validators.required),
      terminationDate: new FormControl('',Validators.required),
      civilId: new FormControl('',Validators.required),
      paci: new FormControl('',Validators.required),
      otherId: new FormControl('',Validators.required),
      loanAccount: new FormControl('',Validators.required),
      hajjAccount: new FormControl('',Validators.required),
      perLoadAct: new FormControl('',Validators.required),
      consumerLoan: new FormControl('',Validators.required),
      otherAcc1: new FormControl('',Validators.required),
      otherAcc2: new FormControl('',Validators.required),
      otherAcc3: new FormControl('',Validators.required),
      otherAcc4: new FormControl('',Validators.required),
      dateOfJoining: new FormControl('',Validators.required)
    })
  }
  addServiceSetup(){
    console.log(this.serviceSetupForm.value);
  }
}
