import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product.reducer";

export const selectProductState = createFeatureSelector<ProductState>('product');

export const selectAllAPIProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.apiProducts
);

export const selectAllStoredProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.dbProducts
);

export const selectProductLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);

export const selectProductError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);