import { createReducer, on } from "@ngrx/store";
import * as ProductActions from "./product.action"
import { Product } from "./product.model";

// ------------------------------------------------------------------------------------------
// @ State
// ------------------------------------------------------------------------------------------
export interface ApiProductState {
	products: Product[];
	loading: boolean;
	error: string | null;
 }
 
 export interface DbProductState {
	products: Product[];
	currentPage: number;
	pageSize: number;
	totalProducts: number;
	loading: boolean;
	error: string | null;
 }
 
 export interface AppState {
	apiProducts: ApiProductState;
	dbProducts: DbProductState;
 }

// ------------------------------------------------------------------------------------------
// @ Initial State
// ------------------------------------------------------------------------------------------
export const initialApiProductState: ApiProductState = {
	products: [],
	loading: false,
	error: null
 };
 
 export const initialDbProductState: DbProductState = {
	products: [],
	currentPage: 1,
	pageSize: 7,
	totalProducts: 0,
	loading: false,
	error: null
 };

// ------------------------------------------------------------------------------------------
// @ Reducers
// ------------------------------------------------------------------------------------------
 export const apiProductReducer = createReducer(
	initialApiProductState,

	// Load
	on(ProductActions.loadApiProducts, (state) => ({
	  ...state,
	  loading: true
	})),
	on(ProductActions.loadApiProductsSuccess, (state, { products }) => ({
	  ...state,
	  loading: false,
	  products
	})),
	on(ProductActions.loadApiProductsFailure, (state, { errorMessage }) => ({
	  ...state,
	  loading: false,
	  error: errorMessage
	})),

	// Delete
	on(ProductActions.deleteApiProduct, (state, { productId }) => ({
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

 export const dbProductReducer = createReducer(
	initialDbProductState,

	// Load
	on(ProductActions.loadStoredProducts, (state) => ({
	  ...state,
	  loading: true
	})),
	on(ProductActions.loadStoredProductsSuccess, (state, { products }) => ({
	  ...state,
	  loading: false,
	  products: [
		...state.products,
		...products.filter(product => 
		  !state.products.some(existingProduct => existingProduct.id === product.id)
		),
	 ],
	})),
	on(ProductActions.loadStoredProductsFailure, (state, { errorMessage }) => ({
	  ...state,
	  loading: false,
	  error: errorMessage
	})),

	// Restore
	on(ProductActions.restoreStoreProducts, (state) => ({
		...state,
		loading: false,
		products: state.products.slice(0, 7), 
	})),

	// Delete
	on(ProductActions.deleteDbProductSuccess, (state, { productId }) => ({
		...state,
		products: state.products.filter(product => product.id !== productId)
	})),

	// Change Status
	// on(ProductActions.changeProductStatusSuccess, (state, { productId, status }) => ({
	// 	...state,
	// 	products: state.products.map(product =>
	// 		product.id === productId ? { ...product, status } : product
	// 	)
	// }))
 );