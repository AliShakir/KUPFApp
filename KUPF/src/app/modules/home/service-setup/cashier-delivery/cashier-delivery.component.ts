import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cashier-delivery',
  templateUrl: './cashier-delivery.component.html',
  styleUrls: ['./cashier-delivery.component.scss']
})
export class CashierDeliveryComponent implements OnInit {

  cashierDeliveryForm: FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    //
    this.initializeCashierDeliveryForm();
  }

  initializeCashierDeliveryForm(){
    this.cashierDeliveryForm = this.fb.group({
      totalAmount: new FormControl('0'),
      draftNumber: new FormControl('0'),
      bankAccount: new FormControl(null)
    })
  }
  saveClick(){
    this.cashierDeliveryForm.value;
    console.log(this.cashierDeliveryForm.value)
  }
}
