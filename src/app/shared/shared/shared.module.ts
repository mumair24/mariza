import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../component/header/header.component';
import { FooterComponent } from '../component/footer/footer.component';
import { ProfileComponent } from '../component/profile/profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DeliveryInfoComponent } from '../component/delivery-info/delivery-info.component';
import { ProductDetailsComponent } from '../component/product-details/product-details.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent,ProfileComponent, DeliveryInfoComponent, ProductDetailsComponent],
  exports: [HeaderComponent, FooterComponent,ProfileComponent, DeliveryInfoComponent, ProductDetailsComponent ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class SharedModule { }
