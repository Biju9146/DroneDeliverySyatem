import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { CommonService } from 'src/app/observables/commonService';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  droneCount = 10;
  deliveryData = null;

  constructor(private _bottomSheetRef: MatBottomSheetRef<OrderListComponent>, private _commonService : CommonService) { }
  orderListArray = [
    { orderName: 'Order 1', orderWeight: "2.5kg", receiverName:'Receiver 1', receiverAddress: "D01CY20", receiverLatLang : [[53.34921, -6.260458],[53.361104, -6.289501]]},
    { orderName: 'Order 2', orderWeight: "2.5kg", receiverName:'Receiver 2', receiverAddress: "D01CY21", receiverLatLang : [[53.34921, -6.260458],[53.352498, -6.226673]]},
    { orderName: 'Order 3', orderWeight: "2.5kg", receiverName:'Receiver 3', receiverAddress: "D01CY22", receiverLatLang : [[53.34921, -6.260458],[53.362743, -6.236801]]},
    { orderName: 'Order 4', orderWeight: "2.5kg", receiverName:'Receiver 4', receiverAddress: "D01CY23", receiverLatLang : [[53.34921, -6.260458],[53.358031, -6.264439]]},
    { orderName: 'Order 5', orderWeight: "2.5kg", receiverName:'Receiver 5', receiverAddress: "D01CY24", receiverLatLang : [[53.34921, -6.260458],[53.348194, -6.281261]]},
    { orderName: 'Order 6', orderWeight: "2.5kg", receiverName:'Receiver 6', receiverAddress: "D01CY25", receiverLatLang : [[53.34921, -6.260458],[53.363972, -6.284351]]},
    { orderName: 'Order 7', orderWeight: "2.5kg", receiverName:'Receiver 7', receiverAddress: "D01CY26", receiverLatLang : [[53.34921, -6.260458],[53.332718, -6.295166]]},
    { orderName: 'Order 8', orderWeight: "2.5kg", receiverName:'Receiver 8', receiverAddress: "D01CY27", receiverLatLang : [[53.34921, -6.260458],[53.338663, -6.253109]]},
    { orderName: 'Order 9', orderWeight: "2.5kg", receiverName:'Receiver 9', receiverAddress: "D01CY28", receiverLatLang : [[53.34921, -6.260458],[53.351781, -6.281605]]},
    { orderName: 'Order 10', orderWeight: "2.5kg", receiverName:'Receiver 10', receiverAddress: "D01CY29", receiverLatLang : [[53.34921, -6.260458],[53.358953, -6.317482]]},
    { orderName: 'Order 11', orderWeight: "2.5kg", receiverName:'Receiver 11', receiverAddress: "D01CY30", receiverLatLang : [[53.34921, -6.260458],[53.36725, -6.296539]]},
    { orderName: 'Order 12', orderWeight: "2.5kg", receiverName:'Receiver 12', receiverAddress: "D01CY31", receiverLatLang : [[53.34921, -6.260458],[53.32872, -6.236629]]},

  ]
  ngOnInit(): void {
  }
  openLink(event: MouseEvent,element): void {
    console.log("element", element)
    this.deliveryData = element;
    this._commonService.setMapData(element)
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
