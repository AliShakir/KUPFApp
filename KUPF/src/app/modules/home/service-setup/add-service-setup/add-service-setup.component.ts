import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-service-setup',
  templateUrl: './add-service-setup.component.html',
  styleUrls: ['./add-service-setup.component.scss']
})
export class AddServiceSetupComponent implements OnInit {

  serviceSetupForm : FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(){
    this.serviceSetupForm = new FormGroup({
      employeeName: new FormControl('',Validators.required),
      monthlySalary: new FormControl('',Validators.required),
      landLine: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      kinName: new FormControl('',Validators.required),
      kinMobile: new FormControl('',Validators.required),
      membership: new FormControl('',Validators.required),
      membershipJoiningDate: new FormControl('',Validators.required),
      termination: new FormControl('',Validators.required),
      terminationDate: new FormControl('',Validators.required),
      civilId: new FormControl('',Validators.required),
      paci: new FormControl('',Validators.required),
      otherId: new FormControl('',Validators.required),
      loanAccount: new FormControl('',Validators.required),
      hajjAccount: new FormControl('',Validators.required),
      perLoadAct: new FormControl('',Validators.required),
      consumerLoan: new FormControl('',Validators.required),
      otherAcc1: new FormControl('',Validators.required),
      otherAcc2: new FormControl('',Validators.required),
      otherAcc3: new FormControl('',Validators.required),
      otherAcc4: new FormControl('',Validators.required),
      dateOfJoining: new FormControl('',Validators.required)
    })
  }
  addServiceSetup(){
    console.log(this.serviceSetupForm.value);
  }
}
