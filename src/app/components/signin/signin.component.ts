import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { CommonService } from 'src/app/observables/commonService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm : FormGroup;

  constructor(private _router : Router, private _commonService : CommonService, private _service : LoginService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      loginEmail: new FormControl('', [Validators.required, Validators.email, this.emailPattern]),
      loginPassword: new FormControl('', [Validators.required, this.passwordPattern])
    })
    this._commonService.setUserLoginStatus(false);

  }
  newUser(){
    this._router.navigate(['/register'])
  }

  login(loginData){

    let requestData = {
      userEmail : loginData.loginEmail,
      userPassword : loginData.loginPassword,
    }

    this._service.loginUser(requestData).subscribe((responseData)=>{
      if(responseData.status == 200){
        sessionStorage.setItem('token', responseData.body.token)
        sessionStorage.setItem('user', responseData.body.userEmail)
        this._commonService.setUserLoginStatus(true);
        this._router.navigate(['/home'])
      }
    })
  }

  emailPattern = (control: FormControl): {[s: string]: boolean} => {
    console.log('+++++++ ',control.value)
    if(!control.value) {
      return { required: true };
    } else if (control.value.match((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))){
      return {};
    } else {
      return { emailPattern: true, error: true };
    }
  }

  passwordPattern = (control: FormControl): {[s: string]: boolean} => {
    console.log('+++++++ ',control.value)
    if(!control.value) {
      return { required: true };
    } else if (control.value.match((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))){
      return {};
    } else {
      return { passPattern: true, error: true };
    }
  }

}
