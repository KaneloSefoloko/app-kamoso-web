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
        <div className="min-h-screen bg-white py-16 px-6">
            <div className="max-w-4xl mx-auto">

                {/* Page Title */}
                <h1 className="text-3xl font-bold text-center mb-10 tracking-wide">
                    Frequently Asked Questions
                </h1>

                {/* Category Tabs */}
                <div className="flex justify-center gap-4 mb-10">
                    {["orders", "shipping", "returns"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setActiveCategory(cat);
                                setOpenIndex(null);
                            }}
                            className={`px-6 py-2 rounded-full border text-sm font-medium transition-all
                                ${activeCategory === cat
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-700 border-gray-300 hover:border-black"
                            }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqData[activeCategory].map((item, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden">

                            {/* Question */}
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 hover:bg-gray-200 transition"
                            >
                                <span className="text-left font-medium text-gray-800">
                                    {item.q}
                                </span>
                                <FaChevronDown
                                    className={`transition-transform ${
                                        openIndex === index ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {/* Answer */}
                            <div
                                className={`px-6 overflow-hidden transition-all duration-300 bg-white ${
                                    openIndex === index ? "max-h-40 py-4" : "max-h-0"
                                }`}
                            >
                                <p className="text-gray-700 text-sm leading-relaxed">
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