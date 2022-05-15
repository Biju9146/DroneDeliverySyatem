import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../observables/auth.service';
import { CommonService } from '../observables/commonService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  checkLogin: boolean;

  constructor(private authService: AuthService,
    private commonService: CommonService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkLogin = this.authService.isUserAuthenticate();
    this.commonService.checkUserLoginStatus.subscribe(data => {
      this.checkLogin = data;
    })
  }
  home(){
    this.router.navigate(['home'])
  }
  logout(){
    this.authService.logout();
    this.checkLogin = false;
  }

}
