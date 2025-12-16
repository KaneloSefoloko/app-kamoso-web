import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Promos = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function handleNotify(e) {
        e.preventDefault();

        if (!email) return;

        // 🔥 Later: save to Firestore / email tool
        setSubmitted(true);
        setEmail("");
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-xl w-full text-center"
            >
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-1 mb-6 rounded-full bg-gray-100 text-gray-600 text-sm">
                    Promotions
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
                    No active promotions right now
                </h1>

                {/* Description */}
                <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
                    We don’t have any promotions running at this moment.
                    <br className="hidden sm:block" />
                    New drops and exclusive offers are coming soon.
                </p>

                {/* Notify Me */}
                <div className="mb-10">
                    {!submitted ? (
                        <form
                            onSubmit={handleNotify}
                            className="flex flex-col sm:flex-row gap-3 justify-center"
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="px-4 py-3 w-full sm:w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                                required
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 rounded-sm bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
                            >
                                Notify me
                            </button>
                        </form>
                    ) : (
                        <p className="text-sm text-green-600">
                            You’ll be notified when promotions go live.
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex justify-center items-center px-6 py-3 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
                    >
                        Continue shopping
                    </Link>

                    <Link
                        to="/account/profile"
                        className="inline-flex justify-center items-center px-6 py-3 rounded-md border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                    >
                        Go to my account
                    </Link>
                </div>

                {/* Footer hint */}
                <div className="mt-12 border-t border-gray-200 pt-6">
                    <p className="text-xs text-gray-500">
                        Follow us for early access to future promotions.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Promos;
