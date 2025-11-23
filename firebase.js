import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAQqghxWWYPH8hap12g421z7VT9hO-_ZF0",
    authDomain: "kavanti-af2e5.firebaseapp.com",
    projectId: "kavanti-af2e5",
    storageBucket: "kavanti-af2e5.firebasestorage.app",
    messagingSenderId: "570847631546",
    appId: "1:570847631546:web:5aa5caae67a73f69b5ca83",
    measurementId: "G-9GKLKCJ9VB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);