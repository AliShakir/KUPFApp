import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
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
  DeleteEmployee(employeeId: number) { 
    return this.httpClient.delete(`${this.baseUrl}Employee/DeleteEmployee?employeeId=${employeeId}`);    
  }
  GetAllEmployees(userParams: UserParams) {    
    return this.httpClient.get(this.baseUrl + `Employee/GetEmployees?PageNumber=${userParams.pageNumber}&PageSize=${userParams.pageSize}`, {observe: 'response'});    
  }
}
