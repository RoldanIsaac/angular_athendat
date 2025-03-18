import { createReducer, on } from "@ngrx/store";
import * as ProductActions from "./product.action"
import { Product } from "./product.model";

// ------------------------------------------------------------------------------------------
// @ State
// ------------------------------------------------------------------------------------------
export interface ProductState {
   products: Product[];
   loading: boolean;
   error: string | null; 
}

// ------------------------------------------------------------------------------------------
// @ Initial State
// ------------------------------------------------------------------------------------------
export const initialProductState: ProductState = {
   products: [],
   loading: false,
   error: null,
};

// ------------------------------------------------------------------------------------------
// @ Reducer
// ------------------------------------------------------------------------------------------
export const productReducer = createReducer(
   initialProductState,
   
   // Load
   on(ProductActions.loadProducts, state => ({
     ...state,
     loading: true
   })),
   on(ProductActions.loadProductsSuccess, (state, { products }) => ({
     ...state,
     loading: false,
     products,
     error: null
   })),
   on(ProductActions.loadProductsFailure, (state, { errorMessage }) => ({
     ...state,
     loading: false,
     error: errorMessage
   })),

   // Delete
   on(ProductActions.deleteProductSuccess, (state, { productId }) => ({
     ...state,
     products: state.products.filter(product => product.id !== productId)
   })),

   // Change Status
   on(ProductActions.changeProductStatusSuccess, (state, { productId, status }) => ({
     ...state,
     products: state.products.map(product =>
       product.id === productId ? { ...product, status } : product
     )
   }))
 );