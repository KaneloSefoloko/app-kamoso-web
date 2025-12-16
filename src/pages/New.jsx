import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../components/CartContext.jsx";
import { products } from "../data/products";
import {FiShoppingCart} from "react-icons/fi";

const categories = [
    { title: "TOPS", items: ["t-shirts", "hoodies", "long-sleeves"] },
    { title: "BOTTOMS", items: ["oversize-pants", "shorts"] },
    { title: "ACCESSORIES", items: ["hats", "bags", "sunglasses"] },
    { title: "NEW RELEASES", items: ["trending-items"] },
];

const New = () => {
    const { addToCart } = useContext(CartContext);

    const [sortBy, setSortBy] = useState("newest");
    const [baseProducts, setBaseProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);

    const handleQuickAdd = (product) => {
        // Multi-size → go to product page
        if (product.sizes?.length > 1) {
            window.location.href = `/products/${product.slug}`;
            return;
        }

        // One-size OR single-size product
        addToCart({
            ...product,
            size:
                product.size ??
                product.sizes?.[0] ??
                "ONE_SIZE",
            quantity: 1,
        });
    };



    useEffect(() => {
        const grouped = products.reduce((acc, product) => {
            if (!acc[product.category]) acc[product.category] = [];
            acc[product.category].push(product);
            return acc;
        }, {});

        const newestPerCategory = Object.values(grouped).map((items) =>
            [...items].sort(
                (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
            )[0]
        );

        setBaseProducts(newestPerCategory);
        setDisplayedProducts(newestPerCategory);
    }, []);

    useEffect(() => {
        let sorted = [...baseProducts];

        if (sortBy === "priceLowHigh") {
            sorted.sort((a, b) => a.price - b.price);
        }

        if (sortBy === "priceHighLow") {
            sorted.sort((a, b) => b.price - a.price);
        }

        if (sortBy === "newest") {
            sorted.sort(
                (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
            );
        }

        setDisplayedProducts(sorted);
    }, [sortBy, baseProducts]);

    return (
        <div className="pt-20 md:pt-40 px-4 md:px-10 lg:px-20 text-gray-300 bg-black md:font-light">

            {/* --------------------- HERO SECTION --------------------- */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 mb-16">

                {/* HERO IMAGE */}
                <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
                    <img
                        src="/assets/yourself.jpeg"
                        className="max-h-full max-w-full object-contain"
                        alt="New arrivals"
                    />
                </div>

                {/* CATEGORY LIST */}
                <div className="md:col-span-2 flex flex-col justify-center mt-4 md:mt-0">
                    <h1 className="text-lg font-light tracking-wide mb-6">
                        NEW ARRIVALS
                    </h1>

                    <div className="grid grid-cols-2 gap-6">
                        {categories.map((cat, i) => (
                            <div key={i}>
                                <h3 className="text-sm font-semibold mb-3 tracking-wide">
                                    {cat.title}
                                </h3>

                                <ul className="text-sm space-y-2 text-gray-300 font-light">
                                    {cat.items.map((item) => (
                                        <li key={item}>
                                            <Link
                                                to={`/category/${item}`}
                                                className="hover:text-yellow-500 transition"
                                            >
                                                {item.replace(/-/g, " ")}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --------------------- SORT BAR --------------------- */}
            <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-8">
                <p className="text-md text-gray-300">
                    {displayedProducts.length} Products
                </p>

                <select
                    className="border p-2 rounded text-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="newest">Newest</option>
                    <option value="priceLowHigh">Price: Low → High</option>
                    <option value="priceHighLow">Price: High → Low</option>
                </select>
            </div>

            {/* --------------------- PRODUCT GRID --------------------- */}
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {displayedProducts.map(product => (
                    <div key={product.id} className="group relative cursor-pointer">

                        {/* IMAGE WRAPPER */}
                        <div className="relative overflow-hidden pb-12">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96
                       object-cover transition-transform duration-300
                       group-hover:scale-105"
                            />

                            {/* 🛒 MOBILE CART ICON */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleQuickAdd(product);
                                }}
                                className="md:hidden absolute bottom-3 right-3
                                           bg-yellow-400 text-black p-3 rounded-sm shadow-md
                                           active:scale-95 transition "
                                aria-label="Add to cart"
                            >
                                <FiShoppingCart size={18} />
                            </button>

                            {/* 🖥 DESKTOP QUICK ADD */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleQuickAdd(product);
                                }}
                                className=" hidden md:block absolute bottom-0 left-0 right-0
                                            bg-white text-black py-2 text-sm
                                            opacity-0 group-hover:opacity-100 transition"
                            >
                                QUICK ADD
                            </button>
                        </div>

                        {/* INFO */}
                        <h3 className="mt-3 text-sm font-medium tracking-wide">
                            {product.name}
                        </h3>
                        <p className="text-gray-300 mb-6">R{product.price}</p>

                    </div>
                ))}
            </section>
        </div>
    );
};

export default New;