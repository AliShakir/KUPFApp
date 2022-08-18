import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { SelectConsumerLoanAcDto } from '../models/SelectConsumerLoanActDto';
import { SelectDepartmentsDto } from '../models/SelectDepartmentsDto';
import { SelectHajjAcDto } from '../models/SelectHajjAcDto';
import { SelectLoanAcDto } from '../models/SelectLoanAcDto';
import { SelectOccupationsDto } from '../models/SelectOccupationsDto';
import { SelectOtherAct1Dto } from '../models/SelectOtherAct1Dto';
import { SelectOtherAct2Dto } from '../models/SelectOtherAct2Dto';
import { SelectOtherAct3Dto } from '../models/SelectOtherAct3Dto';
import { SelectOtherAct4Dto } from '../models/SelectOtherAct4Dto';
import { SelectPerLoanActDto } from '../models/SelectPerLoanActDto';
import { SelectTerminationsDto } from '../models/SelectTerminationsDto';

@Injectable({
  providedIn: 'root'
})
export class DbCommonService {

  // Getting base URL of Api from enviroment.
  baseUrl = environment.KUPFApiUrl;
  //
  occupationsDto: SelectOccupationsDto[]=[];
  //
  departmentsDto: SelectDepartmentsDto[]=[];
  //
  terminationDto: SelectTerminationsDto[]=[];
  //
  hajjAcDto: SelectHajjAcDto[]=[];
  //
  loanAcDto: SelectLoanAcDto[]=[];
  //
  perLoanAcDto: SelectPerLoanActDto[]=[];
  //
  consumerLoanAcDto: SelectConsumerLoanAcDto[]=[];
  //
  otherAct1: SelectOtherAct1Dto[]=[];
  //
  otherAct2: SelectOtherAct2Dto[]=[];
  //
  otherAct3: SelectOtherAct3Dto[]=[];
  //
  otherAct4: SelectOtherAct4Dto[]=[];
  //
  constructor(private httpClient: HttpClient) { }

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
}
