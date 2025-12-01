
import { auth, db } from "../../firebase"; // adjust path if needed
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Sign Up
export async function signUp(name, email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const user = cred.user;
    // Save user profile in Firestore
    await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: Date.now(),
    });
    return user;
}

// Login
export async function login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
}

// Logout
export async function logout() {
    await signOut(auth);
}