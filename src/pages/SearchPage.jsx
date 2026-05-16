import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

import ProductCard from "../components/ProductCard";

const SearchPage = () => {
    const { search } = useLocation();

    const query =
        new URLSearchParams(search)
            .get("q")
            ?.toLowerCase() || "";

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    /* FETCH PRODUCTS */
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const snap = await getDocs(
                    collection(db, "products")
                );

                const data = snap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setProducts(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    /* SEARCH RESULTS */
    const results = products.filter((product) => {
        return (
            product.name
                ?.toLowerCase()
                .includes(query) ||

            product.category
                ?.toLowerCase()
                .includes(query) ||

            product.description
                ?.toLowerCase()
                .includes(query)
        );
    });

    return (
        <div className="pt-32 px-4 max-w-7xl mx-auto min-h-screen">

            <h1 className="text-2xl font-semibold mb-6">
                Search results for "{query}"
            </h1>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-[320px] rounded-2xl bg-gray-100 animate-pulse"
                        />
                    ))}
                </div>
            ) : results.length === 0 ? (
                <p className="text-gray-500">
                    No products found.
                </p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {results.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;