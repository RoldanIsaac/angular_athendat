import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, of, tap, throwError } from 'rxjs';
import { Product } from './states/product.model';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbName = 'athendatProductDB';
  private dbVersion = 1;
  private db: IDBPDatabase | undefined;

  // URLs de las APIs
  private jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com/products'; // Ejemplo, cambia a un endpoint real
  private mockApiUrl = 'https://67d9cfe735c87309f52a3697.mockapi.io/api/v1/products';

  constructor(
    private _http: HttpClient
  ) { 
    this.initDB();
  }
   
  // ------------------------------------------------------------------------------------------
  // @ Private Methods
  // ------------------------------------------------------------------------------------------

  // Init Indexed Database
  private async initDB() {
    this.db = await openDB(this.dbName, this.dbVersion, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('products')) {
          db.createObjectStore('products', { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  }
    
  // ------------------------------------------------------------------------------------------
  // @ Public Methods
  // ------------------------------------------------------------------------------------------

  // JSONPlaceholder
  // getJsonPlaceholderProducts(): Observable<any[]> {
  //   return this._http.get<any[]>(`${this.jsonPlaceholderUrl}?_limit=10`);
  // }

  // Get MockAPI products
  getMockApiProducts(): Observable<any[]> {
    return this._http.get<any[]>(this.mockApiUrl);
  }

  // Change product status
  changeProductStatus(productId: string, status: 'approved' | 'rejected'): Observable<void> {
    // return this.http.patch<void>(`${this.apiUrl}/${productId}`, { status });
    console.log(productId)
    return of();

  }
   
  // ------------------------------------------------------------------------------------------
  // @ Indexed Database Methods (CRUD)
  // ------------------------------------------------------------------------------------------

  // Get all products
  getProducts(page: number, limit: number): Observable<Product[]> {
    if (!this.db) {
      return new Observable(observer => observer.error('Database not initialized'));
    }

    return from(this.db.getAll('products')).pipe(
      map((products: Product[]) => {
        // Calcular el índice de inicio y el índice final
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
  
        // Devolver solo los productos dentro del rango
        return products.slice(startIndex, endIndex);
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }   

  // Get product by id
  getProductById(productId: string): Observable<Product | undefined> {
    if (!this.db) {
      return new Observable(observer => observer.error('Database not initialized'));
    }

    return from(this.db.get('products', productId)).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  
  // Store single product
  storeProduct(product: Product): Observable<any> {
    if (!this.db) {
      return new Observable(observer => observer.error('Database not initialized'));
    }

    return from(this.db.put('products', product)).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  // Update
  // async updateProduct(product: Product): Promise<void> {
  //   if (this.db) {
  //     await this.db.put('products', product);
  //   }
  // }

  // Delete product
  deleteProduct(productId: string): Observable<void> {
    if (!this.db) {
      return new Observable(observer => observer.error('Database not initialized'));
    }

    // console.log(productId)

    return from(this.db.delete('products', productId)).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    )

    // return new Observable(observer => {
    //   if (this.db) {
    //     this.db.delete('products', productId)
    //     .then(response => {
    //       observer.next(response);
    //       observer.complete()
    //     })
    //     .catch(error => {
    //         observer.error(error);
    //     }
    //     )
    //   }
    // })
  }
}
