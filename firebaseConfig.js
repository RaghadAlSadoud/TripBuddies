import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import {getAuth} from "firebase/auth";
//import {...} from "firebase/database";
import {getFirestore} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBd_mFVDS15EirBmbB77ZNGGMtgGPEEeHQ",
    authDomain: "tripbuddies-1.firebaseapp.com",
    projectId: "tripbuddies-1",
    storageBucket: "tripbuddies-1.appspot.com",
    messagingSenderId: "1007730182417",
    appId: "1:1007730182417:web:95ca2df21f41dbed3324b0"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const getAuthState = () => useAuthState(auth);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
