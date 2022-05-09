import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isUserData = new BehaviorSubject<boolean>(false);
  checkUserDataStatus = this.isUserData.asObservable();

  constructor(
  ) { }

  setMapData(data){
    this.isUserData.next(data);
  }
}
