import axios from "axios";
import { GET_SHOPS, GET_ERRORS, ID_SHOP, SHOP_DELETED } from "./types";

export const listShops = userData => async dispatch => {
  const userId = userData.user.id;
  await axios.get(`/api/shops/shops/user/${userId}`).then(res => {
    const user = res.data;
    dispatch({
      type: GET_SHOPS,
      payload: user.shops
    });
  });
};

export const createShop = (userData,history) => async dispatch => {
  console.log(userData);
  await axios.post("/api/shops/create", userData).then(
    res=> history.push("/shop")
  ).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const getShopById = sid => async dispatch => {
  await axios.get(`/api/shops/shops/${sid}`).then(res => {
    const shop = res.data;
    dispatch({
      type: ID_SHOP,
      payload: shop
    });
  });
};

export const deleteShop = sid => async dispatch => {
  await axios.delete(`/api/shops/shops/user/delete/${sid}`).then(res => {
    "shop gelöscht";
    dispatch({
      type: SHOP_DELETED
    });
  });
};
