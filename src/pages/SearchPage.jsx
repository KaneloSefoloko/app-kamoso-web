import { useLocation } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const SearchPage = () => {
    const { search } = useLocation();
    const query = new URLSearchParams(search).get("q")?.toLowerCase() || "";

    const results = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
    );

    return (
        <div className="pt-32 px-4 max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">
                Search results for "{query}"
            </h1>

            {results.length === 0 ? (
                <p className="text-gray-500">No products found.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {results.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;