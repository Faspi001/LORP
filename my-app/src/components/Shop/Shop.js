import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { listShops, getShopById } from "../../Redux/actions/shopActions";
import { getProductByID } from "../../Redux/actions/productActions";
import ThreeDots from "../Layouts/Loading";

const Shop = () => {
  const { shop } = useSelector(state => state.shop);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    dispatch(listShops(auth));
  }, [shop]);
  const onKLICK = e => {
    e.preventDefault();
    history.push("/shop/create");
  };


  const redirect = e => {
    e.preventDefault();
    dispatch(getProductByID(e.currentTarget.dataset.id))
    dispatch(getShopById(e.currentTarget.dataset.id));
    history.push(`/shop/edit/${e.currentTarget.dataset.id}`)
  }
  return shop ? (
    <React.Fragment>
      <p className="flow-text grey-text text-darken-1 center-align">
        Klicke auf einen Shop um diesen zu löschen oder Produkte hinzuzufügen
      </p>
      <div className="row">
        {shop.map(shop => (
          <div className="col s12 m2" style={{ width: "auto",
          cursor:"pointer"}} key={shop.id} onClick={redirect} data-id={shop.id}>
            <div className="card">
              <div className="card-image">
                <img
                  src={`https://dummyimage.com/250x200/8a8a8a/ffffff.jpg&text=Shop`}
                />
              </div>
              <div className="card-content">
                <span className="card-title" style={{ fontWeight: "bold" }}>
                  {shop.name}
                </span>
                <p>Adresse: {shop.adresse}</p>
                <p>Produkte: {shop.products.length}</p>
              </div>
            </div>
          </div>
        ))}
        <a
          class="btn-floating btn-large waves-effect waves-light red"
          style={{
            marginTop: "7.5em",
            marginLeft: "3em"
          }} onClick={onKLICK}
        >
          <i class="material-icons">add</i>
        </a>
      </div>
    </React.Fragment>
  ) : (
    <ThreeDots />
  );
};
export default Shop;
