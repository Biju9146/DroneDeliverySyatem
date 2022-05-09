import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { CommonService } from 'src/app/observables/commonService';
import { OrderListComponent } from '../order-list/order-list.component';
declare const L: any;

@Component({
  selector: 'app-delivery-page',
  templateUrl: './delivery-page.component.html',
  styleUrls: ['./delivery-page.component.scss'],
})
export class DeliveryPageComponent implements OnInit, AfterViewInit, OnChanges {
  // private mymap = new L.map('map');
  locationArray = [
    { lat: 53.35362523805683, lng: -6.291389465332032, name: 'marker1' },
    { lat: 53.337433437129675, lng: -6.244010925292969, name: 'marker2' },
    { lat: 53.34071328580364, lng: -6.23027801513672, name: 'marker3' },
    { lat: 53.32861759386586, lng: -6.233367919921875, name: 'marker4' },
    { lat: 53.3419431640244, lng: -6.347351074218751, name: 'marker5' },
  ];

  movingLatLngArray = [
    [53.352421, -6.26298],
    [53.343506, -6.284866],
    [53.350244, -6.286368],
  ];

  latlngs = [
    [53.35362523805683, -6.291389465332032],
    [53.337433437129675, -6.244010925292969],
    [53.34071328580364, -6.23027801513672],
  ];
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
  animatedMarker;
  constructor(
    private _bottomSheet: MatBottomSheet,
    private _commonService: CommonService
  ) {}

  ngAfterViewInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes event ', changes);
    // this.newValue = changes.currentValue;
    // var container = L.DomUtil.get('map');
    //   console.log('container is ', container);
    //   if (container != null) {
    //     container._leaflet_id = null;
    //   }
    // this.addPropsOnMap();
  }

  ngOnInit(): void {
    this._commonService.checkUserDataStatus.subscribe((data) => {
      console.log('observable data ', data);
      if (data) {
        this.addNewPropsOnMap(data);
      } else {
        this.initMap();
        // this.addPropsOnMap()
      }
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
      .bindPopup('<b>Hello world!</b><br> I am Drone Service provider.', {
        closeOnClick: true,
      });
    marker.openPopup();

    // this.addPropsOnMap();
  }

  addPropsOnMap() {
    // setTimeout(function () {
    //   this.mymap.invalidateSize();
    // }, 5000);
    console.log('addProps else part');
    this.mymap.on('click', (e) => {
      alert('You clicked the map at ' + e.latlng);
      // if (marker) {
      //   mymap.removeLayer(marker);
      // }
      // marker = L.marker([e.latlng.lat, e.latlng.lng],this.markerIcon).addTo(mymap)
      // marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    });
    let polyline = L.polyline(this.latlngs, { color: 'red' })
      .bindPopup('Route 1')
      .openPopup()
      .addTo(this.mymap);

    this.mymap.fitBounds(polyline.getBounds());

    // moving marker
    var line = L.polyline(this.latlngs),
      animatedMarker = L.animatedMarker(line.getLatLngs(), {
        interval: 4000, // milliseconds
      }).bindPopup('<b>Hello world!</b><br>I am a popup.');
    this.mymap.addLayer(animatedMarker);

    navigator.geolocation.getCurrentPosition((position) => {
      let coords = position.coords;
      let latlong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, lng: ${position.coords.longitude}`
      );
    });
  }

  watchPosition() {
    let destinationLat = 0;
    let destinationLag = 0;

    let watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `lat: ${position.coords.latitude}, lng: ${position.coords.longitude}`
        );
        if (position.coords.latitude === destinationLat) {
          navigator.geolocation.clearWatch(watchId);
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
    console.log('new Props ', newProps);

    let polyline = L.polyline(newProps.receiverLatLang, { color: 'red' })
      .bindPopup('Route 2')
      .openPopup()
      .addTo(this.mymap);

    var line = L.polyline(newProps.receiverLatLang);
    this.animatedMarker = L.animatedMarker(
      line.getLatLngs(),
      this.deliveryMarkerIcon,
      {
        distance: 90000,
        interval: 2000, // milliseconds
      }
    )
      .bindPopup('I am a popup 2.', {
        closeOnClick: false,
      })
      .openPopup();

    setTimeout(() => {this.animatedMarker.bindPopup('I reached to destination!').openPopup();}, 3000);
    setTimeout(() => {
      if (this.animatedMarker) {
        this.mymap.removeLayer(this.animatedMarker);
      }
      this.returDroneToHome(newProps.receiverLatLang);
    }, 5000);
    this.mymap.addLayer(this.animatedMarker);
  }

  returDroneToHome(returDroneToHome) {
    // let destination = returDroneToHome[1]
    var line = L.polyline([returDroneToHome[1], returDroneToHome[0]]);
    let animatedMarker = L.animatedMarker(
      line.getLatLngs(),
      this.deliveryMarkerIcon,
      {
        distance: 90000,
        interval: 2000, // milliseconds
      }
    );
    this.mymap.addLayer(animatedMarker);
    setTimeout(() => {
      if (animatedMarker) {
        this.mymap.removeLayer(animatedMarker);
      }
    }, 3000);
  }
}
