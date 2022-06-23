import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/modules/_services/common.service';

@Component({
  selector: 'app-employee-moment-details',
  templateUrl: './employee-moment-details.component.html',
  styleUrls: ['./employee-moment-details.component.scss']
})
export class EmployeeMomentDetailsComponent implements OnInit {

  selectedOpt: string = '';
  constructor(private common: CommonService, private router: Router) { }

  ngOnInit(): void {
  }
  openLoanForm(){    
    this.redirectTo('/service-setup/add-employee-moment');
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
