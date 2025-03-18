import { createAction, props } from '@ngrx/store';
import { Product } from './product.model';

// ------------------------------------------------------------------------------------------
// @ Load Products
// ------------------------------------------------------------------------------------------
export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction(
   '[Product] Load Products Success', 
   props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
   '[Product] Load Products Failure',
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
