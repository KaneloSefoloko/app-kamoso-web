import React, { useEffect, useState } from "react";

const categories = [
    { title: "TOPS", items: ["T-Shirts", "Hoodies", "Long Sleeves"] },
    { title: "BOTTOMS", items: ["Oversize Pants", "Shorts"] },
    { title: "ACCESSORIES", items: ["Hats", "Bags", "Sunglasses"] },
    { title: "NEW RELEASES", items: ["Latest Drops", "Trending Items"] },
];

const products = [
    { id: 1, name: "Black Heavy Tee", price: 499, image: "/assets/product1.jpg", createdAt: "2025-11-30" },
    { id: 2, name: "Olive Cargo Pants", price: 899, image: "/assets/product2.jpg", createdAt: "2025-11-29" },
    { id: 3, name: "White Logo Hoodie", price: 799, image: "/assets/product3.jpg", createdAt: "2025-11-28" },
    { id: 4, name: "Oversized Track Jacket", price: 1299, image: "/assets/product4.jpg", createdAt: "2025-11-27" },
    { id: 5, name: "Black Puffer Vest", price: 1199, image: "/assets/product5.jpg", createdAt: "2025-11-26" },
    { id: 6, name: "Grey Sweatpants", price: 699, image: "/assets/product6.jpg", createdAt: "2025-11-25" },
];

const New = () => {
    const [sortBy, setSortBy] = useState("newest");
    const [sortedProducts, setSortedProducts] = useState(products);

    // Sort products whenever `sortBy` changes
    useEffect(() => {
        let updated = [...products];

        if (sortBy === "priceLowHigh") {
            updated.sort((a, b) => a.price - b.price);
        } else if (sortBy === "priceHighLow") {
            updated.sort((a, b) => b.price - a.price);
        } else if (sortBy === "newest") {
            updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setSortedProducts(updated);
    }, [sortBy]);

    return (
        <div className="pt-20 md:pt-40 px-4 md:px-10 lg:px-20 text-white bg-black font-sans md:font-serif">

            {/* --------------------- HERO SECTION --------------------- */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 mb-16">
                {/* LEFT HERO IMAGE */}
                <div className="w-full h-[400px] md:h-[500px] rounded flex items-center justify-center overflow-hidden">
                    <img
                        src="/assets/yourself.jpeg"
                        className="max-h-full max-w-full object-contain"
                        alt=""
                    />
                </div>

                {/* RIGHT CATEGORIES */}
                <div className="md:col-span-2 flex flex-col justify-center mt-4 md:mt-0">
                    <h1 className="text-2xl font-light tracking-wide mb-6">NEW ARRIVALS</h1>
                    <div className="grid grid-cols-2 gap-6">
                        {categories.map((cat, i) => (
                            <div key={i}>
                                <h3 className="font-semibold mb-3 tracking-wide">{cat.title}</h3>
                                <ul className="space-y-2 text-gray-100">
                                    {cat.items.map((item, j) => (
                                        <li key={j} className="cursor-pointer hover:text-yellow-500 transition">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --------------------- SORT BAR --------------------- */}
            <div className="flex justify-between items-center border-b pb-4 mb-8">
                <p className="text-gray-100">{sortedProducts.length} Products</p>

                <select
                    className="border p-2 rounded text-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="newest">Newest</option>
                    <option value="priceLowHigh">Price: Low to High</option>
                    <option value="priceHighLow">Price: High to Low</option>
                </select>
            </div>

            {/* --------------------- PRODUCT GRID --------------------- */}
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {sortedProducts.map((product) => (
                    <div key={product.id} className="group relative cursor-pointer">

                        {/* Product Image */}
                        <div className="overflow-hidden rounded-md">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>

                        {/* Quick Add Button */}
                        <button
                            className="
                                absolute bottom-0 left-0 right-0 opacity-0
                                group-hover:opacity-100 transition
                                bg-white text-black py-2 text-sm
                            "
                        >
                            QUICK ADD
                        </button>

                        {/* Product Title */}
                        <h3 className="mt-3 text-sm font-medium tracking-wide">{product.name}</h3>
                        <p className="text-gray-100">R{product.price}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default New;