import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { LocalizationService } from 'src/app/modules/_services/localization.service';

@Component({
  selector: 'app-viewemployeeinformation',
  templateUrl: './viewemployeeinformation.component.html',
  styleUrls: ['./viewemployeeinformation.component.scss']
})
export class ViewemployeeinformationComponent implements OnInit {
/********************/
id:string = '';
languageId:any;
// FormId to get form/App language
@ViewChild('EmployeeGrid') hidden:ElementRef;
formtileHd$ :Observable<FormTitleHd[]>; 
/********************/
  constructor(public translate: TranslateService,private localizationService: LocalizationService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.id = this.hidden.nativeElement.value ;
    //
    this.languageId = localStorage.getItem('langType');
    console.log(this.id);
    console.log(this.languageId);
    this.formtileHd$ = this.localizationService.getFormLabels(this.id,this.languageId);    
    
  }

}
