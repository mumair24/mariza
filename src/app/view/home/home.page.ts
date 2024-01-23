import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from 'src/app/shared/service/product.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Product } from './product'
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CartService } from 'src/app/shared/service/cart/cart.service';
import { ToastController } from '@ionic/angular';
import { WishlistService } from 'src/app/shared/service/wishlist/wishlist.service';
import { Router } from '@angular/router';
import { FilterService } from 'src/app/shared/service/filter/filter.service';


interface Brand {
  id?: number;
  imageUrl?: string;
  name?: string
}
interface Category {
  id?: number;
  imageUrl?: string;
  name?: string
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
  ],
})
export class HomePage implements OnInit, AfterViewInit {
  customOptions!: OwlOptions;
  brandData: Brand[] = [];
  categoryData: Category[] = [];
  productData: Product[] = [];
  updatedProducts: Product[] = [];
  showAction: boolean[] = new Array(this.productData.length).fill(false);
  showHeart: boolean[] = new Array(this.productData.length).fill(false);
  iconName: string[] = [];
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
  dataSource = new MatTableDataSource(this.productData);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredItems: Product[] = [];
  clearBrand: boolean = false;
  clearCategory: boolean = false;
  cartMessage: string = 'Add to Cart Successfully'
  constructor(
    private productService: ProductService,
    private _liveAnnouncer: LiveAnnouncer,
    private cartService: CartService,
    private toastController: ToastController,
    private wishListService: WishlistService,
    private router: Router,
    private filterSearch: FilterService
  ) { }

  //LifeCycle Hook Start
  ngOnInit() {
    setTimeout(() => {
      this.customOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        dots: false,
        margin: 20,
        navSpeed: 700,
        navText: ['', '',],
        responsive: {
          0: {
            items: 3
          }
        },
        nav: true
      }
    }, 300);
    this.showBrand();
    this.showProducts();
    this.showCategory();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  //End

  //ToggleHandle Start
  toggleAction(id: number) {
    this.showAction[id] = !this.showAction[id];
  }
  toggleHeart(id: number) {
    this.showHeart[id] = !this.showHeart[id];
    this.iconName[id] = this.showHeart[id] ? 'heart' : 'heart-outline';
  }
  toggleCards() {
    this.isCardView = !this.isCardView;
    if (!this.isCardView) {
      this.title = 'Listing';
      this.viewType = 'list';
    } else {
      this.title = 'Card';
      this.viewType = 'card';
    }
  }
  //End

  //Services Start
  showBrand() {
    this.productService.showBrands().subscribe((res: any) => {
      this.brandData = res.data;
    },
      (error) => {
        console.error('Error fetching brands:', error);
      })
  }
  showCategory() {
    this.productService.showCategory().subscribe((res: any) => {
      this.categoryData = res.data;
    },
      (error) => {
        console.error('Error fetching brands:', error);
      })
  }

  showProducts() {
    this.productService.showProduct().subscribe((res: any) => {
      this.productData = res.products;
      this.iconName = new Array(this.productData.length).fill('heart-outline');
      this.dataSource.data = this.productData;
      this.filteredItems = [...this.productData];
    },
      (error) => {
        console.error("Error fetching products:", error);
      }
    )
  }

  handleSearch(searchQuery: string) {
    if (searchQuery) {
      this.filteredItems = this.productData.filter((product: Product) =>
        product.productName && product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      this.dataSource.data = this.filteredItems;
      this.applyFilter();
    } else {
      this.filteredItems = [...this.productData];
      this.dataSource.data = this.productData;
      this.applyFilter();
    }
  }

  addToCartItem(cart: Product) {
    this.presentToast('top');
    this.cartService.addToCart(cart);
  }

  addToWishlistItem(product: Product): void {
    this.wishListService.addToWishlist(product);
    product.wishList = true;
  }
  //End

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  navigateToProductDetail(productId?: number) {
    if (productId) {
      this.router.navigate(['/product-detail', productId]);
    } else {
      console.error('Product ID is undefined');
    }
  }

  //Filters Start
  private applyFilter() {
    this.dataSource.data = this.filteredItems;
    this.dataSource.paginator?.firstPage();
  }
  filterByCategory(category?: string) {
    this.filterSearch.filterByCategory(this.productData, category);
    this.filteredItems = this.filterSearch.getFilteredItems();
    this.clearCategory = !!category;
    this.applyFilter();
  }
  filterByBrand(brand?: string) {
    this.filterSearch.filterByBrand(this.productData, brand);
    this.filteredItems = this.filterSearch.getFilteredItems();
    this.clearBrand = !!brand;
    this.applyFilter();
  }
  reset() {
    this.filterSearch.reset(this.productData);
    this.filteredItems = this.filterSearch.getFilteredItems();
    this.clearBrand = false;
    this.clearCategory = false;
    this.applyFilter();
  }
  //end
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

  checkOut(cart: Product) {
    this.cartService.addToCart(cart);
    this.router.navigate(['delivery-info']);
  }
}
