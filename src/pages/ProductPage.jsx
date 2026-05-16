import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { CartContext } from "../components/CartContext";
import { useLocation } from "react-router-dom";


const ProductPage = () => {
    const { productSlug } = useParams();
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState("");
    const location = useLocation();
    const incomingColor = location.state?.selectedColor;
    const incomingVariant = location.state?.variant;

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(""), 2000);
    };

    /* FETCH PRODUCT */
    useEffect(() => {
        const fetchProduct = async () => {
            const q = query(
                collection(db, "products"),
                where("slug", "==", productSlug)
            );

            const snap = await getDocs(q);

            if (!snap.empty) {
                const data = snap.docs[0].data();
                setProduct(data);

                const preferredVariant =
                    data?.variants?.find(
                        v => v.color?.value === incomingColor
                    ) ||
                    incomingVariant ||
                    data?.variants?.[0];

                setSelectedColor(preferredVariant?.color?.value || "");
                setMainImage(preferredVariant?.image || "");
            }
        };

        fetchProduct();
    }, [productSlug]);

    useEffect(() => {
        if (!product) return;

        const preferredVariant =
            product.variants?.find(
                v => v.color?.value === incomingColor
            ) ||
            product.variants?.[0];

        setSelectedColor(preferredVariant?.color?.value || "");
        setMainImage(preferredVariant?.image || "");
    }, [incomingColor, product]);


    /* ACTIVE VARIANT */
    const activeVariant = useMemo(() => {
        if (!product?.variants) return null;

        return (
            product.variants.find(
                (v) => v.color?.value === selectedColor
            ) || product.variants[0]
        );
    }, [selectedColor, product]);

    useEffect(() => {
        if (activeVariant) {
            setMainImage(activeVariant.image);
        }
    }, [activeVariant]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Loading product...
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

        addToCart(product, activeVariant, selectedSize);

        showToast("Added to cart  🛒");

        setTimeout(() => setLoading(false), 500);
    };

    return (
        <div className="bg-white text-black min-h-screen">

            {/* TOAST */}
            {toast && (
                <div className="fixed top-6 right-6 bg-black text-white px-4 py-2 rounded z-[50]">
                    {toast}
                </div>
            )}

            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* HEADER GRID */}
                <div className="grid lg:grid-cols-2 gap-12">

                    {/* LEFT: IMAGE + GALLERY STRIP */}
                    <div className="space-y-6">

                        {/* MAIN IMAGE */}
                        <div className="overflow-hidden rounded-2xl bg-[#f7f7f7]">
                            <img
                                src={mainImage}
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
                        <p className="mt-2 text-gray-500 text-lg">
                            R{product.price}
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

                        {/* COLOR SELECTOR */}
                        <div className="mt-8">
                            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
                                Colour
                            </p>

                            <div className="flex gap-3">
                                {product.variants.map((v) => (
                                    <button
                                        key={v.color.value}
                                        onClick={() => setSelectedColor(v.color.value)}
                                        className={`w-6 h-6 rounded-full border transition ${
                                            selectedColor === v.color.value
                                                ? "scale-110 border-black"
                                                : "border-gray-300"
                                        }`}
                                        style={{ backgroundColor: v.color.hex }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* SIZE SELECTOR */}
                        <div className="mt-8">
                            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
                                Size
                            </p>

                            <div className="flex gap-2 flex-wrap">
                                {product.sizes.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSelectedSize(s)}
                                        className={`px-4 py-2 border rounded-md text-sm transition ${
                                            selectedSize === s
                                                ? "bg-black text-white border-black"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        {s}
                                    </button>
                                ))}
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