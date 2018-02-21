// import @ngrx
import { ActionReducerMap,createFeatureSelector } from "@ngrx/store";
import * as fromItem from "./item";
import * as fromCart from "./cart";

// overall application state in store
export interface ProductsState {
  items: fromItem.State,
  cart: fromCart.State
}

export const reducers: ActionReducerMap<ProductsState> = {
  items: fromItem.reducer,
  cart: fromCart.reducer
};

// base state selection
export const getProductsState = createFeatureSelector<ProductsState>('products');
