import { ItemActionTypes, ItemActions } from '../actions/item';
import { Item } from "../../models/item";
import { items } from "../../../items";

export interface State {
  entities: {[id: number]: Item},
  loaded: boolean,
  loading: boolean
}

const initialState: State = {
  entities: {},
  loaded: false,
  loading: false
}

export function reducer(state: State = initialState,
action: ItemActions): State {
  switch(action.type){
    case ItemActionTypes.LoadItems:
      return {
        ...state,
        loading: true
      };
    case ItemActionTypes.LoadItemsError:
      return {
        ...state,
        loading: false,
        loaded: false
      };

    case ItemActionTypes.LoadItemsSuccess:
      const items = action.payload;
      const entities = items.reduce((entities: {[id: number]: Item}, item: Item) => {
        return {
          ...entities,
          [item.id]: item
        }
      }, {
        ...state.entities
      })

      return {
        ...state,
        entities,
        loading: false,
        loaded: true
      };


    default:
      return state;
  }
}

// export const getItemQuantity = (state: State) => state.quantity;
export const getItemsLoading = (state: State) => state.loading;
export const getItemsLoaded = (state: State) => state.loaded;
export const getItemsEntities = (state: State) => state.entities;
