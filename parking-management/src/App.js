import React from "react";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "./pages/NotFound";
import BookParking from "./pages/BookParking";
import AuthGaurd from "./auth/AuthGaurd";
import Protect from "./auth/Protect";
import Initialize from "./pages/Initialize";

function App(props) {
  return (
    <>
      <Switch>
        <AuthGaurd path="/dashboard/book-parking" component={BookParking} />
        <AuthGaurd path="/dashboard" exact component={Dashboard} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/not-found" component={NotFound} />
        <Protect path="/init" exact component={Initialize} />
        <Route
          path="/"
          exact
          render={() => {
            return (
              <>
                <Redirect to="/init" />;
              </>
            );
          }}
        />
        <Redirect to="/not-found" />
      </Switch>
    </>
  );
}

export default App;
