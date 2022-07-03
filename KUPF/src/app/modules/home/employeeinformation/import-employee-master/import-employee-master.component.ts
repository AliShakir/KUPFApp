import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { LocalizationService } from 'src/app/modules/_services/localization.service';

@Component({
  selector: 'app-import-employee-master',
  templateUrl: './import-employee-master.component.html',
  styleUrls: ['./import-employee-master.component.scss']
})
export class ImportEmployeeMasterComponent implements OnInit {
 /******************* */
 formtileHd$ :Observable<FormTitleHd[]>; 
 id:string = '';
 languageId:any;
 // FormId to get form/App language
 @ViewChild('ImportEmployeeMaster') hidden:ElementRef;
  constructor(private localizationService: LocalizationService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.id = this.hidden.nativeElement.value ;
    //
    this.languageId = localStorage.getItem('langType');
    this.formtileHd$ = this.localizationService.getFormLabels(this.id,this.languageId);    
    
  }
}
