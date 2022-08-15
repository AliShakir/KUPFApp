import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

 
// Getting base URL of Api from enviroment.
 baseUrl = environment.KUPFApiUrl;
  constructor(private httpClient: HttpClient,private router: Router) { }
    
  Login(model : Array<string>) {
      return this.httpClient.post(this.baseUrl + `Login/EmployeeLogin`,{
        username:model[0],
        password:model[1]
      },{
        responseType:'text',
      })
  }
}
