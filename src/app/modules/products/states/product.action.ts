import { createAction, props } from '@ngrx/store';
import { Product } from './product.model';

// ------------------------------------------------------------------------------------------
// @ Api Products
// ------------------------------------------------------------------------------------------

   // Load
export const loadApiProducts = createAction('[Product] Load API Products');
export const loadApiProductsSuccess = createAction(
   '[Product] Load API Products Success', 
   props<{ products: Product[] }>()
);
export const loadApiProductsFailure = createAction(
   '[Product] Load API Products Failure',
   props<{ errorMessage: string }>()
);

   // Delete
export const deleteApiProduct = createAction(
   '[Product] Delete Api Product',
   props<{ productId: string }>()
);
export const deleteApiProductSuccess = createAction(
   '[Product] Delete Api Product Success',
   props<{ productId: string }>()
);
export const deleteApiProductFailure = createAction(
   '[Product] Delete Api Product Failure',
   props<{ errorMessage: string }>()
);

// ------------------------------------------------------------------------------------------
// @ DB Products
// ------------------------------------------------------------------------------------------

   // Load
export const loadStoredProducts = createAction(
   '[Product] Load Stored Products',
   props<{ page: number, limit: number }>()  
);
export const loadStoredProductsSuccess = createAction(
   '[Product] Load Stored Products Success', 
   props<{ products: Product[] }>()
);
export const loadStoredProductsFailure = createAction(
   '[Product] Load Stored Products Failure',
   props<{ errorMessage: string }>()
);

   // Restore
export const restoreStoreProducts = createAction(
   '[Product] Restore Store Products to 7',
);

   // Delete
export const deleteDbProduct = createAction(
   '[Product] Delete DB Product',
   props<{ productId: string }>()
);
export const deleteDbProductSuccess = createAction(
   '[Product] Delete DB Product Success',
   props<{ productId: string }>()
);
export const deleteDbProductFailure = createAction(
   '[Product] Delete DB Product Failure',
   props<{ errorMessage: string }>()
);

// ------------------------------------------------------------------------------------------
// @ Other Product Actions
// ------------------------------------------------------------------------------------------

   // Store in DB
export const storeProduct = createAction(
   '[Product] Store Product', 
   props<{ product: Product }>()
);
export const storeProductSuccess = createAction(
   '[Product] Store Product Success', 
   props<{ product: Product }>()
);
export const storeProductFailure = createAction(
   '[Product] store Product Failure',
   props<{ errorMessage: string }>()
);

   // Change product status
export const changeProductStatus = createAction(
   '[Product] Change Product Status',
   props<{ productId: string; status: 'approved' | 'rejected' }>()
);
export const changeProductStatusSuccess = createAction(
   '[Product] Change Product Status Success',
   props<{ productId: string; status: 'approved' | 'rejected' }>()
);
export const changeProductStatusFailure = createAction(
   '[Product] Change Product Status Failure',
   props<{ errorMessage: string }>()
);