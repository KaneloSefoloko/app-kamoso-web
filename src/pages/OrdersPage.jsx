import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
    collection,
    query,
    where,
    onSnapshot
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubOrders = null;

        const unsubAuth = onAuthStateChanged(auth, user => {
            if (!user) {
                setOrders([]);
                setLoading(false);
                return;
            }

            const q = query(
                collection(db, "orders"),
                where("userId", "==", user.uid)
            );

            unsubOrders = onSnapshot(q, snap => {
                const data = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setOrders(data);
                setLoading(false);
            });
        });

        return () => {
            unsubAuth();
            if (unsubOrders) unsubOrders();
        };
    }, []);

    if (loading) {
        return <p className="text-gray-500">Loading orders...</p>;
    }

    if (!orders.length) {
        return <p className="text-gray-500">You haven’t placed any orders yet.</p>;
    }

    return (
        <div className="min-h-screen bg-[#f6f6f3] px-4 py-10">

            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <div className="mb-10">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">
                        Account
                    </p>

                    <h1 className="text-4xl font-semibold tracking-tight">
                        Your Orders
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Track and review your recent purchases.
                    </p>
                </div>

                {/* LOADING */}
                {loading && (
                    <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center">
                        <p className="text-gray-500">
                            Loading orders...
                        </p>
                    </div>
                )}

                {/* EMPTY STATE */}
                {!loading && !orders.length && (
                    <div className="bg-white border border-gray-200 rounded-3xl p-14 text-center">

                        <div className="w-20 h-20 rounded-full bg-[#f3f3f3] flex items-center justify-center mx-auto mb-6">
                            <span className="text-3xl">🛍</span>
                        </div>

                        <h2 className="text-2xl font-semibold mb-3">
                            No orders yet
                        </h2>

                        <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                            Once you place your first order, it will appear here.
                        </p>
                    </div>
                )}

                {/* ORDERS */}
                {!loading && orders.length > 0 && (
                    <div className="space-y-6">

                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white border border-gray-200 rounded-3xl overflow-hidden"
                            >

                                {/* TOP BAR */}
                                <div className="border-b border-gray-100 px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                    <div>
                                        <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-2">
                                            Order Number
                                        </p>

                                        <h2 className="text-xl font-semibold tracking-tight">
                                            {order.orderNumber}
                                        </h2>
                                    </div>

                                    {/* STATUS */}
                                    <div
                                        className={`px-4 py-2 rounded-full text-sm font-medium w-fit ${
                                            order.status === "pending"
                                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                                : order.status === "completed"
                                                    ? "bg-green-50 text-green-700 border border-green-200"
                                                    : "bg-gray-100 text-gray-700 border border-gray-200"
                                        }`}
                                    >
                                        {order.status}
                                    </div>
                                </div>

                                {/* BODY */}
                                <div className="p-8">

                                    {/* ITEMS */}
                                    <div className="space-y-5">
                                        {(order.items || []).map((item, i) => (
                                            <div
                                                key={i}
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

                                                    <div className="text-right">
                                                        <p className="font-semibold">
                                                            R
                                                            {item.price *
                                                                item.quantity}
                                                        </p>

                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Qty {item.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* FOOTER */}
                                    <div className="border-t border-gray-100 mt-8 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Total Amount
                                            </p>

                                            <p className="text-3xl font-semibold tracking-tight mt-1">
                                                R{order.total}
                                            </p>
                                        </div>

                                        <div className="text-sm text-gray-500">
                                            {order.createdAt?.seconds
                                                ? new Date(
                                                    order.createdAt.seconds *
                                                    1000
                                                ).toLocaleDateString()
                                                : "Recently placed"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;