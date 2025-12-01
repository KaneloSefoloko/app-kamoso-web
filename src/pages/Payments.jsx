import React from "react";

const Payments = () => {
    return (
        <div className="min-h-screen bg-white py-16 px-6">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Heading */}
                <div className="text-center space-y-3">
                    <h1 className="text-3xl font-bold tracking-tight">Payment Methods</h1>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Shop safely and securely using any of our trusted payment options.
                    </p>
                </div>

                {/* Icon Banner */}
                <div className="flex flex-wrap justify-center gap-10 pt-4">

                    {/* VISA */}
                    <div className="w-20">
                        <img
                            src="/assets/paymentMethod/Visa_Inc._logo.svg"
                            alt="Visa"
                            className="w-full object-contain"
                        />
                    </div>

                    {/* Mastercard */}
                    <div className="w-20">
                        <img
                            src="/assets/paymentMethod/MasterCard_Logo.svg"
                            alt="Mastercard"
                            className="w-full object-contain"
                        />
                    </div>

                    {/* PayPal */}
                    <div className="w-24">
                        <img
                            src="/assets/paymentMethod/PayPal.svg"
                            alt="PayPal"
                            className="w-full object-contain"
                        />
                    </div>

                    {/* Capitec PaymentPage.jsx */}
                    <div className="w-24">
                        <img
                            src="/assets/paymentMethod/CapitecPay.png"
                            alt="Capitec Pay"
                            className="w-full object-contain"
                        />
                    </div>

                </div>

                {/* Information Cards */}
                <div className="grid md:grid-cols-2 gap-8 pt-8">

                    {/* Secure Payments */}
                    <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
                        <h2 className="text-xl font-semibold mb-3">Secure Payments</h2>
                        <p className="text-gray-600">
                            All transactions are encrypted and processed securely through industry-leading
                            payment gateways. Your card details are never stored on our servers.
                        </p>
                    </div>

                    {/* Card Payments */}
                    <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
                        <h2 className="text-xl font-semibold mb-3">Card Payments</h2>
                        <p className="text-gray-600">
                            We accept Visa and Mastercard debit/credit cards. Payments are processed instantly
                            and you will receive a confirmation email once successful.
                        </p>
                    </div>

                    {/* Capitec PaymentPage.jsx */}
                    <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
                        <h2 className="text-xl font-semibold mb-3">Capitec Pay</h2>
                        <p className="text-gray-600">
                            Capitec Pay allows you to approve purchases directly from your banking app — quick,
                            secure, and free of extra charges.
                        </p>
                    </div>

                    {/* PayPal Payments */}
                    <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
                        <h2 className="text-xl font-semibold mb-3">PayPal</h2>
                        <p className="text-gray-600">
                            International customers can pay using PayPal for a smooth, globally trusted
                            checkout experience.
                        </p>
                    </div>

                </div>

                {/* Support Message */}
                <div className="text-center pt-10">
                    <p className="text-gray-700">
                        Need help with a payment? Contact us at{" "}
                        <span className="font-semibold">info@kavanti.co.za</span>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Payments;