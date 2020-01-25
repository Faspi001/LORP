import React from "react";
import {useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/actions/authActions";
import {useHistory} from "react-router-dom"

function Dashboard () {
  const state = useSelector(state => state.auth);
  const dispatch = useDispatch()
  const history = useHistory();

  const onClickLinkTo= e =>{
    e.preventDefault()
      history.push("/shop/create");
  }
    const { user } = state;
return (
      <div style={{ height: "55vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Willkommen,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
           Erstelle jetzt einen Shop 🏣
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={onClickLinkTo}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Erstellen
            </button>
          </div>
        </div>
      </div>
    );
  
}
export default Dashboard;