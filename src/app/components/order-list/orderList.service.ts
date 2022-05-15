import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../../observables/rest.service';
import { ResturlService } from '../../observables/restURL.service';

@Injectable({
  providedIn: 'root'
})
export class OrderListService {

  constructor(
    private restService: RestService
  ) { }

  getDeliveryOrders(loginEmail): Observable<any>{
    return this.restService.getByParams(ResturlService.getAllOrders, loginEmail);
  }

  updateDeliveryOrderStatus(statusFlag): Observable<any>{
    return this.restService.put(ResturlService.UpdateOrderStatus,statusFlag);
  }


}
