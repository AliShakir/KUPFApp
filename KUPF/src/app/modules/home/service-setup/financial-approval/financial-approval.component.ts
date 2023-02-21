import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CashierApprovalDto } from 'src/app/modules/models/FinancialService/CashierApprovalDto';
import { ReturnTransactionHdDto } from 'src/app/modules/models/FinancialService/ReturnTransactionHdDto';
import { CommonService } from 'src/app/modules/_services/common.service';
import { FinancialService } from 'src/app/modules/_services/financial.service';

@Component({
  selector: 'app-financial-approval',
  templateUrl: './financial-approval.component.html',
  styleUrls: ['./financial-approval.component.scss']
})
export class FinancialApprovalComponent implements OnInit {

  //#region
  // To display table column headers
  columnsToDisplay: string[] = ['action', 'transId','periodCode','employee', 'mobile','service'];

  // Getting data as abservable.
  financialApprovalDto$: Observable<CashierApprovalDto[]>;

  // We need a normal array of data so we will subscribe to the observable and will get data
  financialApprovalDto: MatTableDataSource<CashierApprovalDto> = new MatTableDataSource<any>([]);

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


  constructor(private financialService: FinancialService,
    private router: Router, 
    private commonService: CommonService) { 
    this.formGroup = new FormGroup({
      searchTerm: new FormControl(null)
    })
  }

  ngOnInit(): void {
    //
    this.loadData();
  }
  navigateToFinancialDraft(mytransId:number,employeeId:number) {
    this.router.navigateByUrl(`/service-setup/financial-draft?mytransId=${mytransId}&employeeId=${employeeId}`);
  }
  navigateToFinancialDelivery(mytransId:number,employeeId:number) {
    this.router.navigateByUrl(`/service-setup/financial-delivery?mytransId=${mytransId}&employeeId=${employeeId}`);
  }
  onDetailsClick(employeeId:number){
    this.commonService.isViewOnly = true;
    this.redirectTo(`/service-setup/add-service/${employeeId}`);
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  loadData(){
    //   
    var data = JSON.parse(localStorage.getItem("user")!);
    const tenantId = data.map((obj: { tenantId: any; }) => obj.tenantId);
    const locationId = data.map((obj: { locationId: any; }) => obj.locationId);
    const periodCode = data.map((obj: { periodCode: any; }) => obj.periodCode);
    const prevPeriodCode = data.map((obj: { prevPeriodCode: any; }) => obj.prevPeriodCode);
    //
    this.financialService.GetCashierApprovals(periodCode,tenantId,locationId).subscribe((response: CashierApprovalDto[]) => {      
      this.financialApprovalDto = new MatTableDataSource<CashierApprovalDto>(response);
      this.financialApprovalDto.paginator = this.paginator;
      this.financialApprovalDto.sort = this.sort;
      this.isLoadingCompleted = true;
    }, error => {
      console.log(error);
      this.dataLoadingStatus = 'Error fetching the data';
      this.isError = true;
    })
  }

}
