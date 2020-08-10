import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../auth.actions";
import serverApi from "../../common/utils/apiUrl";

import ShowErrors from "../../common/components/ShowErrors";

function Signin() {
  const dispatch = useDispatch();
  const [loginWithEmail, setLoginWithEmail] = useState({
    email: "",
    password: ""
  });

  // Selector to fetch all Routes
  const errors = useSelector(state => state.auth.errors);

  /**
   * function to set value in setLoginwithEmail
   */
  const handleChange = e => {
    setLoginWithEmail({ ...loginWithEmail, [e.target.name]: e.target.value });
  };

  /**
   * Submit email and password to backend for login
   */
  const handleSubmit = e => {
    e.preventDefault();
    let data = {};
    data.user = { user: loginWithEmail };
    data.auth = serverApi.Auth.login;
    dispatch(authActions.submitLoginForm(data));
  };

  return (
    <div className="auth-section text-center">
      <h1>Sign In</h1>
      <p>Need an acoount?</p>
      <ShowErrors errors={errors} />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control authCustomeInput"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={loginWithEmail.email}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control authCustomeInput"
            placeholder="Password"
            name="password"
            value={loginWithEmail.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success auth-button">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Signin;
