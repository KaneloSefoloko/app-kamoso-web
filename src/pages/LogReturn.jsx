import React, { useState } from "react";
import { db } from "../../firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const LogReturn = () => {
    const [formData, setFormData] = useState({
        orderNumber: "",
        email: "",
        reason: "",
        notes: "",
    });

    const isFormValid =
        formData.orderNumber.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.reason.trim() !== "";

    const [status, setStatus] = useState("idle");

    const returnReasons = [
        "Wrong size",
        "Wrong item received",
        "Item defective",
        "Not as expected",
        "Changed my mind",
        "Other",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setStatus("submitting");

        try {
            await addDoc(collection(db, "returns"), {
                ...formData,
                status: "pending",
                createdAt: serverTimestamp(),
            });

            setStatus("success");

            setFormData({
                orderNumber: "",
                email: "",
                reason: "",
                notes: "",
            });
        } catch (error) {
            console.error("Error submitting return:", error);
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f7f5] py-20 px-4">

            <div className="max-w-4xl mx-auto space-y-10">

                {/* HERO */}
                <div className="text-center space-y-3">
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight">
                        Return Request
                    </h1>

                    <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Submit your return request below. Our support team will review and respond
                        within 2–3 business days.
                    </p>
                </div>

                {/* FORM CARD */}
                <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 md:p-10">

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* ORDER + EMAIL */}
                        <div className="grid md:grid-cols-2 gap-5">

                            <div>
                                <label className="text-sm text-gray-600 mb-2 block">
                                    Order Number
                                </label>
                                <input
                                    type="text"
                                    name="orderNumber"
                                    value={formData.orderNumber}
                                    onChange={handleChange}
                                    placeholder="e.g. KVNT12345"
                                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#fafafa] focus:bg-white focus:border-black outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600 mb-2 block">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#fafafa] focus:bg-white focus:border-black outline-none transition"
                                />
                            </div>
                        </div>

                        {/* REASON */}
                        <div>
                            <label className="text-sm text-gray-600 mb-2 block">
                                Reason for return
                            </label>

                            <select
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#fafafa] focus:bg-white focus:border-black outline-none transition"
                            >
                                <option value="">Select a reason</option>
                                {returnReasons.map((reason) => (
                                    <option key={reason} value={reason}>
                                        {reason}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* NOTES */}
                        <div>
                            <label className="text-sm text-gray-600 mb-2 block">
                                Additional notes (optional)
                            </label>

                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Tell us more about the issue..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fafafa] focus:bg-white focus:border-black outline-none transition resize-none"
                            />
                        </div>

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            disabled={status === "submitting" || !isFormValid}
                            className={`w-full h-12 rounded-xl font-medium transition-opacity duration-300 ${
                                isFormValid
                                    ? "bg-black text-white hover:opacity-90"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                        >
                            {status === "submitting"
                                ? "Submitting request..."
                                : "Submit Return Request"}
                        </button>

                        {/* STATUS */}
                        {status === "success" && (
                            <div className="text-center text-green-600 text-sm">
                                Your return request has been submitted successfully.
                            </div>
                        )}

                        {status === "error" && (
                            <div className="text-center text-red-500 text-sm">
                                Something went wrong. Please try again.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LogReturn;