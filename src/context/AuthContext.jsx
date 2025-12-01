import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, db } from "../../firebase"; // adjust path to your firebase.js
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Shape of the context value
const AuthContext = createContext({
    user: null,         // Firebase user or null
    profile: null,      // Firestore profile doc (optional)
    loading: true,      // initial state while we resolve the user
    signup: async () => {},
    login: async () => {},
    logout: async () => {},
    refreshProfile: async () => {},
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Observe Firebase auth state
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            setUser(u);
            if (u) {
                // Try to load profile doc (optional)
                const snap = await getDoc(doc(db, "users", u.uid)).catch(() => null);
                setProfile(snap?.exists() ? snap.data() : null);
            } else {
                setProfile(null);
            }
            setLoading(false);
        });
        return () => unsub();
    }, []);

    // Create account: save Firestore profile as you did in your helpers
    const signup = async ({ name, email, password }) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        // Set displayName in Firebase Auth (nice for UI)
        if (name) {
            await updateProfile(cred.user, { displayName: name }).catch(() => {});
        }
        // Save profile in Firestore
        await setDoc(doc(db, "users", cred.user.uid), {
            name: name || cred.user.displayName || "",
            email,
            createdAt: Date.now(),
        });
        // Ensure local state updated
        setUser(cred.user);
        setProfile({ name, email, createdAt: Date.now() });
        return cred.user;
    };

    const login = async ({ email, password }) => {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        setUser(cred.user);
        // Load profile
        const snap = await getDoc(doc(db, "users", cred.user.uid)).catch(() => null);
        setProfile(snap?.exists() ? snap.data() : null);
        return cred.user;
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        setProfile(null);
    };

    // If you edit profile in Firestore elsewhere, call this to refresh local state
    const refreshProfile = async () => {
        if (!user) return null;
        const snap = await getDoc(doc(db, "users", user.uid)).catch(() => null);
        const data = snap?.exists() ? snap.data() : null;
        setProfile(data);
        return data;
    };

    const value = useMemo(
        () => ({ user, profile, loading, signup, login, logout, refreshProfile }),
        [user, profile, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook for components
export function useAuth() {
    return useContext(AuthContext);
}
