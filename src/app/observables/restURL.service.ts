import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResturlService {

  constructor() { }

  public static get login(): string { return '/'; }
  public static get registration(): string { return '/userRegistration'; }
  public static get placeDeliverOrder(): string { return '/order/placeOrder'; }
  public static get getAllOrders(): string { return '/order/getOrders'; }
  public static get UpdateOrderStatus(): string { return '/order/updateOrdersStatus'; }

}
