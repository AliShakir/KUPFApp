
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
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
  
  addEmployeeForm : FormGroup;
  isChildFormSet = false;
  showChildComponent = false;
  //
  //
  isFormSubmitted = false;
  occupations$: Observable<SelectOccupationsDto[]>;
  departments$: Observable<SelectDepartmentsDto[]>;
  terminations$: Observable<SelectTerminationsDto[]>;
  
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
    private commonDbService: DbCommonService,private fb: FormBuilder) {
    this.datePickerConfig = Object.assign({},{containerClass:'theme-dark-blue'})
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }
  selectedStatus: number | undefined;
  maritalStatusArray = [
      { id: 1, name: 'Married' },
      { id: 2, name: 'Single' }
  ];
  selectedGender: number | undefined;
  genderArray = [
      { id: 1, name: 'Male' },
      { id: 2, name: 'Female' }
  ];

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
 
    //#region Filling All dropDown from db    
    // To FillUp Occupations
    this.occupations$ = this.commonDbService.GetOccupations();
    // To FillUp Departments
    this.departments$ = this.commonDbService.GetDepartments();
    // To FillUp terminations
    this.terminations$ = this.commonDbService.GetTerminations();    
    //#endregion
   
  }

  initializeForm(){
    this.addEmployeeForm = this.fb.group({
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
      membership: new FormControl('',Validators.required),
      membershipJoiningDate: new FormControl('',Validators.required),
      termination: new FormControl('',Validators.required),
      terminationDate: new FormControl('',Validators.required),
                       
    })    
  }
  
  //get gender(){return this.addEmployeeForm.get('gender')}

 
//Save employee data...
  submitForm(){ 
    //
    this.isFormSubmitted = true;   
    //
    if(this.addEmployeeForm.valid){
      this.employeeService.AddEmployee(this.addEmployeeForm.value).subscribe(()=>{
        this.toastrService.success('Saved successfully','Success');   
        this.addEmployeeForm.reset();
      })
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
