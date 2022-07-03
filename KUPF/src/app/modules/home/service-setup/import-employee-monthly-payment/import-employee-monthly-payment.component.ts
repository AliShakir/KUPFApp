import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { async, Observable } from 'rxjs';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { LocalizationService } from 'src/app/modules/_services/localization.service';

@Component({
  selector: 'app-import-employee-monthly-payment',
  templateUrl: './import-employee-monthly-payment.component.html',
  styleUrls: ['./import-employee-monthly-payment.component.scss']
})
export class ImportEmployeeMonthlyPaymentComponent implements OnInit {

  /******************* */
  formtileHd$ :Observable<FormTitleHd[]>; 
  id:string = '';
  languageId:any;
  // FormId to get form/App language
  @ViewChild('ImportEmployeeMonthlyPayment') hidden:ElementRef;
  /******************* */
  constructor(private localizationService: LocalizationService) {
    
  }  
 
  ngOnInit(): void {
    this.formtileHd$ = this.localizationService.getFormLabels('ImportEmployeeMonthlyPayment','1');
   
    // this.formtileHd$.forEach((index) => {
    //   console.log(index.formTitleDTLanguage);
    // });
    
  }
  ngAfterViewInit() {
    this.id = this.hidden.nativeElement.value;
    //
    this.languageId = localStorage.getItem('langType');
    this.formtileHd$ = this.localizationService.getFormLabels(this.id,this.languageId);
  }

}
