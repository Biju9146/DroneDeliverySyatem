import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

   static getValidatorErrorMessage(validatorName, validatorValue, controlName){
    let config = {
      // required: `${controlName} is required`,
      required: controlName + ` is required`,
      invalidCreditCard: 'Is invalid credit card number',
      invalidEmailAddress: 'Invalid email address',
      invalidMobNo: 'Invalid Mobile number',
      invalidPassword: 'Invalid password. Password must be at least 8 characters long, must contain numeric and Alpha characters.',
      confirmPassword: 'Confirm Password does not match',
      minlength: `Minimum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }

  getValue(value){
    return value
  }

  static emailValidation(control){
    if(control && control.value){
      if(control.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        return null;
      }else {
        return { invalidEmailAddress: true }
      }
    }
    return 
  }

  static mobileNoValidation(control){
    if(control && control.value){
      if(control.value.match(/^[0-9]{10}$/)){
        return null;
      }else {
        return { invalidMobNo: true }
      }
    }
  }

  static passwordValidation(control){
    if(control && control.value){
      if(control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
        return null;
      }else {
        return { invalidPassword: true }
      }
    }
  }

  static confirmPswdValidaiton(control){
    if(control && control.value){
      let parentForm = control._parent;
      if(parentForm && parentForm.get('resetPassword') && (parentForm.get('resetPassword').value == control.value)){
        return null;
      }else {
        return { confirmPassword : true }
      }
    }
  }

  
}
