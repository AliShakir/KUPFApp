import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormTitleDt } from 'src/app/modules/models/formTitleDt';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { CommonService } from 'src/app/modules/_services/common.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {

    /*********************/
formHeaderLabels$ :Observable<FormTitleHd[]>; 
formBodyLabels$ :Observable<FormTitleDt[]>; 
formBodyLabels :FormTitleDt[]=[]; 
id:string = '';
languageId:any;
// FormId to get form/App language
@ViewChild('ServiceSetupDetail') hidden:ElementRef;
/*********************/

  
  formTitle:string;
  selectedOpt: string = '';
  constructor(private common: CommonService,private router: Router) { }

  ngOnInit(): void {
    this.formTitle = this.common.getFormTitle();
    
  }
  openLoanForm(){    
    this.redirectTo('/service-setup/add-service');
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
