import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { RefTableDto } from 'src/app/modules/models/ReferenceDetails/RefTableDto';
import { ReturnServiceApprovals } from 'src/app/modules/models/ReturnServiceApprovals';
import { CommonService } from 'src/app/modules/_services/common.service';
import { EmployeeService } from 'src/app/modules/_services/employee.service';
import { FinancialService } from 'src/app/modules/_services/financial.service';
@Component({
  selector: 'app-approval-management',
  templateUrl: './approval-management.component.html',
  styleUrls: ['./approval-management.component.scss']
})
export class ApprovalManagementComponent implements OnInit {

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

  //#region
  // To display table column headers
  columnsToDisplay: string[] = ['action','transId', 'employeeId', 'employeeName', 'serviceType', 'source', 'totalInstallment', 'amount', 'status'];

  // Getting data as abservable.
  returnServiceApprovals$: Observable<ReturnServiceApprovals[]>;

  // We need a normal array of data so we will subscribe to the observable and will get data
  returnServiceApprovals: MatTableDataSource<ReturnServiceApprovals> = new MatTableDataSource<any>([]);

  // Paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Sorting
  @ViewChild(MatSort) sort!: MatSort;

  // Hide footer while loading.
  isLoadingCompleted: boolean = false;

  // Incase of any error will display error message.
  dataLoadingStatus: string = '';

  // True of any error
  isError: boolean = false;

  // formGroup
  formGroup: FormGroup;

  // Search Term
  searchTerm: string = '';
  //#endregion

  // 
  approveServiceForm: FormGroup;

  //
  rejectServiceForm: FormGroup;

  lang: any = '';
  closeResult: string = '';
  currentUserId: any;
  //
  isFormSubmitted = false;
  rejectionType$: Observable<RefTableDto[]>;
  employeeId:any;
  constructor(
    private modalService: NgbModal,
    private financialService: FinancialService,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private toastrService: ToastrService,
    private employeeService: EmployeeService,
    private commonService: CommonService) {
    this.formGroup = new FormGroup({
      searchTerm: new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');
    this.currentUserId = localStorage.getItem('user');
    
    //#region TO SETUP THE FORM LOCALIZATION    
    // TO GET THE LANGUAGE ID e.g. 1 = ENGLISH and 2 =  ARABIC
    this.languageType = localStorage.getItem('langType');

    // To get the selected language...
    this.language = localStorage.getItem('lang');

    // To setup the form id so will will get form labels based on form Id
    this.formId = 'ManageApprovals';

    // Check if LocalStorage is Not NULL
    if (localStorage.getItem('AppLabels') != null) {

      // Get data from LocalStorage
      this.AppFormLabels = JSON.parse(localStorage.getItem('AppLabels') || '{}');

      for (let labels of this.AppFormLabels) {

        if (labels.formID == this.formId && labels.language == this.languageType) {

          this.formHeaderLabels.push(labels);

          this.formBodyLabels.push(labels.formTitleDTLanguage);
          console.log(this.formBodyLabels);
        }
      }
    }
    //#endregion

    // Get Data...
    this.loadData();

    //
    this.initApproveServiceForm();
    //
    this.initRejectionServiceForm();
    //
    this.rejectionType$ = this.financialService.GetRejectionType();
    
  }
 
  initApproveServiceForm() {
    this.approveServiceForm = this.fb.group({
      mytransId: new FormControl(''),
      userId: new FormControl(''),
      approvalDate: new FormControl(''),
      entryDate: new FormControl(''),
      entryTime: new FormControl(''),
      approvalRemarks: new FormControl('', Validators.required),
      currentDateTime: new FormControl(this.datepipe.transform((new Date), 'h:mm:ss dd/MM/yyyy')),
      serviceType:new FormControl(''),
      serviceSubType:new FormControl(''),
      totamt:new FormControl('')
    })
  }

  initRejectionServiceForm() {
    this.rejectServiceForm = this.fb.group({
      mytransId: new FormControl(''),
      userId: new FormControl(''),
      approvalDate: new FormControl(''),
      entryDate: new FormControl(''),
      entryTime: new FormControl(''),
      rejectionRemarks: new FormControl('', Validators.required),
      currentDateTime: new FormControl(this.datepipe.transform((new Date), 'h:mm:ss dd/MM/yyyy')),
      rejectionType: new FormControl('', Validators.required)
    })
  }

  // Get Data...
  loadData() {
    this.financialService.GetServiceApprovals().subscribe((response: ReturnServiceApprovals[]) => {
      this.returnServiceApprovals = new MatTableDataSource<ReturnServiceApprovals>(response);
      this.returnServiceApprovals.paginator = this.paginator;
      this.returnServiceApprovals.sort = this.sort;
      this.isLoadingCompleted = true;
    }, error => {
      console.log(error);
      this.dataLoadingStatus = 'Error fetching the data';
      this.isError = true;
    })
  }
  get approvalForm() { return this.approveServiceForm.controls; }
  get rejectionForm() { return this.rejectServiceForm.controls; }

  openContactModal(content: any, event: any) {     
    this.commonService.employeeId = event.target.id
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // Approve service...
  openApproveServiceModal(content: any, event: any) {
    this.isFormSubmitted = true;
    this.financialService.GetServiceApprovalsByTransIdAsync(21,1,event.target.id).subscribe((response:any)=>{
      if(response){
        this.approveServiceForm.patchValue({
          mytransId: event.target.id,
          serviceType:response.serviceType,
          serviceSubType:response.serviceSubType,
          totamt:response.totamt
        })
      }      
    });
    //
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-md' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        let currentDate = this.datepipe.transform((new Date));
        let currentTime = this.datepipe.transform((new Date), 'h:mm:ss');
        this.approveServiceForm.controls['approvalDate']?.setValue(currentDate);
        this.approveServiceForm.controls['entryDate']?.setValue(currentDate);
        this.approveServiceForm.controls['entryTime']?.setValue(currentTime);
        this.approveServiceForm.controls['userId']?.setValue(1);

        // this.financialService.ApproveService(this.approveServiceForm.value).subscribe(response => {
        //   if (response == 0) {
        //     this.toastrService.info('.This service is already approved', 'Success');
        //     this.isFormSubmitted = false;
        //     this.approveServiceForm.reset();
        //   } else {
        //     this.toastrService.success('.Service approved successfully', 'Success');
        //     this.isFormSubmitted = false;
        //     this.approveServiceForm.reset();
        //   }
        // })
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // Reject service...
  openRejectServiceModal(content: any, event: any) {
    this.isFormSubmitted = true;
    //
    this.rejectServiceForm.patchValue({
      mytransId: event.target.id
    }) 
    //
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-md' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {

        let currentDate = this.datepipe.transform((new Date));
        let currentTime = this.datepipe.transform((new Date), 'h:mm:ss');
        this.rejectServiceForm.controls['approvalDate']?.setValue(currentDate);
        this.rejectServiceForm.controls['entryDate']?.setValue(currentDate);
        this.rejectServiceForm.controls['entryTime']?.setValue(currentTime);
        this.rejectServiceForm.controls['userId']?.setValue(1);

        this.financialService.RejectService(this.rejectServiceForm.value).subscribe(response => {
          if (response == 0) {
            this.toastrService.info('.This service is already rejected', 'Success');
            this.isFormSubmitted = false;
            this.rejectServiceForm.reset();
            this.rejectServiceForm.controls['approvalDate']?.setValue(currentDate);
          } else {
            this.toastrService.success('.Service rejected successfully', 'Success');
            this.isFormSubmitted = false;
            this.rejectServiceForm.reset();
            this.rejectServiceForm.controls['approvalDate']?.setValue(currentDate);
          }
        })
      }

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
