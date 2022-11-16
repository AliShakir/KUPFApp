import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DetailedEmployee } from 'src/app/modules/models/DetailedEmployee';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { Pagination } from 'src/app/modules/models/pagination';
import { UserParams } from 'src/app/modules/models/UserParams';
import { EmployeeService } from 'src/app/modules/_services/employee.service';

@Component({
  selector: 'app-viewemployeeinformation',
  templateUrl: './viewemployeeinformation.component.html',
  styleUrls: ['./viewemployeeinformation.component.scss']
})
export class ViewemployeeinformationComponent implements OnInit {
  

  
  
  //  
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
  columnsToDisplay: string[] = ['action', 'IdPfIdCivilId', 'mobileNo', 'employeeName', 'source', 'department'];

  // Getting data as abservable.
  detailedEmployee$: Observable<DetailedEmployee[]>;

  // We need a normal array of data so we will subscribe to the observable and will get data
  detailedEmployee: MatTableDataSource<DetailedEmployee> = new MatTableDataSource<any>([]);

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

  //local Storage Emploee Details
  localStorageEmployee: DetailedEmployee[] = [];
  //#endregion

  lang: any = '';
  // Modal close result...
  closeResult = '';
  userParams: UserParams;
  pagination: Pagination;
  //
  currentPage = 0;
  totalRows = 0;
  pageSizeOptions: number[] = [10, 20, 50, 100];
  employeeHeaders: any = {};
  constructor(
    private employeeService: EmployeeService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router:Router
  ) {
    this.formGroup = new FormGroup({
      searchTerm: new FormControl(null)
    })
    this.userParams = this.employeeService.getUserParams();
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');

    //#region TO SETUP THE FORM LOCALIZATION    
    // TO GET THE LANGUAGE ID e.g. 1 = ENGLISH and 2 =  ARABIC
    this.languageType = localStorage.getItem('langType');

    // To get the selected language...
    this.language = localStorage.getItem('lang');

    // To setup the form id so will will get form labels based on form Id
    this.formId = 'EmployeeGrid';

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
    this.loadData(0);
  }
  loadData(pageIndex: any){
     //
     this.employeeService.setUserParams(this.userParams);
     //this.detailedEmployee = [];
     this.employeeService.GetAllEmployees(this.userParams).subscribe((response: any) => {
      this.employeeHeaders = JSON.parse(response.headers.get('pagination'));

      this.detailedEmployee = new MatTableDataSource<DetailedEmployee>(response.body);
      this.detailedEmployee.paginator = this.paginator;
      this.detailedEmployee.sort = this.sort;
      this.isLoadingCompleted = true;
      setTimeout(() => {
        this.paginator.pageIndex = pageIndex;
        this.paginator.length = this.employeeHeaders.totalItems;
      });
    }, error => {
      console.log(error);
      this.dataLoadingStatus = 'Error fetching the data';
      this.isError = true;
    })
  }
  pageChanged(event: any) {   
    if (event.pageIndex == 0) {
      this.userParams.pageNumber = event.pageIndex + 1
    } else if (event.length <= (event.pageIndex * event.pageSize + event.pageSize)) {
      this.userParams.pageNumber = event.pageIndex + 1;
    }
    else if (event.previousPageIndex > event.pageIndex) {
      this.userParams.pageNumber = event.pageIndex;
    } else {
      this.userParams.pageNumber = event.pageIndex + 1
    } 
    //this.userParams.pageNumber = event.previousPageIndex > event.pageIndex ? event.pageIndex : event.pageIndex + 1;
    this.userParams.pageSize = event.pageSize;
    this.employeeService.setUserParams(this.userParams);
    this.loadData(event.pageIndex);
  } 
  //#region Material Search and Clear Filter
  filterRecords() {
    if (this.formGroup.value.searchTerm != null && this.detailedEmployee) {
        this.detailedEmployee.filter = this.formGroup.value.searchTerm.trim();
        this.detailedEmployee.paginator = this.paginator;
        setTimeout(() => {
          this.paginator.pageIndex = this.userParams.pageNumber - 1;
          this.paginator.length = this.employeeHeaders.totalItems;
        });
        
        //this.paginator.length = employeeHeaders.totalItems;
    }
  }
  clearFilter() {
    this.formGroup?.patchValue({ searchTerm: "" });
    //this.loadData(0);
    this.filterRecords();
  }
  //#endregion
  
  //#region Delete operation and Modal Config
  open(content:any, id:number) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;        
      if (result === 'yes') {  
        this.employeeService.DeleteEmployee(id).subscribe(
          res => {
            this.toastr.success('Deleted Successfully', 'Deleted')            
          },
          error => {
            console.log(error);
          },()=>{
            // TO REFRESH / RELOAD THE PAGE WITHOUT REFRESH THE WHOLE PAGE.
            this.loadData(0);
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
  //#endregion
 
}
