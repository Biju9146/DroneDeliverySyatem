import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
 // Check login Status
 isUserLogin = new BehaviorSubject<boolean>(false);
 checkUserLoginStatus= this.isUserLogin.asObservable();

  // for delivery Ordered Parcels
  isUserParcelDeliveryData = new BehaviorSubject<boolean>(false);
  checkUserParcelDataStatus = this.isUserParcelDeliveryData.asObservable();

  // for delivery which is already shipped!
  isUserParcelDeliveryShiped = new BehaviorSubject<string>('');
  userParcelShipedStatus = this.isUserParcelDeliveryShiped.asObservable();


  constructor(
    private toaster: MatSnackBar

  ) { }


  setUserLoginStatus(data: boolean){
    this.isUserLogin.next(data);
  }

  setParcelDataOnMap(data){
    this.isUserParcelDeliveryData.next(data);
  }

  shipedParcelStatus(data){
    this.isUserParcelDeliveryShiped.next(data)
  }

  viewToaster(message) {
    this.toaster.open(message, 'close', {
      duration: 10 * 1000,
      horizontalPosition : "center",
      verticalPosition : "top"
    })
  }

}


