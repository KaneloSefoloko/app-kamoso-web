const ProductSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="bg-white/10 h-72 rounded-2xl"></div>
            <div className="h-3 bg-white/10 mt-3 w-2/3 rounded"></div>
            <div className="h-3 bg-white/10 mt-2 w-1/3 rounded"></div>
        </div>
    );
};

export default ProductSkeleton;