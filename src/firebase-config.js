// src/firebase-config.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDylF_8IJooZJ5iuzNwZDgxk0YIxHyfxDE",
  authDomain: "gotalentng.firebaseapp.com",
  projectId: "gotalentng",
  storageBucket: "gotalentng.firebasestorage.app",
  messagingSenderId: "830077574561",
  appId: "1:830077574561:web:a997d7b8980e22b341ffe0",
  measurementId: "G-2XRPC3BPVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
