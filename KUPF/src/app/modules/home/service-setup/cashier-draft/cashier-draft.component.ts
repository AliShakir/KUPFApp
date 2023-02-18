import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { isError } from 'lodash';
import * as moment from 'moment';
import { Validators } from 'ngx-editor';
import { Observable } from 'rxjs';
import { SelectBankAccount } from 'src/app/modules/models/SelectBankAccount';
import { DbCommonService } from 'src/app/modules/_services/db-common.service';

@Component({
  selector: 'app-cashier-draft',
  templateUrl: './cashier-draft.component.html',
  styleUrls: ['./cashier-draft.component.scss']
})
export class CashierDraftComponent implements OnInit {

  //
  cashierDraftForm: FormGroup;
  transId: number;
  employeeId: number
  //
  isFormSubmitted:false;
  //
  selectBankAccount$: Observable<SelectBankAccount[]>;
  constructor(private fb: FormBuilder,
    private dbCommonService: DbCommonService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.transId = params['mytransId'];
      this.employeeId = params['employeeId'];
    });
  }

  ngOnInit(): void {
    // Get Tenant Id
    var data = JSON.parse(localStorage.getItem("user")!);
    const tenantId = data.map((obj: { tenantId: any; }) => obj.tenantId);
    const locationId = data.map((obj: { locationId: any; }) => obj.locationId);
    const username = data.map((obj: { username: any; }) => obj.username);
    //
    this.initializeCashierDeliveryForm();
    //
    this.selectBankAccount$ = this.dbCommonService.GetBankAccounts(tenantId, locationId);
    //
    this.dbCommonService.GetDraftInformationByEmployeeId(this.employeeId, tenantId, locationId, this.transId).subscribe((response: any) => {
      this.cashierDraftForm.patchValue({
        totalAmount: response.totalAmount.toFixed(3),
        bankDetails: response.bankDetails,
        draftNumber: response.draftNumber,
        receivedBy: response.receivedBy,
        receivedDate: response.receivedDate,
        deliveredBy: username,
        deliverDate: moment(new Date).format("DD-MM-YYYY"),
        pfid: response.pfid,
        empCidNum: response.empCidNum,
        employeeId: response.employeeId,
        arabicName: response.arabicName,
        englishName: response.englishName,
        draftNumber1: response.draftNumber1
      })
    }, error => {
      console.log(error);
    })
  }

  saveClicked(){
    //this.isFormSubmitted = true;
  }
  initializeCashierDeliveryForm() {
    this.cashierDraftForm = this.fb.group({
      totalAmount: new FormControl('0'),
      bankDetails: new FormControl(Validators.required),
      draftNumber: new FormControl('0'),
      draftDate: new FormControl(moment(new Date).format("DD-MM-YYYY")),
      receivedBy: new FormControl(),
      receivedDate: new FormControl(),
      deliveredBy: new FormControl(),
      pfid: new FormControl(),
      empCidNum: new FormControl(),
      employeeId: new FormControl(),
      arabicName: new FormControl(),
      englishName: new FormControl(),
      draftNumber1: new FormControl(),
      deliverDate: new FormControl(null)
    })
  }
  onBankAccountSelect($event:any){    
    this.cashierDraftForm.patchValue({
      bankDetails:$event.accountNumber
    })
  }
  // To access form controls...
  get cashierDraftFrm() { return this.cashierDraftForm.controls; }
}
