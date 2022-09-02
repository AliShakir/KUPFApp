import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserMstDto } from 'src/app/modules/models/UserMst.ts/UserMstDto';
import { CommonService } from 'src/app/modules/_services/common.service';
import { UserMstService } from 'src/app/modules/_services/user-mst.service';

@Component({
  selector: 'app-user-mst',
  templateUrl: './user-mst.component.html',
  styleUrls: ['./user-mst.component.scss']
})
export class UserMstComponent implements OnInit {

  //#region
  // 
  columnsToDisplay: string[] = ['action','firstName', 'lastName', 'loginId', 'isActive'];  
  //
  userMst$: Observable<UserMstDto[]>;

  // We need a normal array of data so we will subscribe to the observable and will get data
  userMst: MatTableDataSource<UserMstDto> = new MatTableDataSource<any>([]);

  // Paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Sorting
  @ViewChild(MatSort) sort!: MatSort;

  // Hide footer while loading.
  isLoadingCompleted: boolean = false;

  // Incase of any error will display error message.
  dataLoadingStatus: string = '';

  // True of any error
  isError: boolean = false;

  // formGroup
  formGroup: FormGroup;

  // Search Term
  searchTerm: string = '';
  //#endregion

  constructor(
    private userMstService: UserMstService,
    private router:Router) 
    {
    this.formGroup = new FormGroup({
      searchTerm: new FormControl(null)
    })
   
   }

  ngOnInit(): void {
    this.userMst$ = this.userMstService.GetUsersFromUserMst();
    this.userMst$.subscribe((response:UserMstDto[])=>{
      this.userMst = new MatTableDataSource<UserMstDto>(response);
      this.userMst.paginator = this.paginator;
      this.userMst.sort = this.sort;
      this.isLoadingCompleted = true;
    }, error => {
      console.log(error);
      this.dataLoadingStatus = 'Error fetching the data';
      this.isError = true;
    })
  }


  onChange(event:any){
    let selectedOption = event.target.options[event.target.options.selectedIndex].text
    let selectedVal = event.target.value;
    if(selectedOption === 'User Rights'){
      this.router.navigateByUrl("/users/user-functions/"+selectedVal); 
    }
    
  }

 //#region Material Search and Clear Filter
 filterRecords() {
  if (this.formGroup.value.searchTerm != null && this.userMst) {
      this.userMst.filter = this.formGroup.value.searchTerm.trim();
  }
}
clearFilter() {
  this.formGroup?.patchValue({ searchTerm: "" });
  this.filterRecords();
}
//#endregion

}

export interface PeriodicElement {
  firstName: string;
  lastName: string;
  city: string;
  phoneNumber: string;
  loginName: string;
  userType: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { firstName: 'Shakir', lastName: 'Ali', city: 'Mardan', phoneNumber: '242424', loginName: 'shakirmit', userType: 'admin' }
];