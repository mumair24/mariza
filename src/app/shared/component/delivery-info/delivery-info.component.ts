import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country, State, City } from 'country-state-city';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-delivery-info',
  templateUrl: './delivery-info.component.html',
  styleUrls: ['./delivery-info.component.css']
})
export class DeliveryInfoComponent implements OnInit {

  @ViewChild('country')
  country!: ElementRef;
  @ViewChild('city') city!: ElementRef;
  @ViewChild('state') state!: ElementRef;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  selectedCountry: any;
  selectedState: any;
  selectedCity: any;
  message: string = '';
  color: string = ''

  deliveryForm!: FormGroup
  constructor(private _fb: FormBuilder, private route: Router, private toastController: ToastController,) { }

  ngOnInit() {
    this.countries = Country.getAllCountries();;
    this.deliveryForm = this._fb.group({
      fName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      street: ['', [Validators.required]],
      streetOptional: [''],
      country: ['',[Validators.required]],
      state: ['',[Validators.required]],
      city: ['',[Validators.required]],
      postCode: ['', [Validators.required]],
      shippingType: [Validators.required],
      notes: ['']
    })
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.deliveryForm.controls;
  }

  onCountryChange(): void {
    const selectedCountryIsoCode = this.deliveryForm.get('country')?.value;

    if (selectedCountryIsoCode !== null) {
      this.states = State.getStatesOfCountry(selectedCountryIsoCode);
      this.selectedCountry = this.countries.find(
        (country) => country.isoCode === selectedCountryIsoCode
      );
    }
    this.cities = this.selectedState = this.selectedCity ;
  }

  onStateChange(): void {
    const selectedStateIsoCode = this.deliveryForm.get('state')?.value;
    const selectedCountryIsoCode = this.deliveryForm.get('country')?.value;

    if (selectedStateIsoCode && selectedCountryIsoCode) {
      this.cities = City.getCitiesOfState(
        selectedCountryIsoCode,
        selectedStateIsoCode
      );
      this.selectedState = this.states.find(
        (state: any) => state.isoCode === selectedStateIsoCode
      );
    }
    this.selectedCity = null;
  }

  onCityChange(): void {
    const cityValue = this.deliveryForm.get('city')?.value;
    if (typeof cityValue === 'string') {
      this.selectedCity = cityValue;
    } else {
      this.selectedCity = null;
    }
  }

  formSubmit() {
    if(this.deliveryForm.invalid){
      // Mark all form controls as touched to display the validation errors
      Object.values(this.deliveryForm.controls).forEach(control => {
        control.markAsTouched();
      });
      this.message = 'Input fields are required';
      this.color = 'danger';
      this.presentToast('top');
    } else{
      localStorage.setItem('deliveryForm',JSON.stringify(this.deliveryForm.value));
      this.deliveryForm.reset();
      this.route.navigate(['checkout'])
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
