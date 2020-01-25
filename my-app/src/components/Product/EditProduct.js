import React, {useEffect,useLayoutEffect, useState} from 'react'
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import {useHistory} from "react-router-dom";
import {deleteItemFromShop, updatePrice} from "../../Redux/actions/productActions"
import ThreeDots from "../Layouts/Loading";


const EditProduct = () => {
const {item} = useSelector(state => state.product);
const dispatch = useDispatch();
const history = useHistory();

const [price, setPrice] = useState({
   price:"",
   bio:"true",
})

const onChange = e =>{
setPrice({...price,[e.target.id]:e.target.value});
}

const deleteItem = e =>{
   e.preventDefault()
   dispatch(deleteItemFromShop(item.item.id,history))
}

const onSubmit = e =>{
    e.preventDefault();
    const newPrice ={
       price: price.price,
       bio: "true",
       id: item.item.id
    }
 dispatch(updatePrice(newPrice,history))
}
 return ( (item ?
    <div className="container">
         <p className="flow-text grey-text text-darken-1 center-align">
        Ausgewähltes Produkt: {item.item.name} 
        </p>
     <form onSubmit={onSubmit}>
        <input type="text" placeholder={`Preis aktuell: ${item.item.price}`} onChange={onChange} value={price.price} id="price"/><label htmlFor="price" style={{fontSize:"2rem"}}>Preis</label>
        <br/>
        <button       style={{
                  width: "auto",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  textAlign: "center"
                }}
         type="submit"
         className="btn btn-large waves-effect waves-light hoverable blue accent-3"
         >
                   Aktualisieren
         </button>
     </form>
     <button onClick={deleteItem}  style={{
                  width: "auto",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  textAlign: "center"
                }}
                className="btn btn-large waves-effect waves-light hoverable red accent-3"
                >LÖSCHEN</button>
     </div> : <ThreeDots/>
    ))
}

export default EditProduct