import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./Redux/actions/authActions";

// Redux DAS tool überhaupt
import { Provider } from "react-redux";
import store from "./store";

// Components die hier gerendert werden
import Navbar from "./components/Layouts/Navbar";
import Landing from "./components/Layouts/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Shop from "./components/Shop/Shop";
import Urlnotfound from "./components/Layouts/UrlNotFound";
import CreatingShop from "./components/Shop/CreatingShop";
import EditShop from "./components/Shop/EditShop";
import EditProduct from "./components/Product/EditProduct";
import AddProduct from "./components/Product/AddProduct";
import PrivateRoute from "./components/private-route/PrivateRoute";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App" >
          <Navbar/>
          <div style={{marginTop:"2em"}}>
          <Route exact path="/" component={Landing}></Route>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/shop" component={Shop}/>
          <PrivateRoute exact path="/shop/create" component={CreatingShop}/>
          <PrivateRoute exact path="/shop/edit/:sid" component={EditShop}/>
          <PrivateRoute exact path="/shop/product/add" component={AddProduct}/>
          <PrivateRoute exact path="/shop/product/:id" component={EditProduct}/>
          </Switch>
          <Route path="/urlnotfound"><Urlnotfound/></Route>
 
          </div>
          </div>
      </Router>
    </Provider>
  );
}

export default App;
