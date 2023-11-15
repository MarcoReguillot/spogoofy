// Import the functions you need from the SDKs you need
import 'dotenv/config';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "spogoofy.firebaseapp.com",
  projectId: "spogoofy",
  storageBucket: "spogoofy.appspot.com",
  messagingSenderId: "402186796678",
  appId: "1:402186796678:web:803be4e3c5c55142c31b07"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);