import { Injectable } from '@angular/core';
import { Store, select } from "@ngrx/store";
import { AddItemToCart, RemoveItemFromCart } from "../store/actions";
import { ProductsState } from "../store/reducers";
import { getItemsInCart } from "../store/selectors";
import { Item } from "../models/item";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CartService {
  static icons =  {
  	add : "fa-cart-plus",
  	remove : "fa-cart-arrow-down"
  }

  // array holding IDS of items in cart
  static checked: number[];

  constructor(private store: Store<ProductsState>) {}

  bootStrap(){
    this.store.pipe(select(getItemsInCart))
      .subscribe(cartItems => {
        CartService.checked = cartItems;
      });
  }

  static checkedObs(){
    return Observable.of(CartService.checked);
  }

  handleCartActivity(eventObj){
    let action = eventObj.action === "add" ? new AddItemToCart(eventObj.payload) : new RemoveItemFromCart(eventObj.payload);
    this.store.dispatch(action);
  }

  inCart(item: Item): boolean {
    return CartService.checked.indexOf(item.id) > -1;
  }

}
