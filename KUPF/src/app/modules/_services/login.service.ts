import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { SelectOccupationsDto } from '../models/SelectOccupationsDto';
import { DbCommonService } from './db-common.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

 
// Getting base URL of Api from enviroment.
 baseUrl = environment.KUPFApiUrl;

 // 
 loginDto: Login[]=[];
 
 occupationsDto$: Observable<SelectOccupationsDto[]>;
 occupationsDto: SelectOccupationsDto[]=[];
 
  constructor(private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService
    ) {
      
    }
  
  Login(model : Array<string>) {
    return this.httpClient.post<any>(this.baseUrl + `Login/EmployeeLogin`,{
      username:model[0],
      password:model[1]
    }).subscribe(data=>{
      if(data.length > 0){
        localStorage.setItem('user',JSON.stringify(data));
        this.toastr.success("Please select location","Success")     
       // this.router.navigateByUrl('/dashboard')      
      }else{
        this.toastr.error("Invalid username or password");
      }
    })
}
  
  logout(){
    this.router.navigateByUrl('/login')
    localStorage.removeItem('user');
  }
}