import React, {createContext, useContext, useEffect, useState} from "react";
import {auth, db} from "../../firebase";
import {
    createUserWithEmailAndPassword,
    fetchSignInMethodsForEmail,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import {doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔐 Admin check
    const isAdmin = profile?.role === "admin";

    useEffect(() => {
        return onAuthStateChanged(auth, async (u) => {
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
                        role: "user", // default role
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
    }, []);

    // 🧠 AUTH HANDLER
    const authenticate = async ({ mode, name, email, password }) => {
        if (mode === "login") {
            // 🔐 LOGIN
            const cred = await signInWithEmailAndPassword(auth, email, password);
            return cred.user;
        }

        if (mode === "signup") {
            // 🆕 SIGNUP
            const methods = await fetchSignInMethodsForEmail(auth, email);

            if (methods.length > 0) {
                throw {
                    code: "auth/email-already-in-use",
                };
            }

            const cred = await createUserWithEmailAndPassword(auth, email, password);

            if (name) {
                await updateProfile(cred.user, { displayName: name });
            }

            // 🔐 Assign admin automatically (CHANGE EMAIL BELOW)
            const isOwner = email === "your@email.com"; // 👈 PUT YOUR EMAIL HERE

            await setDoc(doc(db, "users", cred.user.uid), {
                name: name || "",
                email,
                role: isOwner ? "admin" : "user",
                createdAt: serverTimestamp(),
            });

            return cred.user;
        }

        throw new Error("Invalid auth mode");
    };

    // 👋 Logout
    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                loading,
                authenticate,
                logout,
                isAdmin,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
