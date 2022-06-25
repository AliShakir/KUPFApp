import { Component, OnInit } from '@angular/core';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { LocalizationService } from 'src/app/modules/_services/localization.service';

@Component({
  selector: 'app-add-documents',
  templateUrl: './add-documents.component.html',
  styleUrls: ['./add-documents.component.scss']
})
export class AddDocumentsComponent implements OnInit {
  
  formtileHd: FormTitleHd[] = []; 
  constructor(private localizationService: LocalizationService) { }

  ngOnInit(): void {
    this.localizationService.getGetData().subscribe(
      (response:FormTitleHd[]) => {
        this.formtileHd = response
        //console.log(this.formtileHd);
        
      },
      (error) => {
        console.log(error)
      }
    )
  }
}

