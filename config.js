// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAx1a3TfHrNEGRBWE6jdWVgPGNn4CYJHZM",
  authDomain: "clean-scape-41a5d.firebaseapp.com",
  projectId: "clean-scape-41a5d",
  storageBucket: "clean-scape-41a5d.appspot.com",
  messagingSenderId: "1087454156544",
  appId: "1:1087454156544:web:e0daa39c5376d1ffbf45e5",
  measurementId: "G-7X46E247EM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

