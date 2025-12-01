// src/components/ProductCard.jsx
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext.jsx";
import { FiShoppingCart } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const [selectedColor, setSelectedColor] = useState("black");

    const colors = [
        { name: "Black", value: "black" },
        { name: "White", value: "white" },
        { name: "Beige", value: "beige" },
    ];

    return (
        <div className="group relative border border-transparent p-2 transition w-full max-w-sm mx-auto bg-transparent">
            {/* IMAGE CONTAINER */}
            <Link to={`/products/${product.slug}`} className="block relative w-full h-72 md:h-[22rem] overflow-hidden">

                {/* Desktop hover effect */}
                <div className="hidden md:block relative w-full h-full">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-auto object-contain transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                    />
                    <img
                        src={product.hoverImage}
                        alt={`${product.name} hover`}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-auto object-contain opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
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
                        <SwiperSlide>
                            <img src={product.image} alt={product.name} className="w-full h-72 object-contain" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={product.hoverImage} alt={`${product.name} hover`} className="w-full h-72 object-contain" />
                        </SwiperSlide>
                    </Swiper>
                </div>

                {/* UNIFIED CART BUTTON */}
                <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 z-20">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product);
                        }}
                        className="bg-yellow-400 p-2 md:p-3 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110 shadow-md opacity-100 md:opacity-0 group-hover:md:opacity-100"
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
                        className={`w-4 h-4 border cursor-pointer transition-transform duration-200 ${
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

export default ProductCard;