import { createSelector } from "@ngrx/store";
import * as fromItem from "../reducers/item";
import * as fromFeature from "../reducers";
import * as fromRoot from "../../../app/store";
import { Item } from "../../models/item";

export const getItemsState = createSelector(fromFeature.getProductsState, (state: fromFeature.ProductsState) => state.items);


export const getItemsEntities = createSelector(getItemsState, fromItem.getItemsEntities);

export const getSelectedItem = createSelector(getItemsEntities,
  fromRoot.getRouterState,
(entities, router): Item => {
  return router.state  && entities[router.state.params.itemId];
});

export const getItemForCheckout = (ids: number[]) => {
  return createSelector(getItemsEntities, (state) => {
  	if(ids && ids.length){
  		return ids.map(id => state[id.toString()]);
  	}
  	return [];
  });
}

export const getAllItems = createSelector(getItemsEntities, (entities) => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)])
});
export const getItemsLoaded = createSelector(getItemsState, fromItem.getItemsLoaded);
export const getItemsLoading = createSelector(getItemsState, fromItem.getItemsLoading);
