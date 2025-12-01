// src/components/ProductCard.jsx
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext.jsx";
import { FiShoppingCart } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ProductCardColorSelector = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const [selectedColor, setSelectedColor] = useState("black");

    // Define your colors
    const colors = [
        { name: "Black", value: "black" },
        { name: "White", value: "white" },
        { name: "Beige", value: "beige" },
    ];

    return (
        <div className="group relative border border-transparent p-2 transition w-full max-w-sm mx-auto bg-transparent">

            {/* IMAGE */}
            <Link to={`/products/${product.slug}`} className="block relative w-full h-72 md:h-[22rem] overflow-hidden">

                {/* Desktop hover effect */}
                <div className="hidden md:block relative w-full h-full">
                    <img
                        src={product.images[selectedColor]}
                        alt={product.name}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-auto object-contain transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                    />
                    <img
                        src={product.hoverImages[selectedColor]}
                        alt={`${product.name} hover`}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-auto object-contain opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                    />
                </div>

                {/* Mobile Swiper */}
                <div className="md:hidden">
                    <Swiper
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                        spaceBetween={10}
                        slidesPerView={1}
                        className="h-72"
                    >
                        <SwiperSlide>
                            <img
                                src={product.images[selectedColor]}
                                alt={product.name}
                                className="w-full h-72 object-contain"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={product.hoverImages[selectedColor]}
                                alt={`${product.name} hover`}
                                className="w-full h-72 object-contain"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </Link>

            {/* QUICK ADD BUTTON */}
            <div className="absolute bottom-4 right-4 z-10">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                    }}
                    className="bg-yellow-400 p-2 cursor-pointer transition md:opacity-0 md:group-hover:opacity-100 opacity-100"
                    aria-label="Add to cart"
                >
                    <FiShoppingCart size={24} className="text-black" />
                </button>
            </div>

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
                        className={`w-6 h-6 rounded-full border cursor-pointer transition-transform duration-200 ${
                            selectedColor === color.value ? "scale-110 border-yellow-400" : "border-gray-300"
                        }`}
                        style={{
                            backgroundColor:
                                color.value === "black"
                                    ? "#000"
                                    : color.value === "white"
                                        ? "#fff"
                                        : "#f5f5dc", // beige
                        }}
                    >
                        <span className="sr-only">{color.name}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default ProductCardColorSelector;