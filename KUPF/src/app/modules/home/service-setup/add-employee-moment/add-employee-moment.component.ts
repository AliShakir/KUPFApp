import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormTitleDt } from 'src/app/modules/models/formTitleDt';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { CommonService } from 'src/app/modules/_services/common.service';
import { LocalizationService } from 'src/app/modules/_services/localization.service';

@Component({
  selector: 'app-add-employee-moment',
  templateUrl: './add-employee-moment.component.html',
  styleUrls: ['./add-employee-moment.component.scss']
})
export class AddEmployeeMomentComponent implements OnInit {
/*********************/
formHeaderLabels$ :Observable<FormTitleHd[]>; 
formBodyLabels$ :Observable<FormTitleDt[]>; 
formBodyLabels :FormTitleDt[]=[]; 
id:string = '';
languageId:any;
// FormId to get form/App language
@ViewChild('AddSubscription') hidden:ElementRef;
/*********************/

  formTitle:string;
  constructor(private common: CommonService,private localizationService: LocalizationService) { }

  ngOnInit(): void {
     this.formTitle = this.common.getFormTitle();
    // console.log(this.formTitle);
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
