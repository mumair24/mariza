import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Product } from 'src/app/view/home/product'
import { environment } from 'src/environments/environment';


interface Brand{
  id?:number;
  imageUrl?: string;
  brand?: string
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  showBrands(){
    return this.http.get<Brand>(`${environment.url}getBrands`)
    .pipe(
      catchError(this.handleError)
    );
  }
  showCategory(){
    return this.http.get<Brand>(`${environment.url}getCategories`)
    .pipe(
      catchError(this.handleError)
    );
  }

  showProduct(){
    return this.http.get<Product>(`${environment.url}allProducts`)
    .pipe(
      catchError(this.handleError)
    )
  }

  showProductById(productId: number): Observable<Product> {
    const url = `${environment.url}getSingleProduct/${productId}`;

    return this.http.get<Product>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProductsByCategory(category: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.url}products-by-category/${category}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>('../../../assets/json/product.json')
      .pipe(
        map((products: Product[]) => {
          const lowercaseQuery = query.toLowerCase().trim();

          if (!lowercaseQuery) {
            return products;
          }

          return products.filter(product =>
            Object.values(product).some(field =>
              field && typeof field === 'string' && field.toLowerCase().includes(lowercaseQuery)
            )
          );
        }),
        catchError(this.handleError)
      );
  }

}
