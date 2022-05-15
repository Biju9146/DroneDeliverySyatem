import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loader: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  loaderView = this.loader.asObservable();

  setLoadingStatus(data){
    this.loader.next(data);
  }
  
}