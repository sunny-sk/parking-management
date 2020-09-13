import React from "react";
import { NavLink, Link } from "react-router-dom";
import { isAuthenticated, logoutUser } from "../helper/Api";

const Menu = () => {
  const onSignOut = () => {
    logoutUser(() => {
      window.location.href = "/";
    });
  };

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
              {isAuthenticated() &&
                isAuthenticated().userType === "Booking_Counter_Agent" && (
                  <li className="nav-item">
                    <NavLink exact={true} className="nav-link" to="/init">
                      Initialize
                    </NavLink>
                  </li>
                )}
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">
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
            <ul className="navbar-nav ml-auto">
              {isAuthenticated() && (
                <li className="nav-item">
                  <button
                    onClick={() => {
                      onSignOut();
                    }}
                    className="btn btn-warning"
                  >
                    Signout
                  </button>
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
