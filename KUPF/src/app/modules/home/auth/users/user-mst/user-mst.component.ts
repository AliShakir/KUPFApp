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
  columnsToDisplay: string[] = ['action', 'firstName', 'lastName', 'loginId', 'isActive'];
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
  changePasswordForm: FormGroup;
  //
  userForm: FormGroup;
  //
  selectedVal: any;
  isFormSubmitted = false;
  constructor(
    private userMstService: UserMstService,
    private router: Router,
    private modalService: NgbModal,
    private toastrService: ToastrService) {
    this.formGroup = new FormGroup({
      searchTerm: new FormControl(null)
    })

  }
  @ViewChild('content', { static: true }) modalContent: ElementRef;
  //
  @ViewChild('deleteModal', { static: true }) deleteModal: ElementRef;
  ngOnInit(): void {
    this.userMst$ = this.userMstService.GetUsersFromUserMst();
    this.userMst$.subscribe((response: UserMstDto[]) => {
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
    this.initializeChangePasswordForm();
    // 
    this.initializeUserForm();
  }
  onUserFormSubmit(){
    
    this.isFormSubmitted = true;
    this.userMstService.AddUserMST(this.userForm.value).subscribe(response=>{
      if(response === 1){
        this.toastrService.success('Saved successfully','Success');
        this.userForm.reset();
      }else{
        this.toastrService.error('Something went wrong. please again latter','Error');
      }
    });
  }
  resetForm(){
    this.userForm.reset();
  }

  //
  get u() { return this.userForm.controls; }

  //
  get f() { return this.changePasswordForm.controls; }

  onFormSubmit() {
    this.isFormSubmitted = true;
    this.userMstService.UpdateUserPassword(this.changePasswordForm.value).then(response => {
      if (response === 0) {
        this.toastrService.error('Password not found', 'Error');
      } else {
        this.toastrService.success('Password updated successfully', 'Success');
        this.isFormSubmitted = false;
        this.changePasswordForm.reset();
        this.modalService.dismissAll();
      }
    });
  }
  initializeUserForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      userType: new FormControl('', Validators.required),
      loginId: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      cpassword: new FormControl('',Validators.required)
    },
    
    )
  }

  //
  initializeChangePasswordForm() {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      UserId: new FormControl('', Validators.required)
    })
  }


  onChange(event: any) {
    let selectedOption = event.target.options[event.target.options.selectedIndex].text
    this.selectedVal = event.target.value;
    this.changePasswordForm.patchValue({ UserId: this.selectedVal })
    if (selectedOption === 'User Rights') {
      this.router.navigateByUrl("/users/user-functions/" + this.selectedVal);
    } else if (selectedOption === 'Change Password') {
      this.open(this.modalContent, this.selectedVal);
    }else if (selectedOption === 'Edit') {
      this.userMstService.GetUserMstById(this.selectedVal).subscribe((response:UserMstDto[])=>{
        console.log(response);
      },error=>{
        console.log(error);
      });
    } else if (selectedOption === 'Delete') {
      this.openDeleteModal(this.deleteModal, this.selectedVal);
    }

  }

  ConfirmPasswordValdator(password:any, cpassword:any){
    return (formGroup:FormGroup)=>{
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[cpassword];
      if(confirmPasswordControl.errors && !confirmPasswordControl.errors["ConfirmPasswordValdator"]){
        return;
      }
      if(passwordControl.value !== cpassword.value){
        confirmPasswordControl.setErrors({ConfirmPasswordValdator:true})
      }else{
        confirmPasswordControl.setErrors(null);
      }
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


  open(content: any, id: number) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'update') {
        
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
// Delete recored...
  openDeleteModal(content: any, id: number) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') { 
        this.userMstService.DeleteUserMST(id).subscribe(response=>{
          if(response === 1){
            this.toastrService.success('User deleted successfully', 'Success');
            // To refresh data grid
            this.userMst$.subscribe((response: UserMstDto[]) => {
              this.userMst = new MatTableDataSource<UserMstDto>(response);
              this.userMst.paginator = this.paginator;
              this.userMst.sort = this.sort;
              this.isLoadingCompleted = true;
            }, error => {
              console.log(error);
              this.dataLoadingStatus = 'Error fetching the data';
              this.isError = true;
            })
          }else{
            this.toastrService.error('Something went wrong', 'Errro');
          }
        });
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

