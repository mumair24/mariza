import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/view/home/product';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filteredItems: Product[] = [];
  private filteredProductsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  filteredProducts$: Observable<Product[]> = this.filteredProductsSubject.asObservable();

  constructor() { }

  updateFilteredProducts(products: Product[]) {
    this.filteredProductsSubject.next(products);
  }


  filterByCategory(products: Product[], category?: string) {
    if (category) {
      this.filteredItems = products.filter((item: Product) => item.categoryName === category);
    } else {
      this.filteredItems = products;
    }
  }

  filterByBrand(products: Product[], brand?: string) {
    if (brand) {
      this.filteredItems = products.filter((item: Product) => item.brandName === brand);
    } else {
      this.filteredItems = products;
    }
  }

  reset(products: Product[]) {
    this.filteredItems = products;
  }

  getFilteredItems(): Product[] {
    return this.filteredItems;
  }

}
