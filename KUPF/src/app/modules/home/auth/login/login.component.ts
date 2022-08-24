import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first, Observable, Subscription } from 'rxjs';
import { Login } from 'src/app/modules/models/login';
import { DbCommonService } from 'src/app/modules/_services/db-common.service';
import { LoginService } from 'src/app/modules/_services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

hasError: boolean;
returnUrl: string;
isLoading$: Observable<boolean>;

//
loginDto: Login[]=[];
// private fields
private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
loginForm: FormGroup;
model: any = {}
constructor(
  private fb: FormBuilder,
  private router: Router,
  private loginService: LoginService,
  private toastr: ToastrService,
  private OccupationService: DbCommonService
) {
  
}
selectedCar: number;
    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];
ngOnInit(): void {  
  this.initForm();
}

initForm() {
  this.loginForm = this.fb.group({
       username: new FormControl('',Validators.required),
       password: ['', Validators.required],
       locations:['']
  });
}
// To access username in .html file.
get username(){return this.loginForm.get('username')}

//If user has multiple locations so login to the selected location...
onLocationChange(e:any){
  if(e.target.value != 0){
    if(e.target.value=='-Select-'){
      this.toastr.error('Invalid Location')
    }else{
      this.router.navigateByUrl('/dashboard')    
    }
    
  }
}
ngOnDestroy() {
  this.unsubscribe.forEach((sb) => sb.unsubscribe());
}

// User Login
login() { 
  this.loginService.Login([this.loginForm.value.username,this.loginForm.value.password])
  if(localStorage.length > 0){
    this.model = JSON.parse(localStorage.getItem("user") || '{}');    
    this.loginForm.controls.locations.patchValue(this.model[0].locationId)
  }

}
}