import React, { useContext, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext.jsx";
import { FiShoppingCart } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {ToastContext} from "./ToastContext.jsx";


const normalizeColor = (c) => c?.toLowerCase().trim();

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();
    const variants = product?.variants || [];
    const { showToast } = useContext(ToastContext);

    const [selectedColor, setSelectedColor] = useState(
        normalizeColor(variants[0]?.color?.value)
    );

    const [selectedSize, setSelectedSize] = useState(
        product.category?.toLowerCase() === "wig"
            ? product.sizes?.[0]?.size || product.sizes?.[0]
            : product.sizes?.[0] || ""
    );

    const resolveSize = (product, selectedSize) => {
        if (product.category?.toLowerCase() === "wig") {
            const match = product.sizes?.find((s) => s.size === selectedSize);
            return match || product.sizes?.[0];
        }

        return selectedSize || product.sizes?.[0] || "ONE_SIZE";
    };

    const activeVariant = useMemo(() => {
        return (
            variants.find(
                (v) =>
                    normalizeColor(v.color?.value) ===
                    normalizeColor(selectedColor)
            ) || variants[0]
        );
    }, [selectedColor, variants]);

    // 🚫 no variants = don't render
    if (!variants.length || !activeVariant) return null;

    /* ---------------- QUICK ADD ---------------- */
    const handleQuickAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const hasMultipleSizes =
            product.sizes?.length > 1 &&
            !(product.category?.toLowerCase() === "wig");

        if (hasMultipleSizes) {
            navigate(`/products/${product.slug}`, {
                state: { selectedColor, selectedSize }
            });
            return;
        }

        const selectedVariant =
            variants.find(v => normalizeColor(v.color?.value) ===
                normalizeColor(selectedColor)) || activeVariant;

        const size = resolveSize(product, selectedSize);

        addToCart({
            ...product,
            selectedColor,
            variant: selectedVariant,
            size,
            quantity: 1,
        });

        showToast("Added to cart 🛒");
    };

    // ✅ images fallback logic
    const galleryImages =
        activeVariant.gallery?.length > 0
            ? activeVariant.gallery
            : [activeVariant.image];

    return (
        <div className="group relative w-full max-w-sm mx-auto">

            {/* IMAGE CONTAINER */}
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-white">

                {/* IMAGE LINK ONLY */}
                <Link
                    to={`/products/${product.slug}`}
                    state={{ selectedColor, selectedSize }}
                    className="block relative w-full h-full"
                >
                    {/* DESKTOP */}
                    <div className="hidden md:block relative w-full h-full">
                        <img
                            src={activeVariant.image || "/placeholder.png"}
                            alt={product.name}
                            className="absolute inset-0 m-auto h-full w-auto object-contain transition-opacity duration-300 group-hover:opacity-0"
                        />

                        {activeVariant.hoverImage && (
                            <img
                                src={activeVariant.hoverImage}
                                alt="hover"
                                className="absolute inset-0 m-auto h-full w-auto object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            />
                        )}
                    </div>

                    {/* MOBILE SWIPER */}
                    <div className="md:hidden">
                        <Swiper
                            modules={[Pagination]}
                            pagination={{ clickable: true }}
                            slidesPerView={1}
                            className="h-full"
                        >
                            {galleryImages.map((img, i) => (
                                <SwiperSlide key={i}>
                                    <img
                                        src={img || "/placeholder.png"}
                                        alt={product.name}
                                        className="w-full h-full object-contain"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </Link>

                {/* QUICK ADD (OUTSIDE LINK - FIXED) */}
                <div className="absolute bottom-3 right-3 z-20">
                    <button
                        onClick={handleQuickAdd}
                        className="bg-black text-white p-2 shadow-md transition-transform hover:scale-110 opacity-100 md:opacity-0 group-hover:md:opacity-100 rounded-full"
                    >
                        <FiShoppingCart size={18} />
                    </button>
                </div>
            </div>

            {/* INFO */}
            <div className="mt-3 text-center">
                <h3 className="font-medium text-sm md:text-base">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-600">
                    R{product.price}
                </p>
            </div>

            {/* COLORS */}
            <div className="flex justify-center mt-2 gap-2">
                {variants.map((variant) => (
                    <button
                        key={variant.color.value}
                        onClick={() => setSelectedColor(normalizeColor(variant.color.value))}
                        className={`w-4 h-4 rounded-full border transition ${
                            normalizeColor(selectedColor) === normalizeColor(variant.color.value)
                                ? "scale-110 border-black"
                                : "border-gray-300"
                        }`}
                        style={{
                            backgroundColor:
                                variant.color.hex || "#ccc",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductCard;