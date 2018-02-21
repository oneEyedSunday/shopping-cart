import { Action } from '@ngrx/store';
import { Item } from "../../models/item";

export enum ItemActionTypes  {
  LoadItems = "[Items] Load Items",
  LoadItemsSuccess = "[Items] Load Items Success",
  LoadItemsError = "[Items] Load Items Error"
}




export class LoadItems implements Action {
  readonly type = ItemActionTypes.LoadItems;
}

export class LoadItemsSuccess  implements Action {
  readonly type = ItemActionTypes.LoadItemsSuccess;
  constructor(public payload: Item[]){}
}

export class LoadItemsError implements Action {
  readonly type = ItemActionTypes.LoadItemsError;
  constructor(public payload){}
}



export type ItemActions = LoadItems | LoadItemsSuccess | LoadItemsError ;
