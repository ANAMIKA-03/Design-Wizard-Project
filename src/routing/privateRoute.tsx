import React from "react";
import { Route, Redirect } from "react-router-dom";
import { CheckLogin } from "../lib/contexts/Queries";
import { URL_CONSTANTS } from "./history";
//import { isLoggedIn } from "./../lib/authentication";
import { useQuery } from "@apollo/client";

interface IProps {
  Component?: any;
  component: any;
  path: any;
  exact: boolean;
}

export const PrivateRoute = ({ component: Component, ...rest }: IProps) => {
  const loginCheck = useQuery(CheckLogin, {
    variables: {
      token: `${localStorage.getItem("token")}`,
      filter: "{}",
    },
  });
  if (loginCheck.loading) return <>Loading</>;
  if (loginCheck.error) {
    window.location.href = "/";
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        loginCheck.data ? (
          <Component {...props} />
        ) : (
          <Redirect to={URL_CONSTANTS.ROOT()} />
        )
      }
    />
  );
};
