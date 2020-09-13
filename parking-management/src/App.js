import React from "react";
import Signin from "./pages/Signin";
import Initialize from "./pages/Initialize";
import Dashboard from "./pages/Dashboard";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "./pages/NotFound";
import BookParking from "./pages/BookParking";
import { AuthGaurd, ProtectedRoute } from "./auth/ProtectedRoute";

function App(props) {
  return (
    <>
      <Switch>
        {/* <Menu {...props} /> */}
        <Route
          path="/init"
          exact
          render={(props) => {
            return <Initialize {...props} />;
          }}
        />
        <AuthGaurd
          path="/dashboard/book-parking"
          exact
          component={BookParking}
        />
        <AuthGaurd path="/dashboard" exact component={Dashboard} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/not-found" component={NotFound} />
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
