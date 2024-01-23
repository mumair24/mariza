import { Injectable } from '@angular/core';
import { Product } from '../../../view/home/product'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'myCart';
  private cartItemsSource = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSource.asObservable();
  constructor() {
    const cartItems = this.getCartItems();
    this.cartItemsSource.next(cartItems);
   }

  private updateCartItemsInStorage(newCartItems: Product[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(newCartItems));
    this.cartItemsSource.next(newCartItems);
  }

  getCartItems(): Product[] {
    const cartData = localStorage.getItem(this.cartKey);
    const cartItems: Product[] = cartData ? JSON.parse(cartData) : [];
    this.cartItemsSource.next(cartItems);
    return cartItems;
  }

  addToCart(item: Product): void {
    const cartItems = this.cartItemsSource.getValue();

    const existingItem = cartItems.find(existingItem => existingItem.id === item.id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      item.quantity = 1;
      cartItems.push(item);
    }

    this.updateCartItemsInStorage(cartItems);
  }

  updateCartItem(updatedItem: Product): void {
    let cartItems = this.cartItemsSource.getValue();
    cartItems = cartItems.map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    });
    this.updateCartItemsInStorage(cartItems);
  }

  removeFromCart(itemToRemove: Product): void {
    let cartItems = this.cartItemsSource.getValue();
    cartItems = cartItems.filter(item => item !== itemToRemove);
    this.updateCartItemsInStorage(cartItems);
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
    this.cartItemsSource.next([]);
  }
}
