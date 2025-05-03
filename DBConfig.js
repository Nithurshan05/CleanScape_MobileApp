// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
};

// Initialize Firebase app and get a reference to the database and firestore
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const firestoreDB = getFirestore(app);