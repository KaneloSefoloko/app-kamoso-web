import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    fetchSignInMethodsForEmail
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            setUser(u);

            if (u) {
                const ref = doc(db, "users", u.uid);
                const snap = await getDoc(ref);

                if (snap.exists()) {
                    setProfile(snap.data());
                } else {
                    // 🛡️ SAFETY NET: create profile if missing
                    const data = {
                        name: u.displayName || "",
                        email: u.email,
                        createdAt: serverTimestamp(),
                    };
                    await setDoc(ref, data);
                    setProfile(data);
                }
            } else {
                setProfile(null);
            }

            setLoading(false);
        });

        return unsub;
    }, []);

    // 🧠 SMART AUTH (NO DUPLICATES)
    const authenticate = async ({ name, email, password }) => {
        const methods = await fetchSignInMethodsForEmail(auth, email);

        if (methods.length > 0 && name) {
            throw {
                code: "auth/email-already-in-use",
                message: "Account already exists. Please sign in."
            };
        }

        let cred;

        if (methods.length > 0) {
            // 🔐 EMAIL EXISTS → LOGIN
            cred = await signInWithEmailAndPassword(auth, email, password);
        } else {
            // 🆕 NEW EMAIL → SIGN UP
            cred = await createUserWithEmailAndPassword(auth, email, password);

            if (name) {
                await updateProfile(cred.user, { displayName: name });
            }

            await setDoc(doc(db, "users", cred.user.uid), {
                name: name || "",
                email,
                createdAt: serverTimestamp(),
            });
        }

        return cred.user;
    };

    // 👋 Logout
    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ user, profile, loading, authenticate, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
