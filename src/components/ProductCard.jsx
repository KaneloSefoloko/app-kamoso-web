import { useContext } from 'react'
import { CartContext } from '../components/CartContext'
import { FiShoppingCart } from 'react-icons/fi'

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext)

    return (
        <div className="group relative border border-transparent p-4 transition w-full max-w-sm mx-auto bg-transparent">
            <div className="relative w-full h-[22rem] flex items-center justify-center bg-transparent overflow-hidden">
                {/* Default image */}
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[24rem] w-auto object-contain p-4 transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                />
                {/* Hover image */}
                <img
                    src={product.hoverImage}
                    alt={`${product.name} hover`}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[24rem] w-auto object-contain p-4 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                />

                {/* Add to Cart overlay */}
                <div className="absolute inset-0 bg-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 right-4 z-10">
                        <div
                            className="bg-yellow-400 p-3 rounded-full cursor-pointer transition"
                            onClick={() => addToCart(product)}>
                            <FiShoppingCart size={24} className="text-black"/>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="mt-2 font-semibold text-center">{product.name}</h3>
            <p className="text-sm text-gray-600 text-center">R{product.price}</p>
        </div>
    )
}
export default ProductCard