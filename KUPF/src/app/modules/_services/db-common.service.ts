import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CoaDto } from '../models/CoaDto';
import { SelectConsumerLoanAcDto } from '../models/SelectConsumerLoanActDto';
import { SelectDepartmentsDto } from '../models/SelectDepartmentsDto';
import { SelectHajjAcDto } from '../models/SelectHajjAcDto';
import { SelectLoanAcDto } from '../models/SelectLoanAcDto';
import { SelectMasterIdDto } from '../models/SelectMasterIdDto';
import { SelectOccupationsDto } from '../models/SelectOccupationsDto';
import { SelectOtherAct1Dto } from '../models/SelectOtherAct1Dto';
import { SelectOtherAct2Dto } from '../models/SelectOtherAct2Dto';
import { SelectOtherAct3Dto } from '../models/SelectOtherAct3Dto';
import { SelectOtherAct4Dto } from '../models/SelectOtherAct4Dto';
import { SelectPerLoanActDto } from '../models/SelectPerLoanActDto';
import { SelectRefSubTypeDto } from '../models/SelectRefSubTypeDto';
import { SelectRefTypeDto } from '../models/ReferenceDetails/SelectRefTypeDto';
import { SelectTerminationsDto } from '../models/SelectTerminationsDto';
import { SelectUsersDto } from '../models/SelectUsersDto';
import { SelectServiceTypeDto } from '../models/ServiceSetup/SelectServiceTypeDto';
import { SelectMaxInstallmentDto } from '../models/ServiceSetup/SelectMaxInstallmentDto';
import { SelectMinInstallmentDto } from '../models/ServiceSetup/SelectMinInstallmentDto';
import { SelectMinMonthOfServicesDto } from '../models/ServiceSetup/SelectMinMonthOfServicesDto';
import { SelectApprovalRoleDto } from '../models/ServiceSetup/SelectApprovalRoleDto';
import { DetailedEmployee } from '../models/DetailedEmployee';
import { SearchEmployeeDto } from '../models/SearchEmployeeDto';
import { SelectServiceSubTypeDto } from '../models/ServiceSetup/SelectServiceSubTypeDto';
import { SelectMasterServiceTypeDto } from '../models/ServiceSetup/SelectMasterServiceTypeDto';

@Injectable({
  providedIn: 'root'
})
export class DbCommonService {

  // Getting base URL of Api from enviroment.
  baseUrl = environment.KUPFApiUrl;
  //
  occupationsDto: SelectOccupationsDto[] = [];
  //
  departmentsDto: SelectDepartmentsDto[] = [];
  //
  terminationDto: SelectTerminationsDto[] = [];
  //
  hajjAcDto: SelectHajjAcDto[] = [];
  //
  loanAcDto: SelectLoanAcDto[] = [];
  //
  perLoanAcDto: SelectPerLoanActDto[] = [];
  //
  consumerLoanAcDto: SelectConsumerLoanAcDto[] = [];
  //
  otherAct1: SelectOtherAct1Dto[] = [];
  //
  otherAct2: SelectOtherAct2Dto[] = [];
  //
  otherAct3: SelectOtherAct3Dto[] = [];
  //
  otherAct4: SelectOtherAct4Dto[] = [];
  //
  coaDto: CoaDto[] = [];
  //
  users: SelectUsersDto[] = [];
  //
  masterIds: SelectMasterIdDto[] = [];
  //
  refSubType: SelectRefSubTypeDto[] = [];
  //
  refType: SelectRefTypeDto[] = [];
  //
  serviceType: SelectServiceTypeDto[] = [];
  //
  serviceSubType: SelectServiceSubTypeDto[] = [];
  //
  masterServiceType: SelectMasterServiceTypeDto[] = [];
  //
  minMonthOfServices: SelectMinMonthOfServicesDto[] = [];
  //
  minInstallment: SelectMinInstallmentDto[] = [];
  //
  maxInstallment: SelectMaxInstallmentDto[] = [];
  //
  approvalRoles: SelectApprovalRoleDto[] = [];

  //
  detailedEmployee: DetailedEmployee[] = [];

  //selectedMasterIds: any[] = [];

  //loanAct: number;

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }


  // Search employee...
  SearchEmployee(searchEmployeeDto: SearchEmployeeDto) {
    return this.httpClient.post<DetailedEmployee[]>(this.baseUrl + `Common/SearchEmployee`,searchEmployeeDto);
  }
    //#region Add Service
    GetSelectedServiceType(refId:number[]) {   
      console.log('RefIds',refId);   
        return this.httpClient.post<SelectServiceTypeDto[]>(this.baseUrl + `Common/GetSelectedServiceType`,refId);  
    }
    GetSelectedServiceSubType(refId:any) {
      return this.httpClient.get<SelectServiceSubTypeDto[]>(this.baseUrl + `Common/GetSelectedServiceSubType/${refId}`).pipe(
        map(serviceSubType => {
          this.serviceSubType = serviceSubType;
          return serviceSubType;
        })
      )
    }
    //#endregion

  //#region Service Setup 
  // Get GetServiceTypes...
  GetServiceTypes(selectedMasterIds:any[]) {
    return this.httpClient.post<SelectServiceTypeDto[]>(this.baseUrl + `Common/GetServiceType`,selectedMasterIds);    
  }
  // Get GetServiceTypes...
  GetServiceSubTypes(switchNo:any) {
    return this.httpClient.get<SelectServiceSubTypeDto[]>(this.baseUrl + `Common/GetServiceSubType/`+switchNo); 
  }
  // Get GetMasterServiceTypes...
  GetMaterServiceTypes() {
    return this.httpClient.get<SelectMasterServiceTypeDto[]>(this.baseUrl + `Common/GetMasterServiceType`).pipe(
      map(masterServiceType => {
        this.masterServiceType = masterServiceType;
        return masterServiceType;
      })
    )
  }
  // Get MonthOfServices...
  GetMinMonthOfServices() {
    return this.httpClient.get<SelectMinMonthOfServicesDto[]>(this.baseUrl + `Common/GetMinMonthOfServices`).pipe(
      map(minMonthOfServices => {
        this.minMonthOfServices = minMonthOfServices;
        return minMonthOfServices;
      })
    )
  }
  // Get MinInstallment...
  GetMinInstallment() {
    return this.httpClient.get<SelectMinInstallmentDto[]>(this.baseUrl + `Common/GetMinInstallments`).pipe(
      map(minInstallment => {
        this.minInstallment = minInstallment;
        return minInstallment;
      })
    )
  }
  // Get MaxInstallment...
  GetMaxInstallment() {
    return this.httpClient.get<SelectMaxInstallmentDto[]>(this.baseUrl + `Common/GetMaxInstallments`).pipe(
      map(maxInstallment => {
        this.maxInstallment = maxInstallment;
        return maxInstallment;
      })
    )
  }
  // Get MaxInstallment...
  GetApprovalRoles() {
    return this.httpClient.get<SelectApprovalRoleDto[]>(this.baseUrl + `Common/GetApprovalRoles`).pipe(
      map(approvalRoles => {
        this.approvalRoles = approvalRoles;
        return approvalRoles;
      })
    )
  }
  //#endregion

  // Get all Occupations.
  GetOccupations() {
    return this.httpClient.get<SelectOccupationsDto[]>(this.baseUrl + `Common/GetOccupations`).pipe(
      map(occupationsDto => {
        this.occupationsDto = occupationsDto;
        return occupationsDto;
      })
    )
  }
  // Get all Departments.
  GetDepartments() {
    return this.httpClient.get<SelectDepartmentsDto[]>(this.baseUrl + `Common/GetDepartments`).pipe(
      map(departmentsDto => {
        this.departmentsDto = departmentsDto;
        return departmentsDto;
      })
    )
  }
  // Get all Terminations.
  GetTerminations() {
    return this.httpClient.get<SelectTerminationsDto[]>(this.baseUrl + `Common/GetTerminations`).pipe(
      map(terminationDto => {
        this.terminationDto = terminationDto;
        return terminationDto;
      })
    )
  }
  // Get all HajjAccounts.
  GetHajjAccounts() {
    return this.httpClient.get<SelectHajjAcDto[]>(this.baseUrl + `Common/GetHajjLoans`).pipe(
      map(hajjAcDto => {
        this.hajjAcDto = hajjAcDto;
        return hajjAcDto;
      })
    )
  }
  // Get all LoanAccounts.
  GetLoanAccounts() {
    return this.httpClient.get<SelectLoanAcDto[]>(this.baseUrl + `Common/GetLoanAct`).pipe(
      map(loanAcDto => {
        this.loanAcDto = loanAcDto;
        return loanAcDto;
      })
    )
  }
  // Get all PerLoanAccounts.
  GetPerLoanAccounts() {
    return this.httpClient.get<SelectPerLoanActDto[]>(this.baseUrl + `Common/GetPerLoanAct`).pipe(
      map(perLoanAcDto => {
        this.perLoanAcDto = perLoanAcDto;
        return perLoanAcDto;
      })
    )
  }

  // Get all ConsumerLoanAccounts.
  GetConsumerLoanAccounts() {
    return this.httpClient.get<SelectConsumerLoanAcDto[]>(this.baseUrl + `Common/GetConsumerLoanAct`).pipe(
      map(consumerLoanAcDto => {
        this.consumerLoanAcDto = consumerLoanAcDto;
        return consumerLoanAcDto;
      })
    )
  }
  // Get all OtherAcc1.
  GetOtherAcc1() {
    return this.httpClient.get<SelectOtherAct1Dto[]>(this.baseUrl + `Common/GetOtherAcc1`).pipe(
      map(otherAct1 => {
        this.otherAct1 = otherAct1;
        return otherAct1;
      })
    )
  }
  // Get all OtherAcc2.
  GetOtherAcc2() {
    return this.httpClient.get<SelectOtherAct2Dto[]>(this.baseUrl + `Common/GetOtherAcc2`).pipe(
      map(otherAct2 => {
        this.otherAct2 = otherAct2;
        return otherAct2;
      })
    )
  }
  // Get all OtherAcc3.
  GetOtherAcc3() {
    return this.httpClient.get<SelectOtherAct3Dto[]>(this.baseUrl + `Common/GetOtherAcc3`).pipe(
      map(otherAct3 => {
        this.otherAct3 = otherAct3;
        return otherAct3;
      })
    )
  }
  // Get all OtherAcc4.
  GetOtherAcc4() {
    return this.httpClient.get<SelectOtherAct4Dto[]>(this.baseUrl + `Common/GetOtherAcc4`).pipe(
      map(otherAct4 => {
        this.otherAct4 = otherAct4;
        return otherAct4;
      })
    )
  }

  //#region
  // To verify the Loan account number.
  VerifyLoanAct(accountNo: string | number) {
    return this.httpClient.get<CoaDto[]>(this.baseUrl + `Common/VerifyAccount/` + accountNo);
  }
  // To verify the Hajj account number.
  VerifyHajjAct(accountNo: string | number) {
    return this.httpClient.get<CoaDto[]>(this.baseUrl + `Common/VerifyAccount/` + accountNo);
  }
  // To verify the Per lOan account number.
  VerifyPerLoanAct(accountNo: string | number) {
    return this.httpClient.get<CoaDto[]>(this.baseUrl + `Common/VerifyAccount/` + accountNo);
  }
  // To verify Consumer account number.
  VerifyConsumerLoanAct(accountNo: string | number) {
    return this.httpClient.get<CoaDto[]>(this.baseUrl + `Common/VerifyAccount/` + accountNo);
  }
  // To verify Other account 1 number.
  VerifyOtherAct1(accountNo: string | number) {
    return this.httpClient.get<CoaDto[]>(this.baseUrl + `Common/VerifyAccount/` + accountNo);
  }
  // To verify Other account 2 number.
  VerifyOtherAct2(accountNo: string | number) {
    return this.httpClient.get<CoaDto[]>(this.baseUrl + `Common/VerifyAccount/` + accountNo);
  }
  // To verify Other account 3 number.
  VerifyOtherAct3(accountNo: string | number) {
    return this.httpClient.get<CoaDto[]>(this.baseUrl + `Common/VerifyAccount/` + accountNo);
  }
  // To verify Other account 4 number.
  VerifyOtherAct4(accountNo: string | number) {
    return this.httpClient.get<CoaDto[]>(this.baseUrl + `Common/VerifyAccount/` + accountNo);
  }
  //#endregion

  // Get all users form USER_MST table
  GetUsers() {
    return this.httpClient.get<SelectUsersDto[]>(this.baseUrl + `Common/GetUsers`).pipe(
      map(users => {
        this.users = users;
        return users;
      })
    )
  }
  // Get Master Id from FUNCTION_USERS TABLE
  GetMasterId() {
    return this.httpClient.get<SelectMasterIdDto[]>(this.baseUrl + `Common/GetMasterId`).pipe(
      map(masterIds => {
        this.masterIds = masterIds;
        return masterIds;
      })
    )
  }

  // Get RefType from RefTable
  GetRefTypes() {
    return this.httpClient.get<SelectRefTypeDto[]>(this.baseUrl + `Common/GetRefType`).pipe(
      map(refType => {
        this.refType = refType;
        return refType;
      })
    )
  }
  // Get SubRefType from RefTable
  GetRefSubTypes() {
    return this.httpClient.get<SelectRefSubTypeDto[]>(this.baseUrl + `Common/GetRefSubType`).pipe(
      map(refSubType => {
        this.refSubType = refSubType;
        return refSubType;
      })
    )
  }

  GetRefSubTypeByRefType(refType: string) {
    return this.httpClient.get<SelectRefSubTypeDto[]>(this.baseUrl + `Common/GetRefSubTypeByRefType/${refType}`).pipe(
      map(refSubType => {
        this.refSubType = refSubType;
        return refSubType;
      })
    )
  }
}
