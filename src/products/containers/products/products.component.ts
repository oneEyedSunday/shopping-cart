import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Item } from "../../models/item";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as fromSelectors from "../../store/selectors";
import * as fromStore from "../../store";
import { CartService } from "../../services";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'products',
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__list">
        <div *ngIf="!((items$ | async)?.length)">
          No items in store, do check back or add to get started.
        </div>
        <single-item *ngFor="let item of (items$ | async)" [item]="item" (cartActivity)="cartService.handleCartActivity($event)" [inCart]="cartService.inCart(item)" [context]="true"></single-item>
      </div>
    </div>
  `
})

export class ProductsComponent implements OnInit{
  items$: Observable<Item[]>;

  constructor(
    private store: Store<fromStore.ProductsState>,
    public cartService: CartService
  ){}

  ngOnInit(){
    this.items$ = this.store.select(fromSelectors.getAllItems);
    this.store.dispatch(new fromStore.LoadItems());
    this.cartService.bootStrap();
  }

}
