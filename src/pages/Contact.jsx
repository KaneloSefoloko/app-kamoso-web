import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.js";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [status, setStatus] = useState("idle");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");

        try {
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
        <div className="min-h-screen bg-[#f6f6f3] py-20 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

                {/* LEFT - INFO */}
                <div className="space-y-8">

                    <div>
                        <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-3">
                            Get in touch
                        </p>

                        <h1 className="text-4xl md:text-5xl font-light text-black">
                            Contact Us
                        </h1>

                        <p className="text-gray-600 mt-4 leading-relaxed max-w-md">
                            We’d love to hear from you. Whether you have a question
                            about orders, sizing, or collaborations — we’re here to help.
                        </p>
                    </div>

                    <div className="space-y-4 text-gray-700 text-sm">
                        <div className="p-5 bg-white rounded-2xl border border-gray-100">
                            <p className="font-medium">Email</p>
                            <p className="text-gray-500">info@kavanti.co.za</p>
                        </div>

                        <div className="p-5 bg-white rounded-2xl border border-gray-100">
                            <p className="font-medium">WhatsApp</p>
                            <p className="text-gray-500">+27 62 783 3498</p>
                        </div>

                        <div className="p-5 bg-white rounded-2xl border border-gray-100">
                            <p className="font-medium">Address</p>
                            <p className="text-gray-500">
                                Unit 000, Greenbay <br />
                                Firlands Minor Rd, Admirals Park <br />
                                Gordon's Bay, 7135
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT - FORM */}
                <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-10 shadow-sm">

                    <h2 className="text-2xl font-light mb-6">
                        Send a message
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full h-14 px-5 rounded-2xl bg-[#fafafa] border border-gray-200
                            outline-none focus:border-black transition"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full h-14 px-5 rounded-2xl bg-[#fafafa] border border-gray-200
                            outline-none focus:border-black transition"
                            required
                        />

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone (optional)"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full h-14 px-5 rounded-2xl bg-[#fafafa] border border-gray-200
                            outline-none focus:border-black transition"
                        />

                        <textarea
                            name="message"
                            placeholder="Your message..."
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className="w-full px-5 py-4 rounded-2xl bg-[#fafafa] border border-gray-200
                            outline-none focus:border-black transition"
                            required
                        />

                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="w-full h-14 rounded-2xl bg-black text-white text-sm tracking-wide
                            hover:opacity-90 transition disabled:opacity-50"
                        >
                            {status === "submitting" ? "Sending..." : "Send Message"}
                        </button>

                        {status === "success" && (
                            <p className="text-green-600 text-sm text-center">
                                Message sent successfully ✔
                            </p>
                        )}

                        {status === "error" && (
                            <p className="text-red-600 text-sm text-center">
                                Something went wrong. Try again.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;