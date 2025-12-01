
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/assets/main.svg";
import { useAuth } from "../context/AuthContext";

const LoginSignup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    async function handleContinue() {
        setError("");
        setPending(true);
        try {
            await signup({ name, email, password });
            navigate("/login", { replace: true, state: { from: "/orders" } });
        } catch (e) {
            setError(e.message || "Sign up failed");
        } finally {
            setPending(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white sm:bg-black px-4 sm:px-6">
            {/* Card */}
            <div className="bg-white shadow-none rounded-none sm:shadow-lg sm:rounded-lg p-6 sm:p-8 w-full max-w-md flex flex-col items-center">
                <Link to="/" className="mb-4 sm:mb-6">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-12 sm:h-16 md:h-24 w-auto cursor-pointer"
                    />
                </Link>

                {/* Heading: tweak copy if desired */}
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                    Create your account
                </h1>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 w-full">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Full name"
                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                    />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email address"
                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                    />
                    <input
                        value={password}
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                    />
                </div>

                <button
                    onClick={handleContinue}
                    disabled={pending}
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-600 transition text-sm sm:text-base"
                >
                    {pending ? "Creating your account..." : "Sign up"}
                </button>

                {error && (
                    <div
                        role="alert"
                        aria-live="polite"
                        className="text-red-700 mt-4 w-full border-red-300 bg-red-50 px-3 py-2 text-sm"
                    >
                        {error}
                    </div>
                )}
            </div>

            {/* Footer text: dark on mobile, white on desktop */}
            <p className="mt-4 text-gray-700 sm:text-white text-sm sm:text-base">
                Already have an account?
                <Link
                    to="/login"
                    className="text-blue-600 sm:text-yellow-400 font-semibold cursor-pointer hover:underline ml-1"
                >
                    Sign in
                </Link>
            </p>

            {/* Consent: dark on mobile, white on desktop */}
            <div className="flex items-center mt-4 text-gray-700 sm:text-white text-xs sm:text-sm">
                <input type="checkbox" className="mr-2" />
                <p>
                    By continuing, I agree to the{" "}
                    <Link to="/policies/terms-of-service" className="underline cursor-pointer">
                        terms of use
                    </Link>{" "}
                    and{" "}
                    <Link to="/policies/privacy-policy" className="underline cursor-pointer">
                        privacy policy
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default LoginSignup;
