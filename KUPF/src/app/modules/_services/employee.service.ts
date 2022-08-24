import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DetailedEmployee } from '../models/DetailedEmployee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // Getting base URL of Api from enviroment.
  baseUrl = environment.KUPFApiUrl;
  //
  employeeDetails: DetailedEmployee[]=[]

  constructor(private httpClient: HttpClient) {

   }
   AddEmployee(response: DetailedEmployee) {    
    return this.httpClient.post(this.baseUrl +`Employee/AddEmployee`,response);//Employee/AddEmployee
  }
  GetAllEmployees() {      
    return this.httpClient.get<DetailedEmployee[]>(this.baseUrl + `Employee/GetEmployees`).pipe(
      map(employeeDetails => {
        this.employeeDetails = employeeDetails;
        return employeeDetails;
      })
    )
  }
}
