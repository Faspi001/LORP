import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ThreeDots from "../Layouts/Loading";
import { deleteShop } from "../../Redux/actions/shopActions";
import {getSingleProduct} from "../../Redux/actions/productActions"


const EditShop = () => {
  const { shop_ID } = useSelector(state => state.shop);
  const {product} = useSelector(state => state.product);
  const {item} = useSelector(state => state.product);
  const dispatch = useDispatch();
  const history = useHistory()


  const removeShop = e => {
    e.preventDefault();
    dispatch(deleteShop(shop_ID.shop.id));
    history.push("/shop");
  };

const addProduct = e =>{
  e.preventDefault();
  history.push("/shop/product/add")
}

  const redirect = e =>{
    e.preventDefault() 
    dispatch(getSingleProduct(e.currentTarget.dataset.id))
    history.push(`/shop/product/${e.currentTarget.dataset.id}`)
  }

  return shop_ID && product? (<React.Fragment>
    <div className="container">
      <p className="flow-text grey-text text-darken-1 center-align">
       Klicke auf ein Produkt um es zu bearbeiten oder zu löschen
      </p>
      <table>
        <thead>
          <tr>
              <th>Bild</th>
              <th>Name</th>
              <th>Art</th>
              <th>Preis</th>
              <th>Bio</th>
          </tr>
        </thead>
        {product.product.map(product=> (
        <tbody style={{ width: "auto",
        cursor:"pointer"}} key={product.id} onClick={redirect} data-id={product.id}>
          <tr>
            <td><img src={product.image}/></td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price}€</td>
            <td>{product.bio ? <p>JA</p> : <p>NEIN</p>}</td>
   
          </tr>
        </tbody>)
       )}


      </table>
      <button
        style={{
          width: "150px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          marginTop: "1rem",
          marginRight: "2em",
          display:"inline-block"
        }}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        onClick={addProduct}
      >HINZUFÜGEN</button>
      <button
        style={{
          width: "150px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          marginTop: "1rem",
          display:"inline-block"
        }}
        className="btn btn-large waves-effect waves-light hoverable red accent-3"
        onClick={removeShop}
      >
       LÖSCHEN
      </button>
   
      </div>
    
      </React.Fragment>
  ) : (
    <ThreeDots />
  );
};
export default EditShop;
