import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../Redux/actions/productActions";
import {useHistory} from "react-router-dom";

const AddProduct = () => {
  const { shop_ID } = useSelector(state => state.shop);
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
    bio: "",
    shopID: shop_ID.shop.id
  })
  const dispatch = useDispatch();
  const history = useHistory();

  if (shop_ID) {
    console.log(shop_ID);
  }
  
  const onChange = e =>{
    setItem({...item,[e.target.id]:e.target.value});
    }

 const onSubmit = e =>{
      e.preventDefault()
      const newItem={
          name: item.name,
          description: item.description,
          price: item.price,
          bio: true,
          shopID: shop_ID.shop.id
      }
dispatch(addItem(newItem,history))
  }

  return shop_ID ? (
    <div className="container">
    <p className="flow-text grey-text text-darken-1 center-align">
 Füge <b>{shop_ID.shop.name}</b> ein Produkt hinzu.
   </p>
   <form onSubmit={onSubmit}>
   <input type="text" placeholder="Name des Produkt" onChange={onChange} value={item.name} id="name"/><label htmlFor="name">Name</label>
   <input type="text" placeholder="Gemüse, Obst, Fleisch" onChange={onChange} value={item.description} id="description"/><label htmlFor="description">Art</label>
   <input type="text" placeholder="Preis 2.50" onChange={onChange} value={item.price} id="price"/><label htmlFor="price">Preis</label>
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
                   Hinzufügen
         </button>
    </form>
   </div>) : <div> hallo</div>
  };
export default AddProduct;
