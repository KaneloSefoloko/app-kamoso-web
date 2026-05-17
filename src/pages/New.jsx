import React, {
    useContext,
    useEffect,
    useMemo, useRef,
    useState,
} from "react";

import {Link} from "react-router-dom";

import {CartContext} from "../components/CartContext.jsx";
import {useWishlist} from "../components/WishlistContext.jsx";
import { FiChevronDown } from "react-icons/fi";

import {db} from "../../firebase";
import {collection, getDocs} from "firebase/firestore";

import {FiShoppingCart, FiHeart, FiX,} from "react-icons/fi";
import {AnimatePresence, motion} from "framer-motion";
import {ToastContext} from "../components/ToastContext";

/* ---------------- CATEGORIES ---------------- */
const CATEGORIES = [
    {label: "T-Shirts", slug: "t-shirts"},
    {label: "Sweaters & Hoodies", slug: "sweaters-&-hoodies"},
    {label: "Track Pants", slug: "track-and-sweat-pants"},
    {label: "Shorts", slug: "shorts"},
    {label: "Tracksuits", slug: "tracksuits"},
];

/* ---------------- IMAGE HELPER ---------------- */
const getProductImage = (p) =>
    p?.variants?.[0]?.image ||
    p?.variant?.image ||
    p?.image ||
    "/placeholder.png";

/* ---------------- BLUR IMAGE ---------------- */
const BlurImage = ({src, alt}) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="w-full h-80 overflow-hidden rounded-xl bg-white">
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

const getDisplayPrice = (product) => {
    const isWig = product.category?.toLowerCase() === "wig";

    if (isWig && Array.isArray(product.sizes) && product.sizes.length > 0) {
        const prices = product.sizes
            .map(s => Number(s.price))
            .filter(Boolean);

        return prices.length ? Math.min(...prices) : null;
    }

    return product.price || null;
};

const New = () => {
    const {addToCart} = useContext(CartContext);
    const {wishlist = [], toggleWishlist} = useWishlist();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const {showToast} = useContext(ToastContext);
    const [selectedColors, setSelectedColors] = useState({});

    const [variant, setVariant] = useState({
        size: null,
        color: null,
    });

    const [sortOpen, setSortOpen] = useState(false);
    const sortRef = useRef(null);

    const sortOptions = [
        {label: "Newest", value: "newest"},
        {label: "Low → High", value: "priceLowHigh"},
        {label: "High → Low", value: "priceHighLow"},
    ];

    const currentSort =
        sortOptions.find((o) => o.value === sortBy)?.label || "Newest";

    const [wishlistMessage, setWishlistMessage] = useState("");


    /* ---------------- FETCH ---------------- */
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const snap = await getDocs(collection(db, "products"));

                const data = snap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setProducts(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
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
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);
    /* ---------------- FILTERED PRODUCTS ---------------- */
    const filteredProducts = useMemo(() => {
        let arr = [...products];

        // REMOVE DUPLICATES
        arr = Array.from(
            new Map(
                arr.map((p) => [p.id, p])
            ).values()
        );

        // CATEGORY FILTER
        if (selectedCategory !== "all") {
            arr = arr.filter(
                (p) => p.category === selectedCategory
            );
        }

        // SORT
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

    const handleQuickAdd = (product) => {
        setSelectedProduct(product);

        const selectedColor =
            selectedColors[product.id] ||
            product.selectedColor ||
            product.variants?.[0]?.color?.value;

        const selectedVariant =
            product.variants?.find(
                (v) =>
                    v.color?.value?.toLowerCase() ===
                    selectedColor?.toLowerCase()
            ) ||
            product.selectedVariant ||
            product.variants?.[0];

        setVariant({
            size: product.sizes?.[0] || null,
            color: selectedVariant?.color || null,
        });
    };

    return (
        <div className="bg-white text-black min-h-screen pt-28 px-4 md:px-10">

            {/* ---------------- HERO ---------------- */}
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 mb-12">

                <img
                    src="https://res.cloudinary.com/dkwfi3iku/image/upload/f_auto,q_auto,w_1400/v1778531087/Photoroom_20260511_221842_z5dluj.png"
                    alt="New Arrivals"
                    className="w-full h-[420px] md:h-[500px] object-contain rounded-3xl bg-[#f8f8f8] p-2 md:p-4"
                />

                <div className="flex flex-col justify-center">

                    <p className="uppercase tracking-[0.25em] text-sm text-gray-500 mb-3">
                        Latest Collection
                    </p>

                    <h1 className="text-4xl md:text-6xl font-light mb-6">
                        New Arrivals
                    </h1>

                    <p className="text-gray-500 leading-relaxed max-w-lg">
                        Discover the newest premium apparel pieces
                        designed for everyday wear and timeless style.
                    </p>

                    <div className="flex flex-wrap gap-3 mt-8">

                        {CATEGORIES.map((c) => (
                            <Link
                                key={c.slug}
                                to={`/category/${c.slug}`}
                                className="border px-4 py-2 rounded-full
                                text-sm hover:bg-black hover:text-white
                                transition"
                            >
                                {c.label}
                            </Link>
                        ))}

                    </div>
                </div>
            </div>

            {/* ---------------- FILTER BAR ---------------- */}
            <div className="sticky top-20 bg-white z-20 border-b border-gray-200 mb-8">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4">

                    {/* CATEGORY FILTER */}
                    <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">

                        <button
                            onClick={() =>
                                setSelectedCategory("all")
                            }
                            className={`flex-shrink-0 text-sm px-4 py-2 rounded-full border transition ${
                                selectedCategory === "all"
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-black border-gray-300"
                            }`}
                        >
                            All
                        </button>

                        {CATEGORIES.map((c) => (
                            <button
                                key={c.slug}
                                onClick={() =>
                                    setSelectedCategory(c.slug)
                                }
                                className={`flex-shrink-0 text-sm px-4 py-2 rounded-full border transition ${
                                    selectedCategory === c.slug
                                        ? "bg-black text-white border-black"
                                        : "bg-white text-black border-gray-300"
                                }`}
                            >
                                {c.label}
                            </button>
                        ))}
                    </div>

                    {/* SORT */}
                    <div className="flex items-center justify-between md:justify-end gap-4">

                        <p className="text-sm text-gray-500">
                            {filteredProducts.length} products
                        </p>

                        <div className="relative" ref={sortRef}>

                            {/* BUTTON */}
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

                            {/* DROPDOWN */}
                            {sortOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">

                                    {sortOptions.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => {
                                                setSortBy(opt.value);
                                                setSortOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition ${
                                                sortBy === opt.value ? "bg-gray-100 font-medium" : ""
                                            }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------------- GRID ---------------- */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {loading
                    ? Array.from({length: 8}).map((_, i) => (
                        <div
                            key={i}
                            className="h-[380px] bg-gray-100 animate-pulse rounded-2xl"
                        />
                    ))
                    : filteredProducts.map((product) => {
                        const image =
                            getProductImage(product);

                        const activeColor =
                            product.selectedColor ||
                            product.selectedVariant?.color?.value ||
                            product.variants?.[0]?.color?.value;

                        const isInWishlist = wishlist.some(
                            (item) =>
                                item.id === product.id &&
                                (
                                    item.selectedColor === activeColor ||
                                    item.variant?.color?.value === activeColor
                                )
                        );

                        return (
                            <div
                                key={product.id}
                                className="group"
                            >
                                {/* IMAGE */}
                                <div className="relative overflow-hidden rounded-2xl bg-white">

                                    <div className="relative">
                                        <Link
                                            to={`/products/${product.slug}`}
                                            state={{
                                                selectedColor:
                                                    selectedColors[product.id] ||
                                                    product.selectedColor ||
                                                    product.variants?.[0]?.color?.value,

                                                selectedVariant:
                                                    product.variants?.find(
                                                        (v) =>
                                                            v.color?.value ===
                                                            (selectedColors[product.id] || product.selectedColor)
                                                    ),

                                                selectedSize: variant.size || null, // ✅ ADD THIS
                                            }}
                                        >
                                            <BlurImage
                                                src={
                                                    product.variants?.find(
                                                        (v) =>
                                                            v.color?.value === product.selectedColor
                                                    )?.image || image
                                                }
                                                alt={product.name}
                                            />
                                        </Link>

                                        {/* COLORS */}
                                        <div
                                            className="absolute bottom-14 left-2 flex gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
                                            {product.variants?.map((v, index) => (
                                                <button
                                                    key={`${product.id}-${v.color?.value || index}`}
                                                    onClick={() => {
                                                        setProducts((prev) =>
                                                            prev.map((item) =>
                                                                item.id === product.id
                                                                    ? {
                                                                        ...item,
                                                                        selectedVariant: v,
                                                                        selectedColor: v.color?.value,
                                                                    }
                                                                    : item
                                                            )
                                                        );

                                                        setSelectedColors((prev) => ({
                                                            ...prev,
                                                            [product.id]: v.color?.value,
                                                        }));
                                                    }}
                                                    className={`w-4 h-4 rounded-full border transition ${
                                                        (product.selectedColor || "") ===
                                                        (v.color?.value || "")
                                                            ? "border-black scale-110"
                                                            : "border-gray-300"
                                                    }`}
                                                    style={{
                                                        backgroundColor: v.color?.hex,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* WISHLIST */}
                                    <button
                                        onClick={() => {
                                            const selectedVariant =
                                                product.selectedVariant ||
                                                product.variants?.find(
                                                    (v) =>
                                                        v.color?.value === activeColor
                                                ) ||
                                                product.variants?.[0];

                                            toggleWishlist({
                                                ...product,
                                                variant: selectedVariant,
                                                selectedColor: activeColor,
                                                image:
                                                    selectedVariant?.image ||
                                                    getProductImage(product),
                                            });

                                            setWishlistMessage(
                                                isInWishlist
                                                    ? "Removed from Wishlist"
                                                    : "Added to Wishlist"
                                            );

                                            setTimeout(() => setWishlistMessage(""), 2000);
                                        }}
                                        className="absolute top-3 right-3
                                          bg-white/90 backdrop-blur-sm
                                          rounded-full p-2 shadow-sm"
                                    >
                                        <FiHeart
                                            className={`text-lg ${
                                                isInWishlist
                                                    ? "fill-black text-black"
                                                    : "text-black"
                                            }`}
                                        />
                                    </button>

                                    {/* QUICK ADD */}
                                    <button
                                        onClick={() =>
                                            handleQuickAdd(product)
                                        }
                                        className="absolute bottom-3 right-3
                                          bg-black text-white p-3 rounded-full
                                          shadow-lg active:scale-95 transition"
                                    >
                                        <FiShoppingCart/>
                                    </button>
                                </div>

                                {/* INFO */}
                                <div className="pt-3">

                                    <h3 className="text-sm md:text-base font-medium">
                                        {product.name}
                                    </h3>

                                    {(() => {
                                        const isWig = product.category?.toLowerCase() === "wig";
                                        const price = getDisplayPrice(product);

                                        if (!price) return null;

                                        return (
                                            <p className="text-gray-500 mt-1">
                                                {isWig ? `From R${price}` : `R${price}`}
                                            </p>
                                        );
                                    })()}

                                </div>
                            </div>
                        );
                    })}
            </div>

            {/* QUICK VIEW */}
            {selectedProduct && (
                <AnimatePresence>
                    {/* BACKDROP */}
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        onClick={() => setSelectedProduct(null)}
                        className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm"
                    />

                    {/* DRAWER */}
                    <motion.div
                        initial={{x: 500}}
                        animate={{x: 0}}
                        exit={{x: 500}}
                        transition={{type: "spring", stiffness: 300, damping: 30}}
                        className="fixed top-0 right-0 z-[110] w-full md:w-[420px] h-full bg-white shadow-2xl flex flex-col"
                    >
                        {/* CLOSE BAR */}
                        <div className="h-16 flex items-center justify-end px-4 border-b bg-white shrink-0">
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
                            >
                                <FiX className="text-xl"/>
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
                                            setVariant((v) => ({...v, size: s}))
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
                                        selectedProduct.variants?.find(
                                            (v) =>
                                                v.color?.value === variant.color?.value
                                        ) ||
                                        selectedProduct.selectedVariant ||
                                        selectedProduct.variants?.[0];

                                    addToCart({
                                        ...selectedProduct,
                                        variant: selectedVariant,
                                        selectedColor: selectedVariant?.color?.value,
                                        size: variant.size,
                                        quantity: 1,
                                    });

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
                <div
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-5 py-3 rounded-full text-sm z-[100] shadow-xl">
                    {wishlistMessage}
                </div>
            )}
        </div>
    );
};

export default New;