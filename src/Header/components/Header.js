import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { ROUTES } from "../../common/constants";

import * as authActions from "../../Authentication/auth.actions";

function Header(props) {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.auth.loginData);

  let userName = localStorage.getItem("username");

  const fnLogout = async () => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("username");
    await dispatch(authActions.logout());
  };
  return (
    <div className="header col-xl-12 col-lg-12 col-md-12 col-sm-12">
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 header-left-section">
          <h2>Conduct</h2>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 d-flex justify-content-end header-right-section">
          <Link to={ROUTES.HOME} className="mr-2">
            <button className="btn btn-primary">Home</button>
          </Link>
          {(userName || userInfo) && (
            <>
              <Link to={ROUTES.EDITOR} className="mr-2">
                <button className="btn btn-info">New Article</button>
              </Link>
              <button
                className="btn btn-warning mr-2"
                onClick={() => fnLogout()}
              >
                Logout
              </button>
              <p className="ml-2 titleColor">{userName}</p>
            </>
          )}

          {!userName && !userInfo && (
            <>
              <Link to={ROUTES.REGISTER} className="mr-2">
                <button className="btn btn-warning">SignUp</button>
              </Link>
              <Link to={ROUTES.LOGIN} className="mr-2">
                <button className="btn btn-success">SignIn</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
