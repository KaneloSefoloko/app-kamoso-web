import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot
} from "firebase/firestore";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, "orders"),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
        );

        const unsub = onSnapshot(
            q,
            (snap) => {
                const data = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setOrders(data);
                setLoading(false);
            },
            (error) => {
                console.error("Orders fetch error:", error);
                setLoading(false);
            }
        );

        return () => unsub();
    }, []);

    if (loading) {
        return <p className="text-gray-500">Loading orders...</p>;
    }

    if (!orders.length) {
        return <p className="text-gray-500">You haven’t placed any orders yet.</p>;
    }

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-xl font-bold mb-6">Your Orders</h1>

            <div className="space-y-4">
                {orders.map(order => (
                    <div
                        key={order.id}
                        className="border rounded-lg p-4 bg-white shadow-sm"
                    >
                        <div className="flex justify-between mb-2">
              <span className="font-semibold">
                {order.orderNumber}
              </span>
                            <span className="text-sm text-yellow-600 capitalize">
                {order.status}
              </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">
                            Total: <strong>R{order.total}</strong>
                        </p>

                        <div className="space-y-1">
                            {order.items?.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between text-sm text-gray-600"
                                >
                  <span>
                    {item.name} ({item.size}) × {item.quantity}
                  </span>
                                    <span>
                    R{item.price * item.quantity}
                  </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;