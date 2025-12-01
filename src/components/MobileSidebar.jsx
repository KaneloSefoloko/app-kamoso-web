import React from "react";
import { NavLink } from "react-router-dom";
import { FiX, FiChevronRight } from "react-icons/fi";

const navItems = [
    { label: "NEW", path: "/new", megaMenu: true },
    { label: "PROMOS", path: "/promos" },
    { label: "APPAREL", path: "/apparel" },
    { label: "ACCESSORIES", path: "/accessories" },
    { label: "FOOTWEAR", path: "/footwear" },
];

const categories = [
    { title: "TOPS", items: ["T-Shirts", "Hoodies", "Long Sleeves"] },
    { title: "BOTTOMS", items: ["Oversize Pants", "Shorts"] },
    { title: "ACCESSORIES", items: ["Hats", "Bags", "Sunglasses"] },
    { title: "NEW RELEASES", items: ["Latest Drops", "Trending Items"] },
];

const MobileSidebar = ({ isOpen, closeSidebar }) => {
    if (!navItems) return null;

    return (
        <div
            className={`fixed inset-0 z-50 bg-black/60 transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="bg-white w-3/4 max-w-xs h-full p-6 relative overflow-y-auto">
                <button
                    className="absolute top-4 right-4 text-black"
                    onClick={closeSidebar}
                >
                    <FiX size={24} />
                </button>

                <nav className="mt-10 flex flex-col gap-4">
                    {navItems.map((item) => (
                        <div key={item.label} className="flex flex-col">
                            <NavLink
                                to={item.path}
                                onClick={closeSidebar}
                                className="flex justify-between items-center text-black font-medium py-2 hover:text-yellow-500 transition"
                            >
                                {item.label}
                                {item.megaMenu && <FiChevronRight />}
                            </NavLink>

                            {item.megaMenu && (
                                <div className="pl-4 mt-2">
                                    {categories.map((cat) => (
                                        <div key={cat.title} className="mb-4">
                                            <h3 className="font-semibold mb-1">{cat.title}</h3>
                                            <ul className="space-y-1 text-gray-700">
                                                {cat.items.map((sub) => (
                                                    <li key={sub} className="hover:text-yellow-500 cursor-pointer">
                                                        {sub}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default MobileSidebar;
