import React, { useState, useEffect, useContext, useRef } from 'react';
import { useLocation, Link, NavLink, useNavigate } from 'react-router-dom';
import {
    FiShoppingCart,
    FiSearch,
    FiMenu,
    FiX,
    FiUser,
    FiChevronRight, FiHeart
} from 'react-icons/fi';

import { CartContext } from './CartContext';
import { useUI } from "./UIContext.jsx";
import { useAuth } from "../context/AuthContext";

import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import {useWishlist} from "./WishlistContext.jsx";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";

const Navbar = () => {
    const { user } = useAuth();
    const { menuOpen, setMenuOpen, cartOpen, setCartOpen } = useUI();

    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const { wishlist, removeFromWishlist } = useWishlist();
    const [wishlistOpen, setWishlistOpen] = useState(false);
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const searchRef = useRef(null);

    const [products, setProducts] = useState([]);
    const navIconClass = "w-6 h-6 text-white";

    /* ---------------- FIREBASE PRODUCTS ---------------- */
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const snap = await getDocs(collection(db, "products"));
                const data = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };

        fetchProducts();
    }, []);

    /* ---------------- SCROLL ---------------- */
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* ---------------- SEARCH ---------------- */
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const filtered = (products || [])
            .filter(p =>
                p?.name?.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 6);

        setResults(filtered);
    }, [query, products]);

    /* ---------------- OUTSIDE CLICK ---------------- */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /* ---------------- RESET ON NAV ---------------- */
    useEffect(() => {
        setSearchOpen(false);
        setQuery("");
    }, [location.pathname]);

    /* ---------------- OPEN CART FROM STATE ---------------- */
    useEffect(() => {
        if (location.state?.openCart && cart.length > 0) {
            setCartOpen(true);
            navigate(location.pathname, { replace: true });
        }
    }, [location.state, cart.length, setCartOpen, navigate, location.pathname]);

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
            {/* NAVBAR */}
            <nav className={`fixed inset-x-0 top-0 z-[60] h-20 sm:h-24 md:h-28 lg:h-32 px-4 md:px-8 flex items-center justify-between transition-colors duration-300
                ${scrolled ? "bg-black/60 backdrop-blur-sm" : "bg-black"}`}>

                {/* LEFT */}
                <div className="flex items-center gap-4 md:gap-12">
                    <button className="md:hidden" onClick={() => setMenuOpen(true)}>
                        <FiMenu size={24} className="text-white" />
                    </button>

                    <Link to="/">
                        <img
                            src="/assets/KavantiLogo.svg"
                            alt="Logo"
                            className="h-20 sm:h-24 md:h-28 w-auto"
                        />
                    </Link>
                </div>

                {/* CENTER */}
                <div className="hidden md:flex flex-grow justify-center gap-6 text-sm font-light text-white">
                    {navItems.map(({ label, path }) => (
                        <NavLink
                            key={label}
                            to={path}
                            className={({ isActive }) =>
                                `transition-opacity duration-300 ${
                                    isActive ? "text-yellow-400" : "text-white"
                                } hover:text-yellow-400`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">

                    <Link to={user ? "/orders" : "/signup"}>
                        <FiUser className={navIconClass} />
                    </Link>

                    {/* SEARCH */}
                    <div className="relative" ref={searchRef}>
                        <button onClick={() => setSearchOpen(!searchOpen)}>
                            <FiSearch className={navIconClass} />
                        </button>

                        {searchOpen && (
                            <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-md p-3 z-[50]">
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full border px-3 py-2 rounded-md"
                                    autoFocus
                                />

                                {results.length > 0 && (
                                    <div className="mt-2 max-h-72 overflow-y-auto">
                                        {results.map(item => (
                                            <Link
                                                key={item.slug || item.id}
                                                to={`/products/${item.slug}`}
                                                onClick={() => {
                                                    setSearchOpen(false);
                                                    setQuery("");
                                                }}
                                                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded"
                                            >
                                                <img
                                                    src={item.image}
                                                    className="w-10 h-10 object-cover rounded"
                                                    alt={item.name}
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
                        )}
                    </div>
                    {/* WISHLIST */}
                    <div
                        onClick={() => setWishlistOpen(true)}
                        className="relative cursor-pointer"
                    >
                        {wishlist.length > 0 ? (
                            <HiHeart className={navIconClass} />
                        ) : (
                            <HiOutlineHeart className={navIconClass} />
                        )}

                        {wishlist.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-medium">
            {wishlist.length}
        </span>
                        )}
                    </div>

                    {/* CART */}
                    <div onClick={() => setCartOpen(true)} className="relative cursor-pointer">
                        <FiShoppingCart className="w-6 h-6 text-yellow-400" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                                {cartCount}
                            </span>
                        )}
                    </div>

                </div>
            </nav>

            {/* WISHLIST DRAWER */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white z-[60] transform transition-transform duration-300 flex flex-col
    ${wishlistOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* HEADER */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Wishlist</h2>

                    <button onClick={() => setWishlistOpen(false)}>
                        <FiX />
                    </button>
                </div>

                {/* ITEMS */}
                <div className="flex-1 overflow-y-auto p-4">
                    {wishlist.length === 0 ? (
                        <p className="text-center text-gray-500">
                            Wishlist is empty
                        </p>
                    ) : (
                        wishlist.map((item) => {
                            const image =
                                item.image ||
                                item.variant?.image ||
                                item.variants?.[0]?.image ||
                                "/placeholder.png";

                            return (
                                <div
                                    key={`${item.id}-${item.slug}`}
                                    className="flex items-center gap-3 mb-4"
                                >
                                    {/* IMAGE (click → product page) */}
                                    <img
                                        src={image}
                                        className="w-14 h-14 object-cover rounded cursor-pointer"
                                        onClick={() => {
                                            setWishlistOpen(false);
                                            navigate(`/products/${item.slug}`, {
                                                state: {
                                                    selectedColor: item.selectedColor,
                                                    variant: item.variant,
                                                }
                                            });
                                        }}
                                    />

                                    {/* INFO */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start gap-2">
                                            <div>
                                                <p className="font-medium text-sm">{item.name}</p>

                                                <p className="text-xs text-gray-500">
                                                    R{item.price}

                                                    {item.selectedColor
                                                        ? ` • ${item.selectedColor}`
                                                        : item.variant?.color?.value
                                                            ? ` • ${item.variant.color.value}`
                                                            : ""}
                                                </p>
                                            </div>

                                            {/* REMOVE */}
                                            <button
                                                onClick={() =>
                                                    removeFromWishlist(
                                                        item.id,
                                                        item.selectedColor || item.variant?.color?.value
                                                    )
                                                }
                                                className="text-gray-400 hover:text-red-500 transition"
                                            >
                                                <FiX size={16} />
                                            </button>
                                        </div>

                                        {/* ACTIONS */}
                                        <div className="flex gap-2 mt-3">
                                            <button
                                                onClick={() => {
                                                    setWishlistOpen(false);

                                                    navigate(`/products/${item.slug}`, {
                                                        state: {
                                                            selectedColor: item.selectedColor,
                                                            variant: item.variant,
                                                        }
                                                    });
                                                }}
                                                className="text-xs px-2 py-1 border rounded"
                                            >
                                                View
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setWishlistOpen(false);

                                                    navigate(`/products/${item.slug}`, {
                                                        state: {
                                                            selectedColor: item.selectedColor,
                                                            variant: item.variant,
                                                        }
                                                    });
                                                }}
                                                className="text-xs px-2 py-1 bg-black text-white rounded"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* CART DRAWER */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white z-[60] transform transition-transform duration-300 flex flex-col
  ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* HEADER */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Your Cart</h2>
                    <button onClick={() => setCartOpen(false)}>
                        <FiX />
                    </button>
                </div>

                {/* CART ITEMS */}
                <div className="flex-1 overflow-y-auto p-4">
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-500">Cart is empty</p>
                    ) : (
                        cart.map((item) => {
                            return (
                                <div
                                    key={`${item.slug}-${item.size}-${item.color?.value || "no-color"}`}
                                    className="flex items-center gap-3 mb-4"
                                >
                                    {/* IMAGE */}
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-contain rounded bg-white p-1"
                                    />

                                    {/* INFO */}
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{item.name}</p>

                                        <p className="text-xs text-gray-500">
                                            R{item.price}

                                            {item.size ? ` • ${item.size}` : ""}

                                            {item.color?.value
                                                ? ` • ${item.color.value}`
                                                : item.variant?.color?.value
                                                    ? ` • ${item.variant.color.value}`
                                                    : ""}
                                        </p>

                                        {/* QUANTITY CONTROLS */}
                                        <div className="flex items-center gap-2 mt-1">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.slug,
                                                        item.size,
                                                        item.color?.value || "",
                                                        -1
                                                    )
                                                }
                                                className="px-2 border rounded"
                                            >
                                                -
                                            </button>

                                            <span className="text-sm">{item.quantity}</span>

                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.slug,
                                                        item.size,
                                                        item.color?.value || "",
                                                        +1
                                                    )
                                                }
                                                className="px-2 border rounded"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* REMOVE */}
                                    <button
                                        onClick={() =>
                                            removeFromCart(
                                                item.slug,
                                                item.size,
                                                item.color?.value || ""
                                            )
                                        }
                                        className="text-gray-400 hover:text-black"
                                    >
                                        ✕
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* FOOTER */}
                {cart.length > 0 && (
                    <div className="p-4 border-t">
                        <button
                            onClick={() => {
                                setCartOpen(false);
                                navigate("/checkout");
                            }}
                            className="w-full bg-black text-white py-3 rounded-sm hover:bg-gray-800 transition"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>

            {/* CART OVERLAYS */}
            {cartOpen && (
                <div className="fixed inset-0 bg-black/30 z-[50]" onClick={() => setCartOpen(false)} />
            )}

            {/* WISHLIST OVERLAYS */}
            {wishlistOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-[50]"
                    onClick={() => setWishlistOpen(false)}
                />
            )}

            {menuOpen && (
                <div className="fixed inset-0 bg-black/30 z-[50] md:hidden" onClick={() => setMenuOpen(false)} />
            )}

            {/* MOBILE MENU */}
            <div
                className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
                    menuOpen ? "visible" : "invisible"
                }`}
            >

                {/* BACKDROP */}
                <div
                    onClick={() => setMenuOpen(false)}
                    className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
                        menuOpen ? "opacity-100" : "opacity-0"
                    }`}
                />

                {/* PANEL */}
                <div
                    className={`absolute top-0 left-0 h-full w-[85%] max-w-sm bg-[#f6f6f3] shadow-2xl
        transform transition-transform duration-300 ease-out ${
                        menuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >

                    {/* HEADER */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-white">
                        <h2 className="text-sm tracking-[0.3em] uppercase text-gray-500">
                            Menu
                        </h2>

                        <button
                            onClick={() => setMenuOpen(false)}
                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                        >
                            <FiX className="text-black" size={18} />
                        </button>
                    </div>

                    {/* NAV */}
                    <ul className="p-6 space-y-2">

                        {navItems.map(({ label, path }) => (
                            <li key={label}>
                                <NavLink
                                    to={path}
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center justify-between px-4 py-4 rounded-2xl text-sm font-medium transition ${
                                            isActive
                                                ? "bg-white border border-gray-200 shadow-sm text-black"
                                                : "text-gray-600 hover:bg-white hover:border hover:border-gray-200"
                                        }`
                                    }
                                >
                                    <span>{label}</span>
                                    <FiChevronRight className="text-gray-400" />
                                </NavLink>
                            </li>
                        ))}

                    </ul>

                    {/* FOOTER (optional branding feel) */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">

                        <p className="text-xs text-gray-400 tracking-wide text-center">
                            KAVANTI STORE
                        </p>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;