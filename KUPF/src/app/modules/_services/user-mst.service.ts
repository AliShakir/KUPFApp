import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserFunctionDto } from '../models/UserFunctions/UserFunctionDto';
import { UserMstDto } from '../models/UserMst.ts/UserMstDto';

@Injectable({
  providedIn: 'root'
})
export class UserMstService {

  // Getting base URL of Api from enviroment.
baseUrl = environment.KUPFApiUrl;
//
userMst: UserMstDto[]=[];
  he: any;
constructor(private httpClient: HttpClient,private toastr: ToastrService) { }


UpdateUserPassword(data: UserMstDto){
  return this.httpClient
    .put(this.baseUrl + "UserMst/UpatePassword", data)
    .pipe(map(res =>{  
      console.log(res); 
      if(res === 0){
        this.toastr.error('Password not found','Error');
      }else{
        this.toastr.success('Password updated successfully','Error');
      }
      return res;
    }))
    .toPromise();
}

  // Get all user User Mst
  GetUsersFromUserMst() {     
    return this.httpClient.get<UserMstDto[]>(this.baseUrl +`UserMst/GetUserMst`).pipe(
      map(userMst => {
        this.userMst = userMst;
        return userMst;
      })
    )
  }
}
