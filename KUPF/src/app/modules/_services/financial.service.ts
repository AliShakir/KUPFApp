import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApproveRejectServiceDto } from '../models/ApproveRejectServiceDto';
import { DetailedEmployee } from '../models/DetailedEmployee';
import { ReturnTransactionHdDto } from '../models/FinancialService/ReturnTransactionHdDto';
import { TransactionHdDto } from '../models/FinancialService/TransactionHdDto';
import { RefTableDto } from '../models/ReferenceDetails/RefTableDto';
import { ReturnServiceApprovals } from '../models/ReturnServiceApprovals';
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
   //
   returnServiceApprovals : ReturnServiceApprovals[]=[];

   returnRefTableDto : RefTableDto[]=[];
  //
  employeeDetails: DetailedEmployee[]=[]

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
  
  GetServiceApprovals() {      
    return this.httpClient.get<ReturnServiceApprovals[]>(this.baseUrl + `FinancialService/GetServiceApprovalsAsync`).pipe(
      map(returnServiceApprovals => {
        this.returnServiceApprovals = returnServiceApprovals;
        return returnServiceApprovals;
      })
    )
  }
  GetServiceApprovalsByEmployeeId(employeeId:any) {      
    return this.httpClient.get<ReturnServiceApprovals[]>(this.baseUrl + `FinancialService/GetServiceApprovalsAsync?employeeId=${employeeId}`).pipe(
      map(returnServiceApprovals => {
        this.returnServiceApprovals = returnServiceApprovals;
        return returnServiceApprovals;
      })
    )
  }

  ApproveService(response: ApproveRejectServiceDto) {    
    return this.httpClient.put(this.baseUrl +`FinancialService/ApproveServiceAsync`,response);
  }
  RejectService(response: ApproveRejectServiceDto) {    
    return this.httpClient.put(this.baseUrl +`FinancialService/RejectServiceAsync`,response);
  }
  GetRejectionType() {      
    return this.httpClient.get<RefTableDto[]>(this.baseUrl + `FinancialService/GetRejectionType`).pipe(
      map(returnRefTableDto => {
        this.returnRefTableDto = returnRefTableDto;
        return returnRefTableDto;
      })
    )
  }
  //
  GetEmployeeById(id:any) {    
    return this.httpClient.get<DetailedEmployee[]>(this.baseUrl +`Employee/GetEmployeeById?employeeId=`+id).pipe(
      map(employeeDetails => {
        this.employeeDetails = employeeDetails;
        return employeeDetails;
      })
    )
  }
}
