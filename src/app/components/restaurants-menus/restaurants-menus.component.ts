import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-restaurants-menus',
  templateUrl: './restaurants-menus.component.html',
  styleUrls: ['./restaurants-menus.component.scss']
})
export class RestaurantsMenusComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<RestaurantsMenusComponent>) { }

  ngOnInit(): void {
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
