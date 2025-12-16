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
            await authenticate({mode: "signup", name, email, password});

            navigate("/");
        } catch (e) {
            setError(getFriendlyAuthMessage(e.code, "signup"));
        } finally {
            setPending(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white sm:bg-black px-4 sm:px-6">
            <div className="bg-white shadow-none rounded-none sm:shadow-lg sm:rounded-lg p-6 sm:p-8 w-full max-w-md flex flex-col items-center">

                <Link to="/" className="mb-4 sm:mb-6">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-12 sm:h-16 md:h-24 w-auto cursor-pointer"
                    />
                </Link>

                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                    Create your account
                </h1>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 w-full">
                    <input
                        value={name}
                        disabled={pending}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Full name"
                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded
                        focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                    />

                    <input
                        value={email}
                        disabled={pending}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email address"
                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded
                        focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                    />

                    <input
                        value={password}
                        disabled={pending}
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        placeholder="Password (min 6 chars)"
                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded
                        focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                    />
                </div>

                <button
                    onClick={handleContinue}
                    disabled={pending || !acceptedTerms}
                    className={`w-full py-2 rounded transition text-sm sm:text-base
                        ${
                        acceptedTerms
                            ? "bg-black text-white hover:bg-gray-700"
                            : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }
                    `}
                >
                    {pending ? "Creating account..." : "Sign up"}
                </button>

                {error && (
                    <div
                        role="alert"
                        aria-live="polite"
                        className="text-red-700 mt-4 w-full border border-red-300 bg-red-50 px-3 py-2 text-sm"
                    >
                        {error}
                    </div>
                )}
            </div>

            <p className="mt-4 text-gray-700 sm:text-white text-sm sm:text-base">
                Already have an account?
                <Link
                    to="/login"
                    className="text-blue-600 sm:text-yellow-400 font-semibold cursor-pointer hover:underline ml-1"
                >
                    Sign in
                </Link>
            </p>

            <div className="flex items-start mt-4 text-gray-700 sm:text-white text-xs sm:text-sm max-w-md">
                <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 mr-2"
                />
                <p>
                    By continuing, I agree to the{" "}
                    <Link
                        to="/policies/terms-of-service"
                        className="underline cursor-pointer"
                    >
                        terms of use
                    </Link>{" "}
                    and{" "}
                    <Link
                        to="/policies/privacy-policy"
                        className="underline cursor-pointer"
                    >
                        privacy policy
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default LoginSignup;
