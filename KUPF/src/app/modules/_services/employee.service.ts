import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    
    return this.httpClient.post(`https://kupfapi.erp53.com/api/Employee/AddEmployee`,response);//Employee/AddEmployee
  }
}
