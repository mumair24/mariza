import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceOrdersPageRoutingModule } from './place-orders-routing.module';

import { PlaceOrdersPage } from './place-orders.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceOrdersPageRoutingModule,
    SharedModule
  ],
  declarations: [PlaceOrdersPage]
})
export class PlaceOrdersPageModule {}
