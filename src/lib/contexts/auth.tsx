import React from "react";

const AuthContext = React.createContext({
  user: {},
  authStatus: true,
  logoutStatus: false,
  authError: false,
});

export const AuthProvider = (props: any) => {
  const logoutStatus = false;
  const authStatus = true;
  const user = {};
  const authError = false;

  return (
    <AuthContext.Provider value={{ authStatus, logoutStatus, user, authError }}>
      {props.children}
    </AuthContext.Provider>
  );
};
