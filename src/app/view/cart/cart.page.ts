import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../home/product';
import { CartService } from 'src/app/shared/service/cart/cart.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, AfterViewInit {
  cartItems: Product[] = [];
  filteredItems: Product[] = [];
  isCardView: boolean = true;
  title: string = 'Card';
  viewType: string = 'card'
  displayedColumns: string[] = ['image', 'name', 'size', 'stitching', 'price', 'action'];
  dataSource = new MatTableDataSource(this.cartItems);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cartService: CartService, private _liveAnnouncer: LiveAnnouncer,) { }
  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.filteredItems = this.cartItems;
      this.dataSource.data = this.cartItems;
    });

    this.cartService.getCartItems();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  toggleCards(){
    this.isCardView = !this.isCardView;
    if(!this.isCardView){
      this.title = 'Listing';
      this.viewType = 'list';
    } else{
      this.title = 'Card';
      this.viewType = 'card';
    }
  }

  removeCart(cart: Product) {
    this.cartService.removeFromCart(cart);
  }

  increaseQuantity(cartItem: Product) {
    cartItem.quantity = (cartItem.quantity || 0) + 1;
    this.cartService.updateCartItem(cartItem);
  }

  decreaseQuantity(cartItem: Product) {
    if (cartItem.quantity && cartItem.quantity > 0) {
      cartItem.quantity -= 1;
      if (cartItem.quantity === 0) {
        this.cartService.removeFromCart(cartItem);
      } else {
        this.cartService.updateCartItem(cartItem);
      }
    }
  }

  calculateSubtotal(cartItem: Product): number {
    if (cartItem.quantity !== undefined && cartItem.price !== undefined) {
      return cartItem.quantity * cartItem.price;
    }
    return 0;
  }

  handleSearch(searchQuery: string) {
    if (searchQuery) {
      this.filteredItems = this.cartItems.filter((product: Product) =>
        product.productName && product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      this.dataSource.data = this.filteredItems;
    } else {
      this.filteredItems = [...this.cartItems];
      this.dataSource.data = this.cartItems;
    }
  }
}
