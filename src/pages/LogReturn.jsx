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
                orderNumber: formData.orderNumber,
                email: formData.email,
                reason: formData.reason,
                notes: formData.notes,
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
        <div className="min-h-screen bg-white py-16 px-6">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl space-y-10 shadow-sm border border-gray-200">

                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold tracking-wide">Log a Return</h1>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Submit a return request below. Our team will respond within 2–3 working days.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Order Number */}
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">Order Number</label>
                        <input
                            type="text"
                            name="orderNumber"
                            required
                            value={formData.orderNumber}
                            onChange={handleChange}
                            placeholder="e.g. KVNT12345"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                        />
                    </div>

                    {/* Reason Dropdown */}
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">Reason</label>
                        <select
                            name="reason"
                            required
                            value={formData.reason}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-black outline-none"
                        >
                            <option value="">Select a reason</option>
                            {returnReasons.map((reason) => (
                                <option key={reason} value={reason}>
                                    {reason}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">Notes (optional)</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Describe the issue..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === "submitting" || !isFormValid}
                        className={`w-full py-3 rounded-lg font-semibold transition
                             ${isFormValid ? "bg-black text-white hover:bg-gray-900" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                    >
                        {status === "submitting" ? "Submitting..." : "Submit Return"}
                    </button>
                </form>

                {status === "success" && (
                    <p className="text-green-600 text-center font-medium">
                        Your return request has been submitted.
                    </p>
                )}
                {status === "error" && (
                    <p className="text-red-600 text-center font-medium">
                        Something went wrong. Please try again.
                    </p>
                )}
            </div>
        </div>
    );
};

export default LogReturn;