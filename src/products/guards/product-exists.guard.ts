import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
// routerState would be undefined at first visit - so snapshot is better

import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import { tap, map, filter, take, switchMap } from "rxjs/operators";
import * as fromStore from "../store";
import { Item } from "../models/item";

@Injectable()
export class ProductExistsGuards implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>,
  private router: Router){}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore()
      .pipe(
        switchMap(() => {
          const id = parseInt(route.params.itemId, 10);
          return this.hasItem(id);
        })
      );
  }

  hasItem(id: number): Observable<boolean> {
    return this.store
      .select(fromStore.getItemsEntities)
      .pipe(
        map((entities: {[key: number]: Item}) => !!entities[id]),
        map(notAvail => {
          if(!notAvail){
            this.router.navigate(["/"]);
          }
          return notAvail;
        }),
        take(1)
      );
  }

  checkStore(): Observable<boolean> {
    return this.store
      .select(fromStore.getItemsLoaded)
        .pipe(
          tap(loaded => {
            if(!loaded){
              console.log("not loaded");
              this.store.dispatch(new fromStore.LoadItems());
            }
          }),
          filter(loaded => loaded),
          take(1)
        );
  }
}
