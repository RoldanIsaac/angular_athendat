import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, from, map, Observable, of, Subject, tap, throwError } from 'rxjs';
import { Product } from '../states/product.model';
import { openDB, IDBPDatabase } from 'idb';
import { AdapterService } from './adapter.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbName = 'athendatProductDB';
  private dbVersion = 1;
  private db: IDBPDatabase | undefined;
  private _noMoreProducts: Subject<boolean> = new Subject<boolean>();
  private _productAdapter = inject(AdapterService)
  private _http = inject(HttpClient)
  private _utils = inject(UtilsService)

  // API URL
  private mockApiUrl = 'https://67d9cfe735c87309f52a3697.mockapi.io/api/v1/products';

  constructor() { 
    this.initDB();
  }
   
  // ------------------------------------------------------------------------------------------
  // @ Accessors
  // ------------------------------------------------------------------------------------------
  
  set noMoreProducts(value: boolean) {
    this._noMoreProducts.next(value);
  }

  get noMoreProducts$(): Observable<boolean> {
    return this._noMoreProducts.asObservable();
  }

  // ------------------------------------------------------------------------------------------
  // @ Private Methods
  // ------------------------------------------------------------------------------------------

  /**
	 * @description
	 * Init Indexed Database
	 */ 
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

  /**
	 * @description
	 * Get MockAPI products
	 */
  getMockApiProducts(): Observable<any[]> {
    // return this._http.get<any[]>(this.mockApiUrl);
    return this._http.get<any[]>(this.mockApiUrl).pipe(
      map((data) => this._productAdapter.adaptList(data))
    );
  }

  /**
	 * @description
	 * Change product status
	 */ 
  // changeProductStatus(productId: string, status: 'approved' | 'rejected'): Observable<void> {
  //   console.log(productId)
  //   return of();
  // }

  // ------------------------------------------------------------------------------------------
  // @ Indexed Database Methods (CRUD)
  // ------------------------------------------------------------------------------------------

  /**
	 * @description
	 * Get all products
	 */
  getProducts(page: number, limit: number): Observable<Product[]> {
    if (!this.db) {
      return new Observable(observer => observer.error('Database not initialized'));
    }

    return from(this.db.getAll('products')).pipe(
      map((products: Product[]) => {
        // 
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        
        if (products.slice(startIndex, endIndex).length === 0) {
          this.noMoreProducts = true;
        }

        // Return only products in the range
        return products.slice(startIndex, endIndex);
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }   

  /**
	 * @description
	 * Get product by id
	 */
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

  /**
	 * @description
	 * Store single product
	 */ 
  storeProduct(product: Product): Observable<any> {

    // Simulate random id
    const _product = {
      ...product,
      id: this._utils.generateRandomId(),
    }

    if (!this.db) {
      return new Observable(observer => observer.error('Database not initialized'));
    }

    return from(this.db.put('products', _product)).pipe(
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

  /**
	 * @description
	 * Delete product
	 */ 
  deleteDbProduct(productId: string): Observable<void> {
    if (!this.db) {
      return new Observable(observer => observer.error('Database not initialized'));
    }

    // console.log(productId)
    return from(this.db.delete('products', productId)).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    )
  }
}
