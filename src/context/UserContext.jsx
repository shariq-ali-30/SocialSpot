import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(null));

  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const getUser = async (uid) => {
    if (!uid) {
      setUserData(null);
      return;
    }

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    setUserData(docSnap.exists() ? docSnap.data() : null);
  };

  const getPosts = () => {
    setLoadingPosts(true);
    const postsQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
    );

    return onSnapshot(postsQuery, (querySnapshot) => {
      let postsData = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setPosts(postsData);
      setLoadingPosts(false);
    });
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        getUser(user.uid);
      } else {
        setUserData(null);
      }
    });

    const unsubscribePosts = getPosts();

    return () => {
      unsubscribeAuth();
      unsubscribePosts();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, userData, posts, loadingPosts }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
