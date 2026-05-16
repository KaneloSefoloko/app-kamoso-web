import ProductCard from "./ProductCard";

const ProductGrid = ({ products, limit }) => {
    const visibleProducts = limit
        ? products.slice(0, limit)
        : products;

    if (!visibleProducts?.length) {
        return (
            <div className="text-center py-20 text-gray-500">
                No products found
            </div>
        );
    }

    return (
        <div className="mt-10 px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {visibleProducts.map((product) => (
                    <ProductCard
                        key={product.id || product.slug}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;