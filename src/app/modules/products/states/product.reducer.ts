import { createReducer, on } from "@ngrx/store";
import * as ProductActions from "./product.action"
import { Product } from "./product.model";

// ------------------------------------------------------------------------------------------
// @ State
// ------------------------------------------------------------------------------------------
export interface ProductState {
    apiProducts: Product[];
    dbProducts: Product[];
    loading: boolean;
    error: string | null; 
}

// ------------------------------------------------------------------------------------------
// @ Initial State
// ------------------------------------------------------------------------------------------
export const initialProductState: ProductState = {
	apiProducts: [],
	dbProducts: [],
	loading: false,
	error: null,
};

// ------------------------------------------------------------------------------------------
// @ Reducer
// ------------------------------------------------------------------------------------------
export const productReducer = createReducer(
	initialProductState,
	
	// Load API
	on(ProductActions.loadApiProducts, state => ({
		...state,
		loading: true
	})),
	on(ProductActions.loadApiProductsSuccess, (state, { products }) => ({
		...state,
		loading: false,
		apiProducts: products,
		error: null
	})),
	on(ProductActions.loadApiProductsFailure, (state, { errorMessage }) => ({
		...state,
		loading: false,
		error: errorMessage
	})),
	
	// Load Stored
	on(ProductActions.loadApiProducts, state => ({
		...state,
		loading: true
	})),
	on(ProductActions.loadApiProductsSuccess, (state, { products }) => ({
		...state,
		loading: false,
		dbProducts: products,
		error: null
	})),
	on(ProductActions.loadApiProductsFailure, (state, { errorMessage }) => ({
		...state,
		loading: false,
		error: errorMessage
	})),

	// Delete
	on(ProductActions.deleteProductSuccess, (state, { productId }) => ({
		...state,
		products: state.dbProducts.filter(product => product.id !== productId)
	})),

	// Change Status
	on(ProductActions.changeProductStatusSuccess, (state, { productId, status }) => ({
		...state,
		products: state.apiProducts.map(product =>
		product.id === productId ? { ...product, status } : product
		)
	}))
 );