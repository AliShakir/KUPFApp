import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormTitleDt } from '../models/formTitleDt';
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
  //
  formTitleDt : FormTitleDt[] = [];
  constructor(private httpClient:HttpClient) { }

 
  getFormHeaderLabels(formId:string,languageId:string)
  {
    if(this.formTitleHd.length > 0 )return of (this.formTitleHd);    
    return this.httpClient.get<FormTitleHd[]>(this.baseUrl+`FormLabels/GetFormHeaderLabels/` + formId + "/" + languageId).pipe(
      map(formTitleHd =>{
        this.formTitleHd = formTitleHd;
        
        return formTitleHd;
      })     
    )    
  }
  getFormBodyLabels(formId:string,languageId:string)
  {
    if(this.formTitleDt.length > 0 )return of (this.formTitleDt);    
    return this.httpClient.get<FormTitleDt[]>(this.baseUrl+`FormLabels/GetFormBodyLabels/` + formId + "/" + languageId).pipe(
      map(formTitleDt =>{
        this.formTitleDt = formTitleDt;
        return formTitleDt;
      })
    )
  }
  
  getAppLabels()
  {
    
    if(this.formTitleHd.length > 0 )return of (this.formTitleHd);    
    return this.httpClient.get<FormTitleHd[]>(`https://kupfapi.erp53.com/api/FormLabels/GetAllAppLabels/`).pipe(
      map(formTitleHd =>{
        this.formTitleHd = formTitleHd;        
        return formTitleHd;
      })     
    )    
  }
   
}
