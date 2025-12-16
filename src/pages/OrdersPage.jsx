import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const q = query(
                collection(db, "orders"),
                where("userId", "==", auth.currentUser.uid),
                orderBy("createdAt", "desc")
            );

            const snapshot = await getDocs(q);
            setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <p className="text-gray-500">Loading orders...</p>;
    }

    if (!orders.length) {
        return <p className="text-gray-500">You haven’t placed any orders yet.</p>;
    }

    return (
        <div>
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

                        <p className="text-sm text-gray-600 mb-2">
                            Total: <strong>R{order.total}</strong>
                        </p>

                        <ul className="text-sm text-gray-600">
                            {order.items.map((item, i) => (
                                <li key={i}>
                                    {item.name} × {item.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;
