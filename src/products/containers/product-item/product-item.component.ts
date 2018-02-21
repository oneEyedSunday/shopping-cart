import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as fromStore from "../../store";
import { CartService } from "../../services";

import { Item } from "../../models/item";

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  template:    `
    <single-item [item]="item$ | async" [context]="false" [inCart]="cartService.inCart(item$ | async)" (cartActivity)="cartService.handleCartActivity($event)" ></single-item>
  `
})
export class ProductItemComponent implements OnInit {
  item$: Observable<Item>;
  constructor(
    private store: Store<fromStore.ProductsState>,
    public cartService: CartService
  ){}

  ngOnInit(){
    this.item$ = this.store.select(fromStore.getSelectedItem);
    this.cartService.bootStrap();
    // route guard
  }
}
