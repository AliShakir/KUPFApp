import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeleteDataDto } from '../models/DeleteDataDto';
import { DetailedEmployee } from '../models/DetailedEmployee';
import { UserParams } from '../models/UserParams';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  
  // Getting base URL of Api from enviroment.
  baseUrl = environment.KUPFApiUrl;
  //
  employeeDetails: DetailedEmployee[]=[];
  userParams: UserParams;
  // 
  // totalRows = 0;
  // pageSize = 10;
  // pageNumber = 0;
  // pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private httpClient: HttpClient) {
    this.userParams = new UserParams();
   }
   getUserParams() {
    return this.userParams;
  }
  setUserParams(params: UserParams) {
    this.userParams = params;
  }

   AddEmployee(response: DetailedEmployee) {    
    return this.httpClient.post(this.baseUrl +`Employee/AddEmployee`,response);
  }
  ValidateEmployeeData(response: DetailedEmployee) {    
    return this.httpClient.post(this.baseUrl +`Employee/ValidateEmployeeData`,response);
  }
  UpdateEmployee(response: DetailedEmployee) {    
    return this.httpClient.put(this.baseUrl +`Employee/UpdateEmployee`,response);
  }
  GetEmployeeById(id:any) {    
    return this.httpClient.get<DetailedEmployee[]>(this.baseUrl +`Employee/GetEmployeeById?employeeId=`+id).pipe(
      map(employeeDetails => {
        this.employeeDetails = employeeDetails;
        return employeeDetails;
      })
    )
  }
  DeleteEmployee(dtailedEmployee: DetailedEmployee) { 
    return this.httpClient.post(`${this.baseUrl}Employee/DeleteEmployee`,dtailedEmployee);    
  }
  GetAllEmployees(userParams: UserParams) {    
    return this.httpClient.get(this.baseUrl + `Employee/GetEmployees?PageNumber=${userParams.pageNumber}&PageSize=${userParams.pageSize}`, {observe: 'response'});    
  }
  FilterEmployee(userParams: UserParams,filterVal:any) {    
    return this.httpClient.get(this.baseUrl + `Employee/FilterEmployee?PageNumber=${userParams.pageNumber}&PageSize=${userParams.pageSize}&filterVal=${filterVal}`, {observe: 'response'});    
  }
}
