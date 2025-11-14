import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAaDsT5IKaHcGXONgrQCZ5JH5eUp57nJCg",
    authDomain: "kavanti-web-application.firebaseapp.com",
    projectId: "kavanti-web-application",
    storageBucket: "kavanti-web-application.firebasestorage.app",
    messagingSenderId: "995665208572",
    appId: "1:995665208572:web:13f6d3bebe850504656379",
    measurementId: "G-33JTP89Q0X"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);