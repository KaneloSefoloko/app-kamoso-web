import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const { productSlug } = useParams();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Product: {productSlug}</h1>
            {/* You can fetch product data based on slug here */}
        </div>
    );
};

export default ProductPage;