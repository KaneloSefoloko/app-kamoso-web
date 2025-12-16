import { auth, db } from '../../firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

import { doc, setDoc } from 'firebase/firestore';

/**
 * Create a user account + Firestore profile
 */
export async function signUpWithEmailPassword({ name, email, password }) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const user = cred.user;

    // Create a user profile document
    await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        createdAt: Date.now(),
    });

    return user;
}

/**
 * Login with email & password
 */
export async function loginWithEmailPassword({ email, password }) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
}

/**
 * Logout the current user
 */
export async function logout() {
    await signOut(auth);
}

/**
 * Observe authentication changes
 */
export function observeAuth(callback) {
    return onAuthStateChanged(auth, callback);
}