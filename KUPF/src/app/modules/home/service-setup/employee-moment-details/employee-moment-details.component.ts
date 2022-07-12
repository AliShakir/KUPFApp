import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormTitleDt } from 'src/app/modules/models/formTitleDt';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { CommonService } from 'src/app/modules/_services/common.service';
import { LocalizationService } from 'src/app/modules/_services/localization.service';

@Component({
  selector: 'app-employee-moment-details',
  templateUrl: './employee-moment-details.component.html',
  styleUrls: ['./employee-moment-details.component.scss']
})
export class EmployeeMomentDetailsComponent implements OnInit {

   /*********************/
formHeaderLabels$ :Observable<FormTitleHd[]>; 
formBodyLabels$ :Observable<FormTitleDt[]>; 
formBodyLabels :FormTitleDt[]=[]; 
id:string = '';
languageId:any;
// FormId to get form/App language
@ViewChild('MembershipTransactions') hidden:ElementRef;
/*********************/

  selectedOpt: string = '';
  constructor(private common: CommonService, private router: Router,private localizationService: LocalizationService) { }

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
ngAfterViewInit() {
    
  // TO get the form id...
  this.id = this.hidden.nativeElement.value;
  
  // TO GET THE LANGUAGE ID
  this.languageId = localStorage.getItem('langType');
  
  // Get form header labels
  this.formHeaderLabels$ = this.localizationService.getFormHeaderLabels(this.id,this.languageId);
  
  // Get form body labels 
  this.formBodyLabels$= this.localizationService.getFormBodyLabels(this.id,this.languageId)
  
  // Get observable as normal array of items
  this.formBodyLabels$.subscribe((data)=>{
    this.formBodyLabels = data   
  },error=>{
    console.log(error);
  })
}
}
