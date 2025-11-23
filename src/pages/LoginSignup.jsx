import React from "react";
import { Link } from "react-router-dom";
import logo from "/assets/main.svg"; // ✅ Ensure this path is correct

const LoginSignup = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col items-center">
                {/* Logo inside the card */}
                <Link to="/" className="mb-6">
                    <img src={logo} alt="Logo" className="h-16 sm:h-24 md:h-32 w-auto cursor-pointer" />
                </Link>

                <h1 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h1>

                <div className="space-y-4 mb-6 w-full">
                    <input type="text" placeholder="Your name" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="email" placeholder="Email Address" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="password" placeholder="Password" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-600 transition">
                    Continue
                </button>
            </div>

            <p className="mt-4 text-white">
                Already have an account?
                <Link
                    to="/login"
                    className="text-yellow-400 font-semibold cursor-pointer hover:underline ml-1"
                >
                    Login Here
                </Link>

            </p>

            <div className="flex items-center mt-4 text-white text-sm">
                <input type="checkbox" className="mr-2" />
                <p>By continuing, I agree to the terms of use and privacy policy.</p>
            </div>
        </div>
    );
};

export default LoginSignup;