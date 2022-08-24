import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DetailedEmployee } from 'src/app/modules/models/DetailedEmployee';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
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
  columnsToDisplay: string[] = ['action', 'IdPfIdCivilId', 'mobileNo','employeeName','source','department'];

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
  localStorageEmployee: DetailedEmployee[]=[];
  //#endregion

  lang: any = '';


  constructor(private employeeService: EmployeeService) {
    this.formGroup = new FormGroup({
      searchTerm: new FormControl(null)
    })
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
    debugger;
    //if (localStorage.getItem('DetailedEmployee') == null){
      this.detailedEmployee$ = this.employeeService.GetAllEmployees();
      //
      this.detailedEmployee$.subscribe((response:DetailedEmployee[])=>{
      this.detailedEmployee = new MatTableDataSource<DetailedEmployee>(response);
      this.detailedEmployee.paginator = this.paginator;
      this.detailedEmployee.sort = this.sort;
      this.isLoadingCompleted = true;  
       
      },error=>{
        console.log(error);
        this.dataLoadingStatus = 'Error fetching the data';
        this.isError = true;
      })
      
      // this.detailedEmployee$.subscribe((response:DetailedEmployee[])=>{        
      //   localStorage.setItem('DetailedEmployee',JSON.stringify(response)); 
      //   console.log(response);         
      //   },error=>{
      //     console.log(error);          
      //   })
        
       
    // }else {
    //   this.detailedEmployee = JSON.parse(localStorage.getItem('DetailedEmployee') || '{}');
    // }    
    
  }
  //#region Material Search and Clear Filter
  filterRecords() {
    if (this.formGroup.value.searchTerm != null && this.detailedEmployee) {
      this.detailedEmployee.filter = this.formGroup.value.searchTerm.trim();
    }
  }
  clearFilter() {
    this.formGroup?.patchValue({ searchTerm: "" });
    this.filterRecords();
  }
  //#endregion

}
