import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.js";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import ComingSoonHero from "../components/ComingSoonHero";

/* ---------------- NORMALIZE ---------------- */
const normalize = (str) =>
    str?.toLowerCase().replace(/&/g, "-").replace(/\s+/g, "-");

const CategoryPage = () => {
    const { category } = useParams();

    const [products, setProducts] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    const [filters, setFilters] = useState({
        size: "",
        color: "",
        price: "",
    });

    /* ---------------- FETCH ---------------- */
    useEffect(() => {
        const fetchProducts = async () => {
            const snap = await getDocs(collection(db, "products"));
            const data = snap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(data);
        };

        fetchProducts();
    }, []);

    /* ---------------- BASE CATEGORY ---------------- */
    const baseProducts = useMemo(() => {
        return products.filter(
            (p) => normalize(p.category) === normalize(category)
        );
    }, [products, category]);

    /* ---------------- FILTER OPTIONS ---------------- */
    const filterOptions = useMemo(() => {
        const sizes = new Set();
        const colors = new Set();

        baseProducts.forEach((p) => {
            p.sizes?.forEach((s) => sizes.add(s));

            p.variants?.forEach((v) => {
                if (v.color?.value) {
                    colors.add(v.color.value.toLowerCase());
                }
            });

            if (p.color) {
                colors.add(p.color.toLowerCase());
            }
        });

        return {
            sizes: [...sizes].filter(Boolean),
            colors: [...colors].filter(Boolean),
        };
    }, [baseProducts]);

    const resolveSize = (product, selectedSize) => {
        if (product.category?.toLowerCase() === "wig") {
            const match = product.sizes?.find((s) => s.size === selectedSize);
            return match || product.sizes?.[0];
        }

        return selectedSize || product.sizes?.[0] || "ONE_SIZE";
    };

    useEffect(() => {
        const isWig = normalize(category).includes("wig");

        if (!isWig) return;

        if (baseProducts.length === 0) return;

        const firstWig = baseProducts.find(
            (p) => p.category?.toLowerCase() === "wig"
        );

        const defaultSize =
            firstWig?.sizes?.[0]?.size ||
            firstWig?.sizes?.[0] ||
            "";

        if (defaultSize) {
            setFilters((prev) => ({
                ...prev,
                size: defaultSize,
            }));
        }
    }, [category, baseProducts]);

    /* ---------------- APPLY FILTERS ---------------- */
    const filteredProducts = useMemo(() => {
        let temp = [...baseProducts];

        if (filters.size) {
            temp = temp.filter((p) =>
                p.sizes?.some((s) => {
                    const sizeValue = typeof s === "object" ? s.size : s;
                    return sizeValue === filters.size;
                })
            );
        }

        if (filters.color) {
            temp = temp.filter(
                (p) =>
                    p.variants?.some(
                        (v) =>
                            v.color?.value?.toLowerCase() ===
                            filters.color.toLowerCase()
                    ) ||
                    p.color?.toLowerCase() === filters.color.toLowerCase()
            );
        }

        if (filters.price) {
            temp = temp.filter(
                (p) => Number(p.price) <= Number(filters.price)
            );
        }

        return temp;
    }, [baseProducts, filters]);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="bg-white text-black min-h-screen antialiased">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* TITLE */}
                <h1 className="text-2xl md:text-4xl font-light tracking-[0.25em] uppercase mb-10">
                    {category?.replace(/-/g, " ")} Collection
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* ================= FILTERS ================= */}
                    <aside className="
                        lg:col-span-3
                        bg-white
                        border border-gray-100
                        rounded-2xl
                        p-5 sm:p-6
                        h-fit
                        lg:sticky lg:top-24
                        shadow-sm
                    ">

                        {/* MOBILE HEADER */}
                        <div className="flex items-center justify-between mb-4 lg:hidden">
                            <h2 className="text-xs uppercase tracking-widest text-gray-500">
                                Filters
                            </h2>

                            <button
                                onClick={() => setShowFilters((p) => !p)}
                                className="text-xs px-3 py-1 border rounded-full"
                            >
                                {showFilters ? "Close" : "Filter"}
                            </button>
                        </div>

                        {/* FILTER CONTENT */}
                        <div className="lg:block">

                            {/* MOBILE TOGGLED CONTENT */}
                            <div className={`${showFilters ? "block" : "hidden"} lg:block space-y-5`}>

                                {/* SIZE */}
                                <select
                                    name="size"
                                    onChange={handleFilterChange}
                                    className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm"
                                >
                                    <option value="">All Sizes</option>
                                    {filterOptions.sizes.map((size) => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>

                                {/* COLOR */}
                                <select
                                    name="color"
                                    onChange={handleFilterChange}
                                    className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm"
                                >
                                    <option value="">All Colors</option>
                                    {filterOptions.colors.map((color) => (
                                        <option key={color} value={color}>{color}</option>
                                    ))}
                                </select>

                                {/* PRICE */}
                                <input
                                    name="price"
                                    type="number"
                                    placeholder="Max price"
                                    onChange={handleFilterChange}
                                    className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm"
                                />
                            </div>
                        </div>
                    </aside>

                    {/* ================= PRODUCTS ================= */}
                    <main className="lg:col-span-9">

                        {filteredProducts.length === 0 ? (
                            <ComingSoonHero />
                        ) : (
                            <div className="
                                grid grid-cols-2
                                sm:grid-cols-2
                                md:grid-cols-3
                                xl:grid-cols-4
                                gap-6
                            ">
                                {filteredProducts.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </main>

                </div>
            </div>
        </div>
    );
};

export default CategoryPage;