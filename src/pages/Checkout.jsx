import React, {useState, useContext, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CartContext } from "../components/CartContext";
import {FiChevronDown} from "react-icons/fi";

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
    const provinces = [
        "Gauteng",
        "Western Cape",
        "KwaZulu-Natal",
        "Eastern Cape",
        "Limpopo",
        "North West",
        "Northern Cape",
        "Free State",
        "Mpumalanga",
    ];

    const [provinceOpen, setProvinceOpen] = useState(false);
    const provinceRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (provinceRef.current && !provinceRef.current.contains(e.target)) {
                setProvinceOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const deliveryFee = subtotal >= 900 ? 0 : 90;
    const total = subtotal + deliveryFee;

    const handleProceedToPayment = () => {
        if (!cart.length) return;

        if (!firstName || !lastName || !address || !city || !postalCode || !phone) {
            setError("Please fill in all required fields.");
            return;
        }

        saveCheckoutInfo({
            cart,
            subtotal,
            deliveryFee,
            total,
            shipping: {
                firstName,
                lastName,
                address,
                apartment,
                city,
                province,
                postalCode,
                phone
            },
            userInfo: {
                name: user?.displayName || "",
                email: user?.email || ""
            },
        });

        navigate("/pay");
    };

    if (!user) {
        navigate("/signup", { replace: true });
        return null;
    }

    return (
        <div className="min-h-screen bg-[#f6f6f3] py-10 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-6">

                {/* LEFT - FORM */}
                <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-10">

                    {/* HEADER */}
                    <div className="mb-10">
                        <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-2">
                            Secure Checkout
                        </p>

                        <h2 className="text-3xl font-semibold tracking-tight text-black">
                            Delivery Details
                        </h2>
                    </div>

                    <form
                        className="space-y-5"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        {/* NAME */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-[#fafafa] outline-none focus:border-black transition"
                            />

                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-[#fafafa] outline-none focus:border-black transition"
                            />
                        </div>

                        {/* ADDRESS */}
                        <input
                            type="text"
                            placeholder="Street Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-[#fafafa] outline-none focus:border-black transition"
                        />

                        <input
                            type="text"
                            placeholder="Apartment, suite, etc. (optional)"
                            value={apartment}
                            onChange={(e) => setApartment(e.target.value)}
                            className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-[#fafafa] outline-none focus:border-black transition"
                        />

                        {/* CITY / PROVINCE / POSTAL */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-[#fafafa] outline-none focus:border-black transition"
                            />

                            <div className="relative" ref={provinceRef}>
                                {/* BUTTON */}
                                <button
                                    type="button"
                                    onClick={() => setProvinceOpen((p) => !p)}
                                    className="
            w-full h-14 px-5
            rounded-2xl border border-gray-200
            bg-[#fafafa]
            text-left
            flex items-center justify-between
            outline-none focus:border-black transition
        "
                                >
                                    <span>{province}</span>

                                    <FiChevronDown
                                        className={`text-gray-400 transition-transform duration-200 ${
                                            provinceOpen ? "rotate-180" : "rotate-0"
                                        }`}
                                    />
                                </button>

                                {/* DROPDOWN */}
                                {provinceOpen && (
                                    <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
                                        {provinces.map((p) => (
                                            <button
                                                key={p}
                                                type="button"
                                                onClick={() => {
                                                    setProvince(p);
                                                    setProvinceOpen(false);
                                                }}
                                                className={`w-full text-left px-5 py-3 text-sm hover:bg-gray-50 transition ${
                                                    province === p ? "bg-gray-100 font-medium" : ""
                                                }`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <input
                                type="text"
                                placeholder="Postal Code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-[#fafafa] outline-none focus:border-black transition"
                            />
                        </div>

                        {/* PHONE */}
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-[#fafafa] outline-none focus:border-black transition"
                        />

                        {/* ERROR */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm">
                                {error}
                            </div>
                        )}

                        {/* BUTTON */}
                        <button
                            type="button"
                            onClick={handleProceedToPayment}
                            disabled={!cart.length}
                            className={`w-full h-14 mt-6 rounded-2xl text-sm font-medium tracking-wide transition-all duration-300 ${
                                cart.length
                                    ? "bg-black text-white hover:opacity-90"
                                    : "bg-gray-200 text-gray-400"
                            }`}
                        >
                            Proceed to Payment • R{total}
                        </button>
                    </form>
                </div>

                {/* RIGHT - SUMMARY */}
                <div className="bg-white rounded-3xl border border-gray-200 p-8 h-fit sticky top-6">

                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-2">
                                Summary
                            </p>

                            <h3 className="text-2xl font-semibold">
                                Your Order
                            </h3>
                        </div>

                        <span className="text-sm text-gray-500">
                        {cart.length} items
                    </span>
                    </div>

                    {/* ITEMS */}
                    <div className="space-y-5">
                        {cart.map((item) => {
                            const image =
                                item.image ||
                                item.variant?.image ||
                                item.variants?.[0]?.image ||
                                "/placeholder.png";

                            return (
                                <div
                                    key={`${item.slug || item.id || item.name}-${item.size || "ONE_SIZE"}`}
                                    className="flex gap-4"
                                >
                                    {/* IMAGE */}
                                    <div className="relative">
                                        <img
                                            src={image}
                                            alt={item.name}
                                            className="w-24 h-28 object-cover rounded-2xl bg-[#f4f4f4]"
                                        />

                                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center">
                                            {item.quantity}
                                        </div>
                                    </div>

                                    {/* INFO */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="font-medium text-sm md:text-base leading-tight">
                                                    {item.name}
                                                </p>

                                                {item.size && (
                                                    <p className="text-sm text-gray-500 mt-2">
                                                        Size: {item.size}
                                                    </p>
                                                )}

                                                {item.color && (
                                                    <div className="flex items-center gap-2 mt-2">
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

                                            <p className="font-semibold whitespace-nowrap">
                                                R{item.price * item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* TOTALS */}
                    <div className="border-t border-gray-200 mt-8 pt-6 space-y-4">

                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>R{subtotal}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>Delivery</span>

                            <span>
                            {deliveryFee === 0 ? "FREE" : `R${deliveryFee}`}
                        </span>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-lg font-semibold">
                            Total
                        </span>

                            <span className="text-2xl font-semibold">
                            R{total}
                        </span>
                        </div>

                        {deliveryFee === 0 && (
                            <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
                                <p className="text-sm text-green-700">
                                    Free delivery unlocked 🎉
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;