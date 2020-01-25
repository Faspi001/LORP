import React,{useState, useEffect} from 'react'
import { Link, useHistory } from "react-router-dom";
import {useSelector, useDispatch } from "react-redux";
import {createShop} from "../../Redux/actions/shopActions";
import classnames from "classnames";

const CreatingShop = () => {
  const {user} = useSelector(state => state.auth);
  const errors = useSelector(state => state.errors);
  const history = useHistory();
  const dispatch = useDispatch();

  const [error, setError] = useState({})

  const [shop, setShop] = useState({
        name:"",
        adresse:"",
        creator:"",
        errors: {},
        location:{
            lat:"",
            lng:""
        },
        products: []
})
const onChange = e =>{
  e.preventDefault();
  setShop({...shop,[e.target.id]:e.target.value})
}

const awaitRequest = async() =>{
  const newShop = {...shop,
    name: shop.name,
    adresse: shop.adresse,
    creator: user.id
  };
  await dispatch(createShop(newShop,history));
}

const onSubmit = e => {
    e.preventDefault();
    awaitRequest()
  };
const backToShops = e =>{
  e.preventDefault();
  history.push("/shop")
}
    return (
      <div className="container">
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Shop</b>
            </h4>
            <p className="grey-text text-darken-1">
            <i className="material-icons left">keyboard_backspace</i>  Zurück zur <Link to="/shop">Übersicht</Link>
            </p>
        <form onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={shop.name}
                error={errors.name}
                id="name"
                type="text"
                className={classnames("", {
                  invalid: errors.name
                })} 
              />
              <label htmlFor="name">Shopname</label>
              <span className="red-text">{errors.name}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={shop.adresse}
                id="adresse"
                type="text"
                className={classnames("", {
                  invalid: errors.adresse
                })} 
              />
                  <span className="red-text">{errors.adresse}</span>
              <label htmlFor="adresse">Adresse</label>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "auto",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  textAlign: "center"
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                onChange={backToShops}
              >
                Shop erstellen
              </button>
            </div>
          </form>
          </div>
          </div>
    )
}

export default CreatingShop
