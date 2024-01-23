import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/service/cart/cart.service';
import { Product } from '../home/product';
import { OrderService } from 'src/app/shared/service/order/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  orders: any[] = [];
  email:string = 'example@email.com';
  parseData!: any;
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
