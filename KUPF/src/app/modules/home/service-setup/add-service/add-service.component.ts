import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { ServiceTypeAndSubTypeIdsDto } from 'src/app/modules/models/FinancialService/ServiceTypeAndSubTypeIdsDto';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { SelectRefTypeDto } from 'src/app/modules/models/ReferenceDetails/SelectRefTypeDto';
import { SelectedServiceSubTypeDto } from 'src/app/modules/models/ServiceSetup/SelectedServiceSubTypeDto';
import { SelectedServiceTypeDto } from 'src/app/modules/models/ServiceSetup/SelectedServiceTypeDto';
import { SelectServiceSubTypeDto } from 'src/app/modules/models/ServiceSetup/SelectServiceSubTypeDto';
import { SelectServiceTypeDto } from 'src/app/modules/models/ServiceSetup/SelectServiceTypeDto';
import { DbCommonService } from 'src/app/modules/_services/db-common.service';
import { FinancialService } from 'src/app/modules/_services/financial.service';
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

  formTitle: string;
  closeResult: string = '';

  selectServiceType$: Observable<SelectedServiceTypeDto[]>;
  selectServiceSubType$: Observable<SelectedServiceSubTypeDto[]>;
  selectedServiceType: any;
  selectedServiceSubType: any;
  //
  parentForm: FormGroup;
  addServiceForm: FormGroup;
  isFormSubmitted = false;
  constructor(
    private financialService: FinancialService,
    private commonService: DbCommonService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    public datepipe: DatePipe) {
    this.setUpParentForm();
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
    this.selectServiceType$ = this.commonService.GetSelectedServiceType(21);
    //
    this.selectServiceSubType$ = this.commonService.GetSelectedServiceSubType(21);
    
  }
  setUpParentForm() {
    this.parentForm = this.fb.group({});
  }
  initializeAddServiceForm() {
    this.addServiceForm = this.fb.group({
      serviceSubType: new FormControl('', Validators.required),
      serviceType: new FormControl('', Validators.required),
      searialNo: new FormControl('', Validators.required),
      totamt: new FormControl('', Validators.required),
      totinstallments: new FormControl('', Validators.required),
      allowDiscount: new FormControl('', Validators.required),
      installmentAmount: new FormControl('', Validators.required),
      startingDeductionMonth: new FormControl('', Validators.required),
      untilMonth: new FormControl('', Validators.required)
    })
    this.parentForm.setControl('addServiceForm', this.addServiceForm);
  }
  saveFinancialService(){
    // Get Tenant Id
    // var data = JSON.parse(localStorage.getItem("user")!);
    // const tenantId = data.map((obj: { tenantId: any; }) => obj.tenantId);

    let formData = {
      ...this.parentForm.value.addServiceForm,
      ...this.parentForm.value.approvalDetailsForm,
      ...this.parentForm.value.employeeForm,
      ...this.parentForm.value.financialForm,
      tenentID: 21, cruP_ID: 0
    }
    
    this.isFormSubmitted = true;
    //if(this.parentForm.valid){
      console.log(this.parentForm.value);
      this.financialService.AddFinacialService(formData).subscribe(()=>{
        this.toastrService.success('Saved successfully', 'Success');
          this.parentForm.reset();
      })
    //}
  }
  getFormValues() {
    console.log(this.parentForm.value);
  }
  calculateUntilMonth(selectedDate:Date){
    if(selectedDate !== undefined){
      const date = new Date();
      let noOfinstallments = this.addServiceForm.get('totinstallments')?.value;
      date.setMonth(selectedDate.getMonth() + noOfinstallments) 
      this.addServiceForm.patchValue({
        untilMonth: this.datepipe.transform(date,'MMM-YYYY')
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
  onServiceTypeChange($event: any) {
    this.selectedServiceType = $event.serviceType;
  }
  onServiceSubTypeChange($event: any) {
    this.selectedServiceSubType = $event.serviceSubType;
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
