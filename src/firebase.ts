// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBcJT9ZTo3JWD1N7Ya8TEw1xoCP3taWoQ",
  authDomain: "myopenlabreact.firebaseapp.com",
  projectId: "myopenlabreact",
  storageBucket: "myopenlabreact.firebasestorage.app",
  messagingSenderId: "272173315830",
  appId: "1:272173315830:web:4968b12464518079d49ed7",
};

const app = initializeApp(firebaseConfig);
console.log("Firebase initialized:", app.name);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
