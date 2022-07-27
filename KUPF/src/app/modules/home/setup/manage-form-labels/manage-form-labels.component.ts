import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FormTitleDt } from 'src/app/modules/models/formTitleDt';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { LocalizationService } from 'src/app/modules/_services/localization.service';

@Component({
  selector: 'app-manage-form-labels',
  templateUrl: './manage-form-labels.component.html',
  styleUrls: ['./manage-form-labels.component.scss']
})
export class ManageFormLabelsComponent implements OnInit {
  
  searchTerm:string = '';
  sortBy:string="headerName";
  sortOrder:string = "ASC";
  //
  formTitleHd$: Observable<FormTitleHd[]>;
  formTitleHd: FormTitleHd[];
  //
  FormTitleDt$: Observable<FormTitleDt[]>;
  page: number = 1;

  constructor(private localizationService: LocalizationService) { }

  ngOnInit(): void {   
    this.formTitleHd$ = this.localizationService.getAllFormHeaderLabels(); 
    // this.formTitleHd$.subscribe(resoponse=>{
    //   this.formTitleHd = resoponse;
    //   console.log(this.formTitleHd);
    // },error=>{
    //   console.log(error);
    // })
  }
  
}
