import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, ReplaySubject } from 'rxjs';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { DbCommonService } from 'src/app/modules/_services/db-common.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ReferenceDetailsService } from 'src/app/modules/_services/reference-details.service';
import { ToastrService } from 'ngx-toastr';
import { SelectRefTypeDto } from 'src/app/modules/models/ReferenceDetails/SelectRefTypeDto';
import { RefTableDto } from 'src/app/modules/models/ReferenceDetails/RefTableDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reference-details',
  templateUrl: './reference-details.component.html',
  styleUrls: ['./reference-details.component.scss']
})
export class ReferenceDetailsComponent implements OnInit {


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
  refSubType$: any;
  //
  refType$: Observable<SelectRefTypeDto[]>;
  //


  //#region
  // To display table column headers
  columnsToDisplay: string[] = ['action', 'Sr', 'shortName', 'englishName1', 'arabicName2'];

  // Getting data as abservable.
  refTableDto$: Observable<RefTableDto[]>;

  // We need a normal array of data so we will subscribe to the observable and will get data
  refTableDto: MatTableDataSource<RefTableDto> = new MatTableDataSource<any>([]);

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

  lang: any = '';

  closeResult: string = '';

  //
  userForm: FormGroup;
  //
  userEditForm: FormGroup;
  // 
  isFormSubmitted = false;
  //
  selectedItems: any = [];
  selectedItemsSub: any = [];

  // Will disable Add button if RefSubType not selected
  isRefSubTypeEmpty=false;

  constructor(private modalService: NgbModal,
    private commonService: DbCommonService,
    private fb: FormBuilder,
    private refTableService: ReferenceDetailsService,
    private toastrService: ToastrService) {
    this.formGroup = new FormGroup({
      searchTerm: new FormControl(null)
    })
    this.refSubType$ = new ReplaySubject(1);
  }


  ngOnInit(): void {
    //#region TO SETUP THE FORM LOCALIZATION    
    // TO GET THE LANGUAGE ID e.g. 1 = ENGLISH and 2 =  ARABIC
    this.languageType = localStorage.getItem('langType');

    // To get the selected language...
    this.language = localStorage.getItem('lang');

    // To setup the form id so will will get form labels based on form Id
    this.formId = 'RefTableEntry';

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

    // Filling RefType...
    this.refType$ = this.commonService.GetRefTypes()
    //
    //this.loadData();
    this.initializeForm();
    //
    this.initializeEditForm();

  }


  onUserFormSubmit() { 
    // Get Tenant Id
    var data = JSON.parse(localStorage.getItem("user")!);
    const tenantId = data.map((obj: { tenantId: any; }) => obj.tenantId); 
     
    //  TO CONVER OBJECT ARRAY AS SIMPLE ARRAY. 
     let formData = {
      ...this.userForm.value,
      tenentID: tenantId[0], cruP_ID: 0
    }  
    
    //Add New record
    this.refTableService.AddRefTable(formData).subscribe(response => {
      if (response === 500) {
        this.toastrService.error('Something went wrong. please again latter', 'Error');
      } else {
        this.toastrService.success('Saved successfully', 'Success');
        this.isFormSubmitted = false;
        this.userForm.reset();
        
      }
    });
  }

  initializeForm() {
    this.userForm = this.fb.group({
      refType: new FormControl('', Validators.required),
      refSubType: new FormControl('', Validators.required),
      shortName: new FormControl('', [Validators.required, Validators.email]),
      refname2: new FormControl('', Validators.required),
      refname3: new FormControl('', Validators.required),
      switch1: new FormControl('', Validators.required),
      switch2: new FormControl('', Validators.required),
      switch3: new FormControl('', Validators.required),
      active: new FormControl('', Validators.required),
      infrastructure: new FormControl('', Validators.required),
      remarks: new FormControl('', Validators.required),
      refImage: new FormControl('', Validators.required),
    })
  }

  initializeEditForm() {
    this.userEditForm = this.fb.group({
      refid: new FormControl('', Validators.required),
      refType: new FormControl('', Validators.required),
      refSubType: new FormControl('', Validators.required),
      refname1: new FormControl('', Validators.required),
      refname2: new FormControl('', Validators.required),
      refname3: new FormControl('', Validators.required),
      remarks: new FormControl('', Validators.required),
      active: new FormControl('', Validators.required),
      refImage: new FormControl('', Validators.required),
    })
  }
 
  onRefSubTypeChange($event: any) {    
    this.userForm.value.refSubType = $event
    this.selectedItemsSub = $event;    
    this.refTableDto$ = this.refTableService.GetAllRefTableRecordsByRefTypeAndSubType(this.selectedItems.refType, $event?.refSubType);
    this.refTableDto$.subscribe((response: RefTableDto[]) => {
      this.refTableDto = new MatTableDataSource<RefTableDto>(response);
      this.refTableDto.paginator = this.paginator;
      this.refTableDto.sort = this.sort;
      this.isLoadingCompleted = true;
      //
      this.isRefSubTypeEmpty =true;
    }, error => {
      console.log(error);
      this.dataLoadingStatus = 'Error fetching the data';
      this.isError = true;
    })
     this.initializeForm();
  }

  onRefTypeChange($event: any) {
    this.selectedItems = $event;
    this.commonService.GetRefSubTypeByRefType($event.refType).subscribe((response) => {
      this.refSubType$ = response
    })
  }
  // Reset form
  resetForm() {
    this.userForm.reset();
  }

  // Load data...
  loadData() {
    this.refTableDto$ = this.refTableService.GetAllRefTableRecords();
    //
    this.refTableDto$.subscribe((response: RefTableDto[]) => {
      this.refTableDto = new MatTableDataSource<RefTableDto>(response);
      this.refTableDto.paginator = this.paginator;
      this.refTableDto.sort = this.sort;
      this.isLoadingCompleted = true;
    }, error => {
      console.log(error);
      this.dataLoadingStatus = 'Error fetching the data';
      this.isError = true;
    })
  }

  //#region Material Search and Clear Filter
  filterRecords() {
    if (this.formGroup.value.searchTerm != null && this.refTableDto) {
      this.refTableDto.filter = this.formGroup.value.searchTerm.trim();
    }
  }
  clearFilter() {
    this.formGroup?.patchValue({ searchTerm: "" });
    this.filterRecords();
  }
  //#endregion

  // Delete recored...
openDeleteModal(content: any, id: number) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    if (result === 'yes') {
      console.log(id);
      this.refTableService.DeleteRefTable(id).subscribe(response => {
        if (response === 1) {
          this.toastrService.success('Record deleted successfully', 'Success');
          // Refresh Grid
          this.loadData();
        } else {
          this.toastrService.error('Something went wrong', 'Errro');
        }
      });
    }
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });

}

  open(content: any) {
    this.userForm.patchValue({
      refType: this.selectedItems?.refType,
      refSubType: this.selectedItemsSub?.refSubType
    })
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
// To update the existing record...
  openEditModal(content: any,id:number) {    
    this.userEditForm.patchValue({
      refType: this.selectedItems?.refType,
      refSubType: this.selectedItemsSub?.refSubType,
      refid: id
    })
    this.refTableService.GetRefTableRecordsByIdRefTypeAndSubType(this.userEditForm.get('refid')?.value,this.userEditForm.get('refType')?.value,this.userEditForm.get('refSubType')?.value).subscribe((res:any)=>{
      this.userEditForm.patchValue({
        refType: this.selectedItems?.refType,
        refSubType: this.selectedItemsSub?.refSubType,
        refid: id,
        refname1:res.refname1,
        refname2:res.refname2,
        refname3:res.refname3,
        remarks:res.remarks
      })
    })
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      
    }, (reason) => {
      this.userEditForm.reset();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  onEditFormSubmit(){
    this.refTableService.UpdateRefTable(this.userEditForm.value).subscribe(response=>{
      if (response === 500) {
        this.toastrService.error('Something went wrong. please again latter', 'Error');
      } else {
        this.toastrService.success('Updated successfully', 'Success');
        this.resetEditForm();
       
      }
    });
  }
  
  resetEditForm(){
    this.userEditForm.reset();
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
