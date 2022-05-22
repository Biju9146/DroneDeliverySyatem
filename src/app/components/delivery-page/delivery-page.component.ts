import {
  Component,
  OnInit,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { CommonService } from 'src/app/observables/commonService';
import { OrderListComponent } from '../order-list/order-list.component';
import { OrderListService } from '../order-list/orderList.service';
declare const L: any;

@Component({
  selector: 'app-delivery-page',
  templateUrl: './delivery-page.component.html',
  styleUrls: ['./delivery-page.component.scss'],
})
export class DeliveryPageComponent implements OnInit {

  // placeholders for the L.marker and L.circle representing user's current position and accuracy

  markerIcon = {
    icon: L.icon({
      iconSize: [35, 35],
      iconAnchor: [18, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: '../../assets/logo/anpost-logo.jpeg',
    }),
  };

  deliveryMarkerIcon = {
    icon: L.icon({
      iconSize: [40, 40],
      iconAnchor: [18, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: '../../assets/logo/drone-marker-logo.jpg',
    }),
  };

  latlng = [53.34921, -6.260458];
  mymap;
  layer;
  animatedMarker = [];
  animatedMarkerReturningHome = [];
  droneCount : number = 1
  estimatedTimeFlag: boolean = false;
  constructor(
    private _bottomSheet: MatBottomSheet,
    private _commonService: CommonService,
    private _orderListService : OrderListService
  ) {}

  ngOnInit(): void {
    this._commonService.checkUserParcelDataStatus.subscribe((data) => {
      if (data) {
        this.addNewPropsOnMap(data);
      } else {
        this.initMap();
      }
    });

    navigator.geolocation.getCurrentPosition((position) => {
      let coords = position.coords;
      let latlong = [coords.latitude, coords.longitude];
      console.log(
        `current position lat: ${position.coords.latitude}, lng: ${position.coords.longitude}`
      );
    });
    this.watchPosition();

  }

  initMap() {
    if (!navigator.geolocation) {
      console.log('No location find!');
    }
    this.mymap = L.map('map').setView(this.latlng, 13);

    this.layer = L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmlqZW5kcmEtZGJzIiwiYSI6ImNsMncwY3V5eDBoNjcza296bW5vNnl0anQifQ.6kXDoAZiTZOK-NlMEiA-7A',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token',
      }
    ).addTo(this.mymap);

    let marker = L.marker(this.latlng, this.markerIcon)
      .setBouncingOptions({
        bounceHeight: 60, // height of the bouncing
        bounceSpeed: 54, // bouncing speed coefficient
        exclusive: true, // if this marker is bouncing all others must stop
      })
      .addTo(this.mymap)
      .on('click', function () {
        this.bounce(3);
      })
      .bindPopup('<b>An Post!</b><br>Drone Delivery Service Center.', {
        closeOnClick: true,
      });
      marker.openPopup();
  }



  watchPosition() {
    let destinationLat = 0;
    let destinationLag = 0;

    let watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `checking position - lat: ${position.coords.latitude}, lng: ${position.coords.longitude}`
        );
        if (position.coords.latitude === destinationLat) {
          navigator.geolocation.clearWatch(watchId);
        } else {
          console.log("Drone is not moving, No new location found!");
        }
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }

  openBottomSheet() {
    this._bottomSheet.open(OrderListComponent);
  }

  addNewPropsOnMap(newProps) {
    this.droneCount -= 1;
    let droneIndex = 0;
    this.animatedMarker.push(newProps.id);
    let polyline = L.polyline([this.latlng, newProps.recepientLatLng], { color: 'red' })
      .bindPopup('Route 2')
      .openPopup()
      .addTo(this.mymap);

    var line = L.polyline([this.latlng, newProps.recepientLatLng]);
    this.animatedMarker.map((element, index)=>{
    this.estimatedTimeFlag = !this.estimatedTimeFlag;

      this.animatedMarker[index] = L.animatedMarker(
      line.getLatLngs(),
      this.deliveryMarkerIcon,
      {
        distance: 90000,
        interval: 2000, // milliseconds
      }
    ).bindPopup(`I am a popup ${element}.`, {
        closeOnClick: false,
      }).openPopup();

    setTimeout(() => {this.animatedMarker[index].bindPopup(`Delivery id ${element} reached to destination!`).openPopup();}, 2000);
    setTimeout(() => {
      if (index == droneIndex) {
        this.mymap.removeLayer(this.animatedMarker[droneIndex]);
        this._commonService.shipedParcelStatus(element);
        this.animatedMarker.pop()
        this.returDroneToHome([this.latlng, newProps.recepientLatLng], element);
      }
    }, 3000);
    this.mymap.addLayer(this.animatedMarker[index]);
    })
  }

  returDroneToHome(returDroneToHome, droneId) {
    let retuningDroneIndex = 0;
    this.animatedMarkerReturningHome.push(droneId)
    let polyline = L.polyline([returDroneToHome[1], returDroneToHome[0]], { color: 'green' })
      .bindPopup('Retuning Home!')
      .openPopup()
      .addTo(this.mymap);

    var line = L.polyline([returDroneToHome[1], returDroneToHome[0]]);
    this.animatedMarkerReturningHome.map((retuningElement, index)=>{
      retuningElement = L.animatedMarker(
      line.getLatLngs(),
      this.deliveryMarkerIcon,
      {
        distance: 90000,
        interval: 2000, // milliseconds
      }
    );
    this.mymap.addLayer(retuningElement);
    setTimeout(() => {
      if (index == retuningDroneIndex) {
        this.mymap.removeLayer(retuningElement);
        this.estimatedTimeFlag = !this.estimatedTimeFlag;
        this.updateDeliveryFlag(droneId);
        this.animatedMarkerReturningHome.pop()
      }
      this.droneCount += 1;
    }, 3000);
    })
  }

  updateDeliveryFlag(shipedData){
    let userEmail = sessionStorage.getItem('user')

      let requestData = {
        deliveryFlag : '1',
        id : shipedData,
        loginEmail : userEmail
      }
      this._orderListService.updateDeliveryOrderStatus(requestData).subscribe((responseData)=>{
        if(responseData.status == 200){
          console.log("Delivery success!")
        } else {
          console.log("Went wrong for Status Updated !")
        }
      })
  }
}
