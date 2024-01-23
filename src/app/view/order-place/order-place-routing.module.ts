import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderPlacePage } from './order-place.page';

const routes: Routes = [
  {
    path: '',
    component: OrderPlacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderPlacePageRoutingModule {}
