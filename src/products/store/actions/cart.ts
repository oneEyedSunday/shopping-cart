import { Action } from '@ngrx/store';
import { ItemInCartInterface } from "../../models/item";

interface cartQty {
  id : number,
  quantity: number
}

export enum CartActionTypes  {
  ClearCart = "[Cart] Clear Cart",
  ClearCartError = "[Cart] Clear Cart Error",
  ClearCartSuccess = "[Cart] Clear Cart Success",
  AddItemToCart = "[Cart] Add Item To Cart",
  AddItemToCartError = "[Cart] Add Item To Cart Error",
  AddItemToCartSuccess = "[Cart] Add Item To Cart Success",
  RemoveItemFromCart = "[Cart] Remove Item From Cart",
  SetItemQuantity = "[Cart] Set Item Quantity"
}

export class ClearCart implements Action {
  readonly type = CartActionTypes.ClearCart;
}

export class ClearCartError implements Action {
  readonly type = CartActionTypes.ClearCartError;
}

export class ClearCartSuccess implements Action {
  readonly type = CartActionTypes.ClearCartSuccess;
}

export class AddItemToCart implements Action {
  readonly type = CartActionTypes.AddItemToCart;
  constructor(public payload: number){}
}

export class SetItemQuantity implements Action {
  readonly type = CartActionTypes.SetItemQuantity;
  constructor(public payload: cartQty){};
}

export class AddItemToCartError implements Action {
  readonly type = CartActionTypes.AddItemToCartError;
}

export class AddItemToCartSuccess implements Action {
  readonly type = CartActionTypes.AddItemToCartSuccess;
}

export class RemoveItemFromCart implements Action {
  readonly type = CartActionTypes.RemoveItemFromCart;
  constructor(public payload: number){}
}


export type CartActions = ClearCart | ClearCartError | ClearCartSuccess | AddItemToCart | AddItemToCartError | AddItemToCartSuccess | RemoveItemFromCart | SetItemQuantity ;
