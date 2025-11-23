import React from "react";
import { Link } from "react-router-dom";
import logo from "/assets/main.svg"; // ✅ Ensure this path is correct

const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4 sm:px-6">
            <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md flex flex-col items-center">
                {/* Logo inside the card */}
                <Link to="/" className="mb-4 sm:mb-6">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-12 sm:h-16 md:h-24 w-auto cursor-pointer"
                    />
                </Link>

                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Sign In</h1>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 w-full">
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    />
                </div>

                <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-600 transition text-sm sm:text-base">
                    Continue
                </button>
            </div>
        </div>
    );
};

export default Login;