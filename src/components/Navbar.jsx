import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link, NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiSearch, FiMenu, FiX, FiUser, FiChevronRight } from 'react-icons/fi';
import { CartContext } from './CartContext';
import { useUI } from "./UIContext.jsx";
import { useAuth } from "../context/AuthContext";
import { products } from "../data/products";
import { useRef } from "react";


const Navbar = () => {
    const { user } = useAuth();
    const { menuOpen, setMenuOpen, cartOpen, setCartOpen } = useUI();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const searchRef = useRef(null);


    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const filtered = products
            .filter(p =>
                p.name.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 6);

        setResults(filtered);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setSearchOpen(false);
        setQuery("");
    }, [location.pathname]);


    const hideNavbarRoutes = ['/signup', '/login', '/checkout', '/pay'];
    if (hideNavbarRoutes.includes(location.pathname)) return null;

    const navItems = [
        { label: 'NEW', path: '/new' },
        { label: 'PROMOS', path: '/promos' },
        { label: 'APPAREL', path: '/apparel' },
        { label: 'ACCESSORIES', path: '/accessories' },
        { label: 'FOOTWEAR', path: '/footwear' }
    ];

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            {/* Navbar */}
            <nav className={`fixed inset-x-0 top-0 z-60 h-20 sm:h-24 md:h-28 lg:h-32 px-4 md:px-8 flex items-center justify-between transition-colors duration-300
        ${scrolled ? "bg-black/60 backdrop-blur-sm" : "bg-black"}`}>

                {/* Left Section */}
                <div className="flex items-center gap-4 md:gap-12 flex-shrink-0">
                    <button className="md:hidden" onClick={() => setMenuOpen(true)}>
                        <FiMenu size={24} className="text-white" />
                    </button>
                    <Link to="/">
                        <img src="/assets/KavantiLogo.svg" alt="Logo" className="max-h-full h-20 sm:h-24 md:h-28 lg:h-32 w-auto"/>
                    </Link>
                </div>

                {/* Center Links */}
                <div className="hidden md:flex flex-grow justify-center gap-6 text-sm font-light text-white">
                    {navItems.map(({ label, path }) => (
                        <NavLink
                            key={label}
                            to={path}
                            className={({ isActive }) => `relative transition-all duration-300
                ${isActive ? "text-yellow-400" : "text-white"}
                hover:text-yellow-400`}
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>

                {/* Right Icons */}
                <div className="flex items-center gap-4 flex-shrink-0">
                    <Link to={user ? "/orders" : "/signup"}>
                        <FiUser size={24} className="cursor-pointer text-white" />
                    </Link>
                    <div className="relative" ref={searchRef}>
                        <button onClick={() => setSearchOpen(!searchOpen)}>
                            <FiSearch size={24} className="cursor-pointer text-white" />
                        </button>

                        {searchOpen && (
                            <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-md z-50 p-3">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                        }

                                        if (e.key === "Enter" && results.length > 0) {
                                            navigate(`/product/${results[0].id}`);
                                            setSearchOpen(false);
                                            setQuery("");
                                        }
                                    }}
                                    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    autoFocus
                                />

                                {results.length > 0 && (
                                    <div className="mt-2 max-h-72 overflow-y-auto">
                                        {results.map(item => (
                                            <Link
                                                key={item.id}
                                                to={`/product/${item.id}`}
                                                onClick={() => {
                                                    setSearchOpen(false);
                                                    setQuery("");
                                                }}
                                                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md"
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-10 h-10 object-cover rounded"
                                                />
                                                <div>
                                                    <p className="text-sm font-medium">{item.name}</p>
                                                    <p className="text-xs text-gray-500">R{item.price}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {query && results.length === 0 && (
                                    <p className="text-sm text-gray-500 mt-3 text-center">
                                        No products found
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="relative cursor-pointer" onClick={() => setCartOpen(true)}>
                        <FiShoppingCart size={24} className="cursor-pointer text-yellow-400" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {cartCount}
              </span>
                        )}
                    </div>
                </div>
            </nav>

            {/* Cart Drawer */}
            <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-60 transform transition-transform duration-300 flex flex-col ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex justify-between items-center p-4 border-b flex-shrink-0">
                    <h2 className="text-xl font-semibold">Your Cart</h2>
                    <button onClick={() => setCartOpen(false)} className="text-gray-700 hover:text-black">X</button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                        <p className="text-gray-500 text-center mt-10">Your cart is empty</p>
                    ) : (
                        cart.map(item => (
                            <div key={`${item.id}-${item.size || "ONE_SIZE"}`} className="flex items-center justify-between p-2 bg-gray-50 rounded-sm hover:shadow-md transition">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-sm" />
                                <div className="flex-1 ml-4">
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-gray-600">R{item.price}</p>
                                    <button
                                        onClick={() =>
                                            updateQuantity(item.id, item.size || "ONE_SIZE", -1)
                                        }
                                        disabled={item.quantity <= 1}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition disabled:bg-gray-100 disabled:text-gray-400"
                                    >
                                        -
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        onClick={() =>
                                            updateQuantity(item.id, item.size || "ONE_SIZE", +1)
                                        }
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                                    >
                                        +
                                    </button>

                                </div>
                                <button
                                    onClick={() =>
                                        removeFromCart(item.id, item.size || "ONE_SIZE")
                                    }
                                    className="text-red-500 hover:text-red-600 font-semibold ml-2"
                                >
                                    X
                                </button>

                            </div>
                        ))
                    )}
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={() => {
                            if (cart.length === 0) return;
                            if (user) navigate("/checkout");
                            else navigate("/signup", {state: {from: "/checkout"}});
                        }}
                        disabled={cart.length === 0}
                        className={`px-24 py-3 rounded-sm mt-2 font-light transition mb-4 ${
                            cart.length > 0 ? "bg-black text-white hover:bg-gray-800" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        Checkout
                    </button>
                </div>
            </div>

            {/* Overlays */}
            {cartOpen && <div className="fixed inset-0 bg-black/30 z-50" onClick={() => setCartOpen(false)} />}
            {menuOpen && <div className="fixed inset-0 bg-black/30 z-50 md:hidden" onClick={() => setMenuOpen(false)} />}

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-gray-100 border-r z-60 transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}>
                <div className="flex justify-between items-center p-4">
                    <button onClick={() => setMenuOpen(false)}>
                        <FiX size={24} />
                    </button>
                </div>

                {/* Search Input */}
                <div className="p-4 border-b">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                            }

                            if (e.key === "Enter" && results.length > 0) {
                                navigate(`/product/${results[0].id}`);
                                setMenuOpen(false);
                                setQuery("");
                            }
                        }}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />

                    {results.length > 0 && (
                        <div className="mt-2 bg-white rounded-md shadow">
                            {results.map(item => (
                                <Link
                                    key={item.id}
                                    to={`/product/${item.id}`}
                                    onClick={() => {
                                        setMenuOpen(false);
                                        setQuery("");
                                    }}
                                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-10 h-10 object-cover rounded"
                                    />
                                    <div>
                                        <p className="text-sm font-medium">{item.name}</p>
                                        <p className="text-xs text-gray-500">R{item.price}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <ul className="flex flex-col p-4 gap-4 text-sm font-sans font-light">
                    {navItems.map(({ label, path }) => (
                        <li key={label} className="border-b pb-4">
                            <NavLink
                                to={path}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) => `flex justify-between items-center text-left hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-black"}`}
                            >
                                {label}
                                <FiChevronRight size={20} />
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Navbar;
