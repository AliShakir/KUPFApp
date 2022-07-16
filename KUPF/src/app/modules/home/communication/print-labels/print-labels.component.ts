import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { FormTitleDt } from 'src/app/modules/models/formTitleDt';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { LocalizationService } from 'src/app/modules/_services/localization.service';

@Component({
  selector: 'app-print-labels',
  templateUrl: './print-labels.component.html',
  styleUrls: ['./print-labels.component.scss']
})
export class PrintLabelsComponent implements OnInit {

/*********************/
formHeaderLabels$ :Observable<FormTitleHd[]>; 
formHeaderLabels: FormTitleHd[]=[]; 
formBodyLabels$ :Observable<FormTitleDt[]>; 
formBodyLabels :FormTitleDt[]=[]; 
id:string = '';
languageId:any;
// FormId to get form/App language
@ViewChild('PrintLabels') hidden:ElementRef;
/*********************/
lang: any;
  constructor(private localizationService: LocalizationService,public translate: TranslateService) { 
    
  }

  ngOnInit(): void {
    // TO GET THE LANGUAGE ID
    this.languageId = localStorage.getItem('langType');
    
    // Get form header labels
    this.formHeaderLabels$ = this.localizationService.getFormHeaderLabels(`PrintLabels`,this.languageId);    
    this.formHeaderLabels$.subscribe((data)=>{
      this.formHeaderLabels = data;
      console.log(data);
    },error=>{
      console.log(error);
    })
  }

  
}
