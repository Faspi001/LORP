import React, { useState, useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import {useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../Redux/actions/authActions";
import classnames from "classnames";



function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  });

  const history = useHistory();


 const auth = useSelector(state => state.auth)
 const errors = useSelector(state => state.errors)
const dispatch = useDispatch();

  
useEffect(() => {
  if(auth.isAuthenticated){
    history.push("/dashboard")};
}, [auth, history])

  const onChange = e => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
      password2: user.password2
    };
    dispatch(registerUser(newUser,history)); 
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Startseite
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Registrieren</b>
            </h4>
            <p className="grey-text text-darken-1">
              Bereits ein Nutzer? <Link to="/login">Log in</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={user.name}
                error={errors.name}
              
                id="name"
                type="text"
                className={classnames("", {
                  invalid: errors.name
                })}
              />
              <label htmlFor="name">Name</label>
              <span className="red-text">{errors.name}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={user.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("", {
                  invalid: errors.email
                })}
              />
              <label htmlFor="email">Email</label>
              <span className="red-text">{errors.email}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={user.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("",{
                  invalid:errors.password
                })}
              />
              <label htmlFor="password">Passwort</label>
              <span className="red-text">{errors.password}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={user.password2}
                error={errors.password2}
                id="password2"
                type="password"
                className={classnames("",{
                  invalid:errors.password2
                })}
              />
              <label htmlFor="password2">Passwort bestätigen</label>
              <span className="red-text">{errors.password2}</span>
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
              >
                REGISTRIEREN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default (withRouter(Register));
