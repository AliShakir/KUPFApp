import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { FormTitleDt } from 'src/app/modules/models/formTitleDt';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { GetFormLabels } from 'src/app/modules/models/GetFormLables';
import { LocalizationService } from 'src/app/modules/_services/localization.service';

@Component({
  selector: 'app-add-documents',
  templateUrl: './add-documents.component.html',
  styleUrls: ['./add-documents.component.scss']
})
export class AddDocumentsComponent implements OnInit {
  
  /*********************/
formHeaderLabels$ :Observable<FormTitleHd[]>; 
formBodyLabels$ :Observable<FormTitleDt[]>; 
formBodyLabels :FormTitleDt[]=[]; 
id:string = '';
languageId:any;
// FormId to get form/App language
@ViewChild('AddDocuments') hidden:ElementRef;
/*********************/

  lang: any;
  constructor(private localizationService: LocalizationService,public translate: TranslateService) {
    
  }  
  ngOnInit(): void {
    //this.translate.setDefaultLang('ar');
    this.lang = localStorage.getItem('lang');
    this.translate.use(this.lang);  
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
      console.log(this.formBodyLabels);     
    },error=>{
      console.log(error);
    })    
    
  }
  
}

