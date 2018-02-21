import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

/*
// ngrx - remove just demo
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { INCREMENT, DECREMENT, RESET, getCount } from './reducers/counter';
import { ItemActionTypes } from './items/actions/item';
import * as fromStore from './reducers';
import { Go } from "./router/actions/router";
*/


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent{
  constructor(private title: Title){
    this.title.setTitle("Store | Welcome");
  }
}

/*
export class AppComponent implements OnInit {
  constructor(private title: Title, private store: Store<fromStore.State>){
    this.count$ = store.pipe(select(getCount));
    // this.item$ = store.pipe(select(getItem));
  }


  titleString = 'NgRX Effects Store';
  count$: Observable<number> ;
  item$: Observable<any> ;
  amount;
  ngOnInit(){
    this.title.setTitle(this.titleString);
    // console.log(this.store.pipe(select(getRouter)));
  }

  increment(){
    this.store.dispatch({ type: INCREMENT });
  }

  incr(){
    this.store.dispatch({ type: ItemActionTypes.IncreaseItemQty, payload: 1})
  }

  remove_item(){
    // dipatch remove item from cart
  }

  handleChange(x: string){
    console.log(typeof(x), x);
    console.log(this.amount);
    // use debounce
  }

  decrement(){
    this.store.dispatch({ type: DECREMENT });
  }

  reset(){
    this.store.dispatch({ type: RESET });
  }

  public navigate() {
  this.store.dispatch(new Go({
    path: ["/test-router"]
  }));
}
  }
*/
