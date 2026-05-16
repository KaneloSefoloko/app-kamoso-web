import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqData = {
    orders: [
        {
            q: "How do I place an order?",
            a: "Add your preferred items to your cart and checkout. You will receive a confirmation email once complete."
        },
        {
            q: "I didn’t receive my order confirmation — what should I do?",
            a: "Check your spam/junk folder. If not found, email us at info@kavanti.co.za and we’ll resend it."
        },
        {
            q: "Can I change my order after placing it?",
            a: "Order changes are only possible before dispatch. Contact support as soon as possible."
        },
    ],
    shipping: [
        {
            q: "How long does delivery take?",
            a: "Local delivery takes 7–10 working days."
        },
        {
            q: "Do you ship internationally?",
            a: "Not yet."
        },
        {
            q: "How much is shipping?",
            a: "Local delivery costs R90, free over R900."
        },
    ],
    returns: [
        {
            q: "What is your return policy?",
            a: "You may return items within 7 days of receiving them, provided they are unworn and in original condition."
        },
        {
            q: "How do I log a return?",
            a: "Visit /log-a-return and follow the return instructions."
        },
        {
            q: "Do you offer refunds or exchanges?",
            a: "Yes — refunds are processed after item inspection. Exchanges are offered if stock is available."
        },
    ],
};

const FAQ = () => {
    const [activeCategory, setActiveCategory] = useState("orders");
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 py-20 px-6">

            <div className="max-w-4xl mx-auto">

                {/* TITLE */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-gray-500 mt-3 text-sm">
                        Everything you need to know about orders, shipping, and returns.
                    </p>
                </div>

                {/* CATEGORY PILLS */}
                <div className="flex justify-center mb-12">
                    <div className="flex gap-2 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-full p-1 shadow-sm">

                        {["orders", "shipping", "returns"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setActiveCategory(cat);
                                    setOpenIndex(null);
                                }}
                                className={`px-5 py-2 text-sm rounded-full transition-all duration-200
                                    ${
                                    activeCategory === cat
                                        ? "bg-black text-white shadow-md"
                                        : "text-gray-600 hover:text-black"
                                }`}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}

                    </div>
                </div>

                {/* FAQ LIST */}
                <div className="space-y-4">

                    {faqData[activeCategory].map((item, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-xl shadow-sm overflow-hidden"
                        >

                            {/* QUESTION */}
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex justify-between items-center px-6 py-5 hover:bg-gray-50 transition"
                            >
                                <span className="text-left font-medium text-gray-900">
                                    {item.q}
                                </span>

                                <FaChevronDown
                                    className={`text-gray-500 transition-transform duration-300 ${
                                        openIndex === index ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {/* ANSWER */}
                            <div
                                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out bg-white ${
                                    openIndex === index ? "max-h-40 py-4" : "max-h-0"
                                }`}
                            >
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {item.a}
                                </p>
                            </div>

                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default FAQ;