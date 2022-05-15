import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './observables/auth.service';
import { CommonService } from './observables/commonService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'DroneDeliverySystem';
  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {

    if(this.authService.isUserAuthenticate()){
      // this.router.navigate(['/dashboard']);
      this.commonService.setUserLoginStatus(true);
    }else {
      this.router.navigate(['']);
      this.commonService.setUserLoginStatus(false);
    }
  }


}
