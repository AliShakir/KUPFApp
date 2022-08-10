
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormTitleDt } from 'src/app/modules/models/formTitleDt';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
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

//   /*********************/
//  formHeaderLabels$ :Observable<FormTitleHd[]>; 
//  formBodyLabels$ :Observable<FormTitleDt[]>; 
//  formBodyLabels :FormTitleDt[]=[]; 
//  id:string = '';
//  languageId:any;
//  // FormId to get form/App language
//  @ViewChild('AddEmployee') hidden:ElementRef;
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
  datePickerConfig: Partial<BsDatepickerConfig> | undefined;
  constructor(private cdr: ChangeDetectorRef,private localizationService: LocalizationService) {
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
      dateOfJoining: new FormControl('',Validators.required),
      gender: new FormControl('',Validators.required)
    })
  }
  
  get gender(){return this.addEmployeeForm.get('gender')}

 

  registerEmployee(){
    console.log(this.addEmployeeForm.value);
    console.log('OK');
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

  ngAfterViewInit() {
    // // TO get the form id...
    // this.id = this.hidden.nativeElement.value;
    
    // // TO GET THE LANGUAGE ID
    // this.languageId = localStorage.getItem('langType');
    
    // // Get form header labels
    // this.formHeaderLabels$ = this.localizationService.getFormHeaderLabels(this.id,this.languageId);
    
    // // Get form body labels 
    // this.formBodyLabels$= this.localizationService.getFormBodyLabels(this.id,this.languageId)
    
    // // Get observable as normal array of items
    // this.formBodyLabels$.subscribe((data)=>{
    //   this.formBodyLabels = data 
    //   console.log(this.formBodyLabels);    
    // },error=>{
    //   console.log(error);
    // })  
    
  }
}
