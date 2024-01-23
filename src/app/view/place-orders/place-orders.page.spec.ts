import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaceOrdersPage } from './place-orders.page';

describe('PlaceOrdersPage', () => {
  let component: PlaceOrdersPage;
  let fixture: ComponentFixture<PlaceOrdersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlaceOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
