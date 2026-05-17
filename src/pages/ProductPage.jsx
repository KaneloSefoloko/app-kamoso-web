import React, {
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import {useParams, useLocation} from "react-router-dom";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../firebase";
import {CartContext} from "../components/CartContext";
import {ToastContext} from "../components/ToastContext.jsx";

const ProductPage = () => {
    const {productSlug} = useParams();
    const {addToCart} = useContext(CartContext);

    const location = useLocation();
    const incomingColor = location.state?.selectedColor;

    /* ---------------- STATE FIX ---------------- */
    const [product, setProduct] = useState(null); // null = loading
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState(
        location.state?.selectedSize || ""
    );
    const [error, setError] = useState("");
    const [mainImage, setMainImage] = useState("");
    const [loading, setLoading] = useState(false);
    const isWig = product?.category?.toLowerCase() === "wig";
    const {showToast} = useContext(ToastContext);

    const resolveSize = (product, selectedSize) => {
        if (product.category?.toLowerCase() === "wig") {
            const match = product.sizes?.find((s) => s.size === selectedSize);
            return match || product.sizes?.[0];
        }

        return selectedSize || product.sizes?.[0] || "ONE_SIZE";
    };

    const activeSize = isWig
        ? product?.sizes?.find((s) => s.size === selectedSize)
        : null;

    const activeVariant = useMemo(() => {
        if (!product?.variants) return null;

        return (
            product.variants.find(
                (v) => v.color?.value === selectedColor
            ) || product.variants[0]
        );
    }, [selectedColor, product]);

    const displayPrice = useMemo(() => {
        if (!product) return 0;

        if (isWig) {
            return activeSize?.price || product.price || 0;
        }

        return activeVariant?.price || product.price || 0;
    }, [product, activeSize, activeVariant, isWig]);

    /* ---------------- FETCH ---------------- */
    useEffect(() => {
        if (!productSlug) return;

        const fetchProduct = async () => {
            try {
                const q = query(
                    collection(db, "products"),
                    where("slug", "==", productSlug)
                );

                const snap = await getDocs(q);

                if (snap.empty) {
                    setProduct(false); // ❗ NOT FOUND STATE
                    return;
                }

                const data = snap.docs[0].data();
                setProduct(data);

                const preferredVariant =
                    data?.variants?.find(
                        (v) => v.color?.value === incomingColor
                    ) || data?.variants?.[0];

                setSelectedColor(preferredVariant?.color?.value || "");
                setMainImage(preferredVariant?.image || "");

                /* 🔥 CRITICAL FIX FOR WIGS */
                const isWig = data?.category === "wig";

                if (isWig && data?.sizes?.length) {
                    const defaultSize = data.sizes[0];

                    setSelectedSize(
                        typeof defaultSize === "object"
                            ? defaultSize.size
                            : defaultSize
                    );
                }
            } catch (err) {
                console.error(err);
                setProduct(false);
            }
        };

        fetchProduct();
    }, [productSlug, incomingColor]);

    /* ---------------- LOADING STATE ---------------- */
    if (product === null) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Loading product...
            </div>
        );
    }

    /* ---------------- NOT FOUND ---------------- */
    if (product === false) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Product not found
            </div>
        );
    }

    const handleAddToCart = () => {
        if (loading) return;

        setError("");
        setLoading(true);

        if (product.sizes?.length > 1 && !selectedSize) {
            setError("Please select a size.");
            setLoading(false);
            return;
        }

        if (!activeVariant) {
            setError("Please select a color.");
            setLoading(false);
            return;
        }

        const resolvedSize = resolveSize(product, selectedSize);

        const finalPrice = isWig
            ? resolvedSize?.price
            : activeVariant?.price || product.price;

        addToCart({
            slug: product.slug,
            name: product.name,
            image: activeVariant?.image || product.image,
            variant: activeVariant,
            selectedColor,
            size:
                typeof resolvedSize === "object"
                    ? resolvedSize.size
                    : resolvedSize,
            price: Number(finalPrice),
            quantity: 1,
        });

        showToast("Added to cart 🛒");

        setTimeout(() => setLoading(false), 500);
    };

    return (
        <div className="bg-white text-black min-h-screen">

            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* HEADER GRID */}
                <div className="grid lg:grid-cols-2 gap-12">

                    {/* LEFT: IMAGE + GALLERY STRIP */}
                    <div className="space-y-6">

                    {/* MAIN IMAGE */}
                    <div className="overflow-hidden rounded-2xl bg-[#f7f7f7]">
                        <img
                            src={mainImage || activeVariant?.image}
                            className="w-full h-[520px] object-contain transition duration-500"
                        />
                    </div>

                    {/* SECONDARY STRIP (ZARA STYLE) */}
                    <div className="grid grid-cols-3 gap-3">

                        {/* Current variant gallery */}
                        {activeVariant?.gallery?.slice(0, 3).map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                onClick={() => setMainImage(img)}
                                className="h-28 md:h-32 w-full object-contain rounded-lg cursor-pointer hover:opacity-80 transition bg-[#f7f7f7] p-2"
                            />
                        ))}

                        {/*/!* fallback: hoverImage / other variant views *!/*/}
                        {/*{activeVariant?.hoverImage && (*/}
                        {/*    <img*/}
                        {/*        src={activeVariant.hoverImage}*/}
                        {/*        onClick={() => setMainImage(activeVariant.hoverImage)}*/}
                        {/*        className="h-28 w-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition"*/}
                        {/*    />*/}
                        {/*)}*/}
                    </div>
                </div>

                {/* RIGHT: DETAILS */}
                <div className="lg:sticky lg:top-24 h-fit">

                    {/* PRODUCT TITLE */}
                    <h1 className="text-3xl font-light tracking-wide">
                        {product.name}
                    </h1>

                    {/* PRICE */}
                    <p className="mt-2 text-lg text-gray-500">
                        R{displayPrice}
                    </p>

                    {/* DESCRIPTION */}
                    <p className="mt-6 text-gray-600 leading-relaxed">
                        {product.description}
                    </p>

                    {/* FEATURES */}
                    {product.features?.length > 0 && (
                        <div className="mt-8">
                            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
                                Details
                            </p>

                            <div className="space-y-2 text-sm text-gray-600">
                                {product.features.map((f, i) => (
                                    <p key={i}>• {f}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CARE */}
                    {product.care?.length > 0 && (
                        <div className="mt-6">
                            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
                                Care
                            </p>

                            <div className="space-y-1 text-sm text-gray-500">
                                {product.care.map((c, i) => (
                                    <p key={i}>• {c}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* COLOR */}
                    <div className="mt-8">
                        <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
                            Colour
                        </p>

                        <div className="flex gap-3">
                            {product.variants?.map((v) => {
                                const isActive =
                                    selectedColor === v.color?.value;

                                return (
                                    <button
                                        key={v.color?.value}
                                        onClick={() => {
                                            setSelectedColor(v.color?.value);
                                            setMainImage(v.image);
                                        }}
                                        className={`w-6 h-6 rounded-full border transition ${
                                            isActive
                                                ? "scale-110 border-black"
                                                : "border-gray-300"
                                        }`}
                                        style={{
                                            backgroundColor: v.color?.hex,
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* SIZE SELECTOR */}
                    <div className="mt-8">
                        <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
                            Size
                        </p>
                        <div className="mt-6 flex gap-2 flex-wrap">
                            {product.sizes?.map((s) => {
                                const sizeValue = s.size || s;

                                return (
                                    <button
                                        key={sizeValue}
                                        onClick={() => setSelectedSize(sizeValue)}
                                        className={`px-4 py-2 border rounded-md text-sm transition ${
                                            selectedSize === sizeValue
                                                ? "bg-black text-white border-black"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        {sizeValue}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* ADD TO CART */}
                    <button
                        disabled={loading}
                        onClick={handleAddToCart}
                        className="mt-10 w-full bg-black text-white py-4 rounded-xl hover:opacity-90 transition"
                    >
                        {loading ? "Adding..." : "Add to Cart"}
                    </button>

                    {/* ERROR */}
                    {error && (
                        <p className="text-red-500 mt-3 text-sm">
                            {error}
                        </p>
                    )}
                </div>
            </div>

            {/* OPTIONAL: PRODUCT STORY SECTION */}
            <div className="mt-20 border-t pt-10">
                <h2 className="text-xl font-light mb-4">
                    Product Details
                </h2>

                <div className="max-w-3xl">
                    {product.highlights?.length > 0 ? (
                        <ul className="space-y-2 text-sm tracking-wide text-gray-700 uppercase">
                            {product.highlights.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3 text-gray-700"
                                >
                                    <span className="mt-1 text-black">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600 leading-relaxed">
                            {product.longDescription || product.description}
                        </p>
                    )}
                </div>
            </div>
        </div>
</div>
);
};

export default ProductPage;