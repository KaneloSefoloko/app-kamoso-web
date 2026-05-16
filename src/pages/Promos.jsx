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
        <div className="min-h-screen bg-[#f6f6f3] flex items-center justify-center px-6 py-16">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-2xl w-full text-center"
            >

                {/* BADGE */}
                <div className="inline-flex items-center px-4 py-1 mb-8 rounded-full bg-white border border-gray-200 text-gray-500 text-xs tracking-[0.2em] uppercase">
                    Promotions
                </div>

                {/* TITLE */}
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-black mb-5">
                    No active promotions
                </h1>

                {/* DESCRIPTION */}
                <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
                    We don’t have any promotions running at the moment.
                    New drops, exclusive releases, and private offers will be shared soon.
                </p>

                {/* NOTIFY CARD */}
                <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 mb-10 shadow-sm">

                    {!submitted ? (
                        <>
                            <p className="text-sm text-gray-500 mb-6">
                                Get notified before everyone else.
                            </p>

                            <form
                                onSubmit={handleNotify}
                                className="flex flex-col sm:flex-row gap-3"
                            >
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    autoComplete="email"
                                    className="w-full sm:flex-1 h-14 px-5 rounded-2xl border border-gray-200 bg-[#fafafa] outline-none focus:border-black transition text-sm"
                                    required
                                />

                                <button
                                    type="submit"
                                    className="h-12 px-6 rounded-2xl bg-black text-white text-sm font-medium tracking-wide hover:opacity-90 transition"
                                >
                                    Notify me
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="py-6">
                            <div className="w-12 h-12 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-4">
                                <span className="text-green-600 text-xl">✓</span>
                            </div>

                            <p className="text-green-600 text-sm font-medium">
                                You’re on the list.
                            </p>

                            <p className="text-gray-500 text-sm mt-2">
                                We’ll notify you when something drops.
                            </p>
                        </div>
                    )}
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">

                    <Link
                        to="/"
                        className="h-12 px-6 rounded-2xl bg-black text-white text-sm font-medium tracking-wide flex items-center justify-center hover:opacity-90 transition"
                    >
                        Continue shopping
                    </Link>

                    <Link
                        to="/account/profile"
                        className="h-12 px-6 rounded-2xl border border-gray-200 text-gray-700 text-sm font-medium flex items-center justify-center hover:bg-white transition"
                    >
                        My account
                    </Link>
                </div>

                {/* FOOTER NOTE */}
                <div className="mt-14 pt-6 border-t border-gray-200">
                    <p className="text-xs text-gray-400 tracking-wide">
                        Follow us for early access to exclusive drops
                    </p>
                </div>

            </motion.div>
        </div>
    );
};

export default Promos;
