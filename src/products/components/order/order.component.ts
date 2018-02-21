import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  ChangeDetectionStrategy
} from '@angular/core';

import { Item } from "../../models/item";
import { CartService } from "../../services";
import { Observable } from "rxjs/Observable";
import { FormControl , Validators  } from "@angular/forms";


@Component({
  selector: 'checkout-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['order.component.scss'],
  template: `
    <div>
      <p><strong>Name:</strong> <em>{{ item.name }}</em></p>
      <p><strong>Unit Price:</strong> <em>$ {{ item.price }} </em></p>
      <p><strong>Quantity:</strong>
      <input type="number" [formControl]="qty" [(ngModel)]="quantity"  min="1" max="20" required>
      </p>
      <p><strong>Price:</strong> <em>$ {{ price }}</em></p>
    </div>
  `,
})
export class CheckOutItemComponent implements OnInit {
  @Input() item: Item;
  @Input() quantity: number;
  qty: FormControl ;
  price: number;
  @Output() priced = new EventEmitter();

  constructor(){
  }
  ngOnInit(){
    this.qty = new FormControl(this.quantity, Validators.required);
    this.price = this.item.price;
    this.qty.valueChanges
    .debounceTime(500)
      .subscribe(term => {
          if(term === undefined || term === null){
            this.qty.setValue(1);
          }
          this.price = this.item.price * parseInt(this.qty.value, 10);
          this.priced.emit({
            "id": this.item.id,
            "currentTotal": this.price,
            "quantity": this.quantity
          })
      });
  }

}
