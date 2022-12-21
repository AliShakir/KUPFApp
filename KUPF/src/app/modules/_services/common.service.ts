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
  // We will check if Employee already subscribed OR not...
  PFId:any;
  // We will check what form is currently opened.
  FormOpened:any;
  public menuSessionUdpated = new Subject<any>();
  public empSearchClickEvent = new Subject<any>();
  constructor() { }
  sendFormTitle(title :string){
  this.formTitle = title
  }
  getFormTitle(){
    return this.formTitle;
  }
}
