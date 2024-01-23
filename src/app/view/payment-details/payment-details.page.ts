import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/service/order/order.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.page.html',
  styleUrls: ['./payment-details.page.scss'],
})
export class PaymentDetailsPage implements OnInit {
  email: string = 'example@email.com';
  deliveryForm: any;
  subTotal: any;
  cartItems: any;
  totalAmount: any;
  message: any;
  color: any;
  constructor(
    private _fb: FormBuilder,
    private route: Router,
    private orderService: OrderService,
    private toastController: ToastController,) { }
  paymentForm!: FormGroup
  ngOnInit() {
    this.paymentForm = this._fb.group({
      cardName: ['', [Validators.required]],
      cardNum: ['', [Validators.required]],
      expiry: ['', [Validators.required]],
      cvc: ['', [Validators.required]],
    })
    this.getItemsFormLocal();
  }

  getItemsFormLocal() {
    this.deliveryForm = JSON.parse(localStorage.getItem('deliveryForm')!);
    this.subTotal = JSON.parse(localStorage.getItem('subTotal')!);
    this.cartItems = JSON.parse(localStorage.getItem('myCart')!);
    this.totalAmount = JSON.parse(localStorage.getItem('totalAmount')!);
  }

  formSubmit() {
    if (this.paymentForm.invalid) {
      // Mark all form controls as touched to display the validation errors
      Object.values(this.paymentForm.controls).forEach(control => {
        control.markAsTouched();
      });
      this.message = 'Input fields are invalid';
      this.color = 'danger';
      this.presentToast('top');
    } else {
      const cartItemIds = this.cartItems.map((item: any) => item.id);
      const {
        fName,
        phone,
        email,
        street,
        streetOptional,
        country,
        state,
        city,
        postCode,
        shippingType,
        notes
      } = this.deliveryForm;
      const obj = {
        fName,
        phone,
        email,
        street,
        streetOptional,
        country,
        state,
        city,
        postCode,
        shippingType,
        notes,
        prodItems: cartItemIds,
        totalPrice: this.totalAmount,
      };

      this.orderService.addOrderCheckout(obj).subscribe(
        response => {
          this.message = response.message;
          this.color = 'success';
          this.presentToast('top');
          localStorage.removeItem('deliveryForm');
          localStorage.removeItem('subTotal');
          localStorage.removeItem('myCart');
          localStorage.removeItem('totalAmount');
          this.paymentForm.reset();
          this.route.navigate(['order-place']);
        },
        error => {
          console.error('Error placing order:', error);
          this.message = error;
          this.color = 'danger';
          this.presentToast('top');
        }
      );
    }

  }

  async presentToast(position: 'top') {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 1500,
      position: position,
      color: this.color,
      cssClass: 'text-center'
    });

    await toast.present();
  }

}
