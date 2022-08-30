import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserFunctionDto } from '../models/UserFunctions/UserFunctionDto';

@Injectable({
  providedIn: 'root'
})
export class UserFunctionsService {

// Getting base URL of Api from enviroment.
baseUrl = environment.KUPFApiUrl;
//
userFunctions: UserFunctionDto[]=[];
  constructor(private httpClient: HttpClient) { }

  // Get all user functions
  GetAllUserFunctions() {     
    return this.httpClient.get<UserFunctionDto[]>(this.baseUrl +`FunctionUser/GetFunctionUser`).pipe(
      map(userFunctions => {
        this.userFunctions = userFunctions;
        return userFunctions;
      })
    )
  }
}
