import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

interface ProductSize {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class SizeService {

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

  getProductSizes(): Observable<ProductSize[]> {
    return this.http.get<ProductSize[]>(`${environment.url}getSizes`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getProductStitching(): Observable<ProductSize[]> {
    return this.http.get<ProductSize[]>(`${environment.url}getStitching`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getProductLining(): Observable<ProductSize[]> {
    return this.http.get<ProductSize[]>(`${environment.url}getLining`)
    .pipe(
      catchError(this.handleError)
    );
  }
}
