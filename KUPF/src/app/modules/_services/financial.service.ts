import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReturnTransactionHdDto } from '../models/FinancialService/ReturnTransactionHdDto';
import { TransactionHdDto } from '../models/FinancialService/TransactionHdDto';
import { ServiceSetupDto } from '../models/ServiceSetup/ServiceSetupDto';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {

 // Getting base URL of Api from enviroment.
 baseUrl = environment.KUPFApiUrl;

 //
 serviceSetupDto: ServiceSetupDto[]=[];
 returnTransactionHdDto :ReturnTransactionHdDto[]=[];
   //
   transactionHdDto: TransactionHdDto[]=[]
  constructor(private httpClient: HttpClient) { }

  AddFinacialService(response: TransactionHdDto) {    
    return this.httpClient.post(this.baseUrl +`FinancialService/AddFinancialService`,response);
  }
  UpdateFinancialService(response: TransactionHdDto) {    
    return this.httpClient.put(this.baseUrl +`FinancialService/UpdateFinancialService`,response);
  }
  GetFinancialServiceById(id:any) {    
    return this.httpClient.get<TransactionHdDto[]>(this.baseUrl +`FinancialService/GetFinancialServiceById?transId=`+id).pipe(
      map(transactionHdDto => {
        this.transactionHdDto = transactionHdDto;
        return transactionHdDto;
      })
    )
  }
  DeleteFinancialService(mytransid: number) { 
    return this.httpClient.delete(`${this.baseUrl}FinancialService/DeleteFinancialService?transId=${mytransid}`);    
  }
  GetFinancialServices() {      
    return this.httpClient.get<ReturnTransactionHdDto[]>(this.baseUrl + `FinancialService/GetFinancialServices`).pipe(
      map(returnTransactionHdDto => {
        this.returnTransactionHdDto = returnTransactionHdDto;
        return returnTransactionHdDto;
      })
    )
  }


  GetSelectedServiceSubType(serviceType : number, serviceSubType: number,tenentId:number) {
    return this.httpClient.get<ServiceSetupDto[]>(this.baseUrl + `FinancialService/GetServiceByServiceTypeAndSubType/${serviceType}/${serviceSubType}/${tenentId}`).pipe(
      map(serviceSetupDto => {
        this.serviceSetupDto = serviceSetupDto;
        return serviceSetupDto;
      })
    )
  }
  
}
