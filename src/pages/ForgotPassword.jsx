import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    async function handleReset() {
        setError("");
        setMsg("");

        if (!email) return setError("Please enter your email.");

        setPending(true);

        try {
            await sendPasswordResetEmail(auth, email);
            setMsg("Password reset sent! Check your inbox or your spam folder.");
        } catch (e) {
            setError(e.message);
        } finally {
            setPending(false);
        }
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

            <input
                className="w-full border p-2 mb-3"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button
                onClick={handleReset}
                disabled={pending}
                className="w-full bg-black text-white py-2 rounded"
            >
                {pending ? "Sending..." : "Send Reset Email"}
            </button>

            {msg && <p className="mt-4 text-green-600">{msg}</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
    );
};

export default ForgotPassword;