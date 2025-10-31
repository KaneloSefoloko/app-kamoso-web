import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => (
    <div className="mt-16 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    </div>
);

export default ProductGrid;