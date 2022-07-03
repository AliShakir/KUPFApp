import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormTitleHd } from '../models/formTitleHd';
import { GetFormLabels } from '../models/GetFormLables';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  // Getting base URL of Api from enviroment.
  baseUrl = environment.KUPFApiUrl;
  
  //
  formTitleHd : FormTitleHd[] = [];
  constructor(private httpClient:HttpClient) { }

 
  getFormLabels(formId:string,languageId:string)
  {
    if(this.formTitleHd.length > 0 )return of (this.formTitleHd);    
    return this.httpClient.get<FormTitleHd[]>(this.baseUrl + `FormLabels/GetFormLabels/` + formId + "/" + languageId).pipe(
      map(formTitleHd =>{
        this.formTitleHd = formTitleHd;
        return formTitleHd;
      })     
    )    
  }
  
   
}
