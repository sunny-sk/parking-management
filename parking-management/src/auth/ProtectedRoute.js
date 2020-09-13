import React from "react";

import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../helper/Api";

export const AuthGaurd = ({ component: Component, ...rest }) => {
  console.log(isAuthenticated());
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = isAuthenticated();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && user.userType === "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
