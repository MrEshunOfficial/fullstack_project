// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "dockris-productivity.firebaseapp.com",
  projectId: "dockris-productivity",
  storageBucket: "dockris-productivity.appspot.com",
  messagingSenderId: "432978722581",
  appId: "1:432978722581:web:be644e70b149b8a8bef31c",
  measurementId: "G-CCSJ1G9VJ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
