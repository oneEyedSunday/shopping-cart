import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy,
  SimpleChange,
  SimpleChanges
} from '@angular/core';

import { Item } from "../../models/item";
import { CartService } from "../../services";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";


@Component({
  selector: 'single-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['item.component.scss'],
  template: `
    <h2 *ngIf="context" >
      <a routerLink="/shop/{{item.id}}">{{ item.name }}</a>
    </h2>
    <h2 *ngIf="!context" >
      {{ item.name }}
    </h2>
      <div>
        <button (click)="ToCart()" class="cart-button">
          <span>
            <i class="fas {{ actionString }}"></i>
          </span>
        </button>
          <span>$ {{ item.price }}</span>
      </div>
  `,
})
export class SingleItemComponent implements OnChanges {
  @Input() item: Item;
  @Input() inCart: Observable<boolean>;
  @Output() cartActivity = new EventEmitter();
  actionString: string;
  @Input() context : boolean;

  ngOnChanges(changes: SimpleChanges){
    const c: SimpleChange = changes.inCart;
    this.actionString = c.currentValue ? CartService.icons.remove : CartService.icons.add;
  }

  public addToCart(){
    this.cartActivity.emit({
      "payload": this.item.id,
      "action":  "add"
    })
  }

  public removeFromCart(){
    this.cartActivity.emit({
      "payload": this.item.id,
      "action": "remove"
    })
  }

  public ToCart(){
    this.actionString == CartService.icons.add ? this.addToCart() : this.removeFromCart();
  }
}
