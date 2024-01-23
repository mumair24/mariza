import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/service/order/order.service';
import { Order } from '../../shared/service/order/order'

@Component({
  selector: 'app-place-orders',
  templateUrl: './place-orders.page.html',
  styleUrls: ['./place-orders.page.scss'],
})
export class PlaceOrdersPage implements OnInit {
  orders: any[] = [];
  innerArray: number[][] = [];
  innerArrayLength: number[] = [];
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  ionViewWillEnter(){
    this.getOrders();
  }

  getOrders() {
    this.orderService.getAllOrder().subscribe((res: any) => {
      this.orders = res.orders;
      this.innerArray = this.orders.map((item: any) => JSON.parse(item.prodItems));
      this.innerArrayLength = this.innerArray.map((item: number[]) => item.length);
    });
  }
}
