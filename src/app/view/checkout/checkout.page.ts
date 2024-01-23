import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/service/cart/cart.service';
import { Product } from '../home/product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  cartItems: Product[] = [];
  total: number = 0;
  subtotal: number = 0;
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
    this.calcSubTotal()
  }
  removeCart(cart: Product) {
    this.cartService.removeFromCart(cart);
    this.calcSubTotal();
  }
  calcSubTotal() {
    this.total = 0;
    for (let item of this.cartItems) {
      if (item.quantity && item.price !== undefined) {
        this.total += item.quantity * item.price;
        this.subtotal = this.total + 35 + 30;
        localStorage.setItem('totalAmount', JSON.stringify(this.total));
        localStorage.setItem('subTotal', JSON.stringify(this.subtotal));
      }
    }
  }
}
