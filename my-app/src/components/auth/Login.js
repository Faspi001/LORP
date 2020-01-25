import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../Redux/actions/authActions";
import classnames from "classnames";


function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    errors: {}
  });

  const history = useHistory();

  const auth = useSelector(state => state.auth);
  const error = useSelector(state => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    if(auth.isAuthenticated){
    history.push("/dashboard")};
  }, [auth,history]);

  useEffect(() => {
    setUser({
      ...user,
      errors: error
    });
  }, [error]);

  const onChange = e => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };



  const onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: user.email,
      password: user.password
    };
    dispatch(loginUser(userData));
  };

  return (
    <div className="container">
      <div style={{ marginTop: "0rem" }} className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Startseite
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Login</b>
            </h4>
            <p className="grey-text text-darken-1">
              Noch kein Account? <Link to="/register">Registrieren</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={user.email}
                error={user.errors.email}
                id="email"
                type="email"
                className={classnames("", {
                  invalid: user.errors.email || user.errors.emailnotfound
                })}
              />
              <label htmlFor="email">Email</label>
              <span className="red-text">
                {user.errors.email}
                {user.errors.emailnotfound}
              </span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={user.password}
                error={user.errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: user.errors.password || user.errors.passwordincorrect
                })}
              />
              <label htmlFor="password">Passwort</label>
              <span className="red-text">
                {user.errors.password}
                {user.errors.passwordincorrect}
              </span>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div> 
    </div>
  );
}

export default Login;
