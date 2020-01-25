import axios from "axios";
import { GET_PRODUCTS, GET_PRODUCT } from "./types";

export const addItem = (item,history) => async dispatch =>{
  await axios.post(`/api/product/add`,item).then(res =>{
    history.push("/shop");
  })
}

//Produkte von einer SHOP ID
export const getProductByID = id => async dispatch => {
  await axios.get(`/api/product/list/${id}`).then(res => {
    const product = res.data;
    dispatch({
      type: GET_PRODUCTS,
      payload: product
    });
  });
};

// Einzelenes ITEM mit der ID
export const getSingleProduct = id => async dispatch =>{
  await axios.get(`/api/product/item/${id}`).then(res =>{
    const item = res.data;
    dispatch({
      type: GET_PRODUCT,
      payload: item
    })
  })
}

// PREIS UPDATEN BEI EINER ID
export const updatePrice = (userData,history) => async dispatch=>{
  await axios.post(`/api/product/item/update`,userData).then(res=>
    history.push("/shop"))
}

// ITEM AUS SHOP LÖSCHEN
export const deleteItemFromShop = (id,history) => async dispatch=>{
  await axios.delete(`/api/product/item/delete/${id}`).then(res =>{
    history.push("/shop");
  })
}