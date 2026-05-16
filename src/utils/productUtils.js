export const getProductBadge = (product) => {
    if (product.stock === 0) return "SOLD OUT";
    if (product.isNew) return "NEW";
    if (product.trending) return "TRENDING";
    return null;
};