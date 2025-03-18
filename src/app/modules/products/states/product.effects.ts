
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
   private _store = inject(Store);

   // ------------------------------------------------------------------------------------------
   // @ Effects
   // ------------------------------------------------------------------------------------------
   // Load
   loadProducts$ = createEffect(() =>
      this._actions$.pipe(
         ofType(ProductActions.loadProducts),
         switchMap(() =>
            this._productService.getMockApiProducts().pipe(
               map(products => ProductActions.loadProductsSuccess({ products })),
               // catchError(error => ProductActions.loadProductsFailure({ error }))
               catchError((error: { message: string }) => 
                  of(
                     ProductActions.loadProductsFailure({
                        errorMessage: 'Fail to load products'
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