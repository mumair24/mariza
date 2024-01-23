import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPlacePageRoutingModule } from './order-place-routing.module';

import { OrderPlacePage } from './order-place.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPlacePageRoutingModule,
    SharedModule
  ],
  declarations: [OrderPlacePage]
})
export class OrderPlacePageModule {}
