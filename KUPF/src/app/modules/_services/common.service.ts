import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  formTitle: string;
  public menuSessionUdpated = new Subject<any>();
  constructor() { }
  sendFormTitle(title :string){
  this.formTitle = title
  }
  getFormTitle(){
    return this.formTitle;
  }
}
