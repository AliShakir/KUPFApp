import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  selectServiceType: SelectServiceTypeDto[] = [];
  selectServiceSubType$: Observable<SelectServiceTypeDto[]>;
  selectServiceSubType: SelectServiceTypeDto[] = [];
  selectedServiceType: any;
  selectedServiceTypeText: any;
  selectedServiceSubType: any;
  selectedServiceSubTypeText: any;
  //
  parentForm: FormGroup;
  addServiceForm: FormGroup;
  popUpForm: FormGroup;
  isFormSubmitted = false;
  minDate: Date;
  editService$: Observable<TransactionHdDto[]>;
  mytransid: any;
  isObservableActive = true;
  pfId: any;
  isSubscriber = false;
  // If PF Id is Not Null - SubscribeDate = Null and TerminationDate = Null
  notSubscriber: boolean = false;
  // 
  @ViewChild('popupModal', { static: true }) popupModal: ElementRef;
  constructor(
    private financialService: FinancialService,
    private commonService: DbCommonService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private activatedRout: ActivatedRoute,
    public common: CommonService,
    public datepipe: DatePipe,
    private router: Router,
    private modalService: NgbModal) {
    
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
    //
    this.initPopUpModal();
    this.setValidators(this.notSubscriber);
    // Get Tenant Id
    // var data = JSON.parse(localStorage.getItem("user")!);
    // const tenantId = data.map((obj: { tenantId: any; }) => obj.tenantId);
    //



    if (this.mytransid) {
      this.common.ifEmployeeExists = true;
      this.financialService.GetFinancialServiceById(this.mytransid).subscribe((response: any) => {

        this.selectServiceSubType$ = this.commonService.GetSubServiceTypeByServiceType(21, response.serviceType);
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
          addServiceForm: {
            mytransid: response.mytransid,
            serviceType: response.serviceType,
            serviceSubType: response.serviceSubType,
            totinstallments: response.totinstallments,
            totamt: response.totamt,
            installmentAmount: response.installmentAmount,
            installmentsBegDate: response.installmentsBegDate ? new Date(response.installmentsBegDate) : '',
            untilMonth: response.untilMonth
          },
          financialForm: {
            hajjAct: response.hajjAct,
            loanAct: response.loanAct,
            persLoanAct: response.persLoanAct,
            otherAct1: response.otherAct1,
            otherAct2: response.otherAct2,
            otherAct3: response.otherAct3,
            otherAct4: response.otherAct4,
            otherAct5: response.otherAct5,
          },
          approvalDetailsForm: {
            serApproval1: response.serApproval1,
            approvalBy1: response.approvalBy1,
            approvedDate1: response.approvedDate1,
            serApproval2: response.serApproval2,
            approvalBy2: response.approvalBy2,
            approvedDate2: response.approvedDate2,
            serApproval3: response.serApproval3,
            approvalBy3: response.approvalBy3,
            approvedDate3: response.approvedDate3,
            serApproval4: response.serApproval4,
            approvalBy4: response.approvalBy4,
            approvedDate4: response.approvedDate4,
            serApproval5: response.serApproval5,
            approvalBy5: response.approvalBy5,
            approvedDate5: response.approvedDate5,
          }
        })
        console.log(this.addServiceForm.value);
      })
    }

    this.common.empSearchClickEvent.pipe(takeWhile(() => this.isObservableActive)).subscribe(result => {
      //
      this.notSubscriber = false;
      this.financialService.GetServiceType(21).subscribe((response: any) => {
        this.pfId = this.common.PFId;
        this.selectServiceType = response;
        if (this.common.PFId != null
          && this.common.subscribedDate == null
          && this.common.terminationDate == null) {
          // remove subscribe from servicetype & Subtype
          if (result.trim()) {
            let index = this.selectServiceType.findIndex(x => x.refId == 1);
            if (index >= 0) {
              this.selectServiceType.splice(index, 1);
            }
          }
          this.notSubscriber = true;
        } else if (this.common.PFId == null
          && this.common.subscribedDate == null
          && this.common.terminationDate == null) {
          this.selectServiceType = response;
          let arr = this.selectServiceType.filter(x => x.refId == 1)
          this.selectServiceType = arr;
          this.isSubscriber = true;

        }
      });
    })
  }

  ngOnDestroy(): void {
    this.isObservableActive = false;
    this.isSubscriber = false;
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
      untilMonth: new FormControl('', Validators.required),
      serviceSubTypeId: new FormControl(''),
      serviceTypeId: new FormControl(''),
    })
    this.parentForm.setControl('addServiceForm', this.addServiceForm);
  }
  initPopUpModal(){
    this.popUpForm = this.fb.group({
      transactionId:new FormControl(null),
      attachId: new FormControl(null)
    })
  }
  saveFinancialService() {
    this.setValidators(this.notSubscriber);
    // Get Tenant Id
    // var data = JSON.parse(localStorage.getItem("user")!);
    // const tenantId = data.map((obj: { tenantId: any; }) => obj.tenantId);
    //console.log(this.common.ifEmployeeExists);
    this.addServiceForm.patchValue({
      serviceType: this.selectedServiceTypeText,
      serviceSubType: this.selectedServiceSubTypeText, //selectedServiceSubTypeText
      serviceTypeId: this.selectedServiceType,
      serviceSubTypeId: this.selectedServiceSubType
    })
    let formData = {
      ...this.parentForm.value.addServiceForm,
      ...this.parentForm.value.approvalDetailsForm,
      ...this.parentForm.value.employeeForm,
      ...this.parentForm.value.financialForm,
      //...this.parentForm.value.financialFormArray,
      tenentID: 21, cruP_ID: 0, locationID: 1
    }
    formData['installmentsBegDate'] = moment(formData['installmentsBegDate']).format("yyyy-MM-DD");
    let finalformData = new FormData();
    Object.keys(formData).forEach(key => finalformData.append(key, formData[key]));
    finalformData.append('personalPhotoDocType',  this.parentForm.value.documentAttachmentForm[0].docType);
    finalformData.append('personalPhotoDocument',  this.parentForm.value.documentAttachmentForm[0].Document);
    finalformData.append('appplicationFileDocType',  this.parentForm.value.documentAttachmentForm[1].docType);
    finalformData.append('appplicationFileDocument',  this.parentForm.value.documentAttachmentForm[1].Document);    
    finalformData.append('workIdDocType',  this.parentForm.value.documentAttachmentForm[2].docType);
    finalformData.append('workIdDocument',  this.parentForm.value.documentAttachmentForm[2].Document);
    finalformData.append('civilIdDocType',  this.parentForm.value.documentAttachmentForm[3].docType);
    finalformData.append('civilIdDocument',  this.parentForm.value.documentAttachmentForm[3].Document);
    finalformData.append('salaryDataDocType',  this.parentForm.value.documentAttachmentForm[4].docType);
    finalformData.append('salaryDataDocument',  this.parentForm.value.documentAttachmentForm[4].Document);
    //
    finalformData.append('subject',  this.parentForm.value.documentAttachmentForm[0].subject);
    
    finalformData.append('metaTags',  JSON.parse(JSON.stringify(this.parentForm.value.documentAttachmentForm[0].metaTag)));
    finalformData.append('attachmentRemarks',  this.parentForm.value.documentAttachmentForm[0].attachmentRemarks);
    //
    this.isFormSubmitted = true;
    //
    if (this.mytransid) {
      this.financialService.UpdateFinancialService(finalformData).subscribe(() => {
        this.toastrService.success('Updated successfully', 'Success');
        this.parentForm.reset();   
      })
    } else {
      
       this.financialService.AddFinacialService(finalformData).subscribe((response:any) => {        
        if (response.response == '1') {
          this.toastrService.error('Subscription apply only to the KU Employees ', 'Error');
        }
        else if (response.response == '2') {
          this.toastrService.error('A KU Employee on the Sick Leave Cannot apply for the Membership', 'Error');
        } 
        else if (response.response == '3') {
          this.toastrService.error('Employee is Member of a KUPF Fund Committe', 'Error');
        }
        else if (response.response == '4') {
          this.toastrService.error('Employee Was Terminated Earlier', 'Error');
        }
        else if (response.response == '5') {
          this.toastrService.error('Duplicate subscriber', 'Error');
        }
        else {
          this.toastrService.success('Saved successfully', 'Success');
          this.popUpForm.patchValue({
            transactionId: response.transactionId,
            attachId: response.attachId
          })
          /**
           * 
            : 
            "1"
            
            : 
            "5074"
           */
          
          this.parentForm.reset();
          this.openPopUpModal(this.popupModal);
        }
        //this.saveFinancialArray();  
      })
    }

  }
  saveFinancialArray() {
    this.financialService.saveCOA(this.parentForm.value.financialFormArray, {}).subscribe(() => {
      this.toastrService.success('Saved successfully', 'Success');
      this.parentForm.reset();  
    })
  }
  getFormValues() {
    if (this.notSubscriber) {
      console.log('True');
    } else {
      console.log('False');
    }
  }
  calculateUntilMonth(selectedDate: Date) {
    if (selectedDate !== undefined) {
      let noOfinstallments = this.addServiceForm.get('totinstallments')?.value;
      var newDate = moment(selectedDate).add(noOfinstallments - 1, 'M').format('MMM-YYYY');
      this.addServiceForm.patchValue({
        untilMonth: newDate
      });
    }

  }

  // Calculate Installments based on Installment Months...
  calculateInstallments() {
    let amount = this.addServiceForm.get('totamt')?.value;
    let noOfinstallments = this.addServiceForm.get('totinstallments')?.value;
    let calculatedAmount = (amount / noOfinstallments);
    this.addServiceForm.patchValue({
      installmentAmount: calculatedAmount
    })
  }
  onServiceTypeChange(event: any) {
    this.commonService.GetSubServiceTypeByServiceType(21, event.refId).subscribe((response: any) => {
      this.selectServiceSubType = response
      if (this.common.PFId != null
        && this.common.subscribedDate != null
        && this.common.terminationDate != null) {
        // This is Resubscribe Case
        if (response) {
          let index = this.selectServiceSubType.findIndex(x => x.refId == 1);
          if (index >= 0) {
            this.selectServiceSubType.splice(index, 1);
          }
        }
        //
        this.notSubscriber = false;
      }
      if (this.isSubscriber) {
        let index = this.selectServiceSubType.findIndex(x => x.refId == 2);
        if (index >= 0) {
          this.selectServiceSubType.splice(index, 2);
        }
        //
        this.notSubscriber = false;
      }
    });


    this.selectedServiceType = event.refId;
    this.selectedServiceTypeText = event.shortname;
  }
  onServiceSubTypeChange($event: any) {
    this.selectedServiceSubType = $event.refId;
    this.selectedServiceSubTypeText = $event.shortname;
    this.financialService.GetSelectedServiceSubType(this.selectedServiceType, this.selectedServiceSubType, 21).subscribe((response: any) => {
      
      this.parentForm.patchValue({
        addServiceForm: {
          serviceSubType: response.serviceSubType,
          serviceType: this.selectedServiceTypeText,
          searialNo: '',
          amount: '',
          totinstallments: response.maxInstallment,
          allowDiscount: response.allowDiscountAmount,
          serviceSubTypeId: response.serviceSubTypeId,
          serviceTypeId: response.serviceTypeId,
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
    //console.log('Ok 1',this.addServiceForm.value);
  }

  // To access form controls...
  get addServiceFrm() { return this.addServiceForm.controls; }
  // Conditionally set validations.
  setValidators(isNotSubscriber: boolean) {
    const totamt = this.addServiceForm.get('totamt');
    const totinstallments = this.addServiceForm.get('totinstallments');
    const installmentAmount = this.addServiceForm.get('installmentAmount');
    const allowDiscount = this.addServiceForm.get('allowDiscount');
    const installmentsBegDate = this.addServiceForm.get('installmentsBegDate');

    const serviceType = this.addServiceForm.get('serviceType');
    const serviceSubType = this.addServiceForm.get('serviceSubType');
    if (isNotSubscriber) {
      totamt?.setValidators([Validators.required]);
      totinstallments?.setValidators([Validators.required]);
      installmentAmount?.setValidators([Validators.required]);
      allowDiscount?.setValidators([Validators.required]);
      installmentsBegDate?.setValidators([Validators.required]);
      serviceType?.setValidators([Validators.required]);
      serviceSubType?.setValidators([Validators.required]);
    }
    if (!isNotSubscriber) {
      totamt?.setValidators(null);
      totinstallments?.setValidators(null);
      installmentAmount?.setValidators(null);
      allowDiscount?.setValidators(null);
      installmentsBegDate?.setValidators(null);
      serviceType?.setValidators(null);
      serviceSubType?.setValidators(null);
    }
    totamt?.updateValueAndValidity();
    totinstallments?.updateValueAndValidity();
    installmentAmount?.updateValueAndValidity();
    allowDiscount?.updateValueAndValidity();
    installmentsBegDate?.updateValueAndValidity();
    serviceType?.updateValueAndValidity();
    serviceSubType?.updateValueAndValidity();
  }
//#region Delete operation and Modal Config
openPopUpModal(content:any) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });

}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
}
