import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import { auth, db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const PaymentPage = () => {
    const { checkoutInfo, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [proof, setProof] = useState(null);
    const [error, setError] = useState("");

    const {
        cart = [],
        subtotal = 0,
        deliveryFee = 0,
        total = 0,
        userInfo = {},
        shipping = {},
    } = checkoutInfo || {};

    const orderNumber = `KAV-${Date.now().toString().slice(-6)}`;

    if (!cart.length) {
        navigate("/checkout", { replace: true });
        return null;
    }

    const orderItemsText = cart
        .map(
            (item) =>
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

    /* SUCCESS SCREEN */
    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="bg-white max-w-md w-full p-8 rounded-xl shadow-lg text-center">
                    <div className="text-green-600 text-4xl mb-4">✓</div>

                    <h2 className="text-xl font-semibold mb-2">
                        Order placed successfully
                    </h2>

                    <p className="text-gray-600 text-sm mb-6">
                        Your order is pending payment verification.
                    </p>

                    <div className="bg-gray-100 rounded-lg p-3 text-sm mb-6">
                        <strong>Order number:</strong>
                        <div className="font-mono mt-1">{orderNumber}</div>
                    </div>

                    <button
                        onClick={() => navigate("/orders")}
                        className="w-full bg-black text-white py-2 rounded"
                    >
                        View my orders
                    </button>
                </div>
            </div>
        );
    }

    /* CLEAN OBJECT (prevents Firestore crash) */
    const clean = (obj) =>
        JSON.parse(JSON.stringify(obj, (k, v) => (v === undefined ? null : v)));

    /* SUBMIT */
    const handleWhatsAppSubmit = async () => {
        if (submitting) return;

        if (!auth.currentUser) {
            setError("Please log in to place an order.");
            return;
        }

        if (!shipping.address || !shipping.city) {
            setError("Delivery details are missing.");
            return;
        }

        try {
            setSubmitting(true);

            const message = `
🧾 *NEW EFT ORDER*

🆔 Order: ${orderNumber}

👤 ${fullName}
📧 ${userInfo?.email || "N/A"}
📞 ${shipping.phone || "N/A"}

📍 Address:
${fullAddress}

🛍 Items:
${orderItemsText}

💰 Total: R${total}
            `;

            window.open(
                `https://wa.me/27627833498?text=${encodeURIComponent(message)}`,
                "_blank"
            );

            await addDoc(
                collection(db, "orders"),
                clean({
                    userId: auth.currentUser.uid,
                    orderNumber,
                    subtotal,
                    deliveryFee,
                    total,

                    items: cart.map((item) => ({
                        id: item.id || null,
                        slug: item.slug || "",
                        name: item.name || "Item",
                        price: item.price || 0,
                        quantity: item.quantity || 1,
                        size: item.size || "ONE_SIZE",
                        image: item.image || "",
                        color: item.color || null,
                    })),

                    deliveryAddress: shipping,
                    proofName: proof?.name || null,
                    status: "pending",
                    createdAt: serverTimestamp(),
                })
            );

            clearCart();
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError("Something went wrong while placing order.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f6f6f3] px-4 py-10">

            <div className="max-w-6xl mx-auto">

                {/* PAGE HEADER */}
                <div className="mb-10">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">
                        Secure Payment
                    </p>

                    <h1 className="text-4xl font-semibold tracking-tight">
                        Complete Your Order
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">

                    {/* LEFT SIDE */}
                    <div className="space-y-6">

                        {/* ORDER SUMMARY */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-8">

                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-2">
                                        Summary
                                    </p>

                                    <h2 className="text-2xl font-semibold">
                                        Order Details
                                    </h2>
                                </div>

                                <span className="text-sm text-gray-500">
                                {cart.length} items
                            </span>
                            </div>

                            <div className="space-y-5">
                                {cart.map((item) => (
                                    <div
                                        key={`${item.slug}-${item.size}`}
                                        className="flex gap-4"
                                    >
                                        {/* IMAGE */}
                                        <div className="relative">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-24 h-28 rounded-2xl object-cover bg-[#f4f4f4]"
                                            />

                                            <div className="absolute -top-2 -right-2 bg-black text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                                                {item.quantity}
                                            </div>
                                        </div>

                                        {/* INFO */}
                                        <div className="flex-1 flex justify-between gap-4">
                                            <div>
                                                <p className="font-medium text-base leading-tight">
                                                    {item.name}
                                                </p>

                                                <div className="mt-3 space-y-1">
                                                    <p className="text-sm text-gray-500">
                                                        Size: {item.size}
                                                    </p>

                                                    {item.color && (
                                                        <div className="flex items-center gap-2">
                                                        <span className="text-sm text-gray-500">
                                                            Color:
                                                        </span>

                                                            <span
                                                                className="w-3 h-3 rounded-full border border-gray-300"
                                                                style={{
                                                                    backgroundColor:
                                                                        item.color.hex ||
                                                                        item.color.value
                                                                }}
                                                            />

                                                            <span className="text-sm text-gray-600">
                                                            {item.color.name}
                                                        </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <p className="font-semibold whitespace-nowrap">
                                                R{item.price * item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* TOTALS */}
                            <div className="border-t border-gray-200 mt-8 pt-6 space-y-4">

                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span>R{subtotal}</span>
                                </div>

                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Delivery</span>
                                    <span>
                                    {deliveryFee === 0
                                        ? "FREE"
                                        : `R${deliveryFee}`}
                                </span>
                                </div>

                                <div className="flex justify-between pt-4 border-t border-gray-100">
                                <span className="text-lg font-semibold">
                                    Total
                                </span>

                                    <span className="text-2xl font-semibold">
                                    R{total}
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="space-y-6">

                        {/* PAYMENT CARD */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-8 sticky top-6">

                            <div className="mb-8">
                                <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-2">
                                    EFT Payment
                                </p>

                                <h2 className="text-2xl font-semibold">
                                    Bank Transfer
                                </h2>
                            </div>

                            {/* BANK DETAILS */}
                            <div className="bg-[#f8f8f8] border border-gray-200 rounded-2xl p-5 space-y-4">

                                <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    Bank
                                </span>

                                    <span className="font-medium">
                                    Capitec Bank
                                </span>
                                </div>

                                <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    Account Name
                                </span>

                                    <span className="font-medium">
                                    Kavanti
                                </span>
                                </div>

                                <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    Account Number
                                </span>

                                    <span className="font-medium tracking-wide">
                                    1197460347
                                </span>
                                </div>

                                <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">
                                    Payment Reference
                                </span>

                                    <span className="font-semibold">
                                    {orderNumber}
                                </span>
                                </div>
                            </div>

                            {/* NOTICE */}
                            <div className="mt-5 bg-amber-50 border border-amber-200 rounded-2xl p-4">
                                <p className="text-sm text-amber-800 leading-relaxed">
                                    Use your order reference when making payment.
                                    Orders are processed after payment verification.
                                </p>
                            </div>

                            {/* FILE */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium mb-3">
                                    Upload Proof of Payment
                                </label>

                                <label className="w-full h-36 border-2 border-dashed border-gray-300 rounded-2xl bg-[#fafafa] flex flex-col items-center justify-center cursor-pointer hover:border-black transition">
                                <span className="text-sm font-medium">
                                    Choose file
                                </span>

                                    <span className="text-xs text-gray-500 mt-1">
                                    JPG, PNG or PDF
                                </span>

                                    {proof && (
                                        <span className="text-xs mt-3 text-black">
                                        {proof.name}
                                    </span>
                                    )}

                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            setProof(e.target.files[0])
                                        }
                                        className="hidden"
                                    />
                                </label>
                            </div>

                            {/* ERROR */}
                            {error && (
                                <div className="mt-4 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
                                    <p className="text-sm text-red-600">
                                        {error}
                                    </p>
                                </div>
                            )}

                            {/* BUTTON */}
                            <button
                                disabled={submitting}
                                onClick={handleWhatsAppSubmit}
                                className="w-full h-14 rounded-2xl bg-black text-white text-sm font-medium tracking-wide mt-6 hover:opacity-90 transition-opacity duration-300 disabled:opacity-50"
                            >
                                {submitting
                                    ? "Processing Order..."
                                    : "Complete via WhatsApp"}
                            </button>

                            {/* SECURITY TEXT */}
                            <p className="text-xs text-center text-gray-500 mt-4 leading-relaxed">
                                Your order will be confirmed after payment
                                verification.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;