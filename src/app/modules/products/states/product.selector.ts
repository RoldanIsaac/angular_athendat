import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ApiProductState } from "./product.reducer";
import { DbProductState } from "./product.reducer";

export const selectApiProductState = createFeatureSelector<ApiProductState>('api_product');
export const selectDbProductState = createFeatureSelector<DbProductState>('db_product');

// Api Products
export const selectAllAPIProducts = createSelector(
  selectApiProductState,
  (state: ApiProductState) => state.products
);

export const selectApiProductLoading = createSelector(
  selectApiProductState,
  (state: ApiProductState) => state.loading
);

export const selectApiProductError = createSelector(
  selectApiProductState,
  (state: ApiProductState) => state.error
);

// Db Products
export const selectAllStoredProducts = createSelector(
  selectDbProductState,
  (state: DbProductState) => state.products
);

export const selectStoreProductLoading = createSelector(
  selectDbProductState,
  (state: DbProductState) => state.loading
);

export const selectStoreProductError = createSelector(
  selectDbProductState,
  (state: DbProductState) => state.error
);