import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import { FiShoppingCart } from 'react-icons/fi';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="group relative border border-transparent p-4 transition w-full max-w-sm mx-auto bg-transparent">
            <Link to={`/products/${product.slug}`} className="block relative w-full h-[22rem] overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[24rem] w-auto object-contain p-4 transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                />
                <img
                    src={product.hoverImage}
                    alt={`${product.name} hover`}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[24rem] w-auto object-contain p-4 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                />
            </Link>

            <div className="absolute bottom-4 right-4 z-10">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                    }}
                    className="bg-yellow-400 p-3 rounded-full cursor-pointer transition md:opacity-0 md:group-hover:opacity-100 opacity-100"
                    aria-label="Add to cart"
                >
                    <FiShoppingCart size={24} className="text-black" />
                </button>
            </div>

            <Link to={`/products/${product.slug}`}>
                <h3 className="mt-2 font-semibold text-center">{product.name}</h3>
            </Link>
            <p className="text-sm text-gray-600 text-center">R{product.price}</p>
        </div>
    );
};

export default ProductCard;