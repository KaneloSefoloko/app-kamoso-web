import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => (
    <div className="mt-6 px-1">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    </div>
);

export default ProductGrid;