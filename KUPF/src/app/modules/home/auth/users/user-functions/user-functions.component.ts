import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { SelectMasterIdDto } from 'src/app/modules/models/SelectMasterIdDto';
import { SelectUsersDto } from 'src/app/modules/models/SelectUsersDto';
import { UserFunctionDto } from 'src/app/modules/models/UserFunctions/UserFunctionDto';
import { DbCommonService } from 'src/app/modules/_services/db-common.service';
import { UserFunctionsService } from 'src/app/modules/_services/user-functions.service';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { UserMstComponent } from '../user-mst/user-mst.component';
import { CommonService } from 'src/app/modules/_services/common.service';
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
  lang: any = '';
  //
  checkData: any;

  // To get and put selected user info e.g. location Id, user id, role id etc.
  selectedUserInfo: SelectUsersDto;
  //
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

  }

  displayedColumns: string[] = ['menuItem', 'admin', 'add', 'edit', 'delete', 'print', 'label', 'sp1', 'sp2', 'sp3', 'sp4', 'sp5', 'activeMenu'];
  displayedColumns2: string[] = ['chk1', 'chk2', 'chk3', 'chk4', 'chk5', 'chk6', 'chk7', 'chk8', 'chk9', 'chk10', 'chk11', 'chk12', 'chk13'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;



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

}
export interface PeriodicElement {
  menuItem: string;
  admin: boolean;
  add: string;
  edit: number;
  delete: string;
  print: string;
  label: string;
  sp1: string;
  sp2: string;
  sp3: string;
  sp4: string;
  sp5: string;
  activeMenu: string;


}

const ELEMENT_DATA: PeriodicElement[] = [
  { menuItem: 'Menu Item', admin: true, add: 'Hydrogen', edit: 1.0079, delete: 'H', print: 'Test', label: 'test', sp1: 'test', sp2: 'test', sp3: 'test', sp4: 'test', sp5: 'test', activeMenu: 'test' },
  { menuItem: 'Menu Item', admin: true, add: 'Helium', edit: 4.0026, delete: 'He', print: 'Test', label: 'test', sp1: 'test', sp2: 'test', sp3: 'test', sp4: 'test', sp5: 'test', activeMenu: 'test' },
  { menuItem: 'Menu Item', admin: true, add: 'Lithium', edit: 6.941, delete: 'Li', print: 'Test', label: 'test', sp1: 'test', sp2: 'test', sp3: 'test', sp4: 'test', sp5: 'test', activeMenu: 'test' },
  { menuItem: 'Menu Item', admin: true, add: 'Beryllium', edit: 9.0122, delete: 'Be', print: 'Test', label: 'test', sp1: 'test', sp2: 'test', sp3: 'test', sp4: 'test', sp5: 'test', activeMenu: 'test' },
  { menuItem: 'Menu Item', admin: true, add: 'Boron', edit: 10.811, delete: 'B', print: 'Test', label: 'test', sp1: 'test', sp2: 'test', sp3: 'test', sp4: 'test', sp5: 'test', activeMenu: 'test' },
  { menuItem: 'Menu Item', admin: true, add: 'Carbon', edit: 12.0107, delete: 'C', print: 'Test', label: 'test', sp1: 'test', sp2: 'test', sp3: 'test', sp4: 'test', sp5: 'test', activeMenu: 'test' },
  { menuItem: 'Menu Item', admin: true, add: 'Nitrogen', edit: 14.0067, delete: 'N', print: 'Test', label: 'test', sp1: 'test', sp2: 'test', sp3: 'test', sp4: 'test', sp5: 'test', activeMenu: 'test' }
];

function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}
