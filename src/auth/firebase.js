import { auth, db } from '../lib/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Sign up and create a user profile document
export async function signUpWithEmailPassword({ name, email, password }) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const user = cred.user;
    // Save a minimal profile in Firestore
    await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        createdAt: Date.now(),
    });
    return user;
}

// Login
export async function loginWithEmailPassword({ email, password }) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
}

export async function logout() {
    await signOut(auth);
}

// Listen to auth state
export function observeAuth(callback) {
    return onAuthStateChanged(auth, callback);
}
