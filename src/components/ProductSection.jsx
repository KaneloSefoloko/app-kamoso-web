import React from "react";
import ProductGrid from "./ProductGrid";

const ProductSection = ({ title, products }) => {
    return (
        <div className="px-4 md:px-8 py-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 tracking-wide">
                {title}
            </h2>

            <ProductGrid products={products} limit={4} />
        </div>
    );
};