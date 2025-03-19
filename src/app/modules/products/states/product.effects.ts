
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ProductActions from "./product.action"
import { catchError, map, of, switchMap } from "rxjs";
import { Store } from "@ngrx/store";
import { ProductService } from "../product.service";

@Injectable()
export class ProductEffect {
   private _actions$ = inject(Actions);
   private _productService = inject(ProductService);
   // private _store = inject(Store);

   // ------------------------------------------------------------------------------------------
   // @ Effects
   // ------------------------------------------------------------------------------------------
   // Load API products
   loadApiProducts$ = createEffect(() =>
      this._actions$.pipe(
         ofType(ProductActions.loadApiProducts),
         switchMap(() =>
            this._productService.getMockApiProducts().pipe(
               map(products => ProductActions.loadApiProductsSuccess({ products })),
               // catchError(error => ProductActions.loadProductsFailure({ error }))
               catchError((error: { message: string }) => 
                  of(
                     ProductActions.loadApiProductsFailure({
                        errorMessage: 'Fail to load API products'
                     })
                  )
               )
            )
         )
      )
   );

   // Load stored products
   loadStoredProducts$ = createEffect(() =>
      this._actions$.pipe(
         ofType(ProductActions.loadStoredProducts),
         switchMap(() =>
            this._productService.getProducts().pipe(
               map(products => ProductActions.loadStoredProductsSuccess({ products })),
               // catchError(error => ProductActions.loadProductsFailure({ error }))
               catchError((error: { message: string }) => 
                  of(
                     ProductActions.loadStoredProductsFailure({
                        errorMessage: 'Fail to load stored products'
                     })
                  )
               )
            )
         )
      )
   );

   // Store product
   storeProduct$ = createEffect(() =>
      this._actions$.pipe(
         ofType(ProductActions.storeProduct),
         switchMap(action =>
            this._productService.storeProduct(action.product).pipe(
               map(product => ProductActions.storeProductSuccess({ product })),
               // catchError(error => ProductActions.storeProductFailure({ error }))
               catchError((error: { message: string }) => 
                  of(
                     ProductActions.storeProductFailure({
                        errorMessage: 'Fail to store product'
                     })
                  )
               )
            )
         )
      )
   );

   // Delete
   deleteProduct$ = createEffect(() =>
      this._actions$.pipe(
      ofType(ProductActions.deleteProduct),
      switchMap(action =>
         this._productService.deleteProduct(action.productId).pipe(
            map(() => ProductActions.deleteProductSuccess({ productId: action.productId })),
            // catchError(error => ProductActions.deleteProductFailure({ error }))
            catchError((error: { message: string }) => 
               of(
                  ProductActions.deleteProductFailure({
                     errorMessage: 'Fail to delete product'
                  })
               )
            )
         )
      )
      )
   );

   // Change status
   changeProductStatus$ = createEffect(() =>
      this._actions$.pipe(
      ofType(ProductActions.changeProductStatus),
      switchMap(action =>
         this._productService.changeProductStatus(action.productId, action.status).pipe(
            map(() => ProductActions.changeProductStatusSuccess({ productId: action.productId, status: action.status })),
            // catchError(error => ProductActions.changeProductStatusFailure({ error }))
            catchError((error: { message: string }) => 
               of(
                  ProductActions.changeProductStatusFailure({
                     errorMessage: 'Fail to change product status'
                  })
               )
            )
         )
      )
      )
   );
}