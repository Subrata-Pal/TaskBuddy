// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider, getAuth} from "firebase/auth";

//subrata1234 //subrotopal2002
//mongodb+srv://<db_username>:<db_password>@cluster0.li9wj.mongodb.net/

const firebaseConfig = {
  apiKey: "AIzaSyD-vlCoMQU3FpZvwsceeh_OA7SWpjGmMCs",
  authDomain: "taskbuddy-1cd91.firebaseapp.com",
  projectId: "taskbuddy-1cd91",
  storageBucket: "taskbuddy-1cd91.firebasestorage.app",
  messagingSenderId: "758151250182",
  appId: "1:758151250182:web:a943ded8488ab769885e87",
  measurementId: "G-CFVL7LKS5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export default app;