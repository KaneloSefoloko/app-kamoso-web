import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link, NavLink } from 'react-router-dom';
import {
    FiShoppingCart,
    FiSearch,
    FiMenu,
    FiX,
    FiUser,
    FiChevronRight
} from 'react-icons/fi';
import { CartContext } from './CartContext';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const hideNavbarRoutes = ["/signup", "/login"];
    if (hideNavbarRoutes.includes(location.pathname)) return null;

    const navItems = [
        { label: 'NEW', path: '/new' },
        { label: 'PROMOS', path: '/promos' },
        { label: 'APPAREL', path: '/apparel' },
        { label: 'ACCESSORIES', path: '/accessories' },
        { label: 'FOOTWEAR', path: '/footwear' }
    ];

    const navBg = scrolled ? "bg-black/60 backdrop-blur-sm" : "bg-black";
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            {/* Navbar */}
            <nav
                className={`fixed inset-x-0 top-0 z-50 h-20 sm:h-24 md:h-28 lg:h-32 px-4 md:px-8 flex items-center justify-between
                 transition-colors duration-300 ${navBg} hover:bg-black/60 hover:backdrop-blur-sm ${menuOpen ? "hidden" : ""}`}
            >
                {/* Left Section */}
                <div className="flex items-center gap-4 md:gap-12 flex-shrink-0">
                    <button className="md:hidden" onClick={() => setMenuOpen(true)}>
                        <FiMenu size={24} className="text-white" />
                    </button>
                    <img src="/assets/KavantiLogo.svg" alt="Logo" className="max-h-full h-20 sm:h-24 md:h-28 lg:h-32 w-auto" />
                </div>

                {/* Center Navigation Links */}
                <div className="hidden md:flex flex-grow justify-center gap-6 text-sm font-light text-white">
                    {navItems.map(({ label, path }) => (
                        <NavLink
                            key={label}
                            to={path}
                            className={({ isActive }) =>
                                `relative transition-all duration-300 ${
                                    isActive ? "text-yellow-400 after:bg-yellow-400" : "text-white"
                                } hover:text-yellow-400 after:content-[''] after:absolute after:left-0 after:bottom-[-2rem] after:w-full after:h-0.5`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>

                {/* Right Icons */}
                <div className="flex items-center gap-4 flex-shrink-0">
                    <Link to="/signup">
                        <FiUser size={24} className="cursor-pointer text-white" />
                    </Link>
                    <Link to="/search">
                        <FiSearch size={24} className="cursor-pointer text-white" />
                    </Link>

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
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
                    cartOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold">Your Cart</h2>
                    <button onClick={() => setCartOpen(false)}>
                        <FiX size={24} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex items-center justify-between mb-4">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                                <div className="flex-1 ml-4">
                                    <p className="font-semibold">{item.name}</p>
                                    <p>R{item.price}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                                    X
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Checkout Button */}
                <div className="p-4 border-t">
                    <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">
                        Checkout
                    </button>
                </div>
            </div>

            {/* Overlays (fixed) */}
            {cartOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40"
                    onClick={() => setCartOpen(false)}
                />
            )}

            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-30 md:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-gray-100 border-r z-40 transform transition-transform duration-300 ease-in-out ${
                    menuOpen ? "translate-x-0" : "-translate-x-full"
                } md:hidden`}
                style={{ borderColor: "rgb(206, 206, 206)" }}
            >
                <div
                    className="flex justify-between items-center p-4 border-b"
                    style={{ borderColor: "rgb(206, 206, 206)" }}
                >
                    <button onClick={() => setMenuOpen(false)}>
                        <FiX size={24} />
                    </button>
                </div>
                <ul className="flex flex-col p-4 gap-4 text-sm font-medium">
                    {navItems.map(({ label, path }) => (
                        <li key={label} className="border-b pb-4" style={{ borderColor: "rgb(206, 206, 206)" }}>
                            <NavLink
                                to={path}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    `w-full flex justify-between items-center text-left hover:text-yellow-400 ${
                                        isActive ? "text-yellow-400" : "text-black"
                                    }`
                                }
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