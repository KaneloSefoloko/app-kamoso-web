// src/components/ProductCard.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext.jsx";
import { FiShoppingCart } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [selectedColor, setSelectedColor] = useState("black");

    const colors = [
        { name: "Black", value: "black" },
        { name: "White", value: "white" },
        { name: "Beige", value: "beige" },
    ];

    /* ---------------------------------------------
       QUICK ADD HANDLER (CORE FIX)
    --------------------------------------------- */
    const handleQuickAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // If product has multiple sizes → force product page
        if (product.sizes?.length > 1) {
            navigate(`/products/${product.slug}`);
            return;
        }

        // ONE_SIZE or accessories
        addToCart({
            ...product,
            size: product.sizes?.[0], // safe: CartProvider allows this
            quantity: 1,
        });
    };

    return (
        <div className="group relative border border-transparent p-2 transition w-full max-w-sm mx-auto bg-transparent">
            {/* IMAGE CONTAINER */}
            <Link
                to={`/products/${product.slug}`}
                className="block relative w-full h-72 md:h-[22rem] overflow-hidden"
            >
                {/* Desktop hover */}
                <div className="hidden md:block relative w-full h-full">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 m-auto h-full w-auto object-contain transition-opacity duration-300 group-hover:opacity-0"
                    />
                    <img
                        src={product.hoverImage}
                        alt={`${product.name} hover`}
                        className="absolute inset-0 m-auto h-full w-auto object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                </div>

                {/* Mobile Swiper */}
                <div className="md:hidden relative">
                    <Swiper
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                        spaceBetween={10}
                        slidesPerView={1}
                        className="h-72"
                    >
                        {[product.image, product.hoverImage].map(
                            (img, i) =>
                                img && (
                                    <SwiperSlide key={i}>
                                        <img
                                            src={img}
                                            alt={product.name}
                                            className="w-full h-72 object-contain"
                                        />
                                    </SwiperSlide>
                                )
                        )}
                    </Swiper>
                </div>

                {/* QUICK ADD BUTTON */}
                <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 z-20">
                    <button
                        onClick={handleQuickAdd}
                        className="bg-yellow-400 p-2 md:p-3 rounded-sm transition-transform hover:scale-110 shadow-md opacity-100 md:opacity-0 group-hover:md:opacity-100"
                        aria-label="Add to cart"
                    >
                        <FiShoppingCart size={20} className="text-black" />
                    </button>
                </div>
            </Link>

            {/* PRODUCT INFO */}
            <div className="mt-2 text-center">
                <Link to={`/products/${product.slug}`}>
                    <h3 className="font-semibold">{product.name}</h3>
                </Link>
                <p className="text-sm text-gray-600">R{product.price}</p>
            </div>

            {/* COLOR SWATCHES */}
            <div className="flex justify-center mt-2 space-x-2">
                {colors.map((color) => (
                    <label
                        key={color.value}
                        onClick={() => setSelectedColor(color.value)}
                        className={`w-4 h-4 border cursor-pointer transition-transform ${
                            selectedColor === color.value
                                ? "scale-110 border-yellow-400"
                                : "border-gray-300"
                        }`}
                        style={{
                            backgroundColor:
                                color.value === "black"
                                    ? "#000"
                                    : color.value === "white"
                                        ? "#fff"
                                        : "#f5f5dc",
                        }}
                    >
                        <span className="sr-only">{color.name}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default ProductCard;