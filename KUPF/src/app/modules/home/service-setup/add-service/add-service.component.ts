import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Observable, takeUntil, takeWhile } from 'rxjs';
import { TransactionHdDto } from 'src/app/modules/models/FinancialService/TransactionHdDto';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { SelectServiceTypeDto } from 'src/app/modules/models/ServiceSetup/SelectServiceTypeDto';
import { CommonService } from 'src/app/modules/_services/common.service';
import { DbCommonService } from 'src/app/modules/_services/db-common.service';
import { FinancialService } from 'src/app/modules/_services/financial.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit, OnDestroy {
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

  formTitle: string;
  closeResult: string = '';

  selectServiceType$: Observable<SelectServiceTypeDto[]>;
  selectServiceType: SelectServiceTypeDto[]=[];
  selectServiceSubType$: Observable<SelectServiceTypeDto[]>;
  selectedServiceType: any;
  selectedServiceSubType: any;
  //
  parentForm: FormGroup;
  addServiceForm: FormGroup;
  isFormSubmitted = false;
  minDate: Date;
  editService$: Observable<TransactionHdDto[]>;
  mytransid: any;
  isObservableActive = true;
  constructor(
    private financialService: FinancialService,
    private commonService: DbCommonService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private activatedRout: ActivatedRoute,
    public common: CommonService,
    public datepipe: DatePipe) {
    this.setUpParentForm();
   
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    //
    this.mytransid = this.activatedRout.snapshot.paramMap.get('mytransid');
  }

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

    this.initializeAddServiceForm();
    // Get Tenant Id
    // var data = JSON.parse(localStorage.getItem("user")!);
    // const tenantId = data.map((obj: { tenantId: any; }) => obj.tenantId);
    //
    
    
    
    if (this.mytransid) {
      this.common.ifEmployeeExists = true;
      this.financialService.GetFinancialServiceById(this.mytransid).subscribe((response:any)=>{
        
        this.selectServiceSubType$ = this.commonService.GetSubServiceTypeByServiceType(21,response.serviceType);
        this.parentForm.patchValue({
          employeeForm: {
            employeeId: response.employeeId,
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
          addServiceForm:{
            mytransid:response.mytransid,
            serviceType:response.serviceType,
            serviceSubType:response.serviceSubType,
            totinstallments:response.totinstallments,
            totamt:response.totamt,
            installmentAmount:response.installmentAmount,
            installmentsBegDate:response.installmentsBegDate ? new Date(response.installmentsBegDate) : '',
            untilMonth:response.untilMonth                  
          },
          financialForm:{
            hajjAct:response.hajjAct,
            loanAct:response.loanAct,
            persLoanAct:response.persLoanAct,
            otherAct1:response.otherAct1,
            otherAct2:response.otherAct2,
            otherAct3:response.otherAct3,
            otherAct4:response.otherAct4,
            otherAct5:response.otherAct5,
          },
          approvalDetailsForm:{
            serApproval1:response.serApproval1,
            approvalBy1:response.approvalBy1,
            approvedDate1:response.approvedDate1,
            serApproval2:response.serApproval2,
            approvalBy2:response.approvalBy2,
            approvedDate2:response.approvedDate2,
            serApproval3:response.serApproval3,
            approvalBy3:response.approvalBy3,
            approvedDate3:response.approvedDate3,
            serApproval4:response.serApproval4,
            approvalBy4:response.approvalBy4,
            approvedDate4:response.approvedDate4,
            serApproval5:response.serApproval5,
            approvalBy5:response.approvalBy5,
            approvedDate5:response.approvedDate5,
          }
        })
        console.log(this.addServiceForm.value);
      })
    }

    this.common.empSearchClickEvent.pipe(takeWhile(() => this.isObservableActive)).subscribe(result => {
      this.financialService.GetServiceType(21).subscribe((response:any) =>{  
        this.selectServiceType = response;
        if (result.trim()) {
          let index = this.selectServiceType.findIndex(x => x.refId == 1);
          if (index >= 0) {
            this.selectServiceType.splice(index,1);
          }
        }
      });
    })
  }

  ngOnDestroy(): void {
    this.isObservableActive = false;
  }

  setUpParentForm() {
    this.parentForm = this.fb.group({});
  }
  initializeAddServiceForm() {
    this.addServiceForm = this.fb.group({
      mytransid: new FormControl('0'),
      serviceSubType: new FormControl('', Validators.required),
      serviceType: new FormControl('', Validators.required),
      searialNo: new FormControl('', Validators.required),
      totamt: new FormControl('', Validators.required),
      totinstallments: new FormControl('', Validators.required),
      allowDiscount: new FormControl('', Validators.required),
      installmentAmount: new FormControl('', Validators.required),
      installmentsBegDate: new FormControl('', Validators.required),
      untilMonth: new FormControl('', Validators.required)
    })
    this.parentForm.setControl('addServiceForm', this.addServiceForm);
  }
  saveFinancialService(){
    // Get Tenant Id
    // var data = JSON.parse(localStorage.getItem("user")!);
    // const tenantId = data.map((obj: { tenantId: any; }) => obj.tenantId);
    //console.log(this.common.ifEmployeeExists);
    let formData = {
      ...this.parentForm.value.addServiceForm,
      ...this.parentForm.value.approvalDetailsForm,
      ...this.parentForm.value.employeeForm,
      ...this.parentForm.value.financialForm,
      //...this.parentForm.value.financialFormArray,
      tenentID: 21, cruP_ID: 0,locationID:1
    }
    
    this.isFormSubmitted = true;
          
    if(this.mytransid){      
      this.financialService.UpdateFinancialService(formData).subscribe(()=>{
        this.toastrService.success('Updated successfully', 'Success');
          this.parentForm.reset();
      })
    }else{  
      console.log(this.parentForm.value.financialFormArray);    
      this.financialService.AddFinacialService(formData).subscribe(()=>{
        // this.toastrService.success('Saved successfully', 'Success');
        //   this.parentForm.reset();
        this.saveFinancialArray();
      })
    }
    
  }
  saveFinancialArray() {
    this.financialService.saveCOA(this.parentForm.value.financialFormArray, {}).subscribe(()=>{
      this.toastrService.success('Saved successfully', 'Success');
      this.parentForm.reset();
    })
  }
  getFormValues() {
    console.log(this.parentForm.value);
  }
  calculateUntilMonth(selectedDate:Date){
    if(selectedDate !== undefined){
      let noOfinstallments = this.addServiceForm.get('totinstallments')?.value;
      var newDate = moment(selectedDate).add(noOfinstallments - 1, 'M').format('MMM-YYYY');
      this.addServiceForm.patchValue({
        untilMonth: newDate
      });     
    }
    
  }
  
  // Calculate Installments based on Installment Months...
  calculateInstallments(){
    let amount = this.addServiceForm.get('totamt')?.value;
    let noOfinstallments = this.addServiceForm.get('totinstallments')?.value;
    let calculatedAmount = (amount / noOfinstallments);
    this.addServiceForm.patchValue({
      installmentAmount: calculatedAmount
    })
  }
  onServiceTypeChange(selected: any) {    
    this.selectServiceSubType$ = this.commonService.GetSubServiceTypeByServiceType(21,selected);
    this.selectedServiceType = selected;
  }
  onServiceSubTypeChange($event: any) {
    this.selectedServiceSubType = $event.refId;
    this.financialService.GetSelectedServiceSubType(this.selectedServiceType, this.selectedServiceSubType, 21).subscribe((response: any) => {
      this.parentForm.patchValue({
        addServiceForm: {
          serviceSubType: response.serviceSubType,
          serviceType: response.serviceType,
          searialNo: '',
          amount: '',
          totinstallments: response.maxInstallment,
          allowDiscount: response.allowDiscountAmount
        },
        approvalDetailsForm: {
          serApproval1: +response.serApproval1,
          approvalBy1: response.approvalBy1,
          approvedDate1: response.approvedDate1 ? new Date(response.approvedDate1) : '',

          serApproval2: +response.serApproval2,
          approvalBy2: response.approvalBy2,
          approvedDate2: response.approvedDate2 ? new Date(response.approvedDate2) : '',

          serApproval3: +response.serApproval3,
          approvalBy3: response.approvalBy3,
          approvedDate3: response.approvedDate3 ? new Date(response.approvedDate3) : '',

          serApproval4: +response.serApproval4,
          approvalBy4: response.approvalBy4,
          approvedDate4: response.approvedDate4 ? new Date(response.approvedDate4) : '',

          serApproval5: +response.serApproval5,
          approvalBy5: response.approvalBy5,
          approvedDate5: response.approvedDate5 ? new Date(response.approvedDate5) : '',
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
        },
      });
    })
  }
}
