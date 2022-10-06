import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceTypeAndSubTypeIdsDto } from '../models/FinancialService/ServiceTypeAndSubTypeIdsDto';
import { ServiceSetupDto } from '../models/ServiceSetup/ServiceSetupDto';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
 // Getting base URL of Api from enviroment.
 baseUrl = environment.KUPFApiUrl;

 //
 serviceSetupDto: ServiceSetupDto[]=[];
  constructor(private httpClient: HttpClient) { }

  GetSelectedServiceSubType(serviceType : number, serviceSubType: number,tenentId:number) {
    return this.httpClient.get<ServiceSetupDto[]>(this.baseUrl + `FinancialService/GetServiceByServiceTypeAndSubType/${serviceType}/${serviceSubType}/${tenentId}`).pipe(
      map(serviceSetupDto => {
        this.serviceSetupDto = serviceSetupDto;
        return serviceSetupDto;
      })
    )
  }
  
}
