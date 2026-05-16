import React from "react";
import { Link } from "react-router-dom";

const ReturnPolicy = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-16 px-6">

            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-14">
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-black">
                        Return Policy
                    </h1>

                    <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                        At Kavanti, we want you to love every piece you receive. If something isn’t right,
                        we’ve made returns simple, fair, and transparent.
                    </p>
                </div>

                {/* Content Card */}
                <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 sm:p-10 space-y-12">

                    {/* Eligibility */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-black">
                            Eligibility
                        </h2>

                        <p className="text-gray-600 text-sm">
                            To qualify for a return, ensure the following:
                        </p>

                        <ul className="space-y-2 text-gray-600 text-sm list-disc pl-5">
                            <li>Items are unworn, unwashed, and in original condition</li>
                            <li>All tags and packaging are intact</li>
                            <li>Return is requested within 14 days of delivery</li>
                        </ul>
                    </section>

                    {/* How to Return */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-black">
                            How to Return
                        </h2>

                        <ol className="space-y-2 text-gray-600 text-sm list-decimal pl-5">
                            <li>Log in to your Kavanti account</li>
                            <li>
                                Go to{" "}
                                <Link to="/orders" className="text-black font-medium hover:underline">
                                    Orders
                                </Link>{" "}
                                and select the item
                            </li>
                            <li>
                                Click{" "}
                                <Link to="/return" className="text-black font-medium hover:underline">
                                    Log a Return
                                </Link>{" "}
                                and complete the form
                            </li>
                            <li>Pack your item securely with original packaging</li>
                            <li>Drop off or arrange courier pickup</li>
                        </ol>
                    </section>

                    {/* Refunds */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-black">
                            Refunds
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            Once received and inspected, we will notify you of approval or rejection.
                            Approved refunds are processed within 5–7 business days to your original payment method.
                        </p>
                    </section>

                    {/* Exchanges */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-black">
                            Exchanges
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            Exchanges are processed as a return + new order. Once your item is received,
                            we’ll issue a refund so you can reorder your preferred size or colour.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-black">
                            Need Help?
                        </h2>

                        <p className="text-gray-600 text-sm">
                            Contact us at{" "}
                            <span className="font-medium text-black">info@kavanti.co.za</span>{" "}
                            or whatsApp us at{" "}
                            <span className="font-medium text-black">+27 62 783 3498</span>.
                        </p>
                    </section>

                    {/* CTA */}
                    <div className="pt-4 flex justify-center">
                        <Link
                            to="/return"
                            className="px-8 py-3 rounded-full bg-black text-white text-sm font-medium
                                       hover:scale-[1.02] transition-opacity duration-300"
                        >
                            Log a Return
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ReturnPolicy;