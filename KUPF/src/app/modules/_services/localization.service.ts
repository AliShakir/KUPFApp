import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormTitleDt } from '../models/formTitleDt';
import { FormTitleHd } from '../models/formTitleHd';
import { GetDistinctHDFormName } from '../models/GetDistinctHDFormName';
import { GetFormLabels } from '../models/GetFormLables';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  // Getting base URL of Api from enviroment.
  baseUrl = environment.KUPFApiUrl;

  //
  formTitleHd: FormTitleHd[] = [];
  //
  formTitleDt: FormTitleDt[] = [];
  //
  getDistinctHDFormName: GetDistinctHDFormName[] = [];

  constructor(private httpClient: HttpClient) { }


  getFormHeaderLabels(formId: string, languageId: string) {
    if (this.formTitleHd.length > 0) return of(this.formTitleHd);
    return this.httpClient.get<FormTitleHd[]>(this.baseUrl + `FormLabels/GetFormHeaderLabels/` + formId + "/" + languageId).pipe(
      map(formTitleHd => {
        this.formTitleHd = formTitleHd;

        return formTitleHd;
      })
    )
  }
  getFormBodyLabels(formId: string, languageId: string) {
    if (this.formTitleDt.length > 0) return of(this.formTitleDt);
    return this.httpClient.get<FormTitleDt[]>(this.baseUrl + `FormLabels/GetFormBodyLabels/` + formId + "/" + languageId).pipe(
      map(formTitleDt => {
        this.formTitleDt = formTitleDt;
        return formTitleDt;
      })
    )
  }

  getAppLabels() {

    if (this.formTitleHd.length > 0) return of(this.formTitleHd); // https://kupfapi.erp53.com/api/FormLabels/GetAllAppLabels/
    return this.httpClient.get<FormTitleHd[]>(this.baseUrl + `FormLabels/GetAllAppLabels/`).pipe(
      map(formTitleHd => {
        this.formTitleHd = formTitleHd;
        return formTitleHd;
      })
    )
  }
  // Get all form header labels.
  getAllFormHeaderLabels() { //https://kupfapi.erp53.com/api/FormLabels/GetAllFormHeaderLabels   
    return this.httpClient.get<FormTitleHd[]>(this.baseUrl + `FormLabels/GetAllFormHeaderLabels`).pipe(
      map(formTitleHd => {
        this.formTitleHd = formTitleHd; 
        return formTitleHd;
      })
    )
  }

  // / Get all form header labels by form Id.
  GetFormHeaderLabelsByFormId(formId: string) {     //https://kupfapi.erp53.com/api/FormLabels/GetFormHeaderLabelsByFormId?formId=
    //if (this.formTitleHd.length > 0) return of(this.formTitleHd);
    return this.httpClient.get<FormTitleHd[]>(this.baseUrl + `FormLabels/GetFormHeaderLabelsByFormId?formId=`+ formId).pipe(      
      map(formTitleHd => {
        this.formTitleHd = formTitleHd; 
        return formTitleHd;
      })
    )
  }

  // Get all form body labels by form Id.
  GetFormBodyLabelsByFormId(formId: string) { //    https://kupfapi.erp53.com/api/FormLabels/GetFormBodyLabelsByFormId?formId=
    return this.httpClient.get<FormTitleDt[]>(this.baseUrl + `FormLabels/GetFormBodyLabelsByFormId?formId=`+ formId).pipe(
      map(formTitleDt => {
        this.formTitleDt = formTitleDt;
        return formTitleDt;
      })
    )
  }
  /**
  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users/', member).pipe(
      map(()=>{
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }
   */
  // To update form header labels by Id
  
  UpdateFormHeaderLabelsId(response: FormTitleHd) {    
    return this.httpClient.put(this.baseUrl + `FormLabels/EditFormHeaderLabels`,response);
  }

  UpdateFormBodyLabelsId(response: FormTitleDt) {     
    return this.httpClient.put(this.baseUrl + `FormLabels/EditFormBodyLabels`,response);
  }

}
