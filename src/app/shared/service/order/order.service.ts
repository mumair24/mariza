import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Order } from './order'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = '../../../../assets/json/order.json';
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

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.ordersUrl);
  }

  addOrderCheckout(data:any){
    return this.http.post<any>(`${environment.url}order`, data)
    .pipe(
      catchError(this.handleError)
    )
  }

  getAllOrder(): Observable<any[]> {
    return this.http.get<any>(`${environment.url}getOrders`)
    .pipe(
      catchError(this.handleError)
    )
  }
}
