import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { AuthService } from 'src/app/observables/auth.service';
import { CommonService } from 'src/app/observables/commonService';
import { OrderListService } from './orderList.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy  {
  deliveryCount;
  deliveryData = null;
  shipedParcelFlag : boolean = false;
  setStatusObservable;
  orderListArray = [];

  constructor(private _bottomSheetRef: MatBottomSheetRef<OrderListComponent>,
    private _commonService : CommonService, private authService: AuthService, private _orderListService : OrderListService) { }


  ngOnInit(): void {

    this.getAllDeliveryOrders();

    this.setStatusObservable = this._commonService.userParcelShipedStatus.subscribe((shipedData)=>{
      console.log("shipedData ",shipedData);
      let userEmail = sessionStorage.getItem('user')
      if(shipedData != ''){
        let requestData = {
          deliveryFlag : '1',
          id : shipedData,
          loginEmail : userEmail
        }
        this._orderListService.updateDeliveryOrderStatus(requestData).subscribe((responseData)=>{
          console.log("shipped Status ----> ",responseData)
          if(responseData.status == 200){
            alert("Status Updated !")
          } else {
            alert("Went wrong for Status Updated !")
          }
        })
        console.log("----> ",this.orderListArray)
        this.checkParcelCount();
      } else {
        this.checkParcelCount();
      }
    });

  }

  getAllDeliveryOrders(){

    let userEmail = sessionStorage.getItem('user')
    let requestParam = {
      loginEmail : userEmail
    }
    this._orderListService.getDeliveryOrders(requestParam).subscribe((responseData)=>{
      console.log("responseData +++ ", responseData);
      let formatedObj = responseData.body.map((element)=>{
          let latLngPattern = element.recepientLatLng.split(',')
          element.recepientLatLng = latLngPattern;
          console.log("lat -----> ",element.recepientLatLng)
          return element;
      })
      console.log("obj -----> ",formatedObj)

      if(responseData.status == 200){
        this.orderListArray = formatedObj;
        this.checkParcelCount();
      } else {
        this.authService.logout();
      }
    })
  }

  checkParcelCount(){
    this.deliveryCount = this.orderListArray.filter((element)=>{
      console.log("this.delivery", element)

      return element.deliveryFlag == '0';

    })
    console.log("this.delivery", this.deliveryCount)
  }
  sendDeliveryPackage(event: MouseEvent,element): void {
    console.log("element", element)
    this.deliveryData = element;
    this._commonService.setParcelDataOnMap(element);
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnDestroy() {
    this.setStatusObservable.unsubscribe()
  }
}
