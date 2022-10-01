import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceTypeAndSubTypeIdsDto } from '../models/FinancialService/ServiceTypeAndSubTypeIdsDto';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
 // Getting base URL of Api from enviroment.
 baseUrl = environment.KUPFApiUrl;

 //
 serviceTypeAndSubTypeIds: ServiceTypeAndSubTypeIdsDto[]=[];
  constructor(private httpClient: HttpClient) { }

  
}
