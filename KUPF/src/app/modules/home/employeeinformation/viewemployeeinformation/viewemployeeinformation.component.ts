import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { FormTitleDt } from 'src/app/modules/models/formTitleDt';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { LocalizationService } from 'src/app/modules/_services/localization.service';

@Component({
  selector: 'app-viewemployeeinformation',
  templateUrl: './viewemployeeinformation.component.html',
  styleUrls: ['./viewemployeeinformation.component.scss']
})
export class ViewemployeeinformationComponent implements OnInit {
 /*********************/
 formHeaderLabels$ :Observable<FormTitleHd[]>; 
 formBodyLabels$ :Observable<FormTitleDt[]>; 
 formBodyLabels :FormTitleDt[]=[]; 
 id:string = '';
 languageId:any;
 // FormId to get form/App language
 @ViewChild('EmployeeGrid') hidden:ElementRef;
  constructor(public translate: TranslateService,private localizationService: LocalizationService) { }

  ngOnInit(): void {
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
