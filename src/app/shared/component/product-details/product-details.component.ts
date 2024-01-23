import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/service/product.service';
import { Product } from '../../../view/home/product';
import { ActivatedRoute, Router } from '@angular/router';
import { SizeService } from 'src/app/shared/service/size/size.service';
import { CartService } from 'src/app/shared/service/cart/cart.service';
import { ToastController } from '@ionic/angular';
import { WishlistService } from 'src/app/shared/service/wishlist/wishlist.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface ProductSize {
  id: number;
  name: string;
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
  ],
})
export class ProductDetailsComponent implements OnInit {

  productId: number | null = null;
  product: Product | null = null;
  sizes: ProductSize[] = [];
  stitching: ProductSize[] = [];
  lining: ProductSize[] = [];
  selectedSize!: number
  selectedStitching!: number
  selectedLining!: number
  cartMessage: string = 'Add to Cart Successfully';
  productsByCategory: Product[] = [];
  showAction: boolean[] = [];
  showHeart: boolean[] = new Array(this.productsByCategory.length).fill(false);
  iconName: string[] = [];
  loader: boolean = true;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private sizeService: SizeService,
    private cartService: CartService,
    private toastController: ToastController,
    private wishListService: WishlistService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchProductDetails();
    this.getProductSizes();
    this.getProductStitching();
    this.getProductLining();
  }
  fetchProductDetails(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      if (this.productId) {
        this.productService.showProductById(this.productId).subscribe(
          (product: any) => {
            this.product = product.product;
            this.loader = false;
            if (this.product && this.product.categoryId) {
              this.fetchProductsByCategory(this.product.categoryId);
            }
          },
          error => {
            console.error('Error fetching product details:', error);
          }
        );
      }
    });
  }

  fetchProductsByCategory(category: number): void {
    this.productService.getProductsByCategory(category).subscribe(
      (products: any) => {
        this.productsByCategory = products.products;
      },
      error => {
        console.error('Error fetching products by category:', error);
      }
    );
  }
  getProductSizes(): void {
    this.sizeService.getProductSizes()
      .subscribe(
        (sizes: any) => {
          this.sizes = sizes.data;
        },
        error => {
          console.error('Error fetching sizes: ', error);
        }
      );
  }
  getProductStitching(): void {
    this.sizeService.getProductStitching()
      .subscribe(
        (stitching: any) => {
          this.stitching = stitching.data;
        },
        error => {
          console.error('Error fetching sizes: ', error);
        }
      );
  }

  getProductLining(): void {
    this.sizeService.getProductLining()
      .subscribe(
        (lining: any) => {
          this.lining = lining.data;
        },
        error => {
          console.error('Error fetching sizes: ', error);
        }
      );
  }

  addToCartItem(cart: any, event: any) {
    switch (event) {
      case 'addToCart':
        this.presentToast('top');
        this.cartService.addToCart(cart);
        break;
      case 'buyNow':
        this.cartService.addToCart(cart);
        this.router.navigate(['delivery-info']);
    }
  }

  addToWishlistItem(product: Product): void {
    this.wishListService.addToWishlist(product);
    product.wishList = true;
  }

  removeCart(cart: Product) {
    this.cartService.removeFromCart(cart);
  }

  toggleAction(id: number) {
    this.showAction[id] = !this.showAction[id];
  }

  toggleHeart(id: number) {
    this.showHeart[id] = !this.showHeart[id];
    this.iconName[id] = this.showHeart[id] ? 'heart' : 'heart-outline';
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

}
