import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.js";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle, submitting, success, error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            // Add form data to Firestore collection "contacts"
            await addDoc(collection(db, "contacts"), {
                ...formData,
                createdAt: serverTimestamp(),
            });

            setStatus("success");
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-white py-12 px-6">
            <div className="max-w-3xl mx-auto bg-white p-8 space-y-8">
                <h1 className="text-3xl font-bold text-center">Contact Us</h1>

                {/* Contact Info */}
                <div className="space-y-4 text-gray-700">
                    <p>Have questions? Reach out to us via phone, email or send us a message using the form below.</p>
                    <p><strong>Email:</strong> info@kavanti.co.za</p>
                    <p><strong>Phone:</strong> +27 21 000 0000</p>
                    <p><strong>Address:</strong> Unit 000, Greenbay <br /> Firlands Minor Rd, Admirals Park
                        <br /> Gordon's Bay, 7135</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Your Name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                            Phone (optional)
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="e.g. +27 71 123 4567"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Write your message here..."
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
                    >
                        {status === "submitting" ? "Sending..." : "Send Message"}
                    </button>
                </form>

                {/* Status Messages */}
                {status === "success" && (
                    <p className="text-green-600 text-center">Thank you! Your message has been sent.</p>
                )}
                {status === "error" && (
                    <p className="text-red-600 text-center">Oops — something went wrong. Please try again later.</p>
                )}
            </div>
        </div>
    );
};

export default Contact;
