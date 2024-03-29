import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OffersDto } from '../models/OffersDto';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  // Getting base URL of Api from enviroment.
  baseUrl = environment.KUPFApiUrl;
  
  // 
  offersDto: OffersDto[]=[]
  constructor(private httpClient: HttpClient) { }

  //
  AddOffer(data: FormData) {    
    return this.httpClient.post(this.baseUrl +`Offers/AddOffer`,data);
  }
  //
  UpdateOffer(data: FormData) {    
    return this.httpClient.put(this.baseUrl +`Offers/EditOffer`,data);
  }
  //
  GetOfferById(id:any) {    
    return this.httpClient.get<OffersDto[]>(this.baseUrl +`Offers/GetOfferById/${id}`).pipe(
      map(offersDto => {
        this.offersDto = offersDto;
        return offersDto;
      })
    )
  }
  //
  DeleteOffer(id: number) { 
    return this.httpClient.delete(`${this.baseUrl}Offers/DeleteOffer?id=${id}`);    
  }
  //
  GetOffers() {    
    return this.httpClient.get<OffersDto[]>(this.baseUrl +`Offers/GetOffers`).pipe(
      map(offersDto => {
        this.offersDto = offersDto;
        return offersDto;
      })
    )  
  }
}
