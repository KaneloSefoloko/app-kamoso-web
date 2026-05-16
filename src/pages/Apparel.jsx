import React, {
    useContext,
    useEffect,
    useState,
    useMemo,
    useRef
} from "react";

import { CartContext } from "../components/CartContext.jsx";
import { useWishlist } from "../components/WishlistContext.jsx";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {FiShoppingCart, FiHeart, FiX, FiChevronDown} from "react-icons/fi";
import { ToastContext } from "../components/ToastContext";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ---------------- CATEGORIES ---------------- */
const APPAREL_CATEGORIES = [
    { label: "T-Shirts", slug: "t-shirts" },
    { label: "Sweaters & Hoodies", slug: "sweaters-&-hoodies" },
    { label: "Track Pants", slug: "track-&-sweat-pants" },
    { label: "Shorts", slug: "shorts" },
    { label: "Tracksuits", slug: "tracksuits" },
];

/* ---------------- IMAGE HELPER ---------------- */
const getProductImage = (p) =>
    p?.variants?.[0]?.image ||
    p?.variant?.image ||
    p?.image ||
    "/placeholder.png";

/* ---------------- BLUR IMAGE ---------------- */
const BlurImage = ({ src, alt }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="w-full h-80 overflow-hidden rounded-xl bg-[#f8f8f8]">
            <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-contain transition-opacity duration-500 ${
                    loaded
                        ? "opacity-100 blur-0 scale-100"
                        : "opacity-0 blur-xl scale-105"
                }`}
            />
        </div>
    );
};

const Apparel = () => {
    const { addToCart } = useContext(CartContext);
    const { wishlist = [], toggleWishlist } = useWishlist();

    const [products, setProducts] = useState([]);
    const [visible, setVisible] = useState(8);
    const [loading, setLoading] = useState(true);
    const sortRef = useRef(null);

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [variant, setVariant] = useState({ size: null, color: null });
    const [wishlistMessage, setWishlistMessage] = useState("");
    useRef(null);
    const { showToast } = useContext(ToastContext);
    const { scrollY } = useScroll();
    const navigate = useNavigate();

    const y = useTransform(scrollY, [0, 500], [0, -40]);
    const scale = useTransform(scrollY, [0, 500], [1, 1.03]);

    const [sortOpen, setSortOpen] = useState(false);

    const sortOptions = [
        { label: "Newest", value: "newest" },
        { label: "Low → High", value: "priceLowHigh" },
        { label: "High → Low", value: "priceHighLow" },
    ];

    const currentSort =
        sortOptions.find((o) => o.value === sortBy)?.label || "Newest";

    /* ---------------- FETCH ---------------- */
    useEffect(() => {
        const fetchProducts = async () => {
            const snap = await getDocs(collection(db, "products"));
            const data = snap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(data);
            setLoading(false);
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sortRef.current && !sortRef.current.contains(e.target)) {
                setSortOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
       // document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            //document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    /* ---------------- FILTER + SORT ---------------- */
    const APPAREL_ONLY = new Set([
        "t-shirts",
        "sweaters-&-hoodies",
        "track-&-sweat-pants",
        "shorts",
        "tracksuits",
    ]);

    const filteredProducts = useMemo(() => {
        let arr = [...products];

        // 1. KEEP ONLY APPAREL
        arr = arr.filter((p) => APPAREL_ONLY.has(p.category));

        // 2. REMOVE DUPLICATES (by name + color)
        arr = Array.from(
            new Map(
                arr.map((p) => {
                    const firstColor =
                        p?.variants?.[0]?.color?.value || "no-color";

                    return [
                        `${(p.name || "").trim().toLowerCase()}-${firstColor}`,
                        p,
                    ];
                })
            ).values()
        );

        // 3. CATEGORY FILTER (UI buttons)
        if (selectedCategory !== "all") {
            arr = arr.filter((p) => p.category === selectedCategory);
        }

        // 4. SORT
        if (sortBy === "priceLowHigh") {
            arr.sort((a, b) => a.price - b.price);
        } else if (sortBy === "priceHighLow") {
            arr.sort((a, b) => b.price - a.price);
        } else {
            arr.sort(
                (a, b) =>
                    (b.createdAt?.seconds || 0) -
                    (a.createdAt?.seconds || 0)
            );
        }

        return arr;
    }, [products, selectedCategory, sortBy]);

    const displayedProducts = filteredProducts.slice(0, visible);

    /* ---------------- INFINITE SCROLL ---------------- */
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setVisible((prev) =>
                    prev < filteredProducts.length ? prev + 8 : prev
                );
            }
        });

        const el = document.getElementById("load-trigger");
        if (el) observer.observe(el);

        return () => observer.disconnect();
    }, [filteredProducts.length]);

    /* ---------------- PRODUCT OPEN ---------------- */
    const handleOpenProduct = (p) => {
        setSelectedProduct(p);

        const selectedVariant =
            p.preselectedVariant ||
            p.variants?.find((v) => v.stock > 0) ||
            p.variants?.[0];

        setVariant({
            size: p.sizes?.[0] || null,
            color: selectedVariant?.color || null,
        });
    };

    // /* ---------------- WISHLIST ACTION ---------------- */
    const handleWishlist = (p) => {
        const isInWishlist = wishlist.some((item) => item.id === p.id);

        const selectedVariant =
            p.selectedVariant ||
            p.variants?.find(v => v.color?.value === p.selectedColor) ||
            p.variants?.[0];

        toggleWishlist({
            ...p,
            variant: selectedVariant,
            selectedColor: p.selectedColor || selectedVariant?.color?.value,
            image: selectedVariant?.image || getProductImage(p),
        });

        setWishlistMessage(
            isInWishlist ? "Removed from Wishlist" : "Added to Wishlist"
        );

        setTimeout(() => setWishlistMessage(""), 2000);
    };

    return (
        <div className="bg-white text-black min-h-screen pt-28 px-4 md:px-10">

            {/* HERO */}
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 mb-10">
                <motion.img
                    src="https://res.cloudinary.com/dkwfi3iku/image/upload/f_auto,q_auto,w_1000,e_bgremoval,f_png/v1777583847/Untitled_design_nzdlxd.png"
                    alt="Accessories"
                    style={{ y, scale }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.9,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="w-full h-[420px] md:h-[500px] object-contain rounded-3xl bg-[#f8f8f8] p-4 will-change-transform"
                />



                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl font-light mb-4">Apparel</h1>
                    <p className="text-gray-500">
                        Premium essentials designed for everyday wear.
                    </p>
                </div>
            </div>

            {/* CATEGORY */}
            <div className="sticky top-20 bg-white z-20 border-b mb-6">
                <div className="flex gap-2 overflow-x-auto whitespace-nowrap py-3">

                    <button
                        onClick={() => setSelectedCategory("all")}
                        className={`flex-shrink-0 text-sm px-3 py-1.5 rounded-full border ${
                            selectedCategory === "all"
                                ? "bg-black text-white"
                                : ""
                        }`}
                    >
                        All
                    </button>

                    {APPAREL_CATEGORIES.map((c) => (
                        <button
                            key={c.slug}
                            onClick={() => setSelectedCategory(c.slug)}
                            className={`flex-shrink-0 text-sm px-3 py-1.5 rounded-full border ${
                                selectedCategory === c.slug
                                    ? "bg-black text-white"
                                    : ""
                            }`}
                        >
                            {c.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* SORT */}
            <div className="flex justify-between items-center mb-6 relative">

                <p className="text-sm text-gray-600">
                    {filteredProducts.length} products
                </p>

                {/* DROPDOWN */}
                <div className="relative" ref={sortRef}>
                    <button
                        onClick={() => setSortOpen((prev) => !prev)}
                        className="border border-gray-300 px-3 py-2 rounded-lg text-sm bg-white flex items-center gap-2 hover:border-gray-400 transition"
                    >
                        {currentSort}

                        <FiChevronDown
                            className={`text-gray-400 transition-transform duration-200 ${
                                sortOpen ? "rotate-180" : "rotate-0"
                            }`}
                        />
                    </button>

                    {/* MENU */}
                    {sortOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-fadeIn">

                            {sortOptions.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => {
                                        setSortBy(opt.value);
                                        setSortOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition ${
                                        sortBy === opt.value
                                            ? "bg-gray-100 font-medium"
                                            : ""
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}

                        </div>
                    )}

                </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {loading
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-80 bg-gray-200 animate-pulse rounded-xl"
                        />
                    ))
                    : displayedProducts.map((p, i) => {
                        const image = getProductImage(p);
                        const baseKey =
                            p.id ||
                            p.slug ||
                            (p.name ? `${p.name}-${i}` : `product-${i}`);

                        return (
                            <div key={`${baseKey}-${i}`}>
                                <div className="relative group">
                                    <div
                                        onClick={() => {
                                            if (!p.slug) return;
                                            navigate(`/products/${p.slug}`);
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <BlurImage
                                            src={
                                                p.variants?.find(
                                                    (v) => v.color?.value === p.selectedColor
                                                )?.image || image
                                            }
                                            alt={p.name}
                                        />
                                    </div>

                                    {/* COLORS */}
                                    <div className="absolute bottom-14 left-2 flex gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
                                        {p.variants?.map((v, index) => (
                                            <button
                                                key={`${baseKey}-${v.color?.value ? v.color.value : `variant-${index}`}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setProducts((prev) =>
                                                        prev.map((item) =>
                                                            item.id === p.id
                                                                ? {
                                                                    ...item,
                                                                    selectedVariant: v,
                                                                    selectedColor: v.color?.value,
                                                                }
                                                                : item
                                                        )
                                                    );
                                                }}
                                                className={`w-4 h-4 rounded-full border ${
                                                    (p.selectedColor || "") === (v.color?.value || "")
                                                        ? "border-black scale-110"
                                                        : "border-gray-300"
                                                }`}
                                                style={{
                                                    backgroundColor: v.color?.hex,
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* WISHLIST */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleWishlist(p);
                                        }}
                                        className="absolute top-2 right-2 z-10 bg-white/90 rounded-full p-2"
                                    >
                                        <FiHeart
                                            className={
                                                wishlist.some(
                                                    (item) => item.id === p.id
                                                )
                                                    ? "fill-black text-black"
                                                    : "text-black"
                                            }
                                        />
                                    </button>

                                    {/* CART */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenProduct(p);
                                        }}
                                        className="absolute bottom-2 right-2 bg-black text-white p-2 rounded-full"
                                    >
                                        <FiShoppingCart />
                                    </button>
                                </div>

                                <p className="mt-2 text-sm">{p.name}</p>
                                <p className="text-gray-500">R{p.price}</p>

                                {i === displayedProducts.length - 1 && (
                                    <div id="load-trigger" />
                                )}
                            </div>
                        );
                    })}
            </div>

            {/* QUICK VIEW */}
            {selectedProduct && (
                <AnimatePresence>
                    {/* BACKDROP */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProduct(null)}
                        className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm"
                    />

                    {/* DRAWER */}
                    <motion.div
                        initial={{ x: 500 }}
                        animate={{ x: 0 }}
                        exit={{ x: 500 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 z-[110] w-full md:w-[420px] h-full bg-white shadow-2xl flex flex-col"
                    >
                        {/* CLOSE BAR */}
                        <div className="h-16 flex items-center justify-end px-4 border-b bg-white shrink-0">
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
                            >
                                <FiX className="text-xl" />
                            </button>
                        </div>

                        {/* CONTENT */}
                        <div className="p-6 overflow-y-auto flex-1">
                            <img
                                src={
                                    selectedProduct.selectedVariant?.image ||
                                    selectedProduct.variants?.find(
                                        (v) => v.color?.value === variant.color?.value
                                    )?.image ||
                                    getProductImage(selectedProduct)
                                }
                                className="rounded-2xl w-full h-[500px] object-contain bg-white"
                            />

                            <h2 className="text-xl mt-4">{selectedProduct.name}</h2>
                            <p className="mb-4">R{selectedProduct.price}</p>

                            {/* SIZE */}
                            <div className="mb-4 flex gap-2 flex-wrap">
                                {selectedProduct.sizes?.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() =>
                                            setVariant((v) => ({ ...v, size: s }))
                                        }
                                        className={`border px-4 py-2 rounded-lg ${
                                            variant.size === s
                                                ? "bg-black text-white border-black"
                                                : "bg-white text-black border-gray-300"
                                        }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => {
                                    const selectedVariant =
                                        selectedProduct.selectedVariant ||
                                        selectedProduct.variants?.[0];

                                    addToCart(
                                        selectedProduct,
                                        selectedVariant,
                                        variant.size,
                                        1
                                    );
                                    showToast("Added to cart 🛒");

                                    setSelectedProduct(null);
                                }}
                                className="bg-black text-white w-full py-3 rounded-lg"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}

            {/* TOAST */}
            {wishlistMessage && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-5 py-3 rounded-full text-sm z-[100] shadow-xl">
                    {wishlistMessage}
                </div>
            )}
        </div>
    );
};

export default Apparel;