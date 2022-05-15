import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../observables/validation/validation.service';

@Component({
  selector: 'app-errorcontrol-message',
  templateUrl: './errorcontrol-message.component.html',
  styleUrls: ['./errorcontrol-message.component.scss'],
  // providers: [ValidationService]
})
export class ErrorcontrolMessageComponent {
  @Input('control') control: FormControl;
  @Input('controlName') controlName: string;

  constructor(
    private validationService: ValidationService
  ) { }

  ngOnInit(): void {
  }

  get errorMessage(){
    for(let propertyName in this.control.errors){
      if(this.control.errors.hasOwnProperty(propertyName) && this.control.touched){
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName], this.controlName);
        // by injecting service in provider for this component will work
        // return this.validationService.getValue(propertyName);
      }
    }
  }

}
