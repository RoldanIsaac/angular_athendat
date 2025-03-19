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

	// // Delete
	// on(ProductActions.deleteProductSuccess, (state, { productId }) => ({
	// 	...state,
	// 	products: state.dbProducts.filter(product => product.id !== productId)
	// })),
	
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
	  products: [...state.products, ...products],
	})),
	on(ProductActions.loadStoredProductsFailure, (state, { errorMessage }) => ({
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
	// on(ProductActions.changeProductStatusSuccess, (state, { productId, status }) => ({
	// 	...state,
	// 	products: state.products.map(product =>
	// 		product.id === productId ? { ...product, status } : product
	// 	)
	// }))
 );