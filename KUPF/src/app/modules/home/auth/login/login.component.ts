import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Observable, Subscription } from 'rxjs';

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

constructor(
  private fb: FormBuilder,
  private router: Router
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
 this.router.navigateByUrl('/dashboard');
}

ngOnDestroy() {
  this.unsubscribe.forEach((sb) => sb.unsubscribe());
}
}