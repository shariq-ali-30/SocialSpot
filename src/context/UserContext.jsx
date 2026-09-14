import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", JSON.stringify(null));
  }

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")),
  );

  console.log(currentUser)

  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>{children}</UserContext.Provider>
  );
};

export { UserProvider, UserContext };
