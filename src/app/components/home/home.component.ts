import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  gridFlag : boolean = true;
  formFlag : boolean = false;
  constructor(private _route : Router) {}

  ngOnInit(): void {

  }

  showOrderForm(){
    this.gridFlag = !this.gridFlag
    this.formFlag = !this.formFlag
  }

  placeParcel(){
    this.gridFlag = !this.gridFlag
    this.formFlag = !this.formFlag
  }

  checkParcel(){
    this._route.navigate(['delivery-page'])
  }
  getLocation(){

  }
}
