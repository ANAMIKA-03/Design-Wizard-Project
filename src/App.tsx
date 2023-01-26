import React, { Dispatch, SetStateAction } from "react";
import "./App.css";

import { AppProviders } from "./lib/contexts";
import { Layout } from "./components/layout";

//Definations for ProfilePictureContext----
type ProfilePicContextState = { updated: number };
type ProfilePicContextValue = {
  updated: ProfilePicContextState;
  setUpdated: Dispatch<SetStateAction<ProfilePicContextState>>;
};
const ProfilePictureDefaultValue: ProfilePicContextValue = {
  updated: { updated: 0 },
  setUpdated: (updated) => {
    //some value
  },
};
export const ProfilePictureContext = React.createContext(
  ProfilePictureDefaultValue
);
function App() {
  const [updated, setUpdated] = React.useState(
    ProfilePictureDefaultValue.updated
  );
  return (
    <ProfilePictureContext.Provider value={{ updated, setUpdated }}>
      <AppProviders>
        <Layout />
      </AppProviders>
    </ProfilePictureContext.Provider>
  );
}

export default App;
