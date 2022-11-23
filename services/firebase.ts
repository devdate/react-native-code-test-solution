// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { createContext } from "react";
import Constants from "expo-constants";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your credentials",
  authDomain: "your credentials",
  projectId: "your credentials",
  storageBucket: "your credentials",
  messagingSenderId: "your credentials",
  appId: "your credentials",
};

// Initialize Firebase
// initializeApp(firebaseConfig);
// export const auth = getAuth();

export const FirebaseContext = createContext<any>(null);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
