import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { privateRoutes, publicRoutes } from "./routes";
import { PrivateRoute } from "./privateRoute";
import { PublicRoute } from "./publicRoute";
import { GoogleLoginCallback } from "./GoogleLoginCallback";
import { DeleteAccount } from "./DeleteAccountCallback";
import { LoginCallBackErr } from "./CallBackError";
import { EmailVerified } from "./emailVerified";
import { AnimatePresence } from "framer-motion";
import { Transaction } from "./transaction";
import { ResetPassword } from "./resetPassword/ResetPasswordRoute";
export const AppRouting = (props: any) => {
  return (
    <AnimatePresence>
      <Switch>
        {privateRoutes.map((route, index) => {
          return (
            <PrivateRoute
              key={index}
              component={route.component}
              path={route.link}
              exact
              {...props}
            />
          );
        })}
        {publicRoutes.map((route, index) => {
          return (
            <PublicRoute
              key={index}
              component={route.component}
              path={route.link}
              exact
            />
          );
        })}
        <Route path="/callbackerror" component={LoginCallBackErr} />
        <Route path="/callback" component={GoogleLoginCallback} />
        <Route path="/close-account" component={DeleteAccount} />
        <Route path="/verify" component={EmailVerified} />
        <Route path="/taxamo" component={Transaction} />
        <Route path="/reset-password" component={ResetPassword} />
        <Redirect path="*" to="/" />
      </Switch>
    </AnimatePresence>
  );
};
