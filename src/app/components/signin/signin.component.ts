import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private _router : Router) { }

  ngOnInit(): void {
  }
  newUser(){
    this._router.navigate(['/register'])
  }
  home(){
    this._router.navigate(['/home'])
  }
}
