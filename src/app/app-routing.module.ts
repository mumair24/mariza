import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DeliveryInfoComponent } from './shared/component/delivery-info/delivery-info.component';
import { ProductDetailsComponent } from './shared/component/product-details/product-details.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../app/view/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cart',
    loadChildren: () => import('./view/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./view/wishlist/wishlist.module').then( m => m.WishlistPageModule)
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'delivery-info',
    component: DeliveryInfoComponent
  },
  {
    path: 'checkout',
    loadChildren: () => import('./view/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'payment-details',
    loadChildren: () => import('./view/payment-details/payment-details.module').then( m => m.PaymentDetailsPageModule)
  },
  {
    path: 'order-place',
    loadChildren: () => import('./view/order-place/order-place.module').then( m => m.OrderPlacePageModule)
  },
  {
    path: 'place-orders',
    loadChildren: () => import('./view/place-orders/place-orders.module').then( m => m.PlaceOrdersPageModule)
  },
  {
    path: 'order-history',
    loadChildren: () => import('./view/order-history/order-history.module').then( m => m.OrderHistoryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
