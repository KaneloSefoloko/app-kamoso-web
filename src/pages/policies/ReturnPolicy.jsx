import React from "react";
import {Link} from "react-router-dom";


const ReturnPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-10">
                {/* Title */}
                <h1 className="text-2xl font-bold text-center text-gray-900">
                    Return Policy
                </h1>

                {/* Introduction */}
                <p className="text-center text-gray-700 text-lg">
                    At Kavanti, we want you to be completely satisfied with your purchase.
                    If something isn’t perfect, we make returns and exchanges simple.
                </p>

                {/* Eligibility */}
                <div className="space-y-4">
                    <h2 className="underline text-lg font-semibold text-gray-900">Eligibility</h2>
                    <p className="text-gray-700">
                        To be eligible for a return, please ensure:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Items are unworn, unwashed, and in their original condition.</li>
                        <li>All tags and labels are intact.</li>
                        <li>Return request is made within 14 days of delivery.</li>
                    </ul>
                </div>

                {/* How to Return */}
                <div className="space-y-4">
                    <h2 className="underline text-lg font-semibold text-gray-900">How to Return</h2>
                    <p className="text-gray-700">
                        To initiate a return, follow these steps:
                    </p>
                    <ol className="list-decimal list-inside text-gray-700 space-y-1">
                        <li>Log in to your Kavanti account.</li>
                        <li>Navigate to <strong>Orders</strong> and select the item you wish to return.</li>
                        <li>Navigate to {" "}
                            <a href="/orders"
                                className="text-blue-600 hover:underline"
                            >
                                Orders
                            </a>{" "}
                            and select the item you wish to return.
                        </li>
                        <li>Click{" "}
                            <a
                                href="/return"
                                className="text-blue-600 hover:underline"
                            >
                                Log a Return
                            </a>{" "}
                            and follow the instructions.
                        </li>
                        <li>Pack your item securely and include the return slip.</li>
                        <li>Drop the package off at the nearest courier or schedule a pickup.</li>
                    </ol>
                </div>

                {/* Refunds */}
                <div className="space-y-4">
                    <h2 className="underline text-lg font-semibold text-gray-900">Refunds</h2>
                    <p className="text-gray-700">
                        Once your return is received and inspected, we will notify you of the approval or rejection of your refund.
                    </p>
                    <p className="text-gray-700">
                        Approved refunds will be processed back to your original payment method within 5-7 business days.
                    </p>
                </div>

                {/* Exchanges */}
                <div className="space-y-4">
                    <h2 className="underline text-lg font-semibold text-gray-900">Exchanges</h2>
                    <p className="text-gray-700">
                        If you would like to exchange an item for a different size or color, please log a return and place a new order for the replacement item. We’ll refund your original purchase once the returned item is received.
                    </p>
                </div>

                {/* Contact */}
                <div className="space-y-2 text-gray-700">
                    <h2 className="underline text-lg font-semibold text-gray-900">Need Help?</h2>
                    <p>
                        If you have any questions about returns, feel free to contact us at{" "}
                        <strong>info@kavanti.co.za</strong> or call us on{" "}
                        <strong>+27 21 000 0000</strong>.
                    </p>
                </div>

                {/* CTA */}
                <div className="text-center mt-6">
                    <Link
                        to="/log-return"
                        className="bg-black text-white px-8 py-3 rounded-lg font-light hover:bg-gray-800 transition inline-block"
                    >
                        Log a Return
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ReturnPolicy;