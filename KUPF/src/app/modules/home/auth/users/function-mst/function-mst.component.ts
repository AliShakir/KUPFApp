import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { FunctionMst } from 'src/app/modules/models/FunctionMst';
import { FunctionMstService } from 'src/app/modules/_services/function-mst.service';

@Component({
  selector: 'app-function-mst',
  templateUrl: './function-mst.component.html',
  styleUrls: ['./function-mst.component.scss']
})
export class FunctionMstComponent implements OnInit {


//#region
  // To display table column headers
  columnsToDisplay: string[] = ['ModuleId', 'MenuType', 'MenuName1', 'MenuName2','MenuName3','Link','action'];

  // Getting data as abservable.
  functionMst$: Observable<FunctionMst[]>;

  // We need a normal array of data so we will subscribe to the observable and will get data
  functionMst: MatTableDataSource<FunctionMst> = new MatTableDataSource<any>([]);

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

  


  constructor(private functionMstService: FunctionMstService, private _formBuilder: FormBuilder) {

    this.formGroup = new FormGroup({
      searchTerm: new FormControl(null)
    })
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  ngOnInit(): void {
   this.functionMst$ = this.functionMstService.getAllFunctionMst()
   this.functionMst$.subscribe((resoponse: FunctionMst[]) => {
    this.functionMst = new MatTableDataSource<FunctionMst>(resoponse);
    this.functionMst.paginator = this.paginator;
    this.functionMst.sort = this.sort;
    this.isLoadingCompleted = true;
  }, error => {
    // Incase of any error
    console.log(error);
    this.dataLoadingStatus = 'Error fetching the data';
    this.isError = true;
  })
  }
  filterRecords() {
    if (this.formGroup.value.searchTerm != null && this.functionMst) {
      this.functionMst.filter = this.formGroup.value.searchTerm.trim();
    }
  }
  clearFilter() {
    this.formGroup?.patchValue({ searchTerm: "" });
    this.filterRecords();
  }
}
