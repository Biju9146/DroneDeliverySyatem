import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  User: any = ['Super Admin', 'Author', 'Reader'];
  registrationForm : FormGroup;

  constructor(private _router : Router, private _service : RegistrationService ) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      regName: new FormControl('', [Validators.required]),
      regEmail: new FormControl('', [Validators.required, Validators.email, this.emailPattern]),
      regPassword: new FormControl('', [Validators.required, this.passwordPattern])
    })
  }

  existingUser(){
    this._router.navigate(['/signin'])
  }

  registration(regData){
    let requestData = {
      userName : regData.regName,
      userEmail : regData.regEmail,
      userPassword : regData.regPassword,
    }
    console.log("regData ++++ ",requestData)

    this._service.registrationUser(requestData).subscribe((responseData)=>{
      console.log("responseData ", responseData)
      if(responseData.status == 200){
        this._router.navigate(['']);
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
