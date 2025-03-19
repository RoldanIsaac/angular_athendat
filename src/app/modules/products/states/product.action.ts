import { createAction, props } from '@ngrx/store';
import { Product } from './product.model';

// ------------------------------------------------------------------------------------------
// @ Load Api Products
// ------------------------------------------------------------------------------------------
export const loadApiProducts = createAction('[Product] Load API Products');
export const loadApiProductsSuccess = createAction(
   '[Product] Load API Products Success', 
   props<{ products: Product[] }>()
);
export const loadApiProductsFailure = createAction(
   '[Product] Load API Products Failure',
   props<{ errorMessage: string }>()
);

// ------------------------------------------------------------------------------------------
// @ Load Stored Products
// ------------------------------------------------------------------------------------------
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

// ------------------------------------------------------------------------------------------
// @ Store Product
// ------------------------------------------------------------------------------------------
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

// ------------------------------------------------------------------------------------------
// @ Change Product Status
// ------------------------------------------------------------------------------------------
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

// ------------------------------------------------------------------------------------------
// @ Delete Products
// ------------------------------------------------------------------------------------------
export const deleteProduct = createAction(
   '[Product] Delete Product',
   props<{ productId: string }>()
);
export const deleteProductSuccess = createAction(
   '[Product] Delete Product Success',
   props<{ productId: string }>()
);
export const deleteProductFailure = createAction(
   '[Product] Delete Product Failure',
   props<{ errorMessage: string }>()
);