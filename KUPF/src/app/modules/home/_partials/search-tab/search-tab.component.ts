import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DetailedEmployee } from 'src/app/modules/models/DetailedEmployee';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { DbCommonService } from 'src/app/modules/_services/db-common.service';

@Component({
  selector: 'app-search-tab',
  templateUrl: './search-tab.component.html',
  styleUrls: ['./search-tab.component.scss']
})
export class SearchTabComponent implements OnInit {

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

  //
  @Input() arabicFont: string = 'font-family:"Tahoma","sans-serif"'
  /*----------------------------------------------------*/
  //#endregion

  formTitle: string;
  closeResult: string = '';
  searchForm: FormGroup;
  employeeForm: FormGroup;
  constructor(private commonDbService: DbCommonService,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
    //#region TO SETUP THE FORM LOCALIZATION    

    // TO GET THE LANGUAGE ID e.g. 1 = ENGLISH and 2 =  ARABIC
    this.languageType = localStorage.getItem('langType');

    // To get the selected language...
    this.language = localStorage.getItem('lang');

    // To setup the form id so will will get form labels based on form Id
    this.formId = 'SearchForm';

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
    this.initializeSearchForm();
    //
    this.initializeEmployeeForm();
  }

  initializeSearchForm() {
    this.searchForm = new FormGroup({
      employeeId: new FormControl('', Validators.required),
      pfId: new FormControl('', Validators.required),
      cId: new FormControl('', Validators.required),
    })
  }
  initializeEmployeeForm() {
    this.employeeForm = new FormGroup({
      employeeId: new FormControl(''),
      englishName: new FormControl('', Validators.required),
      arabicName: new FormControl('', Validators.required),
      empBirthday: new FormControl('', Validators.required),
      membershipJoiningDate: new FormControl('', Validators.required),
      membership: new FormControl('', Validators.required),
      empGender: new FormControl('', Validators.required),
      empMaritalStatus: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      empWorkTelephone: new FormControl('', Validators.required),
      contractType: new FormControl('', Validators.required),
      nationName: new FormControl('', Validators.required),
      departmentName: new FormControl('', Validators.required),
      occupation: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      remarks: new FormControl('', Validators.required),
    })
  }
  SearchEmployee() {
    this.commonDbService.SearchEmployee(this.searchForm.value).subscribe((response: any) => {

      this.employeeForm.patchValue({
        englishName: response.englishName,
        arabicName: response.arabicName,
        empBirthday: new Date(response.empBirthday),
        empGender: response.empGender,
        membershipJoiningDate: response.membershipJoiningDate ? new Date(response.membershipJoiningDate) : '',
        membership: response.membership,
        empMaritalStatus: response.empMaritalStatus,
        mobileNumber: response.mobileNumber,
        empWorkTelephone: response.empWorkTelephone,
        contractType: response.contractType,
        nationName: response.nationName,
        departmentName: response.departmentName,
        occupation: response.departmentName,
        salary: response.salary,
        remarks: response.remarks
      })
    }, error => {
      if (error.status === 500) {
        this.toastr.error('Please enter Employee Id or CID or PFId', 'Error');
      }
    });
  }

}
