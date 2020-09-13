import React from "react";
import { NavLink, Link } from "react-router-dom";
import { isAuthenticated } from "../helper/Api";

const Menu = (props) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/init">
            PM
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {isAuthenticated() && (
                <li className="nav-item">
                  <NavLink exact={true} className="nav-link" to="/init">
                    Initialize
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink exact={true} className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              {!isAuthenticated() && (
                <li className="nav-item">
                  <NavLink exact={true} className="nav-link" to="/signin">
                    Signin
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;
