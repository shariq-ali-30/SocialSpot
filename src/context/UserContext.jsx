import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", JSON.stringify(null));
  }

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")),
  );

  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    const docRef = doc(db, "users", currentUser);
    const docSnap = await getDoc(docRef);

    setUserData(docSnap.data());
  };

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    getUser();
  }, [currentUser]);
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, userData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
