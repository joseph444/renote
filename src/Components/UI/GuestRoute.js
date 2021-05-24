import React from "react";
import { Route, Redirect } from "react-router-dom";

function GuestRoute({
  component: Component,
  isAuthenticated: isAuthenticated,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return <Component  />;
        } else {
          return (
            <Redirect to={{ pathname: "/home", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}

export default GuestRoute;