import React, { useEffect, useState } from "react";

import { AppRouting } from "../../../routing";
import { PrivateHeader } from "./header";
import "./style.less";
import { useLocation } from "react-router-dom";
import { AvailableTask } from "../../../admin/AvailableTask";

//Definations for MyDesignsContext----
// type MyDesignContextState = { design: number };
// type MyDesignContextValue = {
//   design: MyDesignContextState;
//   setDesign: Dispatch<SetStateAction<MyDesignContextState>>;
// };
// const MyDesignContextDefaultValue: MyDesignContextValue = {
//   design: { design: 0 },
//   setDesign: (design) => {
//     //some value
//   },
// };
export const ActiveEditorContext = React.createContext("image");
// export const MyDesignsContext = React.createContext(
//   MyDesignContextDefaultValue
// );
export const AdminContext = React.createContext("user");
export const PrivateLayout = () => {
  const location: any = useLocation();
  const [activeEditor, setActiveEditor] = useState("image");
  const [design, setDesign] = useState(0);
  const [isTask, setIsTask] = useState(false);
  const [isAdmin, setIsAdmin] = useState("user");
  const setDesignCount = (value: any) => {
    console.log(value);
    setDesign(value);
  };

  const toggleTaskPopup = () => {
    setIsTask(!isTask);
  };
  React.useEffect(() => {
    const user: any = localStorage.getItem("user");
    const userData = JSON.parse(user);
    for (let i of userData.roles) {
      if (i.name === "admin") {
        setIsAdmin("admin");
      }
    }
  }, []);

  return (
    <>
      <div>
        {/* <MyDesignsContext.Provider value={{ design, setDesign }}> */}
        <ActiveEditorContext.Provider value={activeEditor}>
          <AdminContext.Provider value={isAdmin}>
            {location.pathname !== "/trial-offer" &&
              location.pathname !== "/choose-business" &&
              location.pathname !== "/dashboard/choose-size" &&
              location.pathname !== "/dashboard/choose-type" &&
              location.pathname !== "/dashboard/choose-template" &&
              location.pathname !== "/reset-password" &&
              location.pathname !== "/transaction" &&
              location.pathname !== "/mobile-registration" &&
              location.pathname !== "/close-account" && (
                <PrivateHeader
                  setActiveEditor={setActiveEditor}
                  activeEditor={activeEditor}
                  design={design}
                  toggleTaskPopup={toggleTaskPopup}
                />
              )}

            {isTask && <AvailableTask handleTaskClose={toggleTaskPopup} />}
            <AppRouting setDesignCount={setDesignCount} />
          </AdminContext.Provider>
        </ActiveEditorContext.Provider>
        {/* </MyDesignsContext.Provider> */}
      </div>
    </>
  );
};
