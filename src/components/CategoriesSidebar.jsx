import React from "react";
import { Link } from "react-router-dom";

const categories = [
    {
        title: "Bags",
        sub: [
            { name: "All Bags & Purses", slug: "bags" },
            { name: "Dome Bags", slug: "dome-bags" },
            { name: "Tote Bags", slug: "tote-bags" },
            { name: "Crossbody Bags", slug: "crossbody-bags" },
            { name: "Wallets & Card Holders", slug: "wallets" }
        ]
    },
    {
        title: "Sunglasses",
        sub: [
            { name: "All Sunglasses", slug: "sunglasses" },
            { name: "Round Frames", slug: "round-frames" },
            { name: "Square Frames", slug: "square-frames" }
        ]
    },
    {
        title: "Hats",
        sub: [
            { name: "All Hats", slug: "hats" },
            { name: "Beanies", slug: "beanies" },
            { name: "Bucket Hats", slug: "bucket-hats" },
            { name: "Caps", slug: "caps" }
        ]
    },
    {
        title: "Jewellery",
        sub: [
            { name: "All Jewellery", slug: "jewellery" },
            { name: "Bracelets", slug: "bracelets" },
            { name: "Earrings", slug: "earrings" },
            { name: "Necklaces", slug: "necklaces" }
        ]
    },
    {
        title: "Footwear",
        sub: [
            { name: "All Footwear", slug: "footwear" },
            { name: "Socks", slug: "socks" }
        ]
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
                            <li key={sub.slug}>
                                <Link
                                    to={`/category/${sub.slug}`}
                                    className="block text-gray-600 hover:text-black hover:font-medium transition"
                                >
                                    {sub.name}
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