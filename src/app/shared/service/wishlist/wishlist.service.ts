import { Injectable } from '@angular/core';
import { Product } from '../../../view/home/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistKey = 'myWishlist';
  private wishlistItemsSource = new BehaviorSubject<Product[]>([]);
  wishlistItems$ = this.wishlistItemsSource.asObservable();

  constructor() { }

  private updateWishlistItemsInStorage(newWishlistItems: Product[]): void {
    localStorage.setItem(this.wishlistKey, JSON.stringify(newWishlistItems));
    this.wishlistItemsSource.next(newWishlistItems);
  }

  getWishlistItems(): Product[] {
    const wishlistData = localStorage.getItem(this.wishlistKey);
    const wishlistItems: Product[] = wishlistData ? JSON.parse(wishlistData) : [];
    this.wishlistItemsSource.next(wishlistItems);
    return wishlistItems;
  }

  addToWishlist(item: Product): void {
    const wishlistItems = this.wishlistItemsSource.getValue();
    wishlistItems.push(item);
    item.wishList = true;
    this.updateWishlistItemsInStorage(wishlistItems);
  }

  updateWishlistItem(updatedItem: Product): void {
    let wishlistItems = this.wishlistItemsSource.getValue();
    wishlistItems = wishlistItems.map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    });
    this.updateWishlistItemsInStorage(wishlistItems);
  }

  removeFromWishlist(itemToRemove: Product): void {
    let wishlistItems = this.wishlistItemsSource.getValue();
    wishlistItems = wishlistItems.filter(item => item !== itemToRemove);
    this.updateWishlistItemsInStorage(wishlistItems);
  }

  clearWishlist(): void {
    localStorage.removeItem(this.wishlistKey);
    this.wishlistItemsSource.next([]);
  }
}
