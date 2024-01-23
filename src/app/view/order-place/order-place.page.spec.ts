import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderPlacePage } from './order-place.page';

describe('OrderPlacePage', () => {
  let component: OrderPlacePage;
  let fixture: ComponentFixture<OrderPlacePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrderPlacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
