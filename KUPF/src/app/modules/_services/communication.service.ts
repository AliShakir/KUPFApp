import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IncommingCommunicationDto } from '../models/CommunicationDto';
 
@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  // Getting base URL of Api from enviroment.
baseUrl = environment.KUPFApiUrl;
//
incommingCommunicationDto: IncommingCommunicationDto[]=[]

  constructor(private httpClient: HttpClient) { }

// // add service setup
// AddServiceSetup(data: ServiceSetupDto) {
//     return this.httpClient.post(this.baseUrl +`ServiceSetup/AddServiceSetup`,data);
// }

// //update service setup
// UpdateServiceSetup(response: ServiceSetupDto) {    
//   return this.httpClient.put(this.baseUrl +`ServiceSetup/EditServiceSetup`,response);
// }

// // delete service setup
// DeleteServiceSetup(id: number) { 
//   return this.httpClient.delete(`${this.baseUrl}ServiceSetup/DeleteServiceSetup?id=${id}`);    
// }

 
// Get all service setup
getIncommingCommunication() {      
  return this.httpClient.get<IncommingCommunicationDto[]>(this.baseUrl + `Communication/getIncommingCommunication`).pipe(
    map(incommingCommunicationDto => {
      this.incommingCommunicationDto = incommingCommunicationDto;
      return incommingCommunicationDto;
    })
  )
}


 
deleteIncommingCommunication(id: number) { 
  return this.httpClient.delete(`${this.baseUrl}Communication/deleteIncommingCommunication?id=${id}`);    
}



 
 


getIncommingCommunicationById(id: number) {    
 //return this.httpClient.get<any[]>(`${this.baseUrl}Communication/getincomingcommunicationbyid/${id}`);

  return this.httpClient.get(`${this.baseUrl}Communication/getincomingcommunicationbyid?id=${id}`);    

}


}
