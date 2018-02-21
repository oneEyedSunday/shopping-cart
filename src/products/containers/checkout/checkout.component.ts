import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Item } from "../../models/item";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as fromSelectors from "../../store/selectors";
import * as fromStore from "../../store";
import { CartService } from "../../services";
import { Title } from '@angular/platform-browser';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'checkout',
  styleUrls: ['checkout.component.scss'],
  template: `
    <div class="flex">
      <ng-template [ngIf]="(cart$ | async)?.length > 0">
        <checkout-item class="flex-item" *ngFor="let item of items" [item]="item" [quantity]="quantities[item.id]"  (priced)="giveTotalPrice($event)"></checkout-item>
        <p><strong>Order Value:</strong><em>$ {{ total }}</em></p>
      </ng-template>
      <ng-template [ngIf]="((cart$ | async)?.length) < 1" >
        You haven't added anything to your cart
      </ng-template>
    </div>
  `
})

export class CheckoutComponent implements OnInit {
  cart : number[];
  cart$ : Observable<number[]>;
  items : Item[];
  total: number = 0;
  itemPrice: Object = {};
  quantities: {};

  constructor(
    private store: Store<fromStore.ProductsState>,
    public cartService: CartService,
    private title: Title
  ){}

  ngOnInit(){
    this.title.setTitle("Checkout | Store");
    this.cartService.bootStrap();
    this.store.select(fromSelectors.getItemForCheckout(CartService.checked))
    .subscribe(x=>{
      this.items = x;
      x.map(y => {
        this.itemPrice[y.id] = y.price;
      })
    });
    this.cart$ = CartService.checkedObs();
    this.cart$.subscribe(c => {
      this.cart = c;
    });

    this.items.map(item => {
      this.total += item.price;
    })

    this.store.select(fromSelectors.getQuantitiesIncart)
      .subscribe(qtys => {
        this.quantities = qtys;
      })
  }

  giveTotalPrice(eventObj: Object){
      this.itemPrice[eventObj["id"]] = eventObj["currentTotal"];
     this.total = this.total + (eventObj["currentTotal"] - this.itemPrice[eventObj['id']]);
     this.store.dispatch(new fromStore.SetItemQuantity({
       "id": eventObj["id"],
       "quantity": eventObj["quantity"]
     }));

     this.calculateTotal();
  }

  calculateTotal(){
    this.total = 0;
    Object.keys(this.itemPrice)
      .map(key => {
        this.total += this.itemPrice[key];
      })
  }

}
