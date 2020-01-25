import {GET_PRODUCTS, GET_PRODUCT} from "../actions/types";

const initialeState = {};
export default function(state = initialeState, action){
    switch(action.type){
    case GET_PRODUCTS:
        return{
            ...state,
            product: action.payload
        }
    case GET_PRODUCT:
        return{
            ...state,
            item: action.payload
        }
    default: 
    return state;
    
}}