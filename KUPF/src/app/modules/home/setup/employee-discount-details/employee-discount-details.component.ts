import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/modules/_services/common.service';

@Component({
  selector: 'app-employee-discount-details',
  templateUrl: './employee-discount-details.component.html',
  styleUrls: ['./employee-discount-details.component.scss']
})
export class EmployeeDiscountDetailsComponent implements OnInit {

  formTitle:string;
  selectedOpt: string = '';
  constructor(private common: CommonService,private router: Router) { }
  ngOnInit(): void {
    this.formTitle = this.common.getFormTitle();
    
  }
  openLoanForm(){    
    this.redirectTo('/references/add-employee-discount');
}
  // Selec dropdown value on Change
  getSelectedService(event :any){
    this.selectedOpt = event.target.value;
    this.common.sendFormTitle(this.selectedOpt); 
  }
  // Manually redirect to URL to dynamicall change title of form
redirectTo(uri:string){
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate([uri]));
}
}
