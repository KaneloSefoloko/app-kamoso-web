import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";

const PaymentPage = () => {
    const { checkoutInfo, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const { cart = [], total = 0, userInfo = {} } = checkoutInfo || {};

    const [proof, setProof] = useState(null);
    const [error, setError] = useState("");

    const orderNumber = `KAV-${Date.now().toString().slice(-6)}`;

    if (!cart.length) {
        navigate("/checkout", { replace: true });
        return null;
    }

    const handleWhatsAppSubmit = () => {
        if (!proof) {
            setError("⚠️ Please upload proof of payment before continuing.");
            return;
        }

        setError("");

        const message = `🧾 *NEW EFT ORDER*
                                    Order Number: ${orderNumber}

                                   👤 Name: ${userInfo?.name || "Customer"}
                                   📧 Email: ${userInfo?.email || "N/A"}

                                   📍 Delivery Address:
                                   ${userInfo?.address || "N/A"}

                                   💰 Amount Paid: R${total}

                                   ⚠️ Proof of payment attached`;

        const phone = "27627833498";
        const encodedMessage = encodeURIComponent(message);

        window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");

        // Optional: clear cart AFTER WhatsApp opens
        clearCart();
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

                {/* ORDER SUMMARY */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                    {cart.map(item => (
                        <div key={`${item.id}-${item.size || "ONE_SIZE"}`} className="flex justify-between mb-2 text-sm">
                            <span>{item.name} × {item.size}</span>
                            <span>{item.name} × {item.quantity}</span>
                            <span>R{item.price * item.quantity}</span>
                        </div>
                    ))}

                    <div className="border-t mt-4 pt-3 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>R{total}</span>
                    </div>
                </div>

                {/* EFT PAYMENT */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">EFT Payment</h2>

                    {/* BANK DETAILS */}
                    <div className="bg-gray-100 rounded-lg p-4 mb-4 text-sm space-y-1">
                        <p className="font-semibold mb-2">Banking Details</p>

                        <div className="flex justify-between items-center">
                            <span>Bank:</span>
                            <span>Capitec Bank</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span>Account Name:</span>
                            <span>Kavanti</span>
                        </div>

                        <div className="flex justify-between items-center gap-2 flex-nowrap">
                            <span className="shrink-0">Account Number:</span>

                            <div className="flex items-center gap-2 whitespace-nowrap">
                                <span className="font-mono text-sm sm:text-base">
                                      119 746 0347
                                </span>

                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText("1197460347");
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 2000);
                                    }}
                                    className="shrink-0 text-xs px-2 py-1 border rounded-sm hover:bg-gray-200 transition">
                                        {copied ? "Copied ✓" : "Copy"}
                                </button>
                            </div>
                        </div>


                        <div className="flex justify-between items-center">
                            <span>Account Type:</span>
                            <span>Savings</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span>Reference:</span>
                            <span className="font-semibold">{orderNumber}</span>
                        </div>

                        <p className="text-xs text-gray-500 mt-2">
                            ⚠️ Please use the reference exactly as shown to avoid delays.
                        </p>
                    </div>


                    {/* PROOF UPLOAD */}
                    <div className="mb-3">
                        <label className="block text-sm font-semibold mb-1">
                            Upload Proof of Payment
                        </label>
                        <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) => setProof(e.target.files[0])}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    {error && (
                        <p className="text-red-600 text-sm mb-2">{error}</p>
                    )}

                    {/* ACTION BUTTON */}
                    <button
                        onClick={handleWhatsAppSubmit}
                        className="w-full mt-4 py-3 rounded-sm bg-black text-white font-semibold hover:bg-gray-800 transition"
                    >
                        I Have Paid – Send via WhatsApp
                    </button>

                    <p className="text-xs text-gray-500 mt-3 text-center">
                        Orders are processed only after payment is verified.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
