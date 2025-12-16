import ProductCard from "./ProductCard";

const ProductGrid = ({ products, limit }) => {
    const visibleProducts = limit
        ? products.slice(0, limit)
        : products;

    return (
        <div className="mt-6 px-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;