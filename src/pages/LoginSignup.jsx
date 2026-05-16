import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/assets/main.svg";
import { useAuth } from "../context/AuthContext";
import { getFriendlyAuthMessage } from "../utils/authErrors";

const LoginSignup = () => {
    const navigate = useNavigate();
    const { authenticate } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    function isValidEmail(value) {
        return /\S+@\S+\.\S+/.test(value);
    }

    async function handleContinue() {
        setError("");

        if (!name.trim() || !email.trim() || !password) {
            setError("Please fill in all fields.");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (!acceptedTerms) {
            setError("You must agree to the terms and privacy policy to continue.");
            return;
        }

        setPending(true);

        try {
            await authenticate({ mode: "signup", name, email, password });
            navigate("/");
        } catch (e) {
            setError(getFriendlyAuthMessage(e.code, "signup"));
        } finally {
            setPending(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-white via-gray-50 to-gray-100">

            {/* CARD WRAPPER */}
            <div className="w-full max-w-md relative">

                {/* soft glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-black/10 via-gray-300/20 to-black/10 blur-2xl rounded-3xl" />

                <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-8 sm:p-10 flex flex-col items-center">

                    {/* LOGO */}
                    <Link to="/" className="mb-5">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-14 sm:h-20 w-auto hover:scale-105 transition"
                        />
                    </Link>

                    {/* TITLE */}
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900 mb-6">
                        Create your account
                    </h1>

                    {/* INPUTS */}
                    <div className="space-y-4 w-full mb-6">

                        <input
                            value={name}
                            disabled={pending}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Full name"
                            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50
                            focus:bg-white focus:border-black outline-none transition text-sm"
                        />

                        <input
                            value={email}
                            disabled={pending}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email address"
                            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50
                            focus:bg-white focus:border-black outline-none transition text-sm"
                        />

                        <input
                            value={password}
                            disabled={pending}
                            onChange={(e) => setPass(e.target.value)}
                            type="password"
                            placeholder="Password (min 6 chars)"
                            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50
                            focus:bg-white focus:border-black outline-none transition text-sm"
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={handleContinue}
                        disabled={pending || !acceptedTerms}
                        className={`w-full py-3 rounded-2xl text-sm font-medium transition active:scale-[0.98]
                            ${
                            acceptedTerms
                                ? "bg-black text-white hover:opacity-90"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        {pending ? "Creating account..." : "Sign up"}
                    </button>

                    {/* ERROR */}
                    {error && (
                        <div
                            role="alert"
                            aria-live="polite"
                            className="mt-5 w-full rounded-2xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm"
                        >
                            {error}
                        </div>
                    )}
                </div>
            </div>

            {/* FOOTER LINK */}
            <p className="mt-5 text-sm text-gray-600">
                Already have an account?
                <Link
                    to="/login"
                    className="ml-1 font-medium text-black hover:underline"
                >
                    Sign in
                </Link>
            </p>

            {/* TERMS */}
            <div className="flex items-start mt-5 text-xs text-gray-500 max-w-md leading-relaxed">
                <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 mr-2 accent-black"
                />
                <p>
                    By continuing, I agree to the{" "}
                    <Link to="/policies/terms-of-service" className="underline">
                        terms of use
                    </Link>{" "}
                    and{" "}
                    <Link to="/policies/privacy-policy" className="underline">
                        privacy policy
                    </Link>.
                </p>
            </div>
        </div>
    );
};

export default LoginSignup;