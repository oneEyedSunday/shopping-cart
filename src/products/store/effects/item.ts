import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import * as itemActions from "../actions/item";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import * as fromServices from "../../services";

@Injectable()
export class ItemsEffects {
  constructor(
    private action$: Actions,
    private itemService: fromServices.ItemService
  ){}

  @Effect()
  loadPizza$ = this.action$
    .ofType(itemActions.ItemActionTypes.LoadItems)
    .pipe(
      switchMap(() => {
        return this.itemService.getItems$().pipe(
          map(items => new itemActions.LoadItemsSuccess(items)),
          catchError(error => of(new itemActions.LoadItemsError(error)))
        );
      })
    )
}
