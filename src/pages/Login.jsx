import React, {useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/assets/main.svg";
import { useAuth } from "../context/AuthContext";
import { getFriendlyAuthMessage } from "../utils/authErrors";
import { CartContext } from '../components/CartContext';
import {useUI} from "../components/UIContext.jsx";

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

            // Try normal login
            await authenticate({mode: "login", email, password});


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
        <div className="flex flex-col items-center justify-center min-h-screen bg-white sm:bg-black px-4 sm:px-6">
            <div className="bg-white shadow-sm rounded-lg p-6 sm:p-8 w-full max-w-md flex flex-col items-center">
                <Link to="/" className="mb-4 sm:mb-6">
                    <img src={logo} alt="Logo" className="h-14 sm:h-16 md:h-28 w-auto cursor-pointer" />
                </Link>

                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Sign In</h1>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 w-full">
                    <input
                        disabled={pending}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                    />
                    <input
                        disabled={pending}
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
                    {pending ? "Signing in..." : "Continue"}
                </button>

                {error && (
                    <div role="alert" aria-live="polite" className="text-red-700 mt-4 w-full border-red-300 bg-red-50 px-3 py-2 text-sm">
                        {error}
                    </div>
                )}
            </div>

            <p className="mt-3 text-sm">
                <button
                    className="text-black sm:text-white font-semibold hover:text-gray-300 hover:underline"
                    onClick={() => navigate("/forgot-password")}
                >
                    Forgot your password?
                </button>
            </p>
        </div>
    );
};

export default Login;
