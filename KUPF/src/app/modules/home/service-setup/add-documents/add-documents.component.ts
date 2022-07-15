import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { GetFormLabels } from 'src/app/modules/models/GetFormLables';
import { LocalizationService } from 'src/app/modules/_services/localization.service';

@Component({
  selector: 'app-add-documents',
  templateUrl: './add-documents.component.html',
  styleUrls: ['./add-documents.component.scss']
})
export class AddDocumentsComponent implements OnInit {
  
  /******************* */
  formtileHd$ :Observable<FormTitleHd[]>; 
  id:string = '';
  languageId:any;
  // FormId to get form/App language
  @ViewChild('AddDocuments') hidden:ElementRef;
  /******************* */
  lang: any;
  constructor(private localizationService: LocalizationService,public translate: TranslateService) {
    
  }  
  ngOnInit(): void {
    //this.translate.setDefaultLang('ar');
    this.lang = localStorage.getItem('lang');
    this.translate.use(this.lang);  
  }
  ngAfterViewInit() {
    // this.id = this.hidden.nativeElement.value ;
    // //
    // this.languageId = localStorage.getItem('langType');
    // this.formtileHd$ = this.localizationService.getFormHeaderLabels(this.id,this.languageId);    
    
  }
  
}

