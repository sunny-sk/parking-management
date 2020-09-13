import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// importing all pages
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import BookParking from "./pages/BookParking";
import Initialize from "./pages/Initialize";

// importing auth gaurd
import Protect from "./auth/Protect";
import AuthGaurd from "./auth/AuthGaurd";

function App() {
  return (
    <>
      <Switch>
        <Protect path="/dashboard/book-parking" component={BookParking} />
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
