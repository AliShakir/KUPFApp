import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApproveRejectServiceDto } from '../models/ApproveRejectServiceDto';
import { DetailedEmployee } from '../models/DetailedEmployee';
import { CashierApprovalDto } from '../models/FinancialService/CashierApprovalDto';
import { ReturnTransactionHdDto } from '../models/FinancialService/ReturnTransactionHdDto';
import { TransactionHdDto } from '../models/FinancialService/TransactionHdDto';
import { RefTableDto } from '../models/ReferenceDetails/RefTableDto';
import { ReturnApprovalDetailsDto } from '../models/ReturnApprovalDetailsDto';
import { ReturnSearchResultDto } from '../models/ReturnSearchResultDto';
import { ReturnServiceApprovalDetails } from '../models/ReturnServiceApprovalDetails';
import { ReturnServiceApprovals } from '../models/ReturnServiceApprovals';
import { SearchEmployeeDto } from '../models/SearchEmployeeDto';
import { SelectServiceTypeDto } from '../models/ServiceSetup/SelectServiceTypeDto';
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
   //
   returnServiceApprovalDetails: ReturnServiceApprovalDetails[]=[];

   returnRefTableDto : RefTableDto[]=[];
  //
  employeeDetails: DetailedEmployee[]=[]

  constructor(private httpClient: HttpClient) { }

  AddFinacialService(response: FormData) {    
    return this.httpClient.post(this.baseUrl +`FinancialService/AddFinancialService`,response);
  }
  UpdateFinancialService(response: FormData) {    
    return this.httpClient.put(this.baseUrl +`FinancialService/UpdateFinancialService`,response);
  }
  saveCOA(reqData: any, userInfo: any) {
    let data = {
        "accountID": 0,
        "accountName": "string",
        "arabicAccountName": "string",
        "accountTypeID": 1,
        "userID": 1,
        "activityDateTime": "2022-11-29T15:23:32.336Z",
        "tenantID": 21,
        "locationID": 1,
        "InsertedID": 0
      }
    let postData: any = [];
    postData.push(data);
    return forkJoin(      
      reqData.map((d: any) => {        
        
        if (d.hasOwnProperty('loanAct')) {
          postData[0].accountID = d.loanAct;
          postData[0].accountName = d.lblloanActNameInEnglish;
          postData[0].arabicAccountName = d.lblloanActNameInArabic;
        } 
        // else if (d.hasOwnProperty('hajjAct')) {
        //   postData[0].accountID = d.hajjAct;
        //   postData[0].accountName = d.lblHajjActNameInEnglish;
        //   postData[0].arabicAccountName = d.lblHajjActNameInArabic;
        // } else if (d.hasOwnProperty('persLoanAct')) {
        //   postData[0].accountID = d.persLoanAct;
        //   postData[0].accountName = d.lblPersLoanActNameInEnglish;
        //   postData[0].arabicAccountName = d.lblPersLoanNameInArabic;
        // } else if (d.hasOwnProperty('consumerLoanAct')) {
        //   postData[0].accountID = d.consumerLoanAct;
        //   postData[0].accountName = d.lblConsumerLoanActNameInEnglish;
        //   postData[0].arabicAccountName = d.lblConsumerLoanNameInArabic;
        // } else if (d.hasOwnProperty('otherAct1')) {
        //   postData[0].accountID = d.otherAct1;
        //   postData[0].accountName = d.lblOtherAct1NameInEnglish;
        //   postData[0].arabicAccountName = d.lblOtherAct1NameInArabic;
        // } else if (d.hasOwnProperty('otherAct2')) {
        //   postData[0].accountID = d.otherAct2;
        //   postData[0].accountName = d.lblOtherAct2NameInEnglish;
        //   postData[0].arabicAccountName = d.lblOtherAct2NameInArabic;
        // } else if (d.hasOwnProperty('otherAct3')) {
        //   postData[0].accountID = d.otherAct3;
        //   postData[0].accountName = d.lblOtherAct3NameInEnglish;
        //   postData[0].arabicAccountName = d.lblOtherAct3NameInArabic;
        // } else if (d.hasOwnProperty('otherAct4')) {
        //   postData[0].accountID = d.otherAct4;
        //   postData[0].accountName = d.lblOtherAct4NameInEnglish;
        //   postData[0].arabicAccountName = d.lblOtherAct4NameInArabic;
        // } else if (d.hasOwnProperty('otherAct5')) {
        //   postData[0].accountID = d.otherAct5;
        //   postData[0].accountName = d.lblOtherAct5NameInEnglish;
        //   postData[0].arabicAccountName = d.lblOtherAct5NameInArabic;
        // }
        
        return this.httpClient.post(this.baseUrl +`FinancialService/SaveCOA`, postData);
        // .pipe(
        //   map((resp) => {
        //     return resp;
        //   })
        // )
      })
    )
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
    return this.httpClient.get<ReturnServiceApprovals[]>(this.baseUrl + `FinancialService/GetServiceApprovalsByEmployeeId?employeeId=${employeeId}`).pipe(
      map(returnServiceApprovals => {
        this.returnServiceApprovals = returnServiceApprovals;
        return returnServiceApprovals;
      })
    )
  }
  GetServiceApprovalDetailByTransId(transId:any) {      
    return this.httpClient.get<ReturnServiceApprovalDetails[]>(this.baseUrl + `FinancialService/GetServiceApprovalDetailByTransId?transId=${transId}`).pipe(
      map(returnServiceApprovalDetails => {
        this.returnServiceApprovalDetails = returnServiceApprovalDetails;        
        return returnServiceApprovalDetails;
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
  GetServiceType(tenentId:number) { 
    return this.httpClient.get<SelectServiceTypeDto[]>(this.baseUrl + `FinancialService/GetServiceType?tenentId=${tenentId}`);    
  }

  GetServiceApprovalsByTransIdAsync(tenentId:number,locationId:number,transId:number) { 
    return this.httpClient.get<ReturnApprovalDetailsDto[]>(this.baseUrl + `FinancialService/GetServiceApprovalsByTransIdAsync?tenentId=${tenentId}&locationId=${locationId}&transId=${transId}`);    
  }

  SearchEmployee(searchEmployeeDto: SearchEmployeeDto) {
    return this.httpClient.post<ReturnSearchResultDto[]>(this.baseUrl + `FinancialService/SearchEmployee`,searchEmployeeDto);
  }
  SearchSponsor(searchEmployeeDto: SearchEmployeeDto) {
    return this.httpClient.post<ReturnSearchResultDto[]>(this.baseUrl + `FinancialService/SearchSponsor`,searchEmployeeDto);
  }
  GetCashierApprovals(periodCode:number,tenentId:number,locationId:number) { 
    return this.httpClient.get<CashierApprovalDto[]>(this.baseUrl + `FinancialService/GetCashierApprovals?periodCode=${periodCode}&tenentId=${tenentId}&locationId=${locationId}`);    
  }
  SaveDraftAndDeliveryInformation(response: CashierApprovalDto) {    
    return this.httpClient.post(this.baseUrl +`FinancialService/SaveDraftAndDeliveryInformation`,response);
  }
  GenerateFinancialServiceSerialNo() { 
    return this.httpClient.get<any>(this.baseUrl + `FinancialService/GenerateFinancialServiceSerialNo`);    
  }
}
