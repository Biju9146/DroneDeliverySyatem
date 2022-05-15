import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/observables/auth.service';
import { CommonService } from 'src/app/observables/commonService';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  placeOrderForm : FormGroup;

  constructor(private _route : Router,
    private authService: AuthService, private _service : OrderService) { }

  ngOnInit(): void {
    this.placeOrderForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      userEmail: new FormControl('', [Validators.required,Validators.email, this.emailPattern]),
      userMobile: new FormControl('', [Validators.required, this.onlyNumberKey]),
      userAddress: new FormControl('', [Validators.required]),
      recepientName: new FormControl('', [Validators.required]),
      recepientEmail: new FormControl('', [Validators.required, this.emailPattern]),
      recepientContact: new FormControl('', [Validators.required, this.onlyNumberKey]),
      recepientAddress: new FormControl('', [Validators.required]),
      recepientLatLng: new FormControl('', [Validators.required, this.latLngValidation]),
      typeofParcel: new FormControl('', [Validators.required]),
      parcelWeight: new FormControl('', [Validators.required,this.weightValidation])
    });
  }

  placeParcel(placeData){
     console.log("place Order data ",placeData)
     let userEmail = sessionStorage.getItem('user')
     let requestData = {
      username : placeData.username,
      userEmail : placeData.userEmail,
      userMobile : placeData.userMobile,
      userAddress : placeData.userAddress,
      recepientName : placeData.recepientName,
      recepientEmail : placeData.recepientEmail,
      recepientContact : placeData.recepientContact,
      recepientAddress : placeData.recepientAddress,
      recepientLatLng : placeData.recepientLatLng,
      typeofParcel : placeData.typeofParcel,
      parcelWeight : placeData.parcelWeight,
      deliveryFlag : '0',
      loginEmail : userEmail
    }

    this._service.placeDeliver(requestData).subscribe((responseData)=>{
      console.log("responseData ", responseData)
      if(responseData.status == 200){
        this._route.navigate(['home']);
      } else {
        this.authService.logout();
      }
    })



  }
  cancel(){
    this._route.navigate(['home'])
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

  onlyNumberKey = (control: FormControl): {[s: string]: boolean} => {
    if(!control.value) {
      return { required: true };
    } else if (control.value.match(/^[0-9]{10}$/)){
      return {};
    } else {
      return { pattern: true, error: true };
    }
}
  weightValidation = (control: FormControl): {[s: string]: boolean} => {
    console.log("control.value ",control.value)
    if(!control.value) {
      return { required: true };
    } else if (control.value.match(/^[0-9]{1}$/) && control.value !<= 3){
      return {};
    } else {
      return { weightPattern: true, error: true };
    }
}
  latLngValidation = (control: FormControl): {[s: string]: boolean} => {
    console.log("control.value", control.value)
    if(!control.value) {
      return { required: true };
    } else if (control.value.match(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)){
      return {};
    } else {
      return { latLngPattern: true, error: true };
    }
}

}
