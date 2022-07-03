import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { async, map, Observable } from 'rxjs';
import { FormTitleDt } from 'src/app/modules/models/formTitleDt';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { LocalizationService } from 'src/app/modules/_services/localization.service';

@Component({
  selector: 'app-import-employee-monthly-payment',
  templateUrl: './import-employee-monthly-payment.component.html',
  styleUrls: ['./import-employee-monthly-payment.component.scss']
})
export class ImportEmployeeMonthlyPaymentComponent implements OnInit {

  /******************* */
  formHeaderLabels$ :Observable<FormTitleHd[]>; 
  formBodyLabels$ :Observable<FormTitleDt[]>; 
  formBodyLabels :FormTitleDt[]=[]; 
  id:string = '';
  languageId:any;
  // FormId to get form/App language
  @ViewChild('ImportEmployeeMonthlyPayment') hidden:ElementRef;
  /******************* */
  MyLabels: FormTitleDt[] =[];
  searchTerm:string = '';
  constructor(private localizationService: LocalizationService) {
    
  }  
 
  ngOnInit(): void {
    //this.formtileHd$ = this.localizationService.getFormHeaderLabels('CarousalMaintenance','1');
  
    // this.formtileHd$.forEach((index) => {
    //   console.log(index.formTitleDTLanguage);
    // });
    
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
