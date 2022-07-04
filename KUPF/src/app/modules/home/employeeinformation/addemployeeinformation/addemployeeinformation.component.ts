
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  
  employeeForm : FormGroup;

  /*********************/
 formHeaderLabels$ :Observable<FormTitleHd[]>; 
 formBodyLabels$ :Observable<FormTitleDt[]>; 
 formBodyLabels :FormTitleDt[]=[]; 
 id:string = '';
 languageId:any;
 // FormId to get form/App language
 @ViewChild('AddEmployee') hidden:ElementRef;
/*********************/
 
  constructor(private cdr: ChangeDetectorRef,private localizationService: LocalizationService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }
 

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.employeeForm = new FormGroup({
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
  registerEmployee(){
    console.log(this.employeeForm.value);
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
    // TO get the form id...
    this.id = this.hidden.nativeElement.value;
    
    // TO GET THE LANGUAGE ID
    this.languageId = localStorage.getItem('langType');
    
    // Get form header labels
    this.formHeaderLabels$ = this.localizationService.getFormHeaderLabels(this.id,this.languageId);
    
    // Get form body labels 
    this.formBodyLabels$= this.localizationService.getFormBodyLabels(this.id,this.languageId)
    
    // Get observable as normal array of items
    this.formBodyLabels$.subscribe((data)=>{
      this.formBodyLabels = data 
      console.log(this.formBodyLabels);    
    },error=>{
      console.log(error);
    })  
    
  }
}
