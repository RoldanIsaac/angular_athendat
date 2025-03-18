import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // URLs de las APIs
  private jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com/products'; // Ejemplo, cambia a un endpoint real
  private mockApiUrl = 'https://mockapi.io/products'; // Cambia con la URL real de tu MockAPI

  constructor(private http: HttpClient) { }

  // Obtener productos de JSONPlaceholder
  getJsonPlaceholderProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.jsonPlaceholderUrl}?_limit=10`);
  }

  // Obtener productos de MockAPI
  getMockApiProducts(): Observable<any[]> {
    return this.http.get<any[]>(`https://67d9cfe735c87309f52a3697.mockapi.io/api/v1/products`);
  }

  deleteProduct(productId: string): Observable<void> {
    console.log(productId)
    return of();
  }

  changeProductStatus(productId: string, status: 'approved' | 'rejected'): Observable<void> {
    // return this.http.patch<void>(`${this.apiUrl}/${productId}`, { status });
    console.log(productId)
    return of();

  }
}
