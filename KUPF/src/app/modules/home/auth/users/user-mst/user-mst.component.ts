import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
 // Modal close result...
 closeResult = '';
 //
 changePasswordForm : FormGroup;
 //
 selectedVal:any;
 isFormSubmitted = false;
  constructor(
    private userMstService: UserMstService,
    private router:Router,
    private modalService: NgbModal,
    private toastrService: ToastrService) 
    {
    this.formGroup = new FormGroup({
      searchTerm: new FormControl(null)
    })
   
   }
   @ViewChild('content', { static: true }) modalContent: ElementRef;
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
    //
    this.initializeForm();
  }
  get f() { return this.changePasswordForm.controls; }
  onFormSubmit(){
    this.isFormSubmitted = true;    
    this.userMstService.UpdateUserPassword(this.changePasswordForm.value).then(response=>{
     // this.changePasswordForm.reset();
      
    });
    
  }
  //
  initializeForm(){
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('',Validators.required),
      newPassword: new FormControl('',Validators.required),
      confirmPassword: new FormControl('',Validators.required), 
      UserId :new FormControl('',Validators.required)                
    })    
  }


  onChange(event:any){
    let selectedOption = event.target.options[event.target.options.selectedIndex].text
    this.selectedVal = event.target.value;
    this.changePasswordForm.patchValue({UserId:this.selectedVal})
    if(selectedOption === 'User Rights'){
      this.router.navigateByUrl("/users/user-functions/"+this.selectedVal); 
    } else if(selectedOption === 'Change Password'){
      this.open(this.modalContent,this.selectedVal);
      
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

 //#region Delete operation and Modal Config
 open(content:any, id:number) {  
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
    this.closeResult = `Closed with: ${result}`;        
    if (result === 'update') {  
      //this.onFormSubmit();
    }  
  }, (reason) => {  
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
  });  
        
}  

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
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