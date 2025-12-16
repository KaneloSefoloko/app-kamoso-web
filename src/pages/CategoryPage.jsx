import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

const CategoryPage = () => {
    const { category } = useParams();
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [filters, setFilters] = useState({
        size: "",
        color: "",
        price: "",
    });

    // Filter by category
    useEffect(() => {
        const filtered = products.filter(
            (p) => p.category && p.category.toLowerCase() === category.toLowerCase()
        );
        setFilteredProducts(filtered);
    }, [category]);

    // Apply filters
    useEffect(() => {
        let temp = products.filter(
            (p) => p.category && p.category.toLowerCase() === category.toLowerCase()
        );

        if (filters.size) temp = temp.filter((p) => p.sizes.includes(filters.size));
        if (filters.color) temp = temp.filter((p) => p.color === filters.color);
        if (filters.price) temp = temp.filter((p) => p.price <= Number(filters.price));

        setFilteredProducts(temp);
    }, [filters, category]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-lg font-bold mb-8 capitalize tracking-tight">
                {category} Collection
            </h1>

            <div className="grid grid-cols-12 gap-6">
                {/* FILTERS */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="col-span-12 md:col-span-3 p-6 bg-gray-50 rounded-xl shadow-md"
                >
                    <h2 className="text-lg font-semibold mb-4">Filters</h2>

                    <div className="flex flex-col space-y-4">
                        <div>
                            <label className="block font-medium mb-1">Size</label>
                            <select
                                name="size"
                                onChange={handleFilterChange}
                                className="w-full border p-2 rounded-lg"
                            >
                                <option value="">All Sizes</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Color</label>
                            <select
                                name="color"
                                onChange={handleFilterChange}
                                className="w-full border p-2 rounded-lg"
                            >
                                <option value="">All Colors</option>
                                <option value="Black">Black</option>
                                <option value="Gray">Gray</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Max Price</label>
                            <input
                                name="price"
                                type="number"
                                placeholder="500"
                                onChange={handleFilterChange}
                                className="w-full border p-2 rounded-lg"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* PRODUCT GRID */}
                <div className="col-span-12 md:col-span-9">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.length ? (
                            filteredProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;