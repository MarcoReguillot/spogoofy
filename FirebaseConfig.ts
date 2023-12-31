// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from '@firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: "spogoofy.firebaseapp.com",
  projectId: "spogoofy",
  storageBucket: "spogoofy.appspot.com",
  messagingSenderId: "402186796678",
  appId: "1:402186796678:web:803be4e3c5c55142c31b07"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

export const FIREBASE_DB = getFirestore(FIREBASE_APP);

export const FIREBASE_STORAGE = getStorage(FIREBASE_APP, "gs://spogoofy.appspot.com");

export interface FirebaseSong {
  id: string;
  uid: string;
  title: string;
  uploadedBy: string;
}