import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/assets/main.svg";
import { useAuth } from "../context/AuthContext";
import { getFriendlyAuthMessage } from "../utils/authErrors";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    function isValidEmail(value) {
        return /\S+@\S+\.\S+/.test(value);
    }

    async function handleContinue() {
        setError("");

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }
        if (!isValidEmail(email)) {
            setError("That email doesn't look right. Please check and try again.");
            return;
        }

        setPending(true);
        try {
            await login({ email, password });
            // Note: use real '&' (not &amp;) and backticks for interpolation
            const params = "?locale=en&region_country=ZA&consent=a0m0p0&consent_id=bbc2eb1b-db24-4ff0-94a9-aa059ce08eaf";

            const redirectTo = location.state?.from?.pathname || `/orders${params}`;
            navigate(redirectTo, { replace: true });
        } catch (e) {
            setError(getFriendlyAuthMessage(e?.code, "login"));
        } finally {
            setPending(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white sm:bg-black px-4 sm:px-6">
            <div className="bg-white shadow-sm rounded-lg p-6 sm:p-8 w-full max-w-md flex flex-col items-center">
                <Link to="/" className="mb-4 sm:mb-6">
                    <img src={logo} alt="Logo" className="h-14 sm:h-16 md:h-28 w-auto cursor-pointer" />
                </Link>

                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Sign In</h1>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 w-full">
                    <input disabled={pending} value={email} onChange={(e)=>setEmail(e.target.value)}
                           type="email" placeholder="Email Address"
                           className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base" />
                    <input disabled={pending} value={password} onChange={(e)=>setPass(e.target.value)}
                           type="password" placeholder="Password"
                           className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base" />
                </div>

                <button onClick={handleContinue} disabled={pending}
                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-600 transition text-sm sm:text-base">
                    {pending ? "Signing in..." : "Continue"}
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
        </div>
    );
};

export default Login;