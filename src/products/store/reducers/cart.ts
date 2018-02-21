import { CartActionTypes, CartActions } from '../actions/cart';
import { ItemInCartInterface } from "../../models/item";

export interface State {
  items: number[],
  quantities: { [id: number]: number }
}

const initialState: State = {
  items: [],
  quantities: {}
}

export function reducer(state: State = initialState,
action: CartActions): State {
  switch(action.type){
    case CartActionTypes.ClearCart:
      return initialState;

    case CartActionTypes.AddItemToCart:{
      return Object.assign({}, state, {
        items: [...getItems(state),action.payload],
        quantities: {
          ...getQuantities(state), ...{[action.payload] : 1}
        }
      })
    };

    case CartActionTypes.RemoveItemFromCart:
      let init = getItems(state);
      let index = init.indexOf(action.payload);
      const q = getQuantities(state);
      const newQty = {};
      Object.keys(q).filter(id => id !== action.payload.toString()).map(id => {
        newQty[id] = q[id];
      });


      let d = init.filter((i)=>{
        return (i !== action.payload);
      });

      console.log(newQty);
      return Object.assign({}, state, {
        items: [...d],
        quantities: newQty
      });

    case CartActionTypes.SetItemQuantity: {
       return {
         ...state,
         quantities: {
      ...state.quantities,
        ...{
          [action.payload.id] : action.payload.quantity
          }
        }
       };
    }

    default:
      return state;
  }
}

export const getItems = (state: State) => state.items;
export const getQuantities = (state: State) => state.quantities;
