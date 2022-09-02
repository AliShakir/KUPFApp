import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
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
constructor(private httpClient: HttpClient) { }

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
