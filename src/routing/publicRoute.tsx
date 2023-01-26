import React from "react";
import { Route, Redirect } from "react-router-dom";

import { URL_CONSTANTS } from "./history";
import { isLoggedIn } from "./../lib/authentication";

interface IProps {
  Component?: any;
  component: any;
  path: any;
  exact: boolean;
}

export const PublicRoute = ({ component: Component, ...rest }: IProps) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() ? (
          <Redirect to={URL_CONSTANTS.DASHBOARD_WORKSPACE()} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
