import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
// import { CommonService } from '../../services/common/common.service';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  viewLoader: boolean = false;

  constructor(
    public loaderService: LoaderService,
    private spinner: NgxSpinnerService,
  ) {


  }

  ngOnInit() {
    // console.log(this.loaderService.loaderView, 'view');
    this.loaderService.loaderView.subscribe(loading => {
      if(loading){
        this.viewLoader = true;
        this.showLoader();
      }else {
        this.viewLoader = false;
        this.hideLoader();
      }
    })
  }



  showLoader(){
    this.spinner.show();
  }

  hideLoader(){
    this.spinner.hide();
  }

}
