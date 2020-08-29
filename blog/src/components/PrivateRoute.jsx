import React from "react";
import { Route } from "react-router-dom";
import history from "../customHistory";
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          history.push("/login")
        )
      }
    />
  );
};

export default PrivateRoute;
