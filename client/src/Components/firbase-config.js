import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDBsLk36X2Oj-fWIltjAXC9_nwnSNCz0c0",
    authDomain: "sampleapp-ba20b.firebaseapp.com",
    projectId: "sampleapp-ba20b",
    storageBucket: "sampleapp-ba20b.appspot.com",
    messagingSenderId: "660347322444",
    appId: "1:660347322444:web:a0f2f3bd4e05951ede74e9"
};
  
  // Initialize Firebase

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);