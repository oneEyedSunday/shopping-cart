import { createSelector } from "@ngrx/store";
import { getProductsState, ProductsState } from "../reducers";
import * as fromCart from "../reducers/cart";

export const getCartState = createSelector(getProductsState, (state: ProductsState) => state.cart);
export const getItemsInCart = createSelector(getCartState, fromCart.getItems);
export const getQuantitiesIncart = createSelector(getCartState, (state) => state.quantities);
