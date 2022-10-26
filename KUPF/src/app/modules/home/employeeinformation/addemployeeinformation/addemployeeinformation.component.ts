
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DetailedEmployee } from 'src/app/modules/models/DetailedEmployee';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { SelectDepartmentsDto } from 'src/app/modules/models/SelectDepartmentsDto';
import { SelectOccupationsDto } from 'src/app/modules/models/SelectOccupationsDto';
import { SelectTerminationsDto } from 'src/app/modules/models/SelectTerminationsDto';
import { DbCommonService } from 'src/app/modules/_services/db-common.service';
import { EmployeeService } from 'src/app/modules/_services/employee.service';

@Component({
  selector: 'app-addemployeeinformation',
  templateUrl: './addemployeeinformation.component.html',
  styleUrls: ['./addemployeeinformation.component.scss'],

})
export class AddemployeeinformationComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];

  //
  parentForm: FormGroup;
  addEmployeeForm: FormGroup;
  //
  jobDetailsForm: FormGroup;
  //
  membershipForm: FormGroup;
  //
  isChildFormSet = false;
  showChildComponent = false;
  //
  //
  isFormSubmitted = false;
  occupations$: Observable<SelectOccupationsDto[]>;
  departments$: Observable<SelectDepartmentsDto[]>;
  terminations$: Observable<SelectTerminationsDto[]>;
  //
  editEmployeeInformation$: Observable<DetailedEmployee[]>;
  employeeId: any;
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
  selectedStatus: number | undefined;
  maritalStatusArray = [
    { id: 1, name: 'Married' },
    { id: 2, name: 'Single' }
  ];
  selectedGender: number | undefined;
  genderArray: any = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' }
  ];
  constructor(
    private cdr: ChangeDetectorRef,
    private employeeService: EmployeeService,
    private toastrService: ToastrService,
    private commonDbService: DbCommonService,
    private fb: FormBuilder,
    private activatedRout: ActivatedRoute,
    private router:Router) {

    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue' })
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
    this.setUpParentForm();
    //
    this.employeeId = this.activatedRout.snapshot.paramMap.get('employeeId');

  }
  
  selectedOccupation: number | undefined;
  ngOnInit(): void {
    this.initializeForm();
    //
    this.initializeJobDetailsForm();
    //
    this.initializeMembershipForm();
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

    //#region Filling All dropDown from db    
    // To FillUp Occupations
    this.occupations$ = this.commonDbService.GetOccupations();
    // To FillUp Departments
    this.departments$ = this.commonDbService.GetDepartments();
    // To FillUp terminations
    this.terminations$ = this.commonDbService.GetTerminations();
    //#endregion
    // Get and fill data in Edit Mode...
    if (this.employeeId != null) {
      
      this.editEmployeeInformation$ = this.employeeService.GetEmployeeById(this.employeeId);
      this.editEmployeeInformation$.subscribe((response: any) => {
        console.log(response);        
        this.parentForm.patchValue({
          addEmployeeForm: {
            employeeId: this.employeeId,
            englishName: response.englishName,
            arabicName: response.arabicName,
            empBirthday: response.empBirthday ? new Date(response.empBirthday) : '',
            empGender: response.empGender,
            empMaritalStatus: response.empMaritalStatus,
            mobileNumber: response.mobileNumber,
            empWorkTelephone: response.empWorkTelephone,
            empWorkEmail: response.empWorkEmail,
            next2KinName: response.next2KinName,
            next2KinMobNumber: response.next2KinMobNumber
          },
          jobDetailsForm: {            
            department: response.department,
            departmentName: +response.departmentName,
            salary: response.salary,
            empCidNum: response.empCidNum,
            empPaciNum: response.empPaciNum,
            empOtherId: response.empOtherId
          },
          membershipForm: {
            membership: response.membership,
            membershipJoiningDate: response.membershipJoiningDate ? new Date(response.membershipJoiningDate) : '',
            termination: +response.termination,
            terminationDate: response.terminationDate ? new Date(response.terminationDate) : '',
          },
          financialForm: {
            loanAct: response.loanAct,
            hajjAct: response.hajjAct,
            persLoanAct: response.persLoanAct,
            consumerLoanAct: response.consumerLoanAct,
            otherAct1: response.otherAct1,
            otherAct2: response.otherAct2,
            otherAct3: response.otherAct3,
            otherAct4: response.otherAct4,
            otherAct5: response.otherAct5
          }
        })
      })

    }

  }

  initializeForm() {
    this.addEmployeeForm = this.fb.group({
      employeeId: new FormControl(''),
      englishName: new FormControl('', Validators.required),
      arabicName: new FormControl('', Validators.required),
      empBirthday: new FormControl('', Validators.required),
      empGender: new FormControl('', Validators.required),
      empMaritalStatus: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      empWorkTelephone: new FormControl('', Validators.required),
      empWorkEmail: new FormControl('', Validators.required),
      next2KinName: new FormControl('', Validators.required),
      next2KinMobNumber: new FormControl('', Validators.required)
    })
    this.parentForm.setControl('addEmployeeForm', this.addEmployeeForm);
  }
  initializeJobDetailsForm() {
    this.jobDetailsForm = this.fb.group({
      department: new FormControl('', Validators.required),
      departmentName: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      empCidNum: new FormControl('', Validators.required),
      empPaciNum: new FormControl('', Validators.required),
      empOtherId: new FormControl('', Validators.required),
    })
    this.parentForm.setControl('jobDetailsForm', this.jobDetailsForm);
  }
  initializeMembershipForm() {
    this.membershipForm = this.fb.group({
      membership: new FormControl('', Validators.required),
      membershipJoiningDate: new FormControl('', Validators.required),
      termination: new FormControl('', Validators.required),
      terminationDate: new FormControl('', Validators.required),
    })
    this.parentForm.setControl('membershipForm', this.membershipForm);
  }
  setUpParentForm() {
    this.parentForm = this.fb.group({});
  }
  //get gender(){return this.addEmployeeForm.get('gender')}


  //Save employee data...
  submitForm() {
    // Get Tenant Id
    var data = JSON.parse(localStorage.getItem("user")!);
    const tenantId = data.map((obj: { tenantId: any; }) => obj.tenantId);
    //  TO CONVER OBJECT ARRAY AS SIMPLE ARRAY.
    this.parentForm.controls.addEmployeeForm.patchValue({
      empGender: +this.parentForm.value.addEmployeeForm.empGender,
      empMaritalStatus: +this.parentForm.value.empMaritalStatus,
    });
    let formData = {
      ...this.parentForm.value.addEmployeeForm,
      ...this.parentForm.value.jobDetailsForm,
      ...this.parentForm.value.membershipForm,
      ...this.parentForm.value.financialForm,
      tenentID: tenantId[0], cruP_ID: 0
    }
    //
    this.isFormSubmitted = true;
    //
    if (this.addEmployeeForm.valid) {      
      if(this.employeeId != null){  
        console.log(formData);        
        this.employeeService.UpdateEmployee(formData).subscribe(() => {
          this.toastrService.success('Saved successfully', 'Success');
          this.parentForm.reset();
          this.router.navigateByUrl('/employee/view-employee') 
        }, error => {
            if (error.status === 500) {
              this.toastrService.error('Something went wrong', 'Error');
            }
          })
      }else{
        console.log(formData); 
        this.employeeService.AddEmployee(formData).subscribe(() => {
          this.toastrService.success('Saved successfully', 'Success');
          this.parentForm.reset();
        })
      } 
    }
  }
  //
  get empForm() { return this.addEmployeeForm.controls; }
  //
  addChildComponent(): void {
    this.showChildComponent = true;
  }

  onChange(form: FormGroup<any>) {
    // reset the form value to the newly emitted form group value.
    this.addEmployeeForm = form;
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
