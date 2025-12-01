// src/pages/CategoryPage.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Your Firebase setup
import ProductCard from '../components/ProductCard'; // The ProductCard you already have

const CategoryPage = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        size: '',
        color: '',
        price: ''
    });

    // Fetch products from Firestore
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, category));
                const fetchedProducts = querySnapshot.docs.map(doc => doc.data());
                setProducts(fetchedProducts);
                setFilteredProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [category]);

    // Filter products based on selected filters
    useEffect(() => {
        let tempFilteredProducts = [...products];

        if (filters.size) {
            tempFilteredProducts = tempFilteredProducts.filter(
                product => product.size.includes(filters.size)
            );
        }

        if (filters.color) {
            tempFilteredProducts = tempFilteredProducts.filter(
                product => product.color === filters.color
            );
        }

        if (filters.price) {
            tempFilteredProducts = tempFilteredProducts.filter(
                product => product.price <= filters.price
            );
        }

        setFilteredProducts(tempFilteredProducts);
    }, [filters, products]);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="category-page container mx-auto py-10">
            <div className="grid grid-cols-12 gap-6">
                {/* Filter Sidebar */}
                <div className="col-span-3 p-4 bg-gray-50 rounded-lg shadow-md">
                    <h2 className="text-lg font-bold mb-4">Filters</h2>

                    {/* Size Filter */}
                    <label htmlFor="size" className="block mb-2">Size</label>
                    <select
                        id="size"
                        name="size"
                        className="w-full border p-2 mb-4"
                        onChange={handleFilterChange}
                        value={filters.size}
                    >
                        <option value="">All Sizes</option>
                        <option value="S">Small</option>
                        <option value="M">Medium</option>
                        <option value="L">Large</option>
                        <option value="XL">XL</option>
                    </select>

                    {/* Color Filter */}
                    <label htmlFor="color" className="block mb-2">Color</label>
                    <select
                        id="color"
                        name="color"
                        className="w-full border p-2 mb-4"
                        onChange={handleFilterChange}
                        value={filters.color}
                    >
                        <option value="">All Colors</option>
                        <option value="Black">Black</option>
                        <option value="White">White</option>
                        <option value="Red">Red</option>
                    </select>

                    {/* Price Filter */}
                    <label htmlFor="price" className="block mb-2">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        className="w-full border p-2 mb-4"
                        onChange={handleFilterChange}
                        value={filters.price}
                        placeholder="Max Price"
                    />
                </div>

                {/* Product Grid */}
                <div className="col-span-9">
                    <h1 className="text-2xl font-bold mb-4">{category} Collection</h1>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <p>No products available for the selected filters.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
