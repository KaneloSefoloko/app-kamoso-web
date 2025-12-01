import React from "react";
import CategoriesSidebar from "./CategoriesSidebar";

const demoProducts = [
    // Replace these with real data
    { id: 1, name: "Leather Belt", price: "R450", image: "/assets/accessories/belt.webp" },
    { id: 2, name: "Snapback Cap", price: "R350", image: "/assets/accessories/cap.webp" },
    { id: 3, name: "Sunglasses", price: "R600", image: "/assets/accessories/sunglasses.webp" },
    { id: 4, name: "Wristband", price: "R150", image: "/assets/accessories/wristband.webp" },
    // ... more
];

const AccessoriesPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <CategoriesSidebar />

            <main className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6">Accessories</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {demoProducts.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition">
                            <div className="relative overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                <p className="text-gray-600 mt-2">{item.price}</p>
                                <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AccessoriesPage;