const ProductCard = ({ product }) => (
    <div className="border p-4 hover:shadow-lg transition w-full max-w-sm mx-auto">
        <div className="w-full h-80 bg-white shadow-md flex items-center justify-center">
            <img
                src={product.image}
                alt={product.name}
                className="h-64 w-auto object-contain p-4"
            />
        </div>
        <h3 className="mt-2 font-semibold text-center">{product.name}</h3>
        <p className="text-sm text-gray-600 text-center">R{product.price}</p>
    </div>
);
export default ProductCard;