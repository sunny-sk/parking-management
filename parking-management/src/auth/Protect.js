import React from "react";

import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../helper/Api";

const Protect = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() &&
        isAuthenticated().userType === "Booking_Counter_Agent" ? (
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

export default Protect;
