import React, { useState, useEffect } from "react";
import { db } from "../../../firebase.js";
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";

const ProductsManager = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const snap = await getDocs(collection(db, "products"));

            setProducts(
                snap.docs.map(d => ({
                    id: d.id,
                    ...d.data()
                }))
            );
        } catch (err) {
            console.error("Products fetch error:", err);
            setError("Failed to load products. Check Firestore rules.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "products", id));
            fetchProducts();
        } catch (err) {
            console.error("Delete error:", err);
            setError("Failed to delete product.");
        }
    };

    if (loading) {
        return (
            <div className="p-6 text-gray-500">
                Loading products...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-red-600">
                {error}
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Products</h1>

            {products.length === 0 ? (
                <p className="text-gray-500">No products found.</p>
            ) : (
                <div className="space-y-3">
                    {products.map((p) => (
                        <div key={p.id} className="border p-3 flex justify-between">
                            <div>
                                <p className="font-semibold">{p.name}</p>
                                <p className="text-sm text-gray-500">R{p.price}</p>
                            </div>

                            <button
                                onClick={() => handleDelete(p.id)}
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsManager;