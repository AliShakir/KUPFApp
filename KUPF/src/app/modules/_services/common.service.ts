import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  //
  employeeId: any;
  formTitle: string;
  ifEmployeeExists: Boolean;
  public menuSessionUdpated = new Subject<any>();
  constructor() { }
  sendFormTitle(title :string){
  this.formTitle = title
  }
  getFormTitle(){
    return this.formTitle;
  }
}
