import React from "react";

const Payments = () => {
    return (
        <div className="min-h-screen bg-[#f7f7f5] py-20 px-4">

            <div className="max-w-5xl mx-auto space-y-14">

                {/* HERO */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight">
                        Payment Methods
                    </h1>

                    <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Shop confidently with secure, encrypted and globally trusted payment options
                        designed for a seamless checkout experience.
                    </p>
                </div>

                {/* PAYMENT ICON STRIP */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-6 py-8">
                    <div className="flex flex-wrap items-center justify-center gap-10">

                        {[
                            { src: "/assets/paymentMethod/Visa_Inc._logo.svg", w: "w-20" },
                            { src: "/assets/paymentMethod/MasterCard_Logo.svg", w: "w-20" },
                            { src: "/assets/paymentMethod/PayPal.svg", w: "w-24" },
                            { src: "/assets/paymentMethod/CapitecPay.png", w: "w-24" },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`${item.w} opacity-80 hover:opacity-100 transition`}
                            >
                                <img
                                    src={item.src}
                                    alt=""
                                    className="w-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* CARDS */}
                <div className="grid md:grid-cols-2 gap-6">

                    {[
                        {
                            title: "Secure Payments",
                            text: "All transactions are encrypted and processed securely through industry-leading gateways. Your data is never stored.",
                        },
                        {
                            title: "Card Payments",
                            text: "Visa & Mastercard payments are processed instantly with real-time confirmation for fast checkout.",
                        },
                        {
                            title: "Capitec Pay",
                            text: "Approve purchases directly in your banking app — fast, secure, and no extra fees.",
                        },
                        {
                            title: "PayPal",
                            text: "International checkout made simple with trusted global payment protection.",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="group bg-white border border-gray-200 rounded-2xl p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-opacity duration-300"
                        >
                            <h2 className="text-lg font-medium mb-3 group-hover:text-black">
                                {item.title}
                            </h2>

                            <p className="text-gray-500 leading-relaxed text-sm">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>

                {/* SUPPORT */}
                <div className="text-center pt-6">
                    <div className="inline-block bg-white border border-gray-200 rounded-full px-6 py-3 shadow-sm">
                        <p className="text-gray-600 text-sm">
                            Need help? Contact us at{" "}
                            <span className="font-medium text-black">
                                info@kavanti.co.za
                            </span>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Payments;