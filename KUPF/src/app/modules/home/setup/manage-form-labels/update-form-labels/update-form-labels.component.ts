import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormTitleDt } from 'src/app/modules/models/formTitleDt';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { LocalizationService } from 'src/app/modules/_services/localization.service';

@Component({
  selector: 'app-update-form-labels',
  templateUrl: './update-form-labels.component.html',
  styleUrls: ['./update-form-labels.component.scss']
})
export class UpdateFormLabelsComponent implements OnInit {

  formTitleHd$: Observable<FormTitleHd[]>;
  
  formTitleDt$: Observable<FormTitleDt[]>;
  
  refreshFormTitleHd$ = new BehaviorSubject<boolean>(true);
  
  constructor(private router:ActivatedRoute,private localizationService: LocalizationService,private fb: FormBuilder) { }

  ngOnInit(): void {    
    this.formTitleHd$ = this.localizationService.GetFormHeaderLabelsByFormId(this.router.snapshot.params.formID);    
    this.formTitleDt$ = this.localizationService.GetFormBodyLabelsByFormId(this.router.snapshot.params.formID);
  }
 
  submit(form:any){
    var firstName = form.firstName;
    console.log(firstName);
  
    var lastName = form.lastName;
    console.log(lastName);
  
    var comment = form.comment;
    console.log(comment);
  }
}
   