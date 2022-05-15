import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../../observables/rest.service';
import { ResturlService } from '../../observables/restURL.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private restService: RestService
  ) { }

  placeDeliver(data): Observable<any>{
    return this.restService.create(ResturlService.placeDeliverOrder, data);
  }


}
