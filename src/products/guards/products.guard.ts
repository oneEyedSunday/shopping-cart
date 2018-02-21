import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
// import { switchMap } from "rxjs/operators";

import { Store, select } from "@ngrx/store";
import * as fromStore from "../store";

@Injectable()
export class ProductsGuard implements CanActivate {

  constructor(private store: Store<fromStore.ProductsState>){}

  getFromStoreOrApi(): Observable<any> {
    return this.store
      .select(fromStore.getItemsState)
      .do((data: any) => {
        if(!data.loaded){
          this.store.dispatch(new fromStore.LoadItems());
        }
      })
      .filter((data: any) => data.loaded)
      .take(1)
  }

  canActivate(): Observable<boolean>{
    return this.getFromStoreOrApi()
      .switchMap(() => of(true))
      .catch(() => of(false));
  }
}
