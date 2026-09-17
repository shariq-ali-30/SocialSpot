import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
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
  const [posts, setPosts] = useState([]);

  const getUser = async () => {
    const docRef = doc(db, "users", currentUser);
    const docSnap = await getDoc(docRef);

    setUserData(docSnap.data());
  };

  const getPosts = () => {
    const postsQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
    );

    return onSnapshot(postsQuery, (querySnapshot) => {
      let postsData = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setPosts(postsData);
    });
  };

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    getUser();
    const unsub = getPosts();

    return () => unsub();
  }, [currentUser]);
  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, userData, posts }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
