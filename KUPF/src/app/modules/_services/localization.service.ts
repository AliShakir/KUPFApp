import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormTitleHd } from '../models/formTitleHd';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  baseUrl = environment.KUPFApiUrl;
  constructor(private httpClient:HttpClient) { }


  getGetData():Observable<FormTitleHd[]>
  {
    return this.httpClient.get<FormTitleHd[]>(this.baseUrl + `FormLabels`)
  }
}
