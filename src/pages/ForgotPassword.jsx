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
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-white via-gray-50 to-gray-100">

            {/* BACKGROUND GLOW */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-black/5 blur-3xl rounded-full" />
            </div>

            {/* CARD */}
            <div className="relative w-full max-w-md">

                <div className="absolute -inset-1 bg-gradient-to-r from-black/10 via-gray-300/20 to-black/10 blur-2xl rounded-3xl" />

                <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-8 sm:p-10">

                    {/* HEADER */}
                    <h1 className="text-2xl font-semibold text-gray-900 tracking-tight text-center">
                        Reset Password
                    </h1>

                    <p className="text-sm text-gray-500 text-center mt-2 mb-6">
                        Enter your email and we’ll send you a reset link
                    </p>

                    {/* INPUT */}
                    <input
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50
                        focus:bg-white focus:border-black outline-none transition text-sm"
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* BUTTON */}
                    <button
                        onClick={handleReset}
                        disabled={pending}
                        className="w-full mt-4 py-3 rounded-2xl bg-black text-white text-sm font-medium
                        hover:opacity-90 active:scale-[0.98] transition"
                    >
                        {pending ? "Sending..." : "Send Reset Email"}
                    </button>

                    {/* SUCCESS */}
                    {msg && (
                        <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 text-green-700 px-4 py-3 text-sm">
                            {msg}
                        </div>
                    )}

                    {/* ERROR */}
                    {error && (
                        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;