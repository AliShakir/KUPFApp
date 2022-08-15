import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first, Observable, Subscription } from 'rxjs';
import { Login } from 'src/app/modules/models/login';
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

// private fields
private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
loginForm: FormGroup;
model: any = {}
constructor(
  private fb: FormBuilder,
  private router: Router,
  private loginService: LoginService,
  private toastr: ToastrService
) {
  
}

ngOnInit(): void {  
  this.initForm();
}

initForm() {
  this.loginForm = this.fb.group({
       username: new FormControl('',{
        validators:[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],        
       }),
       password: ['', Validators.required],
  });
}
// To access username in .html file.
get username(){return this.loginForm.get('username')}
submit() {
 //this.router.navigateByUrl('/dashboard');
this.loginService.Login(this.loginForm.value);
}

ngOnDestroy() {
  this.unsubscribe.forEach((sb) => sb.unsubscribe());
}
isUserValid :Boolean = false;
login() {
  this.loginService.Login([this.loginForm.value.username,this.loginForm.value.password])
  .subscribe(res => {
    if(res == 'Failure'){
      this.isUserValid= false;
      this.toastr.error("Invalid username or password");
    } else{
      this.isUserValid = true;
      this.router.navigateByUrl('/dashboard')
    }
    
  },
    (error) => {
      this.toastr.error("OK");
    })

}
}