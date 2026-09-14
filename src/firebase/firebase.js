import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB722VGm4b1pJV-nN8bnuQg6QM5y-c9H9k",
  authDomain: "socialspot-646fe.firebaseapp.com",
  projectId: "socialspot-646fe",
  storageBucket: "socialspot-646fe.firebasestorage.app",
  messagingSenderId: "380311240737",
  appId: "1:380311240737:web:5cdc4d9ee070484a1fe360",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()