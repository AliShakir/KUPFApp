import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { SelectApprovalRoleDto } from 'src/app/modules/models/ServiceSetup/SelectApprovalRoleDto';
import { SelectMaxInstallmentDto } from 'src/app/modules/models/ServiceSetup/SelectMaxInstallmentDto';
import { SelectMinInstallmentDto } from 'src/app/modules/models/ServiceSetup/SelectMinInstallmentDto';
import { SelectMinMonthOfServicesDto } from 'src/app/modules/models/ServiceSetup/SelectMinMonthOfServicesDto';
import { SelectServiceTypeDto } from 'src/app/modules/models/ServiceSetup/SelectServiceTypeDto';
import { ServiceSetupDto } from 'src/app/modules/models/ServiceSetup/ServiceSetupDto';
import { DbCommonService } from 'src/app/modules/_services/db-common.service';
import { ServiceSetupService } from 'src/app/modules/_services/service-setup.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';
import { SelectServiceSubTypeDto } from 'src/app/modules/models/ServiceSetup/SelectServiceSubTypeDto';
import { SelectMasterServiceTypeDto } from 'src/app/modules/models/ServiceSetup/SelectMasterServiceTypeDto';

@Component({
  selector: 'app-add-service-setup',
  templateUrl: './add-service-setup.component.html',
  styleUrls: ['./add-service-setup.component.scss']
})
export class AddServiceSetupComponent implements OnInit {


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

  //
  serviceType$: any;
  //
  serviceSubType$: Observable<SelectServiceSubTypeDto[]>;
  //
  editServiceSetup$: Observable<ServiceSetupDto[]>;
  //
  masterServiceType$: Observable<SelectMasterServiceTypeDto[]>;
  //
  editServiceSetup: ServiceSetupDto[];


  //
  parentForm: FormGroup;
  addServiceSetupForm: FormGroup;
  ///
  serviceId: any;
  //
  masterIds: any[] = [];
  // Array for Minimum Month Of Service
  minimumMonthOfServices = [
    { id: "1", name: '1' },
    { id: "2", name: '2' },
    { id: "3", name: '3' },
    { id: "4", name: '4' },
    { id: "5", name: '5' },
    { id: "6", name: '6' },
    { id: "7", name: '7' },
    { id: "8", name: '8' },
    { id: "9", name: '9' },
    { id: "10", name: '10' },
    { id: "11", name: '11' },
    { id: "12", name: '12' },
    { id: "13", name: '13' },
    { id: "14", name: '14' },
    { id: "15", name: '15' },
    { id: "16", name: '16' },
    { id: "17", name: '17' },
    { id: "18", name: '18' },
    { id: "19", name: '19' },
    { id: "20", name: '20' },
    { id: "21", name: '21' },
    { id: "22", name: '22' },
    { id: "23", name: '23' },
    { id: "24", name: '24' },
    { id: "25", name: '25' },
    { id: "26", name: '26' },
    { id: "27", name: '27' },
    { id: "28", name: '28' },
    { id: "29", name: '29' },
    { id: "30", name: '30' },
    { id: "31", name: '31' },
    { id: "32", name: '32' },
    { id: "33", name: '33' },
    { id: "34", name: '34' },
    { id: "35", name: '35' },
    { id: "36", name: '36' },
  ];
  minInstallment = [
    { id: "1", name: "1" },
    { id: "2", name: "2" },
    { id: "3", name: "3" },
    { id: "4", name: "4" },
    { id: "5", name: "5" },
    { id: "6", name: "6" },
    { id: "7", name: "7" },
    { id: "8", name: "8" },
    { id: "9", name: "9" },
    { id: "10", name: "10" },
    { id: "11", name: "11" },
    { id: "12", name: "12" }
  ]
  maxInstallment = [
    { id: "1", name: "12" },
    { id: "2", name: "11" },
    { id: "3", name: "10" },
    { id: "4", name: "9" },
    { id: "5", name: "8" },
    { id: "6", name: "7" },
    { id: "7", name: "6" },
    { id: "8", name: "5" },
    { id: "9", name: "4" },
    { id: "10", name: "3" },
    { id: "11", name: "2" },
    { id: "12", name: "1" }
  ]
  showHide: boolean;
  constructor(private fb: FormBuilder,
    private commonDbService: DbCommonService,
    private setupService: ServiceSetupService,
    private toastr: ToastrService,
    private activatedRout: ActivatedRoute,
    private router: Router) {
    this.setUpParentForm();
    // Getting record by from URL
    this.serviceId = this.activatedRout.snapshot.paramMap.get('serviceId');
  }


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

    //
    this.masterServiceType$ = this.commonDbService.GetMaterServiceTypes();

    // Fillout all controls to update record.
    if (this.serviceId != null) {
      this.editServiceSetup$ = this.setupService.GetServiceSetupById(this.serviceId);
      this.editServiceSetup$.subscribe((response: any) => {
        
        this.parentForm.patchValue({
          addServiceSetupForm:
          {
            serviceId: response.serviceId,
            serviceName1: response.serviceName1,
            serviceName2: response.serviceName2,
            allowedNonEmployes: response.allowedNonEmployes,
            serviceType: +response.serviceType,
            serviceSubType: +response.serviceSubType,
            minMonthsService: response.minMonthsService,
            minInstallment: response.minInstallment,
            maxInstallment: response.maxInstallment,
            frozen: response.frozen,
            previousEmployees: response.previousEmployees,
            masterServiceId: response.masterServiceId,
            allowDiscountDefault: response.allowDiscountDefault,
            allowDiscountPer: response.allowDiscountPer,
            allowDiscountAmount: response.allowDiscountAmount,
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
          editorForm: {
            englishHtml: response.englishHTML || {},
            arabicHtml: response.arabicHTML || {}
          },
          electronicForm: {
            electronicForm1: response.electronicForm1,
            electronicForm1URL: response.electronicForm1URL,
            electronicForm2: response.electronicForm2,
            electronicForm2URL: response.electronicForm2URL,
          }
        });
        
        //
        this.masterServiceType$ = this.commonDbService.GetMaterServiceTypes();
        
        // Filling service Types
        var arr = response.masterServiceId.split(',');
        this.masterIds = [];
        
        for (let i = 0; i < arr.length; i++) {
          this.masterIds.push(arr[i])
        }
        this.commonDbService.GetServiceTypes(this.masterIds).subscribe((resp: any) => {
          this.serviceType$ = resp
        });

        // Filling service Sub Types
        this.commonDbService.GetServiceSubTypes(response.serviceType).subscribe((res: any) => {          
          this.serviceSubType$ = res
        });

      }, error => {
        console.log(error);
      })
    }
  }

  setUpParentForm() {
    this.parentForm = this.fb.group({});
  }

  initializeForm() {
    this.addServiceSetupForm = this.fb.group({
      serviceId: new FormControl('', Validators.required),
      serviceName1: new FormControl('', Validators.required),
      serviceName2: new FormControl('', Validators.required),
      allowedNonEmployes: new FormControl('', Validators.required),
      masterServiceId: new FormControl('', Validators.required),
      serviceSubType: new FormControl('', Validators.required),
      serviceType: new FormControl('', Validators.required),
      minMonthsService: new FormControl('', Validators.required),
      minInstallment: new FormControl('', Validators.required),
      maxInstallment: new FormControl('', Validators.required),
      frozen: new FormControl('', Validators.required),
      previousEmployees: new FormControl('', Validators.required),
      allowDiscountDefault: new FormControl('', Validators.required),
      allowDiscountPer: new FormControl('', Validators.required),
      allowDiscountAmount: new FormControl('0.0', Validators.required),
    })
    this.parentForm.setControl('addServiceSetupForm', this.addServiceSetupForm);
  }

  addServiceSetup() {
    let arr = this.addServiceSetupForm?.controls['masterServiceId'];

    this.addServiceSetupForm.patchValue({
      masterServiceId: arr.value.toString()
    });

    // Get Tenant Id
    var data = JSON.parse(localStorage.getItem("user")!);
    const tenantId = data.map((obj: { tenantId: any; }) => obj.tenantId);

    //  TO CONVER OBJECT ARRAY AS SIMPLE ARRAY. 
    let formData = {
      ...this.parentForm.value.addServiceSetupForm,
      ...this.parentForm.value.approvalDetailsForm,
      ...this.parentForm.value.financialForm,
      ...this.parentForm.value.editorForm,
      ...this.parentForm.value.electronicForm,
      tenentID: tenantId[0], cruP_ID: 0
    }
    
    if (this.serviceId == null) {
      // Add new record
      this.setupService.AddServiceSetup(formData).subscribe(() => {
        this.toastr.success('Saved successfully', 'Success');
        this.parentForm.reset();
      }, error => {
        if (error.status === 500) {
          this.toastr.error('Duplicate value found', 'Error');
        }
      })
    } else {
      // Add update record
      this.setupService.UpdateServiceSetup(formData).subscribe(() => {
        this.toastr.success('Updated successfully', 'Success');
        this.parentForm.reset();
        this.router.navigateByUrl('/service-setup/service-setup-details')
      }, error => {
        if (error.status === 500) {
          this.toastr.error('Something went wrong', 'Error');
        }
      })
    }
  }

  allowDiscountPerChangeStatus(event: Event) {
    const isChecked = (<HTMLInputElement>event.target).checked;
    this.showHide = !this.showHide;
  }
  onServiceTypeChange(switchNo: any) {
    //
    this.commonDbService.GetServiceSubTypes(switchNo).subscribe((response: any) => {
      this.serviceSubType$ = response
    });
  }
  onMasterServiceChange(e: any[]) {
    this.masterIds = [];
    for (let i = 0; i < e.length; i++) {
      this.masterIds.push(e[i].refId)
    }
    // Filling ServiceTypes against MasterIds.
    this.commonDbService.GetServiceTypes(this.masterIds).subscribe((response: any) => {
      this.serviceType$ = response
    });
  }
}
