import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import { auth, db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const PaymentPage = () => {
    const { checkoutInfo, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [copied, setCopied] = useState(false);
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [proof, setProof] = useState(null);
    const [error, setError] = useState("");

    const { cart = [], total = 0, userInfo = {}, shipping = {} } = checkoutInfo || {};
    const orderNumber = `KAV-${Date.now().toString().slice(-6)}`;

    if (!cart.length) {
        navigate("/checkout", { replace: true });
        return null;
    }

    /* ============================
       HELPERS
    ============================ */
    const orderItemsText = cart
        .map(
            item =>
                `• ${item.name} (${item.size || "ONE SIZE"}) x${item.quantity} — R${
                    item.price * item.quantity
                }`
        )
        .join("\n");

    const fullName =
        shipping.firstName && shipping.lastName
            ? `${shipping.firstName} ${shipping.lastName}`
            : userInfo?.name || "Customer";

    const fullAddress = `
${shipping.address || ""}
${shipping.apartment ? ", " + shipping.apartment : ""}
${shipping.city || ""}
${shipping.province || ""}
${shipping.postalCode || ""}
`.trim();

    /* ============================
       SUCCESS SCREEN
    ============================ */
    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="bg-white max-w-md w-full p-8 rounded-xl shadow-lg text-center">
                    <div className="text-green-600 text-4xl mb-4">✓</div>

                    <h2 className="text-xl font-semibold mb-2">
                        Order placed successfully
                    </h2>

                    <p className="text-gray-600 text-sm mb-6">
                        Your order has been received and is pending payment
                        verification. We’ll notify you once it’s confirmed.
                    </p>

                    <div className="bg-gray-100 rounded-lg p-3 text-sm mb-6">
                        <strong>Order number:</strong>
                        <div className="font-mono mt-1">{orderNumber}</div>
                    </div>

                    <button
                        onClick={() => navigate("/orders")}
                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                    >
                        View my orders
                    </button>
                </div>
            </div>
        );
    }

    /* ============================
       SUBMIT HANDLER
    ============================ */
    const handleWhatsAppSubmit = async () => {
        if (submitting) return;

        if (!auth.currentUser) {
            setError("Please log in to place an order.");
            return;
        }

        if (!shipping.address || !shipping.city) {
            setError("Delivery details are missing. Please return to checkout.");
            return;
        }

        try {
            setSubmitting(true);

            const message = `
🧾 *NEW EFT ORDER*

🆔 Order Number: ${orderNumber}

👤 Name: ${fullName}
📧 Email: ${userInfo?.email || "N/A"}
📞 Phone: ${shipping.phone || "N/A"}

📍 *Delivery Address*
${fullAddress || "Not provided"}

🛍 *Order Items*
${orderItemsText}

💰 *Amount Paid*: R${total}
🧾 *Proof*: ${proof ? "Uploaded" : "Pending"}
        `;

            const phone = "27627833498";
            const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

            // WhatsApp FIRST
            window.open(whatsappUrl, "_blank");

            const orderData = {
                userId: auth.currentUser.uid,
                orderNumber,
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    size: item.size || "ONE_SIZE",
                    image: item.image
                })),
                total: Number(total),
                deliveryAddress: {
                    firstName: shipping.firstName || "",
                    lastName: shipping.lastName || "",
                    phone: shipping.phone || "",
                    address: shipping.address || "",
                    apartment: shipping.apartment || "",
                    city: shipping.city || "",
                    province: shipping.province || "",
                    postalCode: shipping.postalCode || ""
                },
                proofName: proof?.name || null,
                status: "pending",
                createdAt: serverTimestamp()
            };

            await addDoc(collection(db, "orders"), orderData);

            clearCart();
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    /* ============================
       PAGE UI
    ============================ */
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

                {/* ORDER SUMMARY */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                    {cart.map(item => (
                        <div
                            key={`${item.id}-${item.size || "ONE_SIZE"}`}
                            className="flex justify-between mb-2 text-sm"
                        >
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
                    <div className="bg-gray-100 rounded-lg p-4 mb-4 text-sm space-y-2">
                        <p className="font-semibold">Banking Details</p>

                        <div className="flex justify-between">
                            <span>Bank:</span>
                            <span>Capitec Bank</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Account Name:</span>
                            <span>Kavanti</span>
                        </div>

                        <div className="flex items-center justify-between gap-2 overflow-x-auto">
                            <span className="shrink-0">Account Number:</span>
                            <div className="flex items-center gap-2 whitespace-nowrap">
                                <span className="font-mono text-sm sm:text-base whitespace-nowrap">
                                    1197460347
                                </span>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText("1197460347");
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 2000);
                                    }}
                                    className="text-xs px-2 py-1 border rounded hover:bg-gray-200"
                                >
                                    {copied ? "Copied ✓" : "Copy"}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <span>Reference:</span>
                            <span className="font-semibold">{orderNumber}</span>
                        </div>
                    </div>

                    {/* OPTIONAL PROOF */}
                    <div className="mb-3">
                        <label className="block text-sm font-semibold mb-1">
                            Upload Proof of Payment (optional)
                        </label>
                        <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) => setProof(e.target.files[0])}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

                    <button
                        disabled={submitting}
                        type="button"
                        onClick={handleWhatsAppSubmit}
                        className={`w-full mt-4 py-3 rounded-sm font-semibold transition ${
                            submitting
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-black text-white hover:bg-gray-800"
                        }`}
                    >
                        {submitting ? "Processing..." : "I Have Paid – Send via WhatsApp"}
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
