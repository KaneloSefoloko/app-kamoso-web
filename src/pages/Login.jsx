import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/assets/main.svg";
import { useAuth } from "../context/AuthContext";
import { getFriendlyAuthMessage } from "../utils/authErrors";
import { CartContext } from "../components/CartContext";
import { useUI } from "../components/UIContext.jsx";

const Login = () => {
    const navigate = useNavigate();
    const { authenticate } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const { cart } = useContext(CartContext);
    const { cartOpen, setCartOpen } = useUI();

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
            await authenticate({ mode: "login", email, password });

            if (cart.length > 0) {
                navigate("/", { state: { openCart: true } });
            } else {
                navigate("/");
            }
        } catch (e) {
            if (e.code === "auth/multi-factor-auth-required") {
                navigate("/mfa-challenge", {
                    state: { resolver: e.resolver },
                });
                return;
            }

            setError(getFriendlyAuthMessage(e?.code, "login"));
        } finally {
            setPending(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-white via-gray-50 to-gray-100">

            {/* CARD */}
            <div className="w-full max-w-md relative">

                {/* glow background */}
                <div className="absolute -inset-1 bg-gradient-to-r from-black/10 via-gray-300/20 to-black/10 blur-2xl rounded-3xl" />

                <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-8 sm:p-10 flex flex-col items-center">

                    {/* LOGO */}
                    <Link to="/" className="mb-6">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-16 sm:h-20 w-auto hover:scale-105 transition"
                        />
                    </Link>

                    {/* TITLE */}
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900 mb-6">
                        Welcome back
                    </h1>

                    {/* INPUTS */}
                    <div className="w-full space-y-4 mb-6">
                        <input
                            disabled={pending}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email address"
                            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-black outline-none transition text-sm"
                        />

                        <input
                            disabled={pending}
                            value={password}
                            onChange={(e) => setPass(e.target.value)}
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-black outline-none transition text-sm"
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={handleContinue}
                        disabled={pending}
                        className="w-full py-3 rounded-2xl bg-black text-white font-medium text-sm hover:opacity-90 active:scale-[0.98] transition"
                    >
                        {pending ? "Signing in..." : "Continue"}
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

                    {/* FORGOT PASSWORD */}
                    <p className="mt-6 text-sm text-gray-500">
                        <button
                            className="text-black font-medium hover:underline"
                            onClick={() => navigate("/forgot-password")}
                        >
                            Forgot your password?
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;