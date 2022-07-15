import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormTitleDt } from 'src/app/modules/models/formTitleDt';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { LocalizationService } from 'src/app/modules/_services/localization.service';

@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.scss']
})
export class SubscriptionDetailsComponent implements OnInit {

  /*********************/
formHeaderLabels$ :Observable<FormTitleHd[]>; 
formBodyLabels$ :Observable<FormTitleDt[]>; 
formBodyLabels :FormTitleDt[]=[]; 
id:string = '';
languageId:any;
// FormId to get form/App language
@ViewChild('SubscriptionDetails') hidden:ElementRef;
/*********************/

  constructor(private localizationService: LocalizationService) { 
    console.log(`subscription details constructor called`);
    //this.id = this.hidden.nativeElement.value;
    this.languageId = localStorage.getItem('langType');
    
    // Get form header labels
    this.formHeaderLabels$ = this.localizationService.getFormHeaderLabels('SubscriptionDetails',this.languageId);
    
    // Get form body labels 
    this.formBodyLabels$= this.localizationService.getFormBodyLabels('SubscriptionDetails',this.languageId)
    
    // Get observable as normal array of items
    this.formBodyLabels$.subscribe((data)=>{
      this.formBodyLabels = data   
    },error=>{
      console.log(error);
    })
    
  }

  ngOnInit(): void {
    
  }
  ngAfterContentInit() {  
    

}
  // ngAfterViewInit() {
    
  //   // TO get the form id...
  //   this.id = this.hidden.nativeElement.value;
    
  //   // TO GET THE LANGUAGE ID
  //   this.languageId = localStorage.getItem('langType');
    
  //   // Get form header labels
  //   this.formHeaderLabels$ = this.localizationService.getFormHeaderLabels(this.id,this.languageId);
    
  //   // Get form body labels 
  //   this.formBodyLabels$= this.localizationService.getFormBodyLabels(this.id,this.languageId)
    
  //   // Get observable as normal array of items
  //   this.formBodyLabels$.subscribe((data)=>{
  //     this.formBodyLabels = data   
  //   },error=>{
  //     console.log(error);
  //   })
  // }

 
}
