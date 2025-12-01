import React from "react";
import { Link } from "react-router-dom";

const categories = [
    {
        title: "Bags",
        sub: ["All Bags & Purses", "Dome Bags", "Tote Bags", "Crossbody Bags", "Wallets & Card Holders"]
    },
    {
        title: "Sunglasses",
        sub: ["All Sunglasses", "Round Frames", "Square Frames"]
    },
    {
        title: "Hats",
        sub: ["All Hats", "Beanies", "Bucket Hats", "Caps"]
    },
    {
        title: "Jewellery",
        sub: ["All Jewellery", "Bracelets", "Earrings", "Necklaces"]
    },
    {
        title: "Footwear",
        sub: ["All Footwear", "Socks"]
    },
];

const CategoriesSidebar = () => {
    return (
        <aside className="w-full md:w-64 lg:w-72 bg-white border-r border-gray-200 p-4 overflow-y-auto">
            {categories.map((cat) => (
                <div key={cat.title} className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">{cat.title}</h3>
                    <ul className="space-y-1">
                        {cat.sub.map((sub) => (
                            <li key={sub}>
                                <Link
                                    to={`/category/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                                    className="block text-gray-600 hover:text-black hover:font-medium transition"
                                >
                                    {sub}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </aside>
    );
};

export default CategoriesSidebar;