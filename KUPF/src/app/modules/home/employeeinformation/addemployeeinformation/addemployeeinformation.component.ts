
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DetailedEmployee } from 'src/app/modules/models/DetailedEmployee';
import { FormTitleDt } from 'src/app/modules/models/formTitleDt';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { SelectConsumerLoanAcDto } from 'src/app/modules/models/SelectConsumerLoanActDto';
import { SelectDepartmentsDto } from 'src/app/modules/models/SelectDepartmentsDto';
import { SelectHajjAcDto } from 'src/app/modules/models/SelectHajjAcDto';
import { SelectLoanAcDto } from 'src/app/modules/models/SelectLoanAcDto';
import { SelectOccupationsDto } from 'src/app/modules/models/SelectOccupationsDto';
import { SelectOtherAct1Dto } from 'src/app/modules/models/SelectOtherAct1Dto';
import { SelectOtherAct2Dto } from 'src/app/modules/models/SelectOtherAct2Dto';
import { SelectOtherAct3Dto } from 'src/app/modules/models/SelectOtherAct3Dto';
import { SelectOtherAct4Dto } from 'src/app/modules/models/SelectOtherAct4Dto';
import { SelectPerLoanActDto } from 'src/app/modules/models/SelectPerLoanActDto';
import { SelectTerminationsDto } from 'src/app/modules/models/SelectTerminationsDto';
import { DbCommonService } from 'src/app/modules/_services/db-common.service';
import { EmployeeService } from 'src/app/modules/_services/employee.service';
import { LocalizationService } from 'src/app/modules/_services/localization.service';

@Component({
  selector: 'app-addemployeeinformation',
  templateUrl: './addemployeeinformation.component.html',
  styleUrls: ['./addemployeeinformation.component.scss']
})
export class AddemployeeinformationComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];
  
  addEmployeeForm : FormGroup;

  //
  occupations$: Observable<SelectOccupationsDto[]>;
  departments$: Observable<SelectDepartmentsDto[]>;
  terminations$: Observable<SelectTerminationsDto[]>;

  hajjAccounts$: Observable<SelectHajjAcDto[]>;
  loanAccounts$: Observable<SelectLoanAcDto[]>;
  perLoanAccounts$: Observable<SelectPerLoanActDto[]>;
  consumerLoanAccounts$: Observable<SelectConsumerLoanAcDto[]>;
  otherAct1$: Observable<SelectOtherAct1Dto[]>;
  otherAct2$: Observable<SelectOtherAct2Dto[]>;
  otherAct3$: Observable<SelectOtherAct3Dto[]>;
  otherAct4$: Observable<SelectOtherAct4Dto[]>;
  
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
  datePickerConfig: Partial<BsDatepickerConfig> | undefined;
  constructor(
    private cdr: ChangeDetectorRef,
    private employeeService: EmployeeService,
    private toastrService: ToastrService,
    private commonDbService: DbCommonService) {
    this.datePickerConfig = Object.assign({},{containerClass:'theme-dark-blue'})
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }
 

  ngOnInit(): void {
    this.initializeForm();
     //#region TO SETUP THE FORM LOCALIZATION    
    // TO GET THE LANGUAGE ID e.g. 1 = ENGLISH and 2 =  ARABIC
    this.languageType = localStorage.getItem('langType');

    // To get the selected language...
    this.language = localStorage.getItem('lang');

    // To setup the form id so will will get form labels based on form Id
    this.formId = 'AddEmployee';

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
 
    // To FillUp Occupations
    this.occupations$ = this.commonDbService.GetOccupations();
    // To FillUp Departments
    this.departments$ = this.commonDbService.GetDepartments();
    // To FillUp terminations
    this.terminations$ = this.commonDbService.GetTerminations();
    // To FillUp hajjAccounts
    this.hajjAccounts$ = this.commonDbService.GetHajjAccounts();
    // To FillUp LoanAcounts
    this.loanAccounts$ = this.commonDbService.GetLoanAccounts();
    // To FillUp LoanAcounts
    this.perLoanAccounts$ = this.commonDbService.GetPerLoanAccounts();
    // To FillUp ConsumerLoanAccounts
    this.consumerLoanAccounts$ = this.commonDbService.GetConsumerLoanAccounts();
    // To FillUp OtherAct1
    this.otherAct1$ = this.commonDbService.GetOtherAcc1();
    // To FillUp OtherAct2
    this.otherAct2$ = this.commonDbService.GetOtherAcc2();
    // To FillUp OtherAct3
    this.otherAct3$ = this.commonDbService.GetOtherAcc3();
    // To FillUp OtherAct4
    this.otherAct4$ = this.commonDbService.GetOtherAcc4();
   }

  initializeForm(){
    this.addEmployeeForm = new FormGroup({
      englishName: new FormControl('',Validators.required),
      arabicName: new FormControl('',Validators.required),
      empBirthday: new FormControl('',Validators.required),
      empGender: new FormControl('',Validators.required),
      empMaritalStatus: new FormControl('',Validators.required),
      mobileNumber: new FormControl('',Validators.required),
      empWorkTelephone: new FormControl('',Validators.required),
      empWorkEmail: new FormControl('',Validators.required),
      next2KinName: new FormControl('',Validators.required),
      next2KinMobNumber: new FormControl('',Validators.required),

      department: new FormControl('',Validators.required),
      departmentName: new FormControl('',Validators.required),
      salary: new FormControl('',Validators.required),
      
      empCidNum: new FormControl('',Validators.required),
      empPaciNum: new FormControl('',Validators.required),
      empOtherId: new FormControl('',Validators.required),

      loanAct: new FormControl('',Validators.required),
      hajjAct: new FormControl('',Validators.required),
      persLoanAct: new FormControl('',Validators.required),
      consumerLoan: new FormControl('',Validators.required),
      otherAct1: new FormControl('',Validators.required),
      otherAcc2: new FormControl('',Validators.required),
      otherAcc3: new FormControl('',Validators.required),
      otherAcc4: new FormControl('',Validators.required),
      dateOfJoining: new FormControl('',Validators.required),
      
    })
  }
  
  //get gender(){return this.addEmployeeForm.get('gender')}

 
//Save employee data...
  submitForm(){
    this.employeeService.AddEmployee(this.addEmployeeForm.value).subscribe(()=>{
      this.toastrService.success('Saved successfully','Success');   
      this.addEmployeeForm.reset();
    })
    
  }
saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1500);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  
}
