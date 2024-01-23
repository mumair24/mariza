import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-place',
  templateUrl: './order-place.page.html',
  styleUrls: ['./order-place.page.scss'],
})
export class OrderPlacePage implements OnInit {
  email:string = 'example@email.com';
  deliveryForm: any;
  subTotal: any;
  cartItems: any;
  totalAmount: any;
  constructor() { }

  ngOnInit() {
    this.getItemsFormLocal();
  }

  getItemsFormLocal() {
    this.deliveryForm = JSON.parse(localStorage.getItem('deliveryForm')!);
    this.subTotal = JSON.parse(localStorage.getItem('subTotal')!);
    this.cartItems = JSON.parse(localStorage.getItem('myCart')!);
    this.totalAmount = JSON.parse(localStorage.getItem('totalAmount')!);
  }
}
