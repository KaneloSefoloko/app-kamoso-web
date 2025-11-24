import React from 'react';
import MobileCarousel from '../components/MobileCarousel';
import ProductCard from '../components/ProductCard';

const ProductsList = ({ products }) => {
  return (
    <div className="w-full">
      {/* Mobile: horizontal swipe */}
      <div className="block md:hidden">
        <MobileCarousel products={products} />
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 md:px-8">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
