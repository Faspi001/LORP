import React from "react";
import { Link, useHistory } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import {logoutUser} from "../../Redux/actions/authActions"

function Navbar() {
  const history = useHistory()
  const state = useSelector(state => state.auth);
const dispatch = useDispatch()
const onLogoutClick = e => {
  e.preventDefault();
  dispatch(logoutUser());
  history.push("/");
};
  return (
    <nav>
      <div className="nav-wrapper">
        <div className="nav-wrapper green">
          <a className="nav-item" style={{
            marginLeft: "1em",
            fontSize: "25px"
          }}>{state.user.name}</a>
          <Link
            to="/"
            style={{
              fontFamily: "monospace"
            }}
            className="col s5 brand-logo center white-text"
          >
            <i className="material-icons">filter_vintage</i>
            LORP
          </Link>
       
          {state.isAuthenticated &&
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shops</Link>
            </li>
            {state.isAuthenticated && <li>
              <a href="logout" onClick={onLogoutClick}>Logout</a>
            </li> }
        
          </ul>
} 
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
