import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ReturnTransactionHdDto } from 'src/app/modules/models/FinancialService/ReturnTransactionHdDto';
import { FinancialService } from 'src/app/modules/_services/financial.service';

@Component({
  selector: 'app-financial-approval',
  templateUrl: './financial-approval.component.html',
  styleUrls: ['./financial-approval.component.scss']
})
export class FinancialApprovalComponent implements OnInit {

  //#region
  // To display table column headers
  columnsToDisplay: string[] = ['action', 'employeeName', 'services', 'installments', 'amount'];

  // Getting data as abservable.
  returnTransactionHdDto$: Observable<ReturnTransactionHdDto[]>;

  // We need a normal array of data so we will subscribe to the observable and will get data
  returnTransactionHdDto: MatTableDataSource<ReturnTransactionHdDto> = new MatTableDataSource<any>([]);

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


  constructor(private financialService: FinancialService) { 
    this.formGroup = new FormGroup({
      searchTerm: new FormControl(null)
    })
  }

  ngOnInit(): void {
    //
    this.loadData();
  }
  loadData(){
    this.financialService.GetFinancialServices().subscribe((response: ReturnTransactionHdDto[]) => {      
      this.returnTransactionHdDto = new MatTableDataSource<ReturnTransactionHdDto>(response);
      this.returnTransactionHdDto.paginator = this.paginator;
      this.returnTransactionHdDto.sort = this.sort;
      this.isLoadingCompleted = true;
    }, error => {
      console.log(error);
      this.dataLoadingStatus = 'Error fetching the data';
      this.isError = true;
    })
  }

}
