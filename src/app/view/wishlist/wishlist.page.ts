import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { WishlistService } from 'src/app/shared/service/wishlist/wishlist.service';
import { Product } from '../home/product'
import { CartService } from 'src/app/shared/service/cart/cart.service';
import { ToastController } from '@ionic/angular';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
  ],
})
export class WishlistPage implements OnInit, AfterViewInit {
  filteredItems: Product[] = [];
  wishlistItems: Product[] = [];
  showAction: boolean[] = [];
  cartMessage: string = 'Add to Cart Successfully';
  isCardView: boolean = true;
  title: string = 'Card';
  viewType: string = 'card'
  displayedColumns: string[] = [
    'image',
    'name',
    'category',
    'price',
    'action',
  ];
  dataSource = new MatTableDataSource(this.wishlistItems);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private wishlistService: WishlistService,
    private cartService: CartService,
    private toastController: ToastController,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.wishlistService.wishlistItems$.subscribe(items => {
      this.wishlistItems = items;
      this.filteredItems = this.wishlistItems;
      this.dataSource.data = this.wishlistItems;
      this.showAction = new Array(this.wishlistItems.length).fill(false);
    });

    this.wishlistService.getWishlistItems();
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

  toggleAction(id: number) {
    this.showAction[id] = !this.showAction[id];
  }
  addToCartItem(cart: Product) {
    this.presentToast('top');
    this.cartService.addToCart(cart);
  }

  navigateToProductDetail(productId?: number) {
    if (productId) {
      this.router.navigate(['/product-detail', productId]);
    } else {
      console.error('Product ID is undefined');
    }
  }

  async presentToast(position: 'top') {
    const toast = await this.toastController.create({
      message: this.cartMessage,
      duration: 1500,
      position: position,
      color: 'success',
      cssClass: 'text-center'
    });

    await toast.present();
  }
  handleSearch(searchQuery: string) {
    if (searchQuery) {
      this.filteredItems = this.wishlistItems.filter((product: Product) =>
        product.productName && product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      this.dataSource.data = this.filteredItems;
    } else {
      this.filteredItems = [...this.wishlistItems];
      this.dataSource.data = this.wishlistItems;
    }
  }

  checkOut(cart: Product) {
    this.cartService.addToCart(cart);
    this.router.navigate(['delivery-info']);
  }
}
