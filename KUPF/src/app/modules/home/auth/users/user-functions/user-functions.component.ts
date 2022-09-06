import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { map, Observable } from 'rxjs';
import { SelectMasterIdDto } from 'src/app/modules/models/SelectMasterIdDto';
import { SelectUsersDto } from 'src/app/modules/models/SelectUsersDto';
import { UserFunctionDto } from 'src/app/modules/models/UserFunctions/UserFunctionDto';
import { DbCommonService } from 'src/app/modules/_services/db-common.service';
import { UserFunctionsService } from 'src/app/modules/_services/user-functions.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-functions',
  templateUrl: './user-functions.component.html',
  styleUrls: ['./user-functions.component.scss']
})
export class UserFunctionsComponent implements OnInit {
  //
  checkBox = true;
  //
  users$: Observable<SelectUsersDto[]>;
  //
  masterIds$: Observable<SelectMasterIdDto[]>;
  //
  userFunctions$: Observable<UserFunctionDto[]>;
  //
  moduleWiseMenuItems$: Observable<UserFunctionDto[]>;
  //
  moduleWiseMenuSubItems$: Observable<UserFunctionDto[]>;
  //
  selectedMenuItem: string;
  //
  lang: any = '';
  //
  checkData: any;

  // To get and put selected user info e.g. location Id, user id, role id etc.
  selectedUserInfo: SelectUsersDto;
  
  userId: any;
  constructor(private dbCommonService: DbCommonService,
    private userFunctionService: UserFunctionsService,
    private toastr: ToastrService,
    private activatedRout: ActivatedRoute) {
    this.userId = this.activatedRout.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    
    this.lang = localStorage.getItem('lang');
    //
    this.users$ = this.dbCommonService.GetUsers();
    //
    this.masterIds$ = this.dbCommonService.GetMasterId();
    //
    this.userFunctions$ = this.userFunctionService.GetFunctionUserByUserIdAsync(this.userId);
    //
    
    this.userFunctionService.GetFunctionUserByUserIdAsync(this.userId).subscribe((data) => {
      this.dbCommonService.GetUsers().subscribe((res) => {        
        // TO filter user information based on userId...  
        this.selectedUserInfo = res.find(x => x.userId == this.userId)!;
        // Append user's extra information...
        for (let user of data) {
          user.locatioN_ID = this.selectedUserInfo?.locationId;
          user.useR_ID = this.selectedUserInfo?.userId!;
          user.rolE_ID = 0;
          user.logiN_ID = this.selectedUserInfo?.loginId!;
          user.password = this.selectedUserInfo?.password!;
        }
      })
      console.log('data', data);
      this.checkData = data;
    });
    // Filling the DropDown...
    this.moduleWiseMenuItems$ = this.userFunctionService.GetModuleWiseMenuItems();
  }




  savedata() {    
    this.userFunctionService.AddFunctionForUser(this.checkData).subscribe(()=>{
      this.toastr.success('Saved Successfully')
    })
  }
  async checkCheckBoxvalue(event: any, item: any) {
    let name = event.source.name;
    this.checkData = this.checkData.map((e: any) => {
      return e.fulL_NAME === item.fulL_NAME
        ? { ...e, [name]: event.checked == true ? 1 : 0 }
        : e;
    });
  }
  //
  async checkAllCheckBoxvalue(event: any, colunmName: any){
    let name = event.checked;        
    this.checkData = this.checkData.map((e: any) => {
      return true ? { ...e, [colunmName]: event.checked == true ? 1 : 0 } : e;
    }); 
    console.log("this.checkData=>",this.checkData);
  }
  //
  onMenuItemSelect(e:any){      
    
    //selectedMenuItem etLocale.
    let filtereData = this.userFunctions$.pipe(map(item=>{
      return item.filter(c=>c.masteR_ID == e.target.value);
    }))
    // Refill the existing Observable...
    this.userFunctions$ = filtereData;   
     
    filtereData.subscribe((d)=>{
      this.dbCommonService.GetUsers().subscribe((res) => {        
        // TO filter user information based on userId...  
        this.selectedUserInfo = res.find(x => x.userId == this.userId)!;
        // Append user's extra information...
        for (let user of d) {
          user.locatioN_ID = this.selectedUserInfo?.locationId;
          user.useR_ID = this.selectedUserInfo?.userId!;
          user.rolE_ID = 0;
          user.logiN_ID = this.selectedUserInfo?.loginId!;
          user.password = this.selectedUserInfo?.password!;
        }
      })
      this.checkData = d;
    })
    //this.checkData = filtereData;   
  }
}



