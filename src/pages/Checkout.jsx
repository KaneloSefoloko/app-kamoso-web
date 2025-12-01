import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust path if needed
import {CartContext} from "../components/CartContext";

const Checkout = () => {
    const { user } = useAuth();
    const { cart, saveCheckoutInfo } = useContext(CartContext);
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState(user?.displayName?.split(" ")[0] || "");
    const [lastName, setLastName] = useState(user?.displayName?.split(" ")[1] || "");
    const [address, setAddress] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("Gauteng");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleProceedToPayment = () => {
        if (!cart.length) return;
        if (!firstName || !lastName || !address || !city || !postalCode || !phone) {
            setError("Please fill in all required fields.");
            return;
        }

        saveCheckoutInfo({
            cart,
            total,
            shipping: { firstName, lastName, address, apartment, city, province, postalCode, phone },
            userInfo: { name: user?.displayName || "", email: user?.email || "" },
        });

        navigate("/pay");
    };

    if (!user) {
        navigate("/signup", { replace: true });
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden md:flex">
                {/* Left: Form */}
                <div className="w-full md:w-2/3 p-8 space-y-6">
                    <h2 className="text-2xl font-semibold">Delivery Details</h2>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        {/* Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <input
                            type="text"
                            placeholder="Apartment, suite, etc. (optional)"
                            value={apartment}
                            onChange={(e) => setApartment(e.target.value)}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                            <select
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            >
                                <option>Gauteng</option>
                                <option>Western Cape</option>
                                <option>KwaZulu-Natal</option>
                                <option>Other</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Postal Code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />

                        {error && <p className="text-red-600">{error}</p>}

                        <button
                            type="button"
                            onClick={handleProceedToPayment}
                            disabled={cart.length === 0}
                            className={`w-full py-3 mt-4 font-semibold rounded-lg transition ${
                                cart.length > 0
                                    ? "bg-black text-white hover:bg-gray-800"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        >
                            Proceed to Payment (R{total})
                        </button>
                    </form>
                </div>

                {/* Right: Order Summary */}
                <div className="w-full md:w-1/3 bg-gray-100 p-6 border-l border-gray-200">
                    <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                <div className="ml-4 flex-1">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-gray-600">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-semibold">R{item.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-300 mt-6 pt-4">
                        <p className="text-gray-700 mb-2">Total:</p>
                        <p className="text-2xl font-bold">R{total}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
