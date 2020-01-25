import {GET_SHOPS, ID_SHOP, SHOP_DELETED} from "../actions/types";

const initialState = {}

export default function(state = initialState, action) {
    switch (action.type) {
      case GET_SHOPS:
        return {
            ...state,
            shop:action.payload
        }
      case ID_SHOP:
        return {
          ...state,
          shop_ID:action.payload
        }
      case SHOP_DELETED:
        return{
          ...state,
          shopDeleted: true
        }  
      default:
        return state;
    }
  }
  