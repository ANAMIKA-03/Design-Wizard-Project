import React from "react";

import { PrivateLayout } from "./private";
import { PublicLayout } from "./public";
import { isLoggedIn } from "../../lib/authentication";

export const Layout = () => {
  return <>{isLoggedIn() ? <PrivateLayout /> : <PublicLayout />}</>;
};
